const { app, BrowserWindow, nativeTheme, shell, ipcMain, Menu } = require('electron')
const path = require('path')
const fs = require('fs')
const { spawn, execFile } = require('child_process')

// 【问题修复】移除 Electron 默认英文菜单栏（File/Edit/View/Window/Help）
// 计算器为自包含 UI，使用自身的 SHIFT/ALPHA/tab 控制，不需要系统菜单
function setupMenu() {
  // 如果保留空菜单，Windows 仍会显示 Alt 键激活菜单栏；直接设为 null 彻底移除
  Menu.setApplicationMenu(null)
}

/** 调用本机 Python 执行代码 */
function runPythonCode(code) {
  return new Promise((resolve, reject) => {
    // 候选：python3, python（Windows 通常是 python）
    const candidates = process.platform === 'win32'
      ? ['py', 'python', 'python3']
      : ['python3', 'python']
    tryNext(candidates)

    function tryNext(list, idx = 0) {
      if (idx >= list.length) {
        return reject(new Error('未检测到本机 Python 解释器，请先安装 Python 3'))
      }
      const bin = list[idx]
      let stdout = '', stderr = '', errored = false
      let child
      try {
        child = spawn(bin, ['-c', code], { windowsHide: true, timeout: 15000 })
      } catch (e) {
        return tryNext(list, idx + 1)
      }
      child.on('error', () => { errored = true; tryNext(list, idx + 1) })
      child.stdout.on('data', d => {
        const chunk = d.toString()
        if (stdout.length < 5_000_000) stdout += chunk // 5MB 上限防爆内存
      })
      child.stderr.on('data', d => {
        const chunk = d.toString()
        if (stderr.length < 5_000_000) stderr += chunk
      })
      child.on('close', (code) => {
        if (errored) return
        if (code === 0 || (code === null && !stderr)) {
          resolve({ stdout, stderr, code })
        } else {
          resolve({ stdout, stderr, code })
        }
      })
    }
  })
}

/** 探测是否存在本机 Python */
function probePython() {
  const candidates = process.platform === 'win32'
    ? ['py --version', 'python --version', 'python3 --version']
    : ['python3 --version', 'python --version']
  return new Promise((resolve) => {
    let i = 0
    const next = () => {
      if (i >= candidates.length) return resolve({ ok: false, version: '' })
      const [bin, ...args] = candidates[i++].split(' ')
      execFile(bin, args, { windowsHide: true, timeout: 3000 }, (err, stdout, stderr) => {
        if (!err && (stdout || stderr)) {
          return resolve({ ok: true, version: (stdout || stderr).toString().trim().split('\n')[0] })
        }
        next()
      })
    }
    next()
  })
}

ipcMain.handle('python:run', async (_e, code) => {
  try {
    return await runPythonCode(code)
  } catch (e) {
    return { ok: false, error: e?.message || String(e) }
  }
})

ipcMain.handle('python:probe', async () => {
  try { return await probePython() }
  catch (e) { return { ok: false, error: e?.message || String(e) } }
})

const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
  // 强制暗色主题，配合磨砂玻璃
  nativeTheme.themeSource = 'dark'

  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 1024,
    minHeight: 640,
    backgroundColor: '#0a0a0f',
    transparent: false,
    frame: true,
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: {
      color: '#0a0a0f',
      symbolColor: '#ffffff',
      height: 36
    },
    vibrancy: 'under-window',   // macOS 玻璃
    visualEffectState: 'active',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    },
    // 【问题修复】Window 图标使用 .ico（多尺寸兼容 16/32/48/256）
    // 打包后 icon.ico 位于 build/icon.ico；运行时优先 build/icon.ico，其次回退 public/icon.png
    icon: (() => {
      const ico = path.join(__dirname, '../build/icon.ico')
      if (fs.existsSync(ico)) return ico
      const png = path.join(__dirname, '../public/icon.png')
      return png
    })()
  })

  // Windows 的亚克力效果（Win10+）
  if (process.platform === 'win32') {
    try {
      win.setBackgroundMaterial('mica')
    } catch (_) { /* 旧版本 Windows 忽略 */ }
  }

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })

  // 外链打开外部浏览器
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev) {
    // 仅开发模式：默认不打开 DevTools，需要时可开启
    // win.webContents.openDevTools({ mode: 'detach' })
  }
}

// 接收前端请求打开外部浏览器
ipcMain.on('open-external', (_event, url) => {
  shell.openExternal(url)
})

app.whenReady().then(() => {
  setupMenu()
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

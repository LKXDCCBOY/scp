const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('calcNative', {
  platform: process.platform,
  version: process.versions.electron,
  isElectron: true,
  // 调用本机 Python 执行代码
  runPython: (code) => ipcRenderer.invoke('python:run', code),
  // 探测本机 Python 是否存在及版本
  probePython: () => ipcRenderer.invoke('python:probe'),
  // 打开外部链接
  openExternal: (url) => ipcRenderer.send('open-external', url),
  sayHello: () => 'Hello from Electron'
})

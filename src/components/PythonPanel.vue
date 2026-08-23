<template>
  <div class="glass-panel p-3 sm:p-4 w-full h-full flex flex-col min-h-0">
    <!-- 工具栏：标题 + 模式切换 + 状态 + 按钮 -->
    <div class="flex-none flex flex-wrap items-center gap-2 mb-2">
      <span class="text-xs sm:text-sm font-medium text-white/70">{{ t('python.title') }}</span>
      <!-- 模式切换 -->
      <div class="flex items-center gap-0.5 bg-white/5 rounded-md border border-white/10 p-0.5">
        <button v-for="m in modes" :key="m.id"
          @click="switchMode(m.id)"
          class="text-[10px] sm:text-[11px] px-2 py-1 rounded transition"
          :class="mode === m.id ? 'bg-calc-primary/30 text-blue-200' : 'text-white/50 hover:text-white/80'">
          {{ m.label }}
        </button>
      </div>
      <!-- 状态 -->
      <span v-if="mode==='math'" class="text-[11px] text-emerald-300/80">{{ t('python.script.ready') }}</span>
      <span v-else-if="mode==='native' && nativeStatus==='ok'" class="text-[11px] text-emerald-300/80">{{ nativeVersion || t('python.native.ok') }}</span>
      <span v-else-if="mode==='native' && nativeStatus==='checking'" class="text-[11px] text-amber-300/80">{{ t('python.native.checking') }}</span>
      <span v-else-if="mode==='native' && nativeStatus==='none'" class="text-[11px] text-rose-300/80">{{ t('python.native.none') }}</span>
      <span v-else-if="mode==='pyodide' && !pyoReady && !pyoLoading" class="text-[11px] text-rose-300/80">{{ t('python.notLoaded') }}</span>
      <span v-else-if="mode==='pyodide' && pyoLoading" class="text-[11px] text-amber-300/80">{{ t('python.loading') }}</span>
      <span v-else-if="mode==='pyodide'" class="text-[11px] text-emerald-300/80">{{ t('python.ready') }}</span>

      <div class="flex-1"></div>
      <button v-if="mode==='pyodide'" @click="loadPyodide" :disabled="pyoLoading"
              class="text-[11px] px-2 py-1 rounded-lg bg-calc-primary/20 border border-calc-primary/30 text-blue-200 hover:bg-calc-primary/30 transition disabled:opacity-50">
        {{ pyoReady ? t('python.reload') : t('python.load') }}
      </button>
      <button @click="clearOutput" class="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">{{ t('python.clear') }}</button>
    </div>

    <!-- 代码 + 输出 -->
    <div class="flex-1 min-h-0 flex flex-col gap-2">
      <!-- 编辑 -->
      <div class="flex-none flex flex-col gap-1.5">
        <div class="flex items-center gap-1.5">
          <span class="text-[11px] text-white/40 flex-none">{{ t('python.editor') }}</span>
          <div class="flex-1"></div>
          <select v-model="example" @change="loadExample" class="text-[11px] bg-black/30 border border-white/10 rounded-lg px-1.5 py-1 text-white/70 focus:outline-none">
            <option value="">{{ t('python.example') }}</option>
            <option v-for="e in exampleList" :key="e.id" :value="e.id">{{ e.label }}</option>
          </select>
          <button @click="runCode" :disabled="running || !canRun"
                  class="text-[11px] px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/30 transition disabled:opacity-40">
            {{ running ? t('python.running') : t('python.run') }}
          </button>
        </div>
        <textarea
          v-model="code"
          @keydown.ctrl.enter.prevent="runCode"
          @keydown.meta.enter.prevent="runCode"
          @focus="router.onFocus"
          @keydown.capture="router.onKeydownCapture"
          :readonly="router.readonly"
          class="w-full h-[100px] bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm
                 font-mono text-white resize-none focus:outline-none focus:border-calc-primary/60
                 scrollbar-thin leading-relaxed"
          :placeholder="placeholderText"
          spellcheck="false"
        ></textarea>
      </div>

      <!-- 输出 -->
      <div class="flex-1 min-h-0 flex flex-col">
        <span class="text-[11px] text-white/40 mb-1">{{ t('python.output') }}</span>
        <div ref="outputEl"
             class="flex-1 min-h-0 overflow-y-auto scrollbar-thin bg-black/40 border border-white/8 rounded-xl px-3 py-2
                    font-mono text-xs sm:text-sm leading-relaxed"
             v-html="outputHtml">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import type { EngineState } from '@/engine/calculator'
import { t, useMessages, lang } from '@/i18n'
import { runScript } from '@/engine/script'
import { useInputRouter } from '@/composables/useInputRouter'

const props = defineProps<{ state: EngineState }>()
declare global { interface Window { calcNative?: { isElectron: boolean; runPython: (c: string) => Promise<any>; probePython: () => Promise<any> } } }

const { bindInputRouter } = useInputRouter()
const router = bindInputRouter()

const msgs = useMessages()
type ModeId = 'math' | 'native' | 'pyodide'
const mode = ref<ModeId>('math')

// ---- 模式列表 & 示例 ----
const modes = [
  { id: 'math' as ModeId,   label: t('python.mode.math') },
  { id: 'native' as ModeId, label: t('python.mode.native') },
  { id: 'pyodide' as ModeId, label: t('python.mode.pyodide') }
]

const exampleList = computed(() => ([
  { id: 'basic',  label: t('python.examples.basic') },
  { id: 'func',   label: t('python.examples.func') },
  { id: 'loop',   label: t('python.examples.loop') },
  { id: 'math',   label: t('python.examples.math') },
  { id: 'matrix', label: t('python.examples.matrix') }
]))

// ---- 代码与输出 ----
const code = ref<string>('')
const outputEl = ref<HTMLElement>()
const outputHtml = ref('<span class="text-white/30">' + t('python.script.hint') + '</span>')
const running = ref(false)
const example = ref('')

const placeholderText = computed(() => {
  if (mode.value === 'math')   return t('python.script.placeholder')
  if (mode.value === 'native') return t('python.native.placeholder')
  return t('python.placeholder')
})

const canRun = computed(() => {
  if (mode.value === 'math') return true
  if (mode.value === 'native') return nativeStatus.value === 'ok'
  return pyoReady.value
})

// 切换语言时更新代码内容
watch(lang, () => {
  if (example.value) loadExample()
  else code.value = (msgs.value.code as any)[defaultCodeByMode(mode.value)] || ''
}, { flush: 'post' })

function defaultCodeByMode(m: ModeId): string {
  if (m === 'math') return 'mathScript'
  return 'default'
}

// ---- 数学脚本模式 默认脚本 ----
const MATH_SCRIPT_ZH = `# 数学脚本：直接运行，零加载
# 支持变量、print、for in range、if、def、比较运算
# 所有科学函数 (sin, cos, tan, log, ln, sqrt, abs, floor, ...) 均可用

x = sin(30) + ln(e^2)
print("x =", x)

# 循环求平方和
s = 0
for i in range(1, 6):
    s = s + i^2
    print("i =", i, "  i^2 =", i^2)

print("平方和 s =", s)

# 解一元二次方程
def solve(a, b, c):
    d = b^2 - 4*a*c
    if d < 0:
        print("无实根")
    else:
        r = sqrt(d)
        x1 = (-b + r) / (2*a)
        x2 = (-b - r) / (2*a)
        print("x1 =", x1)
        print("x2 =", x2)

solve(1, -5, 6)
`

const MATH_SCRIPT_EN = `# Math Script: zero-load instant execution
# Supports assignment, print, for..in range, if, def, comparisons
# All scientific functions (sin, cos, tan, log, ln, sqrt, abs, floor, ...) available

x = sin(30) + ln(e^2)
print("x =", x)

# Sum of squares with a loop
s = 0
for i in range(1, 6):
    s = s + i^2
    print("i =", i, "  i^2 =", i^2)

print("Sum of squares s =", s)

# Quadratic solver
def solve(a, b, c):
    d = b^2 - 4*a*c
    if d < 0:
        print("No real roots")
    else:
        r = sqrt(d)
        x1 = (-b + r) / (2*a)
        x2 = (-b - r) / (2*a)
        print("x1 =", x1)
        print("x2 =", x2)

solve(1, -5, 6)
`

// 初始化默认代码
function initDefaultCode() {
  if (lang.value === 'en-US') {
    if (mode.value === 'math') code.value = MATH_SCRIPT_EN
    else code.value = msgs.value.code.default
  } else {
    if (mode.value === 'math') code.value = MATH_SCRIPT_ZH
    else code.value = msgs.value.code.default
  }
}
initDefaultCode()

function loadExample() {
  if (!example.value) return
  const src = (msgs.value.code as any)[example.value]
  if (src) code.value = src
  example.value = ''
}

function clearOutput() {
  outputHtml.value = '<span class="text-white/30">' + t('python.outputCleared') + '</span>'
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function pushResult(html: string) {
  outputHtml.value = html
  nextTick().then(() => { if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight })
}

// ---- 运行调度 ----
async function runCode() {
  if (!canRun.value || running.value) return
  running.value = true
  try {
    if (mode.value === 'math')   return await runMathScript()
    if (mode.value === 'native') return await runNative()
    return await runPyodide()
  } finally {
    running.value = false
  }
}

function runMathScript() {
  const result = runScript(code.value, { angleMode: props.state.angleMode })
  const out: string[] = []
  result.output.forEach(line => {
    out.push(`<span class="text-white/90">${escapeHtml(line)}</span>`)
  })
  if (result.error) {
    out.push(`<span class="text-rose-400">${escapeHtml(result.error)}</span>`)
  }
  // 输出变量列表（摘要）
  const varKeys = Object.keys(result.vars).filter(k => !['pi', 'e'].includes(k))
  if (varKeys.length) {
    const vList = varKeys.slice(0, 12).map(k => {
      const v = result.vars[k]
      return `<span class="text-cyan-300/90">${k}</span>=<span class="text-white/85">${escapeHtml(String(typeof v === 'number' ? (Number.isInteger(v) ? v : parseFloat(v.toPrecision(10))) : v))}</span>`
    }).join('  ')
    out.push(`<div class="text-[11px] text-white/30 mt-2 pt-1 border-t border-white/5">VARS: ${vList}</div>`)
  }
  if (out.length === 0) {
    out.push('<span class="text-white/40">' + t('python.noOutput') + '</span>')
  }
  pushResult(out.join('\n'))
}

// ---- 本机 Python (Electron) ----
const nativeStatus = ref<'ok'|'none'|'checking'>('checking')
const nativeVersion = ref('')

async function checkNative() {
  nativeStatus.value = 'checking'
  try {
    const res = await window.calcNative?.probePython?.()
    if (res?.ok) {
      nativeStatus.value = 'ok'
      nativeVersion.value = res.version || ''
    } else {
      nativeStatus.value = 'none'
      nativeVersion.value = ''
    }
  } catch {
    nativeStatus.value = 'none'
  }
}

async function runNative() {
  if (nativeStatus.value !== 'ok') {
    pushResult(`<span class="text-rose-400">${t('python.native.none')}</span>`)
    return
  }
  pushResult('<span class="text-amber-300/70">' + t('python.native.running') + '</span>')
  try {
    const res = await window.calcNative!.runPython(code.value)
    const lines: string[] = []
    if (res.stdout) lines.push(`<span class="text-white/90">${escapeHtml(String(res.stdout))}</span>`)
    if (res.stderr) {
      const last = String(res.stderr).trim().split('\n').filter(Boolean).slice(-1)[0] || String(res.stderr)
      lines.push(`<span class="text-rose-400">${escapeHtml(last)}</span>`)
    }
    if (res.ok === false && res.error) {
      lines.push(`<span class="text-rose-400">${escapeHtml(res.error)}</span>`)
    }
    if (lines.length === 0) lines.push('<span class="text-white/40">' + t('python.noOutput') + '</span>')
    pushResult(lines.join('\n'))
  } catch (e: any) {
    pushResult(`<span class="text-rose-400">${escapeHtml(e?.message || String(e))}</span>`)
  }
}

// ---- Pyodide (Web 环境 fallback) ----
const pyoReady = ref(false)
const pyoLoading = ref(false)
let pyodide: any = null

async function loadPyodide() {
  if (pyoLoading.value) return
  pyoLoading.value = true
  pushResult('<span class="text-amber-300/80">' + t('python.loadPrompt') + '</span>')
  try {
    if (!(window as any).loadPyodide) {
      await loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js')
    }
    pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
    })
    pyoReady.value = true
    pushResult('<span class="text-emerald-300/80">' + t('python.loadSuccess') + '</span>')
  } catch (err: any) {
    pushResult(`<span class="text-rose-400">${t('python.loadFail', { msg: err?.message || err })}</span>`)
  } finally {
    pyoLoading.value = false
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load ' + src))
    document.head.appendChild(s)
  })
}

async function runPyodide() {
  if (!pyodide || !pyoReady.value) {
    await loadPyodide()
    if (!pyoReady.value) return
  }
  const lines: string[] = []
  pyodide.setStdout({ batched: (s: string) => lines.push(`<span class="text-white/90">${escapeHtml(s)}</span>`) })
  pyodide.setStderr({ batched: (s: string) => lines.push(`<span class="text-rose-400/80">${escapeHtml(s)}</span>`) })
  try {
    const result = await pyodide.runPythonAsync(code.value)
    if (result !== undefined && result !== null) {
      lines.push(`<span class="text-emerald-300/80">${t('python.returnValue', { val: escapeHtml(String(result)) })}</span>`)
    }
  } catch (err: any) {
    const msg = String(err?.message || err)
    const lines2 = msg.split('\n').filter(l => l.trim())
    const lastLine = lines2[lines2.length - 1] || msg
    lines.push(`<span class="text-rose-400">${escapeHtml(lastLine)}</span>`)
  } finally {
    if (lines.length === 0) lines.push('<span class="text-white/40">' + t('python.noOutput') + '</span>')
    pushResult(lines.join('\n'))
  }
}

// ---- 模式切换 ----
async function switchMode(m: ModeId) {
  mode.value = m
  running.value = false
  if (m === 'native') {
    if (window.calcNative?.isElectron) checkNative()
    else { nativeStatus.value = 'none' }
  }
  initDefaultCode()
  if (m === 'math') {
    pushResult('<span class="text-emerald-300/80">' + t('python.script.ready') + ' · ' + t('python.script.hint') + '</span>')
  } else if (m === 'native') {
    if (nativeStatus.value === 'ok') {
      pushResult('<span class="text-emerald-300/80">' + t('python.native.ready') + (nativeVersion.value ? ' · ' + nativeVersion.value : '') + '</span>')
    } else {
      await checkNative()
      if (nativeStatus.value === 'ok') {
        pushResult('<span class="text-emerald-300/80">' + t('python.native.ready') + ' · ' + nativeVersion.value + '</span>')
      } else {
        pushResult(`<span class="text-rose-400">${t('python.native.none')}</span><div class="text-[11px] text-white/40 mt-1">${t('python.native.tip')}</div>`)
      }
    }
  } else {
    if (pyoReady.value) pushResult('<span class="text-emerald-300/80">' + t('python.ready') + '</span>')
    else pushResult('<span class="text-white/40">' + t('python.pyodide.tip') + '</span>')
  }
}

onMounted(() => {
  // 启动模式为 math，输出就绪提示
  pushResult('<span class="text-emerald-300/80">' + t('python.script.ready') + ' · ' + t('python.script.hint') + '</span>')
})
</script>

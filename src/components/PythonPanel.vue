<template>
  <div class="glass-panel p-3 sm:p-4 w-full h-full flex flex-col min-h-0">
    <!-- 工具栏：标题 + 模式切换 + 状态 + 按钮 -->
    <div class="flex-none flex flex-wrap items-center gap-2 mb-2">
      <span class="text-xs sm:text-sm font-medium" :style="{ color: 'var(--py-title)' }">{{ t('python.title') }}</span>
      <!-- 模式切换 -->
      <div class="flex items-center gap-0.5 rounded-md border p-0.5"
           :style="{ background: 'var(--py-bg-chip)', borderColor: 'var(--py-border-subtle)' }">
        <button v-for="m in modes" :key="m.id"
          @click="switchMode(m.id)"
          class="text-[10px] sm:text-[11px] px-2 py-1 rounded transition"
          :style="mode === m.id
            ? { background: 'var(--py-bg-chip-active)', color: 'var(--py-text-mode-active)' }
            : { color: 'var(--py-text-mode-inactive)' }">
          {{ m.label }}
        </button>
      </div>
      <!-- 状态 -->
      <span v-if="mode==='math'" class="text-[11px]" :style="{ color: 'var(--py-text-status-ok)' }">{{ t('python.script.ready') }}</span>
      <span v-else-if="mode==='native' && nativeStatus==='ok'" class="text-[11px]" :style="{ color: 'var(--py-text-status-ok)' }">{{ nativeVersion || t('python.native.ok') }}</span>
      <span v-else-if="mode==='native' && nativeStatus==='checking'" class="text-[11px]" :style="{ color: 'var(--py-text-status-checking)' }">{{ t('python.native.checking') }}</span>
      <span v-else-if="mode==='native' && nativeStatus==='none'" class="text-[11px]" :style="{ color: 'var(--py-text-status-error)' }">{{ t('python.native.none') }}</span>
      <span v-else-if="mode==='pyodide' && !pyoReady && !pyoLoading" class="text-[11px]" :style="{ color: 'var(--py-text-status-error)' }">{{ t('python.notLoaded') }}</span>
      <span v-else-if="mode==='pyodide' && pyoLoading" class="text-[11px]" :style="{ color: 'var(--py-text-status-loading)' }">{{ t('python.loading') }}</span>
      <span v-else-if="mode==='pyodide'" class="text-[11px]" :style="{ color: 'var(--py-text-status-ok)' }">{{ t('python.ready') }}</span>

      <div class="flex-1"></div>
      <button v-if="mode==='pyodide'" @click="loadPyodide" :disabled="pyoLoading"
              class="text-[11px] px-2 py-1 rounded-lg border transition disabled:opacity-50 hover:scale-105 active:scale-95"
              :style="{ background: 'var(--py-bg-chip-active)', borderColor: 'var(--chip-active-border)', color: 'var(--py-text-mode-active)' }">
        {{ pyoReady ? t('python.reload') : t('python.load') }}
      </button>
      <button @click="clearOutput"
              class="text-[11px] px-2 py-1 rounded-lg border transition hover:scale-105 active:scale-95"
              :style="{ background: 'var(--py-bg-btn)', borderColor: 'var(--py-border-subtle)', color: 'var(--py-text-btn)' }">
        {{ t('python.clear') }}
      </button>
    </div>

    <!-- 代码 + 输出 -->
    <div class="flex-1 min-h-0 flex flex-col gap-2">
      <!-- 编辑 -->
      <div class="flex-none flex flex-col gap-1.5">
        <div class="flex items-center gap-1.5">
          <span class="text-[11px]" :style="{ color: 'var(--py-label)' }">{{ t('python.editor') }}</span>
          <div class="flex-1"></div>
          <select v-model="example" @change="loadExample"
                  class="text-[11px] border rounded-lg px-1.5 py-1 focus:outline-none"
                  :style="{ background: 'var(--py-bg-input)', borderColor: 'var(--py-border-subtle)', color: 'var(--py-text-select)' }">
            <option value="">{{ t('python.example') }}</option>
            <option v-for="e in exampleList" :key="e.id" :value="e.id">{{ e.label }}</option>
          </select>
          <button @click="runCode" :disabled="running || !canRun"
                  class="text-[11px] px-3 py-1 rounded-lg border transition hover:scale-105 active:scale-95 disabled:opacity-40"
                  :style="{ background: 'var(--py-btn-run-bg)', borderColor: 'var(--py-btn-run-text)', color: 'var(--py-btn-run-text)' }">
            {{ running ? t('python.running') : t('python.run') }}
          </button>
        </div>
        <textarea
          v-model="code"
          @keydown.ctrl.enter.prevent="runCode"
          @keydown.meta.enter.prevent="runCode"
          class="w-full h-[100px] border rounded-xl px-3 py-2 text-xs sm:text-sm
                 font-mono resize-none focus:outline-none scrollbar-thin leading-relaxed transition-colors"
          :style="{ background: 'var(--py-bg-input)', borderColor: 'var(--py-border-subtle)', color: 'var(--input-text)' }"
          :placeholder="placeholderText"
          spellcheck="false"
        ></textarea>
      </div>

      <!-- 输出 -->
      <div class="flex-1 min-h-0 flex flex-col">
        <span class="text-[11px] mb-1" :style="{ color: 'var(--py-label)' }">{{ t('python.output') }}</span>
        <div ref="outputEl"
             class="flex-1 min-h-0 overflow-y-auto scrollbar-thin border rounded-xl px-3 py-2
                    font-mono text-xs sm:text-sm leading-relaxed"
             :style="{ background: 'var(--log-bg)', borderColor: 'var(--py-border-subtle)', color: 'var(--text)' }"
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
const outputHtml = ref('<span style="color: var(--text-muted)">' + t('python.script.hint') + '</span>')
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

// 切换语言时不自动填充代码（输入框保持空）
watch(lang, () => {
  // 仅更新输出提示文本，不填充代码
}, { flush: 'post' })

function loadExample() {
  if (!example.value) return
  const src = (msgs.value.code as any)[example.value]
  if (src) code.value = src
  example.value = ''
}

function clearOutput() {
  outputHtml.value = `<span ${cs.dim}>` + t('python.outputCleared') + '</span>'
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// 使用 CSS 变量颜色（同时适配暗/亮主题）
const cs = {
  stdout:   'style="color: var(--log-stdout)"',
  dim:      'style="color: var(--text-muted)"',
  muted:    'style="color: var(--text-dim)"',
  err:      'style="color: var(--log-stderr)"',
  info:     'style="color: var(--log-info)"',
  ret:      'style="color: var(--log-return)"',
  varName:  'style="color: var(--log-info)"',
  warn:     'style="color: var(--key-special-text)"',
  borderDim:'style="border-top: 1px solid var(--tab-divider)"'
}

function pushResult(html: string) {
  outputHtml.value = truncateOutput(html)
  nextTick().then(() => { if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight })
}

// ---- 防爆内存：危险代码预扫描 ----
const MAX_OUTPUT_CHARS = 200_000 // 输出截断阈值

function scanDangerousCode(src: string): string | null {
  // 检测 ** 后跟超大指数（如 2**10000000）
  const powMatch = src.match(/\*\*\s*(\d{5,})/)
  if (powMatch) return `Exponent too large (${powMatch[1]}), may exhaust memory`
  // 检测 range 超大循环（如 range(100000000)）
  const rangeMatch = src.match(/range\s*\(\s*(\d{8,})/)
  if (rangeMatch) return `Range too large (${rangeMatch[1]}), may hang or exhaust memory`
  // 检测字符串 * 超大倍数（如 "x" * 100000000）
  const strMulMatch = src.match(/["'].*?["']\s*\*\s*(\d{8,})/)
  if (strMulMatch) return `String repetition too large (${strMulMatch[1]}), may exhaust memory`
  // 检测列表 * 超大倍数
  const listMulMatch = src.match(/\[.*?\]\s*\*\s*(\d{8,})/)
  if (listMulMatch) return `List repetition too large (${listMulMatch[1]}), may exhaust memory`
  return null
}

function truncateOutput(html: string): string {
  if (html.length <= MAX_OUTPUT_CHARS) return html
  return html.slice(0, MAX_OUTPUT_CHARS) + '\n<span ' + cs.dim + '>... output truncated (' + Math.round(MAX_OUTPUT_CHARS / 1000) + 'KB limit)</span>'
}

// ---- 运行调度 ----
async function runCode() {
  if (!canRun.value || running.value) return
  // 预扫描危险代码
  const danger = scanDangerousCode(code.value)
  if (danger) {
    pushResult(`<span ${cs.err}>⚠ ${escapeHtml(danger)}</span>`)
    return
  }
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
    out.push(`<span ${cs.stdout}>${escapeHtml(line)}</span>`)
  })
  if (result.error) {
    out.push(`<span ${cs.err}>${escapeHtml(result.error)}</span>`)
  }
  // 输出变量列表（摘要）
  const varKeys = Object.keys(result.vars).filter(k => !['pi', 'e'].includes(k))
  if (varKeys.length) {
    const vList = varKeys.slice(0, 12).map(k => {
      const v = result.vars[k]
      return `<span ${cs.varName}>${k}</span>=<span ${cs.stdout}>${escapeHtml(String(typeof v === 'number' ? (Number.isInteger(v) ? v : parseFloat(v.toPrecision(10))) : v))}</span>`
    }).join('  ')
    out.push(`<div class="text-[11px] mt-2 pt-1" ${cs.borderDim} ${cs.dim}>VARS: ${vList}</div>`)
  }
  if (out.length === 0) {
    out.push(`<span ${cs.muted}>` + t('python.noOutput') + '</span>')
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
    pushResult(`<span ${cs.err}>${t('python.native.none')}</span>`)
    return
  }
  pushResult(`<span ${cs.warn}>` + t('python.native.running') + '</span>')
  try {
    const res = await window.calcNative!.runPython(code.value)
    const lines: string[] = []
    if (res.stdout) lines.push(`<span ${cs.stdout}>${escapeHtml(String(res.stdout))}</span>`)
    if (res.stderr) {
      const last = String(res.stderr).trim().split('\n').filter(Boolean).slice(-1)[0] || String(res.stderr)
      lines.push(`<span ${cs.err}>${escapeHtml(last)}</span>`)
    }
    if (res.ok === false && res.error) {
      lines.push(`<span ${cs.err}>${escapeHtml(res.error)}</span>`)
    }
    if (lines.length === 0) lines.push(`<span ${cs.muted}>` + t('python.noOutput') + '</span>')
    pushResult(lines.join('\n'))
  } catch (e: any) {
    pushResult(`<span ${cs.err}>${escapeHtml(e?.message || String(e))}</span>`)
  }
}

// ---- Pyodide (Web 环境 fallback) ----
const pyoReady = ref(false)
const pyoLoading = ref(false)
let pyodide: any = null

async function loadPyodide() {
  if (pyoLoading.value) return
  pyoLoading.value = true
  pushResult(`<span ${cs.warn}>` + t('python.loadPrompt') + '</span>')
  try {
    if (!(window as any).loadPyodide) {
      await loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js')
    }
    pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
    })
    pyoReady.value = true
    pushResult(`<span ${cs.ret}>` + t('python.loadSuccess') + '</span>')
  } catch (err: any) {
    pushResult(`<span ${cs.err}>${t('python.loadFail', { msg: err?.message || err })}</span>`)
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
  let outputChars = 0
  pyodide.setStdout({ batched: (s: string) => {
    outputChars += s.length
    if (outputChars > MAX_OUTPUT_CHARS) return // 超阈值丢弃
    lines.push(`<span ${cs.stdout}>${escapeHtml(s)}</span>`)
  } })
  pyodide.setStderr({ batched: (s: string) => {
    outputChars += s.length
    if (outputChars > MAX_OUTPUT_CHARS) return
    lines.push(`<span ${cs.err}>${escapeHtml(s)}</span>`)
  } })
  try {
    // 15 秒超时保护
    const timeoutMs = 15000
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Execution timed out (>' + timeoutMs / 1000 + 's)')), timeoutMs)
    )
    const result = await Promise.race([
      pyodide.runPythonAsync(code.value),
      timeoutPromise
    ])
    if (result !== undefined && result !== null) {
      lines.push(`<span ${cs.ret}>${t('python.returnValue', { val: escapeHtml(String(result)) })}</span>`)
    }
  } catch (err: any) {
    const msg = String(err?.message || err)
    const lines2 = msg.split('\n').filter(l => l.trim())
    const lastLine = lines2[lines2.length - 1] || msg
    lines.push(`<span ${cs.err}>${escapeHtml(lastLine)}</span>`)
  } finally {
    if (lines.length === 0) lines.push(`<span ${cs.muted}>` + t('python.noOutput') + '</span>')
    if (outputChars > MAX_OUTPUT_CHARS) {
      lines.push(`<span ${cs.dim}>... output truncated (${Math.round(MAX_OUTPUT_CHARS / 1000)}KB limit)</span>`)
    }
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
  // 输入框保持空，不预填代码
  if (m === 'math') {
    pushResult(`<span ${cs.ret}>` + t('python.script.ready') + ' · ' + t('python.script.hint') + '</span>')
  } else if (m === 'native') {
    if (nativeStatus.value === 'ok') {
      pushResult(`<span ${cs.ret}>` + t('python.native.ready') + (nativeVersion.value ? ' · ' + nativeVersion.value : '') + '</span>')
    } else {
      await checkNative()
      if (nativeStatus.value === 'ok') {
        pushResult(`<span ${cs.ret}>` + t('python.native.ready') + ' · ' + nativeVersion.value + '</span>')
      } else {
        pushResult(`<span ${cs.err}>${t('python.native.none')}</span><div class="text-[11px] mt-1" ${cs.dim}>${t('python.native.tip')}</div>`)
      }
    }
  } else {
    if (pyoReady.value) pushResult(`<span ${cs.ret}>` + t('python.ready') + '</span>')
    else pushResult(`<span ${cs.dim}>` + t('python.pyodide.tip') + '</span>')
  }
}

onMounted(() => {
  // 启动模式为 math，输出就绪提示
  pushResult(`<span ${cs.ret}>` + t('python.script.ready') + ' · ' + t('python.script.hint') + '</span>')
})
</script>

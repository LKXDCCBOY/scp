<template>
  <div :class="isFullscreen
    ? 'fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-2xl p-4 flex flex-col min-h-0'
    : 'glass-panel p-3 sm:p-4 w-full h-full flex flex-col min-h-0'">
    <!-- 工具栏 -->
    <div class="flex-none flex items-center gap-2 mb-2 flex-wrap">
      <span class="text-xs sm:text-sm font-medium text-white/70">{{ t('graph.title') }}</span>
      <div class="flex-1"></div>
      <button @click="resetView" class="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">{{ t('graph.resetView') }}</button>
      <button @click="zoomBy(1.5)" class="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">{{ t('graph.zoomIn') }}</button>
      <button @click="zoomBy(1/1.5)" class="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">{{ t('graph.zoomOut') }}</button>
      <button @click="toggleFullscreen" class="text-[11px] px-2 py-1 rounded-lg bg-calc-primary/20 border border-calc-primary/40 hover:bg-calc-primary/30 transition flex items-center gap-1">
        <svg v-if="!isFullscreen" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m13-5v3a2 2 0 0 0-2 2h-3"/>
        </svg>
        {{ isFullscreen ? t('graph.exitFullscreen') : t('graph.fullscreen') }}
      </button>
    </div>

    <!-- 函数输入列表 -->
    <div class="flex-none space-y-1.5 mb-2 overflow-y-auto scrollbar-thin"
         :class="isFullscreen ? 'max-h-[100px]' : 'max-h-[120px]'">
      <div v-for="(f, i) in funcs" :key="i" class="flex items-center gap-1.5">
        <span class="w-4 h-4 rounded-full flex-none border border-white/20" :style="{ background: f.color }"></span>
        <span class="text-[11px] text-white/50 flex-none w-10">y =</span>
        <input
          v-model="f.expr"
          @keyup.enter="redraw"
          @blur="redraw"
          @focus="router.onFocus"
          @keydown.capture="router.onKeydownCapture"
          :readonly="router.readonly"
          class="flex-1 bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-xs sm:text-sm
                 font-mono focus:outline-none focus:border-calc-primary/60 text-white w-0 min-w-0"
          :placeholder="t('graph.placeholder')"
        />
        <button @click="removeFunc(i)" class="text-[11px] text-rose-400/70 hover:text-rose-400 px-1 flex-none">x</button>
      </div>
      <button @click="addFunc" class="text-[11px] text-blue-300 hover:text-blue-200 px-2 py-1">{{ t('graph.addFunc') }}</button>
    </div>

    <!-- Canvas 绘图区 -->
    <div class="flex-1 min-h-0 relative rounded-xl overflow-hidden border border-white/8 bg-black/40"
         ref="canvasWrap"
         @wheel.prevent="onWheel"
         @pointerdown="onPanStart"
         @pointermove="onPanMove"
         @pointerup="onPanEnd"
         @pointerleave="onPanEnd">
      <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>
      <!-- 坐标显示 -->
      <div class="absolute bottom-2 left-2 text-[11px] font-mono text-white/50 bg-black/40 rounded-lg px-2 py-1 pointer-events-none">
        {{ t('graph.coordLabel', { x: mouseX.toFixed(3), y: mouseY.toFixed(3) }) }}
      </div>
      <div class="absolute top-2 left-2 text-[11px] font-mono text-white/50 bg-black/40 rounded-lg px-2 py-1 pointer-events-none">
        {{ t('graph.viewLabel', { scale: scale.toFixed(1), cx: centerX.toFixed(2), cy: centerY.toFixed(2) }) }}
      </div>
      <!-- 全屏退出提示 -->
      <div v-if="isFullscreen" class="absolute top-2 right-2 text-[11px] font-mono text-white/40 bg-black/40 rounded-lg px-2 py-1 pointer-events-none">
        Esc {{ t('graph.exitFullscreen') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { evaluate, type EngineState, type AngleMode } from '@/engine/calculator'
import { useInputRouter } from '@/composables/useInputRouter'
import { t } from '@/i18n'

const props = defineProps<{ state: EngineState }>()
const emit = defineEmits<{ insert: [s: string] }>()
const { bindInputRouter } = useInputRouter()
const router = bindInputRouter()

const canvas = ref<HTMLCanvasElement>()
const canvasWrap = ref<HTMLElement>()
const isFullscreen = ref(false)

// 16 色调色板：覆盖全色谱、感知差异大、暗/亮主题下均可辨识
const colors = [
  '#4f8cff', // 蓝
  '#f43f5e', // 玫红
  '#10b981', // 翠绿
  '#f59e0b', // 琥珀
  '#a855f7', // 紫
  '#06b6d4', // 青
  '#ec4899', // 粉
  '#84cc16', // 黄绿
  '#f97316', // 橙
  '#3ee0c1', // 薄荷
  '#8b5cf6', // 紫罗兰
  '#eab308', // 金黄
  '#38bdf8', // 天蓝
  '#fb7185', // 珊瑚
  '#34d399', // 翡翠
  '#c084fc'  // 淡紫
]
let colorIdx = 0

interface FuncDef { expr: string; color: string; enabled: boolean }
const funcs = reactive<FuncDef[]>([
  { expr: '', color: colors[0], enabled: true }
])
colorIdx = 1

// 视图状态：数学坐标系中心 + 缩放
const centerX = ref(0)
const centerY = ref(0)
const scale = ref(40) // 像素/单位
const mouseX = ref(0)
const mouseY = ref(0)

let cw = 0, ch = 0
let ctx: CanvasRenderingContext2D | null = null
let rafId = 0

function addFunc() {
  funcs.push({ expr: '', color: colors[colorIdx++ % colors.length], enabled: true })
}

function removeFunc(i: number) {
  funcs.splice(i, 1)
}

function resetView() {
  centerX.value = 0
  centerY.value = 0
  scale.value = 40
  redraw()
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
  nextTick(() => {
    resizeCanvas()
    redraw()
  })
}

function onEscKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = false
    nextTick(() => {
      resizeCanvas()
      redraw()
    })
  }
}

function zoomBy(factor: number) {
  scale.value = Math.max(2, Math.min(2000, scale.value * factor))
  redraw()
}

function onWheel(e: WheelEvent) {
  const rect = canvasWrap.value!.getBoundingClientRect()
  const px = e.clientX - rect.left
  const py = e.clientY - rect.top
  // 缩放时保持鼠标位置对应的数学坐标不变
  const mx = (px - cw / 2) / scale.value + centerX.value
  const my = -(py - ch / 2) / scale.value + centerY.value
  const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
  scale.value = Math.max(2, Math.min(2000, scale.value * factor))
  centerX.value = mx - (px - cw / 2) / scale.value
  centerY.value = my + (py - ch / 2) / scale.value
  redraw()
}

let panning = false
let panStartX = 0, panStartY = 0
let panCenterX = 0, panCenterY = 0

function onPanStart(e: PointerEvent) {
  panning = true
  panStartX = e.clientX
  panStartY = e.clientY
  panCenterX = centerX.value
  panCenterY = centerY.value
}

function onPanMove(e: PointerEvent) {
  const rect = canvasWrap.value!.getBoundingClientRect()
  const px = e.clientX - rect.left
  const py = e.clientY - rect.top
  mouseX.value = (px - cw / 2) / scale.value + centerX.value
  mouseY.value = -(py - ch / 2) / scale.value + centerY.value
  if (!panning) return
  const dx = e.clientX - panStartX
  const dy = e.clientY - panStartY
  centerX.value = panCenterX - dx / scale.value
  centerY.value = panCenterY + dy / scale.value
  redraw()
}

function onPanEnd() {
  panning = false
}

function resizeCanvas() {
  const wrap = canvasWrap.value
  const c = canvas.value
  if (!wrap || !c) return
  const dpr = window.devicePixelRatio || 1
  cw = wrap.clientWidth
  ch = wrap.clientHeight
  c.width = cw * dpr
  c.height = ch * dpr
  ctx = c.getContext('2d')
  ctx?.scale(dpr, dpr)
}

function mathToPx(mx: number, my: number): [number, number] {
  return [cw / 2 + (mx - centerX.value) * scale.value, ch / 2 - (my - centerY.value) * scale.value]
}

function pxToMath(px: number, py: number): [number, number] {
  return [(px - cw / 2) / scale.value + centerX.value, -(py - ch / 2) / scale.value + centerY.value]
}

function evalFunc(expr: string, x: number, angleMode: AngleMode): number {
  try {
    const result = evaluate(expr.replace(/y\s*=/, '').replace(/π/g, 'pi').trim(), {
      angleMode,
      mode: 'COMP',
      baseN: 'DEC',
      variables: { x, pi: Math.PI, e: Math.E },
      ans: 0,
      complex: false
    })
    return result
  } catch {
    return NaN
  }
}

function drawGrid() {
  if (!ctx) return
  const [xMin] = pxToMath(0, 0)
  const [xMax] = pxToMath(cw, 0)
  const [, yMin] = pxToMath(0, ch)
  const [, yMax] = pxToMath(0, 0)

  // 自适应网格间距
  const range = xMax - xMin
  let step = 1
  if (range > 100) step = 50
  else if (range > 50) step = 20
  else if (range > 20) step = 5
  else if (range > 10) step = 2
  else if (range > 5) step = 1
  else if (range > 1) step = 0.5
  else if (range > 0.2) step = 0.1
  else step = 0.02

  // 次网格
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  ctx.lineWidth = 1
  const subStep = step / 5
  for (let x = Math.ceil(xMin / subStep) * subStep; x <= xMax; x += subStep) {
    const [px] = mathToPx(x, 0)
    ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, ch); ctx.stroke()
  }
  for (let y = Math.ceil(yMin / subStep) * subStep; y <= yMax; y += subStep) {
    const [, py] = mathToPx(0, y)
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(cw, py); ctx.stroke()
  }

  // 主网格
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 1
  for (let x = Math.ceil(xMin / step) * step; x <= xMax; x += step) {
    const [px] = mathToPx(x, 0)
    ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, ch); ctx.stroke()
  }
  for (let y = Math.ceil(yMin / step) * step; y <= yMax; y += step) {
    const [, py] = mathToPx(0, y)
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(cw, py); ctx.stroke()
  }

  // 坐标轴
  const [ox, oy] = mathToPx(0, 0)
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, oy); ctx.lineTo(cw, oy)  // x轴
  ctx.moveTo(ox, 0); ctx.lineTo(ox, ch)  // y轴
  ctx.stroke()

  // 轴标签
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font = '11px JetBrains Mono, monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  for (let x = Math.ceil(xMin / step) * step; x <= xMax; x += step) {
    if (Math.abs(x) < 1e-10) continue
    const [px] = mathToPx(x, 0)
    const label = Math.abs(x) < 0.01 ? x.toExponential(1) : x.toFixed(step < 1 ? 1 : 0)
    ctx.fillText(label, px, oy + 4)
  }
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  for (let y = Math.ceil(yMin / step) * step; y <= yMax; y += step) {
    if (Math.abs(y) < 1e-10) continue
    const [, py] = mathToPx(0, y)
    const label = Math.abs(y) < 0.01 ? y.toExponential(1) : y.toFixed(step < 1 ? 1 : 0)
    ctx.fillText(label, ox - 6, py)
  }
  // 原点
  ctx.textAlign = 'right'; ctx.textBaseline = 'top'
  ctx.fillText('0', ox - 6, oy + 4)
}

function drawFunc(f: FuncDef) {
  if (!ctx || !f.expr.trim()) return
  ctx.strokeStyle = f.color
  ctx.lineWidth = 2
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.shadowColor = f.color
  ctx.shadowBlur = 6

  const step = 1 // 每像素采样
  let prevY: number | null = null
  let prevValid = false

  ctx.beginPath()
  for (let px = 0; px <= cw; px += step) {
    const x = (px - cw / 2) / scale.value + centerX.value
    const y = evalFunc(f.expr, x, props.state.angleMode)
    if (!isFinite(y)) { prevValid = false; prevY = null; continue }
    const py = ch / 2 - (y - centerY.value) * scale.value
    if (prevValid && prevY !== null && Math.abs(py - prevY) > ch) {
      // 跳跃过大，断开
      prevValid = false
    }
    if (!prevValid) {
      ctx.moveTo(px, py)
    } else {
      ctx.lineTo(px, py)
    }
    prevY = py
    prevValid = true
  }
  ctx.stroke()
  ctx.shadowBlur = 0
}

function redraw() {
  if (!ctx) return
  ctx.clearRect(0, 0, cw, ch)
  drawGrid()
  for (const f of funcs) {
    if (f.enabled) drawFunc(f)
  }
}

function scheduleRedraw() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(redraw)
}

let resizeObs: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  resizeCanvas()
  redraw()
  resizeObs = new ResizeObserver(() => {
    resizeCanvas()
    redraw()
  })
  if (canvasWrap.value) resizeObs.observe(canvasWrap.value)
  window.addEventListener('keydown', onEscKey)
})

onUnmounted(() => {
  resizeObs?.disconnect()
  cancelAnimationFrame(rafId)
  window.removeEventListener('keydown', onEscKey)
})

// 暴露 redraw 供外部调用
function onRedraw() { scheduleRedraw() }
defineExpose({ redraw: scheduleRedraw })
</script>

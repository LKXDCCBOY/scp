<template>
  <div :class="isFullscreen
    ? 'fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-2xl p-4 flex flex-col min-h-0'
    : 'glass-panel p-3 sm:p-4 w-full h-full flex flex-col min-h-0'">
    <!-- 左上角菜单按钮（全屏时显示） -->
    <button v-if="isFullscreen && !menuOpen"
            @click="menuOpen = true"
            class="absolute top-3 left-3 z-40 w-9 h-9 rounded-lg bg-black/40 border border-white/15 text-white/80 backdrop-blur-md
                   flex items-center justify-center hover:bg-black/60 hover:scale-105 active:scale-95 transition">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

    <!-- 下拉控制栏（全屏时从上方弹出） -->
    <transition name="slide-down">
      <div v-if="!isFullscreen || menuOpen"
           class="flex-none relative z-40">
        <!-- 控制栏外框（全屏时毛玻璃） -->
        <div :class="isFullscreen ? 'rounded-xl bg-slate-900/85 border border-white/15 backdrop-blur-xl p-3 mb-2' : ''">
          <!-- 工具栏 -->
          <div class="flex-none flex items-center gap-2 mb-2 flex-wrap">
            <span class="text-xs sm:text-sm font-medium" :style="{ color: 'var(--text-dim)' }">{{ t('graph.title') }}</span>
            <div class="flex-1"></div>
            <button @click="resetView"
                    class="text-[11px] px-2 py-1 rounded-lg transition"
                    :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text)' }"
                    style="border-width:1px">{{ t('graph.resetView') }}</button>
            <button @click="zoomBy(1.5)"
                    class="text-[11px] px-2 py-1 rounded-lg transition"
                    :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text)' }"
                    style="border-width:1px">{{ t('graph.zoomIn') }}</button>
            <button @click="zoomBy(1/1.5)"
                    class="text-[11px] px-2 py-1 rounded-lg transition"
                    :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text)' }"
                    style="border-width:1px">{{ t('graph.zoomOut') }}</button>
            <button @click="toggleFullscreen"
                    class="text-[11px] px-2 py-1 rounded-lg transition flex items-center gap-1"
                    :style="{ background: 'var(--primary-bg)', color: 'var(--primary-text)' }">
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
          <div class="flex-none space-y-1.5 overflow-y-auto scrollbar-thin"
               :class="isFullscreen ? 'max-h-[240px]' : 'max-h-[120px]'">
            <div v-for="(f, i) in funcs" :key="i" class="flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full flex-none border border-white/20" :style="{ background: f.color }"></span>
              <span class="text-[11px] flex-none w-10" :style="{ color: 'var(--text-muted)' }">y =</span>
              <input
                v-model="f.expr"
                @keyup.enter="redraw"
                @blur="redraw"
                @focus="router.onFocus"
                @keydown.capture="router.onKeydownCapture"
                :readonly="router.readonly"
                class="flex-1 rounded-lg px-2 py-1 text-xs sm:text-sm
                       font-mono focus:outline-none w-0 min-w-0"
                :style="{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--input-text)' }"
                style="border-width:1px"
                :placeholder="t('graph.placeholder')"
              />
              <button @click="removeFunc(i)" class="text-[11px] text-rose-400/70 hover:text-rose-400 px-1 flex-none">x</button>
            </div>
            <button @click="addFunc" class="text-[11px] px-2 py-1" :style="{ color: 'var(--primary-text)' }">{{ t('graph.addFunc') }}</button>
          </div>

          <!-- 模式切换栏 -->
          <div class="flex-none flex items-center gap-1.5 mt-2 flex-wrap">
            <button @click="toolMode = 'function'; scheduleRedraw()"
                    class="text-[10px] px-2.5 py-1 rounded-lg border transition"
                    :style="toolMode === 'function'
                      ? { background: 'var(--primary-bg)', borderColor: 'var(--primary-text)', color: 'var(--primary-text)' }
                      : { background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text-muted)' }"
                    style="border-width:1px">Function</button>
            <button @click="toolMode = 'draw'; scheduleRedraw()"
                    class="text-[10px] px-2.5 py-1 rounded-lg border transition"
                    :style="toolMode === 'draw'
                      ? { background: 'var(--primary-bg)', borderColor: 'var(--primary-text)', color: 'var(--primary-text)' }
                      : { background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text-muted)' }"
                    style="border-width:1px">Draw</button>
            <button @click="toolMode = 'construct'; constructStep = 0; tempP1 = null; selectedRefIdx = -1; scheduleRedraw()"
                    class="text-[10px] px-2.5 py-1 rounded-lg border transition"
                    :style="toolMode === 'construct'
                      ? { background: 'var(--primary-bg)', borderColor: 'var(--primary-text)', color: 'var(--primary-text)' }
                      : { background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text-muted)' }"
                    style="border-width:1px">Construct</button>

            <!-- 涂鸦控件 -->
            <template v-if="toolMode === 'draw'">
              <div class="flex items-center gap-1 ml-2">
                <button v-for="c in drawColors" :key="c" @click="drawColor = c"
                        class="w-5 h-5 rounded-full border transition"
                        :style="{ background: c, borderColor: drawColor === c ? '#fff' : 'rgba(255,255,255,0.2)', transform: drawColor === c ? 'scale(1.2)' : 'none' }">
                </button>
              </div>
              <input type="range" min="1" max="8" step="0.5" v-model.number="drawWidth"
                     class="w-20 h-4 accent-blue-400" />
              <span class="text-[10px]" :style="{ color: 'var(--text-muted)' }">{{ drawWidth }}px</span>
              <button @click="sketches = []; scheduleRedraw()"
                      class="text-[10px] px-2 py-1 rounded-lg border transition"
                      :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text-muted)' }"
                      style="border-width:1px">Clear</button>
            </template>

            <!-- 构造工具栏 -->
            <template v-if="toolMode === 'construct'">
              <div class="flex items-center gap-1 ml-2 flex-wrap">
                <button v-for="t in constructTools" :key="t.id"
                        @click="constructTool = t.id; constructStep = 0; tempP1 = null; selectedRefIdx = -1"
                        class="text-[10px] px-2 py-1 rounded-lg border transition"
                        :style="constructTool === t.id
                          ? { background: 'var(--primary-bg)', borderColor: 'var(--primary-text)', color: 'var(--primary-text)' }
                          : { background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text-muted)' }"
                        style="border-width:1px">{{ t.label }}</button>
              </div>
              <span class="text-[10px]" :style="{ color: 'var(--text-muted)' }">{{ constructHint }}</span>
              <button @click="geoObjects = []; geoLabelIdx = 1; scheduleRedraw()"
                      class="text-[10px] px-2 py-1 rounded-lg border transition"
                      :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text-muted)' }"
                      style="border-width:1px">Clear</button>
            </template>
          </div>
        </div>
      </div>
    </transition>

    <!-- Canvas 绘图区 -->
    <div class="flex-1 min-h-0 relative rounded-xl overflow-hidden border"
         :style="{ borderColor: 'var(--tab-divider)', background: 'var(--expr-bg)' }"
         ref="canvasWrap"
         @wheel.prevent="onWheel"
         @pointerdown="onPanStart"
         @pointermove="onPanMove"
         @pointerup="onPanEnd"
         @pointerleave="onPanEnd">
      <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>
      <!-- 坐标显示 -->
      <div class="absolute bottom-2 left-2 text-[11px] font-mono bg-black/40 rounded-lg px-2 py-1 pointer-events-none text-white/70">
        {{ t('graph.coordLabel', { x: mouseX.toFixed(3), y: mouseY.toFixed(3) }) }}
      </div>
      <div class="absolute top-2 left-2 text-[11px] font-mono bg-black/40 rounded-lg px-2 py-1 pointer-events-none text-white/70">
        {{ t('graph.viewLabel', { scale: scale.toFixed(1), cx: centerX.toFixed(2), cy: centerY.toFixed(2) }) }}
      </div>
      <!-- 全屏退出提示 -->
      <div v-if="isFullscreen" class="absolute top-2 right-2 text-[11px] font-mono bg-black/40 rounded-lg px-2 py-1 pointer-events-none text-white/60">
        Esc {{ t('graph.exitFullscreen') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
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
const menuOpen = ref(false)

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

// ---- 模式系统 ----
type ToolMode = 'function' | 'draw' | 'construct'
const toolMode = ref<ToolMode>('function')

// ---- 涂鸦 ----
interface SketchStroke {
  points: [number, number][] // 数学坐标
  color: string
  width: number
}
const sketches = ref<SketchStroke[]>([])
const drawColor = ref('#4f8cff')
const drawWidth = ref(2.5)
let currentStroke: SketchStroke | null = null

// ---- 几何构造 ----
type ConstructTool = 'point' | 'line' | 'segment' | 'parallel' | 'perp' | 'intersection'
const constructTool = ref<ConstructTool>('point')
interface GeoPoint { type: 'point'; x: number; y: number; label: string }
interface GeoLine { type: 'line'; x1: number; y1: number; x2: number; y2: number; label: string }
interface GeoSegment { type: 'segment'; x1: number; y1: number; x2: number; y2: number; label: string }
interface GeoParallel { type: 'parallel'; refIdx: number; px: number; py: number; label: string }
interface GeoPerp { type: 'perp'; refIdx: number; px: number; py: number; label: string }
interface GeoIntersection { type: 'intersection'; funcA: number; funcB: number; x: number; y: number; label: string }
type GeoObj = GeoPoint | GeoLine | GeoSegment | GeoParallel | GeoPerp | GeoIntersection
const geoObjects = ref<GeoObj[]>([])
let geoLabelIdx = 1
// 构造步骤状态
let constructing = false
let constructStep = 0 // 0=第一步, 1=第二步
let tempP1: [number, number] | null = null
// 构造中选中的参考对象（用于平行/垂线）
let selectedRefIdx = -1

// 涂鸦颜色选项
const drawColors = ['#4f8cff', '#f43f5e', '#10b981', '#f59e0b', '#a855f7', '#06b6d4', '#ec4899', '#ffffff']

// 构造工具列表
const constructTools: { id: ConstructTool; label: string }[] = [
  { id: 'point', label: 'Point' },
  { id: 'line', label: 'Line' },
  { id: 'segment', label: 'Segment' },
  { id: 'parallel', label: 'Parallel' },
  { id: 'perp', label: 'Perpendicular' },
  { id: 'intersection', label: 'Intersect' }
]

const constructHint = computed(() => {
  if (constructTool.value === 'point') return 'Click to place a point'
  if (constructTool.value === 'line' || constructTool.value === 'segment') {
    return constructStep === 0 ? 'Click first point' : 'Click second point'
  }
  if (constructTool.value === 'parallel') {
    return constructStep === 0 ? 'Click near a line/segment' : 'Click point to pass through'
  }
  if (constructTool.value === 'perp') {
    return constructStep === 0 ? 'Click near a line/segment' : 'Click point to pass through'
  }
  if (constructTool.value === 'intersection') {
    return constructStep === 0 ? 'Click near first function' : 'Click near second function'
  }
  return ''
})

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
  menuOpen.value = false
  nextTick(() => {
    resizeCanvas()
    redraw()
  })
}

function onEscKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (menuOpen.value) { menuOpen.value = false; return }
    if (isFullscreen.value) {
      isFullscreen.value = false
      nextTick(() => {
        resizeCanvas()
        redraw()
      })
    }
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
  const rect = canvasWrap.value!.getBoundingClientRect()
  const px = e.clientX - rect.left
  const py = e.clientY - rect.top
  const [mx, my] = pxToMath(px, py)

  if (toolMode.value === 'draw') {
    // 涂鸦模式：开始新笔画
    currentStroke = { points: [[mx, my]], color: drawColor.value, width: drawWidth.value }
    return
  }

  if (toolMode.value === 'construct') {
    handleConstructClick(mx, my)
    return
  }

  // 函数模式：平移
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

  if (toolMode.value === 'draw' && currentStroke) {
    const [mx, my] = pxToMath(px, py)
    currentStroke.points.push([mx, my])
    scheduleRedraw()
    return
  }

  if (!panning) return
  const dx = e.clientX - panStartX
  const dy = e.clientY - panStartY
  centerX.value = panCenterX - dx / scale.value
  centerY.value = panCenterY + dy / scale.value
  redraw()
}

function onPanEnd() {
  if (toolMode.value === 'draw' && currentStroke) {
    if (currentStroke.points.length > 1) {
      sketches.value.push(currentStroke)
    }
    currentStroke = null
    scheduleRedraw()
    return
  }
  panning = false
}

// ---- 构造逻辑 ----
function handleConstructClick(mx: number, my: number) {
  const tool = constructTool.value
  if (tool === 'point') {
    geoObjects.value.push({ type: 'point', x: mx, y: my, label: `P${geoLabelIdx++}` })
    scheduleRedraw()
    return
  }
  if (tool === 'line' || tool === 'segment') {
    if (constructStep === 0) {
      tempP1 = [mx, my]
      constructStep = 1
    } else if (tempP1) {
      geoObjects.value.push({
        type: tool, x1: tempP1[0], y1: tempP1[1], x2: mx, y2: my,
        label: `L${geoLabelIdx++}`
      })
      tempP1 = null
      constructStep = 0
    }
    scheduleRedraw()
    return
  }
  if (tool === 'parallel' || tool === 'perp') {
    // 第一步：选择参考直线/线段
    // 第二步：选择经过的点
    if (constructStep === 0) {
      // 找最近的线/线段
      const idx = findNearestLine(mx, my)
      if (idx >= 0) {
        selectedRefIdx = idx
        constructStep = 1
      }
    } else if (selectedRefIdx >= 0) {
      geoObjects.value.push({
        type: tool, refIdx: selectedRefIdx, px: mx, py: my,
        label: `${tool === 'parallel' ? 'Par' : 'Perp'}${geoLabelIdx++}`
      })
      selectedRefIdx = -1
      constructStep = 0
    }
    scheduleRedraw()
    return
  }
  if (tool === 'intersection') {
    // 选择两个函数，计算交点
    if (constructStep === 0) {
      const idx = findNearestFunc(mx, my)
      if (idx >= 0) { selectedRefIdx = idx; constructStep = 1 }
    } else if (selectedRefIdx >= 0) {
      const idx2 = findNearestFunc(mx, my)
      if (idx2 >= 0 && idx2 !== selectedRefIdx) {
        const pt = computeFuncIntersection(selectedRefIdx, idx2)
        if (pt) {
          geoObjects.value.push({
            type: 'intersection', funcA: selectedRefIdx, funcB: idx2,
            x: pt[0], y: pt[1], label: `I${geoLabelIdx++}`
          })
        }
      }
      selectedRefIdx = -1
      constructStep = 0
    }
    scheduleRedraw()
    return
  }
}

function findNearestLine(mx: number, my: number): number {
  let bestIdx = -1
  let bestDist = 0.5 // 0.5 单位以内
  geoObjects.value.forEach((obj, i) => {
    if (obj.type !== 'line' && obj.type !== 'segment') return
    const d = distPointToSegment(mx, my, obj.x1, obj.y1, obj.x2, obj.y2)
    if (d < bestDist) { bestDist = d; bestIdx = i }
  })
  return bestIdx
}

function findNearestFunc(mx: number, my: number): number {
  let bestIdx = -1
  let bestDist = 0.5
  funcs.forEach((f, i) => {
    if (!f.expr.trim()) return
    const fy = evalFunc(f.expr, mx, props.state.angleMode)
    if (isFinite(fy) && Math.abs(fy - my) < bestDist) {
      bestDist = Math.abs(fy - my)
      bestIdx = i
    }
  })
  return bestIdx
}

function distPointToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1, dy = y2 - y1
  const len2 = dx * dx + dy * dy
  if (len2 < 1e-12) return Math.hypot(px - x1, py - y1)
  let t = ((px - x1) * dx + (py - y1) * dy) / len2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
}

function computeFuncIntersection(idxA: number, idxB: number): [number, number] | null {
  const fA = funcs[idxA], fB = funcs[idxB]
  if (!fA?.expr?.trim() || !fB?.expr?.trim()) return null
  // 数值扫描：在可视范围内采样，找到符号变化的区间，然后二分
  const [xMin] = pxToMath(0, 0)
  const [xMax] = pxToMath(cw, 0)
  const samples = 500
  const dx = (xMax - xMin) / samples
  let prevDiff = evalFunc(fA.expr, xMin, props.state.angleMode) - evalFunc(fB.expr, xMin, props.state.angleMode)
  for (let i = 1; i <= samples; i++) {
    const x = xMin + i * dx
    const diff = evalFunc(fA.expr, x, props.state.angleMode) - evalFunc(fB.expr, x, props.state.angleMode)
    if (isFinite(prevDiff) && isFinite(diff) && prevDiff * diff < 0) {
      // 二分法精确化
      let lo = x - dx, hi = x
      for (let j = 0; j < 50; j++) {
        const mid = (lo + hi) / 2
        const dm = evalFunc(fA.expr, mid, props.state.angleMode) - evalFunc(fB.expr, mid, props.state.angleMode)
        if (!isFinite(dm)) break
        if (dm * prevDiff < 0) hi = mid
        else { lo = mid; prevDiff = dm }
      }
      const xi = (lo + hi) / 2
      const yi = evalFunc(fA.expr, xi, props.state.angleMode)
      if (isFinite(xi) && isFinite(yi)) return [xi, yi]
    }
    prevDiff = diff
  }
  return null
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

function drawSketches() {
  if (!ctx) return
  const all = currentStroke ? [...sketches.value, currentStroke] : sketches.value
  for (const s of all) {
    if (s.points.length < 2) continue
    ctx.strokeStyle = s.color
    ctx.lineWidth = s.width
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.beginPath()
    const [sx, sy] = mathToPx(s.points[0][0], s.points[0][1])
    ctx.moveTo(sx, sy)
    for (let i = 1; i < s.points.length; i++) {
      const [px, py] = mathToPx(s.points[i][0], s.points[i][1])
      ctx.lineTo(px, py)
    }
    ctx.stroke()
  }
}

function drawGeoObjects() {
  if (!ctx) return
  ctx.font = '12px JetBrains Mono, monospace'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'

  for (const obj of geoObjects.value) {
    if (obj.type === 'point') {
      const [px, py] = mathToPx(obj.x, obj.y)
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1; ctx.stroke()
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.fillText(obj.label, px + 7, py - 7)
    } else if (obj.type === 'line') {
      // 延长到屏幕边界
      const dx = obj.x2 - obj.x1, dy = obj.y2 - obj.y1
      const len = Math.hypot(dx, dy)
      if (len < 1e-12) continue
      const ux = dx / len, uy = dy / len
      const far = Math.max(cw, ch) / scale.value * 2
      const [px1, py1] = mathToPx(obj.x1 - ux * far, obj.y1 - uy * far)
      const [px2, py2] = mathToPx(obj.x1 + ux * far, obj.y1 + uy * far)
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke()
      const [lx, ly] = mathToPx((obj.x1 + obj.x2) / 2, (obj.y1 + obj.y2) / 2)
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillText(obj.label, lx + 5, ly)
    } else if (obj.type === 'segment') {
      const [px1, py1] = mathToPx(obj.x1, obj.y1)
      const [px2, py2] = mathToPx(obj.x2, obj.y2)
      ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke()
      // 端点
      ctx.fillStyle = 'rgba(52,211,153,0.8)'
      ctx.beginPath(); ctx.arc(px1, py1, 3, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(px2, py2, 3, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.fillText(obj.label, (px1 + px2) / 2 + 5, (py1 + py2) / 2)
    } else if (obj.type === 'parallel') {
      const ref = geoObjects.value[obj.refIdx]
      if (!ref || (ref.type !== 'line' && ref.type !== 'segment')) continue
      const dx = ref.x2 - ref.x1, dy = ref.y2 - ref.y1
      const len = Math.hypot(dx, dy)
      if (len < 1e-12) continue
      const ux = dx / len, uy = dy / len
      const far = Math.max(cw, ch) / scale.value * 2
      const [px1, py1] = mathToPx(obj.px - ux * far, obj.py - uy * far)
      const [px2, py2] = mathToPx(obj.px + ux * far, obj.py + uy * far)
      ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4])
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke()
      ctx.setLineDash([])
      const [lx, ly] = mathToPx(obj.px, obj.py)
      ctx.fillStyle = '#a855f7'; ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillText(obj.label, lx + 5, ly)
    } else if (obj.type === 'perp') {
      const ref = geoObjects.value[obj.refIdx]
      if (!ref || (ref.type !== 'line' && ref.type !== 'segment')) continue
      const dx = ref.x2 - ref.x1, dy = ref.y2 - ref.y1
      const len = Math.hypot(dx, dy)
      if (len < 1e-12) continue
      // 垂直方向: rotate 90度
      const ux = -dy / len, uy = dx / len
      const far = Math.max(cw, ch) / scale.value * 2
      const [px1, py1] = mathToPx(obj.px - ux * far, obj.py - uy * far)
      const [px2, py2] = mathToPx(obj.px + ux * far, obj.py + uy * far)
      ctx.strokeStyle = '#f97316'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4])
      ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke()
      ctx.setLineDash([])
      const [lx, ly] = mathToPx(obj.px, obj.py)
      ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fillText(obj.label, lx + 5, ly)
    } else if (obj.type === 'intersection') {
      const [px, py] = mathToPx(obj.x, obj.y)
      ctx.fillStyle = '#f43f5e'
      ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.fillText(obj.label, px + 8, py - 8)
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.fillText(`(${obj.x.toFixed(3)}, ${obj.y.toFixed(3)})`, px + 8, py + 6)
    }
  }

  // 绘制构造中的临时点
  if (tempP1 && constructTool.value !== 'point' && constructTool.value !== 'intersection') {
    const [px, py] = mathToPx(tempP1[0], tempP1[1])
    ctx.fillStyle = 'rgba(251,191,36,0.6)'
    ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1; ctx.stroke()
  }
}

function redraw() {
  if (!ctx) return
  ctx.clearRect(0, 0, cw, ch)
  drawGrid()
  for (const f of funcs) {
    if (f.enabled) drawFunc(f)
  }
  drawSketches()
  drawGeoObjects()
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

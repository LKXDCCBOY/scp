<template>
  <div class="glass-panel p-3 sm:p-4 w-full max-w-[480px] mx-auto h-full overflow-y-auto scrollbar-thin animate-fade-in">
    <template v-if="settings">
      <h2 class="text-sm sm:text-base font-semibold mb-4 flex items-center gap-2">
        <span>计算器设置</span>
      </h2>

      <section class="mb-5">
        <h3 class="text-xs sm:text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
          <span>计算模式 (MODE)</span>
        </h3>
        <div class="grid grid-cols-3 gap-2">
          <button v-for="m in MODES" :key="m" @click="$emit('cycle-mode')"
                  class="mode-chip text-xs py-2 flex flex-col items-center gap-1 cursor-pointer"
                  :class="{ active: state.mode === m }">
            <span class="font-semibold">{{ m }}</span>
            <span class="text-[9px] opacity-70">{{ modeLabel(m) }}</span>
          </button>
        </div>
      </section>

      <section class="mb-5">
        <h3 class="text-xs sm:text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
          <span>角度单位</span>
        </h3>
        <div class="grid grid-cols-3 gap-2">
          <button v-for="a in ANGLES" :key="a" @click="$emit('cycle-angle')"
                  class="mode-chip text-xs py-2 flex flex-col items-center gap-1 cursor-pointer"
                  :class="{ active: state.angleMode === a }">
            <span class="font-semibold">{{ a }}</span>
            <span class="text-[9px] opacity-70">{{ angleLabel(a) }}</span>
          </button>
        </div>
      </section>

      <section class="mb-5">
        <h3 class="text-xs sm:text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
          <span>显示格式</span>
        </h3>
        <div class="grid grid-cols-3 gap-2">
          <button v-for="n in NOTATIONS" :key="n" @click="$emit('cycle-note')"
                  class="mode-chip text-xs py-2 flex flex-col items-center gap-1 cursor-pointer"
                  :class="{ active: state.notation === n }">
            <span class="font-semibold">{{ n }}</span>
            <span class="text-[9px] opacity-70">{{ notationLabel(n) }}</span>
          </button>
        </div>
      </section>

      <section class="mb-5">
        <h3 class="text-xs sm:text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
          <span>变量存储 (A–F, X, Y, M)</span>
        </h3>
        <div class="grid grid-cols-4 gap-1.5">
          <div v-for="v in VARS" :key="v"
               class="rounded-xl border border-white/8 bg-white/[0.03] p-2 flex flex-col items-center">
            <span class="text-[10px] text-white/40">{{ v }}</span>
            <span class="display-text text-xs sm:text-sm text-white mt-0.5 truncate max-w-full">
              {{ fmt(state.variables[v] ?? (v === 'M' ? state.memory : 0)) }}
            </span>
          </div>
        </div>
      </section>

      <section>
        <h3 class="text-xs sm:text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
          <span>操作说明</span>
        </h3>
        <ul class="text-[11px] sm:text-xs text-white/55 space-y-1.5 leading-relaxed">
          <li>· 橙色小字：按 <span class="text-amber-300">SHIFT</span> 后再按</li>
          <li>· 红色小字：按 <span class="text-rose-300">ALPHA</span> 后输入变量，或配合 <b>STO/RCL</b> 存取值</li>
          <li>· 支持键盘：数字、运算符、<kbd>=</kbd>/<kbd>Enter</kbd> 计算，<kbd>Del</kbd> 删除</li>
          <li>· 连续按 <kbd>=</kbd> 可重复上次运算（如 2+3=5 → 再=8, 再=11 …）</li>
          <li>· 表达式支持隐式乘法：<code>2sin(30)</code>、<code>2(3+4)</code></li>
        </ul>
      </section>
    </template>

    <template v-else>
      <h2 class="text-sm sm:text-base font-semibold mb-4 flex items-center gap-2">
        <span>单位换算</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
        <div v-for="g in groups" :key="g.name" class="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <h3 class="text-xs font-medium text-white/70 mb-2">{{ g.name }}</h3>
          <div class="space-y-2">
            <div v-for="p in g.pairs" :key="p.from" class="flex items-center gap-2">
              <input
                v-model.number="p.a" type="number" step="any"
                @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                class="flex-1 bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-xs sm:text-sm
                       display-text focus:outline-none focus:border-calc-primary/60 text-white w-0"
                @input="convert(p, 'a')"
              />
              <span class="text-white/40 text-xs flex-none">→</span>
              <input
                v-model.number="p.b" type="number" step="any"
                @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                class="flex-1 bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-xs sm:text-sm
                       display-text focus:outline-none focus:border-calc-primary/60 text-white w-0"
                @input="convert(p, 'b')"
              />
            </div>
            <div class="text-[10px] text-white/35 flex justify-between px-0.5">
              <span>{{ p.from }}</span>
              <span>{{ p.to }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { EngineState, AngleMode, CalcMode } from '@/engine/calculator'
import { ANGLE_MODES, CALC_MODES, formatNumber } from '@/engine/calculator'
import { useInputRouter } from '@/composables/useInputRouter'
const { bindInputRouter } = useInputRouter()
const router = bindInputRouter()

const props = defineProps<{
  settings?: boolean
  state: EngineState
}>()
defineEmits<{
  'cycle-angle': []
  'cycle-mode': []
  'cycle-note': []
}>()

const MODES = CALC_MODES as readonly CalcMode[]
const ANGLES = ANGLE_MODES as readonly AngleMode[]
const NOTATIONS = ['NORMAL', 'SCI', 'ENG'] as const
const VARS = ['A', 'B', 'C', 'D', 'E', 'F', 'X', 'Y', 'M']

function modeLabel(m: string) {
  return { COMP: '普通计算', CMPLX: '复数', STAT: '统计', 'BASE-N': '进制', EQN: '方程', MAT: '矩阵' }[m] ?? m
}
function angleLabel(a: string) {
  return { Deg: '角度(°)', Rad: '弧度', Grad: '百分度' }[a] ?? a
}
function notationLabel(n: string) {
  return { NORMAL: '自动', SCI: '科学计数', ENG: '工程计数' }[n] ?? n
}
function fmt(v: number) {
  try { return formatNumber(v, { precision: 8 }) } catch { return String(v) }
}

// 换算
interface Pair { from: string; to: string; factor: number; a?: number; b?: number }
const LEN: Pair[] = [
  { from: 'km', to: 'mi', factor: 0.621371 },
  { from: 'm',  to: 'ft', factor: 3.28084 },
  { from: 'cm', to: 'in', factor: 0.393701 }
]
const WGHT: Pair[] = [
  { from: 'kg',  to: 'lb',  factor: 2.20462 },
  { from: 'g',   to: 'oz',  factor: 0.035274 },
  { from: '°C',  to: '°F',  factor: NaN }
]
const DATA: Pair[] = [
  { from: 'GB', to: 'MB', factor: 1024 },
  { from: 'MB', to: 'KB', factor: 1024 },
  { from: 'KB', to: 'B',  factor: 1024 }
]
const VOLT: Pair[] = [
  { from: 'L',   to: 'gal', factor: 0.264172 },
  { from: 'kWh', to: 'J',   factor: 3.6e6 },
  { from: 'bar', to: 'Pa',  factor: 1e5 }
]

const groups = reactive([
  { name: '长度', pairs: LEN },
  { name: '重量 / 温度', pairs: WGHT },
  { name: '数据量', pairs: DATA },
  { name: '容量 / 能量 / 压力', pairs: VOLT }
] as { name: string; pairs: Pair[] }[])

function convert(p: Pair, side: 'a' | 'b') {
  // °C ↔ °F
  if (p.from === '°C') {
    if (side === 'a') p.b = (p.a ?? 0) * 9 / 5 + 32
    else p.a = ((p.b ?? 0) - 32) * 5 / 9
    return
  }
  if (side === 'a') p.b = (p.a ?? 0) * p.factor
  else p.a = (p.b ?? 0) / p.factor
}
</script>

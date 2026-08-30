<template>
  <div class="glass-panel p-1.5 sm:p-2.5 w-full h-full flex flex-col relative calc-kb-root"
       data-kb-root>
    <div class="grid gap-1 sm:gap-1.5 grid-cols-6 flex-1 calc-kb-grid"
         style="grid-template-rows: repeat(10, minmax(0, 1fr));">
      <CalcKey
        v-for="(k, idx) in layout" :key="k.id + idx"
        :item="k"
        :state="state"
        @press="handlePress(k, $event)"
      />
    </div>

    <!-- 未知数弹出小键盘 -->
    <Teleport to="body">
      <transition name="fade-scale">
        <div v-if="varPanelOpen" class="fixed inset-0 z-[99998]" @click.self="varPanelOpen = false">
          <div
            class="absolute p-3 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl w-[340px] sm:w-[460px] z-[99999] flex flex-col gap-3"
            :style="varPanelStyle"
            @click.stop>
            <!-- 头部 -->
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center font-bold"
                     :style="{ background: 'linear-gradient(135deg, #a855f7 0%, #4f8cff 100%)', color: '#fff' }">α</div>
                <div>
                  <div class="text-sm font-bold" :style="{ color: 'var(--text)' }">{{ t('var.title') }}</div>
                  <div class="text-[10px]" :style="{ color: 'var(--text-dim)' }">{{ t('var.subtitle') }}</div>
                </div>
              </div>
              <button @click="varPanelOpen = false"
                      class="w-7 h-7 rounded-lg flex items-center justify-center transition hover:scale-110"
                      :style="{ background: 'var(--chip-bg)', color: 'var(--text-muted)' }">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <!-- 小写字母 4×7 网格（28 键，覆盖所有常用未知数） -->
            <div>
              <div class="text-[10px] mb-1" :style="{ color: 'var(--text-dim)' }">{{ t('var.lowercase') }}</div>
              <div class="grid grid-cols-7 gap-1">
                <button v-for="ch in LOWER_VARS" :key="'L-'+ch"
                        @click="pressVar(ch)"
                        class="h-9 rounded-lg font-mono font-medium text-sm transition hover:scale-105 active:scale-95 shadow-sm"
                        :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text)' }"
                        style="border-width:1px">{{ ch }}</button>
              </div>
            </div>
            <!-- 大写字母 4×6 网格（24 键，覆盖 STO/A-F 及常用大写） -->
            <div>
              <div class="text-[10px] mb-1" :style="{ color: 'var(--text-dim)' }">{{ t('var.uppercase') }}</div>
              <div class="grid grid-cols-7 gap-1">
                <button v-for="ch in UPPER_VARS" :key="'U-'+ch"
                        @click="pressVar(ch)"
                        class="h-9 rounded-lg font-mono font-semibold text-sm transition hover:scale-105 active:scale-95 shadow-sm"
                        :style="{ background: 'var(--input-bg)', borderColor: 'var(--chip-border)', color: 'var(--primary-text)' }"
                        style="border-width:1px">{{ ch }}</button>
              </div>
            </div>
            <!-- 希腊字母（常用数学希腊字母 14 个） -->
            <div>
              <div class="text-[10px] mb-1" :style="{ color: 'var(--text-dim)' }">{{ t('var.greek') }}</div>
              <div class="grid grid-cols-7 gap-1">
                <button v-for="g in GREEK_VARS" :key="'G-'+g.sym"
                        @click="pressVar(g.sym)"
                        class="h-9 rounded-lg font-medium transition hover:scale-105 active:scale-95 shadow-sm flex flex-col items-center justify-center leading-tight"
                        :style="{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(79,140,255,0.15))', borderColor: 'var(--chip-border)', color: 'var(--text)' }"
                        style="border-width:1px" :title="g.name">
                  <span class="text-base">{{ g.sym }}</span>
                  <span class="text-[8px] opacity-60">{{ g.name }}</span>
                </button>
              </div>
            </div>
            <!-- 底部快速提示 -->
            <div class="text-[10px] mt-1 px-2 py-1.5 rounded-lg"
                 :style="{ background: 'var(--chip-bg)', color: 'var(--text-dim)' }">
              💡 {{ t('var.tip') }}
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import CalcKey from './CalcKey.vue'
import type { KeyDef } from '@/types/keys'
import type { EngineState } from '@/engine/calculator'
import { NUM, OP, FUNC, NAV, EDIT, MEMORY, SPECIAL } from '@/constants/keypad'
import { t } from '@/i18n'

const props = defineProps<{ state: EngineState }>()
const emit = defineEmits<{ press: [id: string] }>()

const varPanelOpen = ref(false)
const varPanelStyle = ref<Record<string, string>>({})

// 未知数小键盘内容
const LOWER_VARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'π', '?']
const UPPER_VARS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'θ', 'λ']
const GREEK_VARS: { sym: string; name: string }[] = [
  { sym: 'α', name: 'alpha' }, { sym: 'β', name: 'beta' },
  { sym: 'γ', name: 'gamma' }, { sym: 'δ', name: 'delta' },
  { sym: 'ε', name: 'epsilon' }, { sym: 'μ', name: 'mu' },
  { sym: 'σ', name: 'sigma' }, { sym: 'ω', name: 'omega' },
  { sym: 'φ', name: 'phi' }, { sym: 'ψ', name: 'psi' },
  { sym: 'η', name: 'eta' }, { sym: 'ρ', name: 'rho' },
  { sym: 'τ', name: 'tau' }, { sym: '∞', name: 'inf' }
]

async function positionVarPanel() {
  await nextTick()
  const root = document.querySelector('[data-kb-root]') as HTMLElement | null
  if (!root) return
  const kb = root.getBoundingClientRect()
  // 面板放在键盘上方居中（避免超出视口）
  const pw = window.innerWidth >= 640 ? 460 : 340
  const ph = 520
  let left = kb.left + kb.width / 2 - pw / 2
  let top = kb.top - ph - 12
  // 如果顶上方空间不够，放在键盘下方
  if (top < 8) {
    top = kb.bottom + 12
  }
  // 水平方向不越界
  left = Math.max(8, Math.min(window.innerWidth - pw - 8, left))
  if (top + ph > window.innerHeight - 8) {
    top = Math.max(8, window.innerHeight - ph - 8)
  }
  varPanelStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    width: `${pw}px`,
    background: 'var(--panel-bg)',
    borderColor: 'var(--chip-border)'
  }
}

function pressVar(ch: string) {
  emit('press', ch)
  // 点击后不移除面板，方便连续输入多个未知数（用户点 X 或外部才关）
}

function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape' && varPanelOpen.value) varPanelOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onEsc)
  window.addEventListener('resize', () => { if (varPanelOpen.value) positionVarPanel() }, true)
  window.addEventListener('scroll', () => { if (varPanelOpen.value) positionVarPanel() }, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEsc)
})

// 拦截 VAR 特殊 id
function handlePress(k: KeyDef, _emitted: string) {
  if (k.id === 'VAR:TOGGLE') {
    varPanelOpen.value = !varPanelOpen.value
    if (varPanelOpen.value) positionVarPanel()
    return
  }
  emit('press', k.id)
}

const layout = computed<KeyDef[]>(() => [
  // row 1
  SPECIAL('SHIFT', { label: 'SHIFT', cls: 'key-special', size: -1 }),
  SPECIAL('ALPHA', { label: 'ALPHA', cls: 'key-func', subLabel: 'A-F', size: -1 }),
  FUNC('MODE', { subLabel: 'SETUP', size: -1 }),
  EDIT('AC', { label: 'ON', cls: 'key-clear', shift: 'Off', size: -1 }),
  NAV('◀', { size: 1, label: '◀', cls: 'key-func' }),
  NAV('▶', { size: 1, label: '▶', cls: 'key-func' }),
  // row 2
  SPECIAL('x²',   { shift: 'cbrt', subLabel: 'cbrt', label: 'x²', alphaLabel: 'D' }),
  SPECIAL('^',    { shift: 'sqrt', subLabel: 'sqrt', label: 'x^y' }),
  SPECIAL('log',  { shift: '10^', subLabel: '10^', alphaLabel: 'X' }),
  SPECIAL('ln',   { shift: 'e^',  subLabel: 'e^', alphaLabel: 'Y' }),
  SPECIAL('(-)',  { shift: 'abs', subLabel: 'abs', label: '(−)', cls: 'key-func' }),
  SPECIAL('HYP',  { shift: 'asinh', subLabel: 'asinh', label: 'Hyp' }),
  // row 3
  SPECIAL('sin',  { shift: 'asin', subLabel: 'asin', alphaLabel: 'D' }),
  SPECIAL('cos',  { shift: 'acos', subLabel: 'acos', alphaLabel: 'E' }),
  SPECIAL('tan',  { shift: 'atan', subLabel: 'atan', alphaLabel: 'F' }),
  MEMORY('STO', { label: 'STO', cls: 'key-func' }),
  MEMORY('RCL', { label: 'RCL', cls: 'key-func' }),
  SPECIAL('ENG', { shift: 'NORM', subLabel: 'NORM', label: 'ENG' }),
  // row 4
  SPECIAL('x³',   { shift: 'inv', subLabel: '1/x', label: 'x³' }),
  SPECIAL('pi',    { shift: 'e',   subLabel: 'e',    label: 'pi' }),
  SPECIAL('DRG', { label: 'DRG', cls: 'key-special', subLabel: 'D/R/G' }),
  NUM('7', { size: 1 }),
  NUM('8', { size: 1 }),
  NUM('9', { size: 1 }),
  // row 5
  SPECIAL('sinh', { label: 'sinh', shift: 'asinh', subLabel: 'asinh' }),
  FUNC('(', { shift: 'abs', subLabel: 'abs', size: 1 }),
  FUNC(')', { shift: 'floor', subLabel: 'floor', size: 1 }),
  NUM('4', { size: 1 }),
  NUM('5', { size: 1 }),
  NUM('6', { size: 1 }),
  // row 6
  SPECIAL('cosh', { label: 'cosh', shift: 'acosh', subLabel: 'acosh' }),
  MEMORY('M+', { label: 'M+', cls: 'key-func' }),
  MEMORY('M-', { label: 'M-', cls: 'key-func' }),
  NUM('1', { size: 1 }),
  NUM('2', { size: 1 }),
  NUM('3', { size: 1 }),
  // row 7 — VAR 按钮 + 数字 + 运算符（正好 6 列）
  SPECIAL('tanh', { label: 'tanh', shift: 'atanh', subLabel: 'atanh', size: 0 }),
  SPECIAL('VAR:TOGGLE', { label: 'VAR', subLabel: '未知数', cls: 'key-special', size: 0 }),
  NUM('0', { size: 1, span: 2 }),
  OP('×', { size: 1, label: '×' }),
  OP('÷', { size: 1, label: '÷' }),
  // row 8
  EDIT('DEL', { cls: 'key-func', shift: 'INS', subLabel: 'INS' }),
  FUNC('Ans', { shift: 'pi', subLabel: 'pi', cls: 'key-special' }),
  OP('EXP', { label: 'x10^', cls: 'key-op' }),
  NUM('.', { size: 1, shift: 'rand', subLabel: 'rand' }),
  OP('-', { size: 1, label: '−' }),
  OP('+', { size: 1, label: '+' }),
  // row 9 — 符号与辅助键
  SPECIAL('x!', { label: 'x!', size: 0 }),
  SPECIAL('%',  { label: '%', size: 0 }),
  FUNC(',', { label: ',', size: 0 }),
  FUNC('SPC', { label: 'SPC', cls: 'key-func', size: 1 }),
  FUNC(';', { label: ';', size: 0 }),
  FUNC(':', { label: ':', size: 0 }),
  // row 10 — 主 = 按钮（跨 4 列） + 回车（跨 2 列）= 6 列
  FUNC('=', { cls: 'key-eq', size: 2, span: 4, label: '=' }),
  FUNC('↵', { label: '↵', cls: 'key-special', size: 1, span: 2 })
])
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 180ms ease, transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
</style>

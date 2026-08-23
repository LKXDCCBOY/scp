<template>
  <div class="flex flex-col h-full min-h-0 gap-2.5 sm:gap-3">
    <!-- ===== 屏幕区（加大：更大的表达式/结果行、更多内边距） ===== -->
    <div class="screen-glass px-4 sm:px-6 py-4 sm:py-5 flex-none" :class="{ 'animate-shake': shake }">
      <!-- 状态指示栏 -->
      <div class="flex items-center gap-1.5 flex-wrap text-[10px] sm:text-xs mb-3 sm:mb-4">
        <span class="mode-chip" :class="{active: state.mode==='COMP'}">{{ t('screen.modes.COMP') }}</span>
        <span class="mode-chip" :class="{active: state.mode==='CMPLX'}">{{ t('screen.modes.CMPLX') }}</span>
        <span class="mode-chip" :class="{active: state.mode==='STAT'}">{{ t('screen.modes.STAT') }}</span>
        <span class="mode-chip" :class="{active: state.mode==='BASE-N'}">{{ t('screen.modes.BASE-N') }}</span>
        <span class="mode-chip" :class="{active: state.mode==='EQN'}">{{ t('screen.modes.EQN') }}</span>
        <span class="mode-chip" :class="{active: state.mode==='MAT'}">{{ t('screen.modes.MAT') }}</span>
        <span class="flex-1"></span>
        <span class="mode-chip" :class="{active: state.angleMode==='Deg'}">{{ t('screen.angles.Deg') }}</span>
        <span class="mode-chip" :class="{active: state.angleMode==='Rad'}">{{ t('screen.angles.Rad') }}</span>
        <span class="mode-chip" :class="{active: state.angleMode==='Grad'}">{{ t('screen.angles.Grad') }}</span>
        <span v-if="state.shift" class="mode-chip !text-amber-400 !border-amber-400/50 !bg-amber-400/20">S</span>
        <span v-if="state.alpha" class="mode-chip !text-rose-400 !border-rose-400/50 !bg-rose-400/20">A</span>
        <span v-if="memoryNotEmpty" class="mode-chip !text-blue-400 !border-blue-400/50 !bg-blue-400/20">M</span>
      </div>

      <!-- 表达式显示（加高加大字体） -->
      <div class="relative min-h-[56px] sm:min-h-[72px] px-3 sm:px-4 py-2 sm:py-3 rounded-xl border flex items-end justify-end"
           style="background: var(--expr-bg); border-color: var(--expr-border);">
        <div class="w-full display-text text-right leading-tight break-all pr-1"
             style="font-size: clamp(0.95rem, 1.6vw, 1.4rem); color: var(--expr-text);">
          <template v-if="expression.display">{{ expression.display }}</template>
          <template v-else><span style="color: var(--expr-placeholder);" class="select-none">0</span></template>
        </div>
      </div>

      <!-- 结果显示（更大字号、更多内边距） -->
      <div class="mt-2.5 sm:mt-3 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border min-h-[68px] sm:min-h-[88px] flex items-center justify-end relative overflow-hidden"
           :style="{ background: 'linear-gradient(to top, rgba(79,140,255,0.10), transparent)', borderColor: 'var(--res-border)' }">
        <div v-if="!result.error && result.display"
             class="display-text pr-1 animate-slide-up relative z-10"
             style="font-size: clamp(1.4rem, 2.6vw, 2.6rem); font-weight: 700; color: var(--res-text); letter-spacing: 0.01em;">
          {{ result.display }}
        </div>
        <div v-else-if="result.error"
             class="display-text font-semibold pr-1 animate-shake"
             style="font-size: clamp(1rem, 1.8vw, 1.5rem); color: var(--res-error);">
          {{ result.error }}
        </div>
        <div v-else class="text-xs select-none pr-1"
             style="color: var(--res-placeholder);">{{ t('screen.placeholder') }}</div>
      </div>
    </div>

    <!-- ===== 历史记录 ===== -->
    <div class="glass-panel p-3 sm:p-4 flex-1 min-h-0 flex flex-col">
      <div class="flex items-center justify-between mb-2.5 flex-none">
        <span class="text-xs sm:text-sm font-semibold" style="color: var(--text-dim);">{{ t('screen.history') }}</span>
        <div class="flex items-center gap-2">
          <span class="text-[11px] sm:text-xs" style="color: var(--text-muted);">{{ history.length }} {{ t('screen.historyCount') }}</span>
          <button v-if="history.length" @click="$emit('clear-history')"
                  class="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-lg hover:brightness-110 transition"
                  :style="{ background: 'var(--danger-bg)', color: 'var(--danger-text)', border: '1px solid var(--danger-border)' }">
            {{ t('screen.clearHistory') }}
          </button>
        </div>
      </div>
      <div class="flex-1 min-h-0 overflow-y-auto scrollbar-thin space-y-1.5 sm:space-y-2 pr-1.5 -mr-1.5">
        <div v-if="!history.length" class="h-full flex flex-col items-center justify-center text-xs sm:text-sm gap-1" style="color: var(--text-muted);">
          <p>{{ t('screen.noHistory') }}</p>
          <p class="text-[10px] sm:text-xs opacity-75">{{ t('screen.noHistoryHint') }}</p>
        </div>
        <div v-for="h in history" :key="h.id"
             class="group p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer"
             :style="{ background: 'var(--history-item-bg)', borderColor: 'var(--history-item-border)' }"
             @mouseenter="e => (e.currentTarget.style.background = 'var(--history-item-hover-bg)', e.currentTarget.style.borderColor = 'var(--history-item-hover-border)')"
             @mouseleave="e => (e.currentTarget.style.background = 'var(--history-item-bg)', e.currentTarget.style.borderColor = 'var(--history-item-border)')"
             @click="$emit('use-history', h)">
          <div class="display-text text-[11px] sm:text-xs leading-snug break-all" style="color: var(--text-dim);">{{ h.displayExpr }}</div>
          <div class="display-text mt-0.5 sm:mt-1 break-all"
               style="font-size: clamp(0.95rem, 1.4vw, 1.25rem); color: var(--text); font-weight: 600;">= {{ h.resultStr }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EngineState, HistoryItem } from '@/engine/calculator'
import { t } from '@/i18n'

interface Props {
  expression: { raw: string; display: string; cursor: number }
  result: { value: number; display: string; error: string }
  state: EngineState
  shake: boolean
  memoryNotEmpty: boolean
  history: HistoryItem[]
}
defineProps<Props>()
defineEmits<{ 'use-history': [h: HistoryItem]; 'clear-history': [] }>()
</script>

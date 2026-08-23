<template>
  <div class="glass-panel p-3 sm:p-4 w-full max-w-[480px] mx-auto h-full overflow-hidden flex flex-col">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-sm sm:text-base font-semibold flex items-center gap-2">
        <span>历史记录</span>
      </h2>
      <div class="flex items-center gap-2">
        <span class="text-[11px] sm:text-xs text-white/40">{{ history.length }} 条</span>
        <button
          v-if="history.length"
          @click="$emit('clear')"
          class="text-[11px] sm:text-xs px-2 py-1 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/25
                 hover:bg-rose-500/25 transition-colors">
          清空
        </button>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto scrollbar-thin pr-1 -mr-1 space-y-2 animate-fade-in">
      <div v-if="!history.length" class="h-full flex flex-col items-center justify-center text-white/35 text-sm gap-2">
        <span class="text-4xl opacity-60 font-mono">0:00</span>
        <p>暂无历史记录</p>
        <p class="text-xs opacity-60">按 = 计算后会记录到这里</p>
      </div>
      <div
        v-for="h in history" :key="h.id"
        class="group relative p-3 rounded-xl border border-white/8 bg-white/[0.03]
               hover:bg-white/[0.06] hover:border-white/15 transition-all cursor-pointer"
        @click="$emit('use', h)"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <div class="display-text text-xs sm:text-sm text-white/60 break-all leading-snug">
              {{ h.displayExpr }}
            </div>
            <div class="display-text text-base sm:text-lg text-white mt-1 break-all leading-tight">
              = {{ h.resultStr }}
            </div>
          </div>
          <div class="flex-none flex flex-col items-end gap-1 text-[10px] sm:text-[11px]">
            <span class="px-1.5 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/5">{{ h.mode }}</span>
            <span class="text-white/25">{{ formatTime(h.time) }}</span>
          </div>
        </div>
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity
                    text-[10px] px-2 py-0.5 rounded-md bg-calc-primary/20 text-blue-200 border border-blue-400/20">
          点击使用此表达式
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryItem } from '@/engine/calculator'

defineProps<{ history: HistoryItem[] }>()
defineEmits<{ use: [h: HistoryItem]; clear: [] }>()

function formatTime(t: number): string {
  const d = new Date(t)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}
</script>

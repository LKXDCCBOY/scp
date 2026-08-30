<template>
  <button
    class="glass-key relative"
    :class="keyClasses"
    :style="spanStyle"
    :disabled="item.disabled"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointerleave="onLeave"
    @mouseenter="onEnter"
  >
    <!-- 左上：SHIFT 第二功能 -->
    <span v-if="shiftLabel"
          class="absolute left-0.5 xs:left-1 sm:left-1.5 top-0.5 sm:top-1 text-[7px] xs:text-[8px] sm:text-[9px] font-medium
                 text-amber-300/80 tracking-tight pointer-events-none leading-none">
      {{ shiftLabel }}
    </span>
    <!-- 右上：ALPHA 变量 -->
    <span v-if="item.alphaLabel"
          class="absolute right-0.5 xs:right-1 sm:right-1.5 top-0.5 sm:top-1 text-[7px] xs:text-[8px] sm:text-[9px] sm:text-[10px] font-medium
                 text-rose-300/80 tracking-tight pointer-events-none leading-none">
      {{ item.alphaLabel }}
    </span>

    <!-- 主标签 -->
    <span class="display-text relative z-10 select-none pointer-events-none whitespace-nowrap"
          :class="sizeClass">{{ mainLabel }}</span>

    <!-- 右下：下标/补充说明（优先显示按键自带 subLabel；SHIFT 激活时回退显示原 label） -->
    <span v-if="displayHint"
          class="absolute right-0.5 xs:right-1 sm:right-1.5 bottom-0.5 sm:bottom-1 text-[7px] xs:text-[8px] sm:text-[9px] opacity-40
                 pointer-events-none leading-none"
          style="color: var(--text-dim);">
      {{ displayHint }}
    </span>

    <!-- 涟漪动画 -->
    <span v-for="r in ripples" :key="r.id" class="key-ripple"
          :style="{ left: r.x + 'px', top: r.y + 'px', width: r.size + 'px', height: r.size + 'px' }"></span>
  </button>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { KeyDef } from '@/types/keys'
import type { EngineState } from '@/engine/calculator'
import { setHoveredKey, clearHoveredKey } from '@/composables/useHoverHint'

interface Props {
  item: KeyDef
  state: EngineState
}
const props = defineProps<Props>()
const emit = defineEmits<{ press: [id: string] }>()

const pressed = ref(false)
interface Ripple { id: number; x: number; y: number; size: number }
const ripples = reactive<Ripple[]>([])
let _rid = 0

const spanStyle = computed(() => {
  const s = props.item.span
  if (s && s > 1) return { gridColumn: `span ${s} / span ${s}` }
  return {}
})

const keyClasses = computed(() => {
  const arr: string[] = []
  // 高度自适应填满网格行
  arr.push('h-full min-h-0')
  // 尺寸
  if (props.item.span === 2) arr.push('')
  // 自定义类
  if (props.item.cls) arr.push(props.item.cls)
  // shift / alpha 激活时高亮有对应功能的键
  if (props.state.shift && props.item.shift) arr.push('key-shift-active')
  if (props.state.alpha && props.item.alphaLabel) arr.push('key-alpha-active')
  if (pressed.value) arr.push('pressed')
  if (props.item.disabled) arr.push('opacity-30 cursor-not-allowed hover:!bg-transparent')
  return arr.join(' ')
})

const sizeClass = computed(() => {
  const s = props.item.size ?? 0
  if (s <= -1) return 'text-[10px] xs:text-[11px] sm:text-xs'
  if (s === 0)  return 'text-[11px] xs:text-xs sm:text-sm sm:text-base'
  if (s === 1)  return 'text-xs sm:text-base sm:text-lg'
  return 'text-base sm:text-lg sm:text-xl font-bold'
})

const shiftLabel = computed(() => {
  if (props.item.shift) return props.item.shift
  return undefined
})

const mainLabel = computed(() => {
  // SHIFT 生效时，如果存在 shift 就用 shift
  if (props.state.shift && props.item.shift) return props.item.shift
  // ALPHA 生效时，如果有 alphaLabel 不改变主标签（主标签是数字）
  return props.item.label
})

const subHint = computed(() => {
  // 当 shift/alpha 覆盖后，把原始 label 放到底部做提示
  if (props.state.shift && props.item.shift && props.item.shift !== props.item.label) {
    return props.item.label
  }
  return undefined
})

// 优先显示按键自带 subLabel（如 "未知数"），SHIFT 激活时回退到被覆盖的原始 label
const displayHint = computed(() => subHint.value ?? props.item.subLabel)

function onPointerDown(e: PointerEvent) {
  if (props.item.disabled) return
  pressed.value = true
  // 涟漪
  const btn = e.currentTarget as HTMLElement
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 0.5
  const ripple: Ripple = {
    id: ++_rid,
    x: e.clientX - rect.left - size / 2,
    y: e.clientY - rect.top - size / 2,
    size
  }
  ripples.push(ripple)
  setTimeout(() => {
    const idx = ripples.indexOf(ripple)
    if (idx >= 0) ripples.splice(idx, 1)
  }, 600)
}
function onPointerUp() {
  if (props.item.disabled) return
  pressed.value = false
  emit('press', props.item.id)
}

function onEnter() {
  setHoveredKey(props.item.id)
}

function onLeave() {
  pressed.value = false
  clearHoveredKey()
}
</script>

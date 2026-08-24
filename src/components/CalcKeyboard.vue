<template>
  <div class="glass-panel p-2 sm:p-2.5 w-full h-full flex flex-col">
    <div class="grid gap-1 sm:gap-1.5 grid-cols-6 flex-1"
         style="grid-template-rows: repeat(10, minmax(0, 1fr));">
      <CalcKey
        v-for="(k, idx) in layout" :key="k.id + idx"
        :item="k"
        :state="state"
        @press="handlePress(k, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CalcKey from './CalcKey.vue'
import type { KeyDef } from '@/types/keys'
import type { EngineState } from '@/engine/calculator'
import { NUM, OP, FUNC, NAV, EDIT, MEMORY, SPECIAL } from '@/constants/keypad'

const props = defineProps<{ state: EngineState }>()
const emit = defineEmits<{ press: [id: string] }>()

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
  // row 7
  SPECIAL('tanh', { label: 'tanh', shift: 'atanh', subLabel: 'atanh' }),
  NUM('0', { size: 1, span: 2 }),
  NUM('.', { size: 1, shift: 'rand', subLabel: 'rand' }),
  OP('×', { size: 1, label: '×' }),
  OP('÷', { size: 1, label: '÷' }),
  // row 8
  EDIT('DEL', { cls: 'key-func', shift: 'INS', subLabel: 'INS' }),
  FUNC('Ans', { shift: 'pi', subLabel: 'pi', cls: 'key-special' }),
  OP('EXP', { label: 'x10^', cls: 'key-op' }),
  OP('-', { size: 1, label: '−' }),
  OP('+', { size: 1, label: '+' }),
  SPECIAL('x!',  { label: 'x!' }),
  // row 9 — 变量与符号
  FUNC('x', { label: 'x', cls: 'key-special', size: 1 }),
  FUNC('y', { label: 'y', cls: 'key-special', size: 1 }),
  FUNC('=', { cls: 'key-eq', size: 1, label: '=' }),
  SPECIAL('!', { label: '!', cls: 'key-op' }),
  SPECIAL('%', { label: '%', cls: 'key-op' }),
  FUNC(',',  { label: ',', size: 0 }),
  // row 10 — 文本/Python 符号
  FUNC('SPC', { label: 'SPC', cls: 'key-func', size: 2 }),
  FUNC(';',  { label: ';', size: 0 }),
  FUNC(':',  { label: ':', size: 0 }),
  FUNC('<',  { label: '<', size: 0 }),
  FUNC('>',  { label: '>', size: 0 }),
  FUNC('↵',  { label: '↵', cls: 'key-special', size: 0 })
])

function handlePress(k: KeyDef, _emitted: string) {
  emit('press', k.id)
}
</script>

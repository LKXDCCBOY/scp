import type { KeyDef } from '@/types/keys'

// ==================== 工厂函数 ====================
export function NUM(id: string, opts: Partial<KeyDef> = {}): KeyDef {
  return { id, kind: 'num', label: id, cls: 'key-num', ...opts }
}
export function OP(id: string, opts: Partial<KeyDef> = {}): KeyDef {
  return { id, kind: 'op', label: opts.label ?? id, cls: 'key-op', ...opts }
}
export function FUNC(id: string, opts: Partial<KeyDef> = {}): KeyDef {
  return { id, kind: 'func', label: opts.label ?? id, cls: opts.cls ?? 'key-func', ...opts }
}
export function NAV(id: string, opts: Partial<KeyDef> = {}): KeyDef {
  return { id, kind: 'nav', label: opts.label ?? id, cls: opts.cls ?? 'key-func', ...opts }
}
export function EDIT(id: string, opts: Partial<KeyDef> = {}): KeyDef {
  return { id, kind: 'edit', label: opts.label ?? id, cls: opts.cls ?? 'key-func', ...opts }
}
export function MEMORY(id: string, opts: Partial<KeyDef> = {}): KeyDef {
  return { id, kind: 'store', label: opts.label ?? id, cls: opts.cls ?? 'key-func', ...opts }
}
export function SPECIAL(id: string, opts: Partial<KeyDef> = {}): KeyDef {
  return { id, kind: 'special', label: opts.label ?? id, cls: opts.cls ?? 'key-special', ...opts }
}

// ==================== 进制功能（BASE-N 模式）====================
export const BASE_KEYS: Record<string, KeyDef> = {
  BIN: SPECIAL('BASE', { label: 'BIN', subLabel: 'd' }),
  OCT: SPECIAL('BASE', { label: 'OCT', subLabel: 'o' }),
  DEC: SPECIAL('BASE', { label: 'DEC', subLabel: 'b' }),
  HEX: SPECIAL('BASE', { label: 'HEX', subLabel: 'h' }),
  A: NUM('A', { cls: 'key-special', label: 'A', alphaLabel: 'A' }),
  B: NUM('B', { cls: 'key-special', label: 'B', alphaLabel: 'B' }),
  C: NUM('C', { cls: 'key-special', label: 'C', alphaLabel: 'C' }),
  D: NUM('D', { cls: 'key-special', label: 'D', alphaLabel: 'D' }),
  E: NUM('E', { cls: 'key-special', label: 'E', alphaLabel: 'E' }),
  F: NUM('F', { cls: 'key-special', label: 'F', alphaLabel: 'F' })
}

// 占位函数，避免未使用告警
void BASE_KEYS

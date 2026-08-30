export type KeyKind =
  | 'num'       // 数字键
  | 'op'        // 运算符 + - * / ^ % ...
  | 'func'      // 函数 sin cos ln log sqrt ...
  | 'nav'       // 方向/编辑导航
  | 'edit'      // 编辑动作 DEL AC INS
  | 'store'     // 变量 STO/RCL/M+/M-/MR/MC
  | 'special'   // 特殊 EXP ANS ! π x² x³ x⁻¹ 等
  | 'base'      // 进制键 BIN OCT DEC HEX
  | 'mode'      // 模式切换

export interface KeyDef {
  id: string
  kind: KeyKind
  label: string
  /** 按键上方的第二功能标签（SHIFT 生效） */
  shift?: string
  /** 按键上方的小提示/副标题（不考虑 shift） */
  subLabel?: string
  /** 按键侧边的变量标签（红色 / ALPHA 生效） */
  alphaLabel?: string
  /** 按键视觉类：key-num / key-op / key-func / key-clear / key-eq / key-special */
  cls?: string
  /** 占据列数 */
  span?: 1 | 2 | 3 | 4 | 5 | 6
  /** 是否禁用（保留占位，如积分等复杂功能） */
  disabled?: boolean
  /** 字体大小调节 -1:小 0:中 1:大 */
  size?: -1 | 0 | 1 | 2
}

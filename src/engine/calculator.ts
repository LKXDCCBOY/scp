/**
 * 科学计算器核心引擎
 * 实现表达式解析、科学函数计算、模式管理、变量存储等
 *
 * 架构说明：
 * - 使用 Shunting-yard (调度场) 算法将中缀表达式转为后缀 RPN
 * - 支持函数调用、一元运算符、隐式乘法
 * - 角度单位转换层：Deg/Rad/Grad 与 内部计算(弧度) 互转
 * - 模式：COMP(普通)、CMPLX(复数)、STAT(统计)、BASE-N(进制)、EQN(方程)、MAT(矩阵)
 */

// ==================== 常量定义 ====================
export const ANGLE_MODES = ['Deg', 'Rad', 'Grad'] as const
export type AngleMode = typeof ANGLE_MODES[number]

export const CALC_MODES = ['COMP', 'CMPLX', 'STAT', 'BASE-N', 'EQN', 'MAT'] as const
export type CalcMode = typeof CALC_MODES[number]

export const BASE_N = ['BIN', 'OCT', 'DEC', 'HEX'] as const
export type BaseN = typeof BASE_N[number]

// ==================== 错误类型 ====================
export class CalcError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CalcError'
  }
}

// ==================== 角度单位转换 ====================
function toRad(angle: number, mode: AngleMode): number {
  switch (mode) {
    case 'Deg': return angle * Math.PI / 180
    case 'Rad': return angle
    case 'Grad': return angle * Math.PI / 200
  }
}

function fromRad(angle: number, mode: AngleMode): number {
  switch (mode) {
    case 'Deg': return angle * 180 / Math.PI
    case 'Rad': return angle
    case 'Grad': return angle * 200 / Math.PI
  }
}

// ==================== 数学辅助函数 ====================
function factorial(n: number): number {
  if (n < 0 || !Number.isFinite(n)) throw new CalcError('MATH ERROR')
  if (n > 170) return Infinity
  if (!Number.isInteger(n)) {
    // Gamma 函数近似 (Lanczos 近似简化版)
    return gamma(n + 1)
  }
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

function gamma(z: number): number {
  const g = 7
  const c = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ]
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z))
  }
  z -= 1
  let x = c[0]
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i)
  const t = z + g + 0.5
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x
}

function permutation(n: number, r: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(r)) throw new CalcError('MATH ERROR')
  if (n < 0 || r < 0 || r > n) throw new CalcError('MATH ERROR')
  return factorial(n) / factorial(n - r)
}

function combination(n: number, r: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(r)) throw new CalcError('MATH ERROR')
  if (n < 0 || r < 0 || r > n) throw new CalcError('MATH ERROR')
  return factorial(n) / (factorial(r) * factorial(n - r))
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.floor(a)); b = Math.abs(Math.floor(b))
  while (b) { [a, b] = [b, a % b] }
  return a
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b)
}

function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// ==================== 进制转换 ====================
function parseBaseN(str: string, base: BaseN): number {
  let num = 0
  const clean = str.toUpperCase().replace(/^(-?)([BOHX])/, '$1')
  let radix = 10
  switch (base) {
    case 'BIN': radix = 2; break
    case 'OCT': radix = 8; break
    case 'DEC': radix = 10; break
    case 'HEX': radix = 16; break
  }
  if (clean.startsWith('-')) {
    return -parseInt(clean.slice(1), radix)
  }
  return parseInt(clean, radix)
}

function formatBaseN(val: number, base: BaseN, digits: number = 0): string {
  const n = Math.trunc(val)
  switch (base) {
    case 'BIN': {
      let b = (n >>> 0).toString(2)
      if (digits > 0) b = b.padStart(digits, '0')
      return 'b' + b
    }
    case 'OCT': return 'o' + (n >>> 0).toString(8)
    case 'DEC': return String(n)
    case 'HEX': return 'h' + (n >>> 0).toString(16).toUpperCase()
  }
}

// ==================== Token 定义 ====================
type TokenType =
  | 'NUM' | 'OP' | 'LPAR' | 'RPAR' | 'FUNC' | 'CONST'
  | 'COMMA' | 'VAR' | 'IMPLICIT_MUL'

interface Token {
  type: TokenType
  value: string
  num?: number
  precedence?: number
  rightAssoc?: boolean
  unary?: boolean
  argc?: number
}

// 运算符优先级
const OP_PREC: Record<string, { prec: number; right: boolean }> = {
  '^':  { prec: 4, right: true },
  'E':  { prec: 4, right: false }, // 科学计数法 xEy = x * 10^y
  '*':  { prec: 3, right: false },
  '×':  { prec: 3, right: false },
  '/':  { prec: 3, right: false },
  '÷':  { prec: 3, right: false },
  '%':  { prec: 3, right: false },
  '+':  { prec: 2, right: false },
  '-':  { prec: 2, right: false },
  '−':  { prec: 2, right: false }
}

// 函数参数个数 (默认1)
const FUNC_ARGC: Record<string, number> = {
  'Pol': 2, 'Rec': 2, 'nCr': 2, 'nPr': 2, 'GCD': 2, 'LCM': 2,
  'RanInt#': 2, 'ROOT': 3, 'Quadratic': 3, 'Cubic': 4
}

// ==================== 词法分析器 ====================
/**
 * 表达式字符串 -> Token 数组
 * 支持隐式乘法：如 2sin(30) -> 2*sin(30)，)( -> )*(，2( -> 2*(
 */
function tokenize(expr: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  const s = expr.replace(/\s+/g, '')

  // 先处理特殊占位符（显示友好符号）
  const replacements: [RegExp, string][] = [
    [/×/g, '*'], [/÷/g, '/'], [/−/g, '-'], [/π/g, 'pi'],
    [/√\(/g, 'sqrt('], [/∛\(/g, 'cbrt('], [/²/g, '^2'], [/³/g, '^3'],
    [/⁻¹/g, '^(-1)'],
    [/sin⁻¹/g, 'asin'], [/cos⁻¹/g, 'acos'], [/tan⁻¹/g, 'atan'],
    [/sinh⁻¹/g, 'asinh'], [/cosh⁻¹/g, 'acosh'], [/tanh⁻¹/g, 'atanh'],
    [/log₂/g, 'log2'], [/₁₀/g, '']
  ]
  let parsed = s
  for (const [rx, rep] of replacements) parsed = parsed.replace(rx, rep)

  const len = parsed.length
  while (i < len) {
    const ch = parsed[i]

    // 数字 (包括小数、科学计数法、进制前缀 h/o/b/d)
    if (/[0-9.]/.test(ch) || (ch === 'h' && /[0-9A-F]/.test(parsed[i + 1] || ''))
        || (ch === 'o' && /[0-7]/.test(parsed[i + 1] || ''))
        || (ch === 'b' && /[01]/.test(parsed[i + 1] || ''))) {
      let numStr = ''
      const start = i
      if (ch === 'h' || ch === 'o' || ch === 'b') {
        numStr += parsed[i++]
      }
      while (i < len && /[0-9A-Fa-f.]/.test(parsed[i])) {
        numStr += parsed[i++]
      }
      // 科学计数法
      if (i < len && (parsed[i] === 'e' || parsed[i] === 'E')
          && i + 1 < len && /[0-9+\-]/.test(parsed[i + 1])) {
        numStr += 'e' + parsed[++i]
        i++
        while (i < len && /[0-9]/.test(parsed[i])) numStr += parsed[i++]
      }
      let num: number
      if (numStr.startsWith('h')) num = parseInt(numStr.slice(1), 16)
      else if (numStr.startsWith('o')) num = parseInt(numStr.slice(1), 8)
      else if (numStr.startsWith('b')) num = parseInt(numStr.slice(1), 2)
      else num = parseFloat(numStr)
      if (isNaN(num)) throw new CalcError('SYNTAX ERROR')
      tokens.push({ type: 'NUM', value: numStr, num })
      // 隐式乘法后续
      if (i < len) {
        const next = parsed[i]
        if (/[a-zA-Z(π]/.test(next)) {
          tokens.push({ type: 'IMPLICIT_MUL', value: '*' })
        }
      }
      continue
    }

    // 字母：函数名/常量/变量
    if (/[a-zA-Z_]/.test(ch)) {
      let name = ''
      while (i < len && /[a-zA-Z_0-9#⁻¹²³]/.test(parsed[i])) {
        name += parsed[i++]
      }
      // 统一
      const lowerName = name
      // 判断常量
      if (lowerName === 'pi' || lowerName === 'e' || lowerName === 'Ans') {
        tokens.push({ type: 'CONST', value: lowerName })
      } else if (isFunctionName(lowerName)) {
        tokens.push({ type: 'FUNC', value: lowerName, argc: FUNC_ARGC[lowerName] ?? 1 })
      } else if (/^[A-Za-z]$/.test(name)) {
        // 单字母变量 (支持大小写，如 x 和 X)
        tokens.push({ type: 'VAR', value: name })
      } else {
        throw new CalcError(`SYNTAX ERROR: unknown '${name}'`)
      }
      // 隐式乘法后续
      if (i < len && /[0-9.(\-+]/.test(parsed[i]) ||
          (i < len && /[a-zA-Zπ]/.test(parsed[i]) && !isFunctionNameStart(parsed[i]))) {
        // 保守：只有确定非函数名时加 *
      }
      continue
    }

    // 运算符
    if (ch in OP_PREC) {
      let op = ch
      i++
      // 一元 +/- 处理
      const isUnary = tokens.length === 0 ||
        tokens[tokens.length - 1].type === 'OP' ||
        tokens[tokens.length - 1].type === 'LPAR' ||
        tokens[tokens.length - 1].type === 'COMMA' ||
        tokens[tokens.length - 1].type === 'IMPLICIT_MUL'

      if ((op === '+' || op === '-') && isUnary) {
        tokens.push({ type: 'OP', value: op === '-' ? 'u-' : 'u+', precedence: 5, rightAssoc: true, unary: true })
      } else {
        const prec = OP_PREC[op]
        tokens.push({ type: 'OP', value: op, precedence: prec.prec, rightAssoc: prec.right })
      }
      continue
    }

    // 括号
    if (ch === '(') {
      // 前一个是数字、变量、常量、右括号 -> 隐式乘法
      if (tokens.length > 0) {
        const prev = tokens[tokens.length - 1]
        if (prev.type === 'NUM' || prev.type === 'VAR' || prev.type === 'CONST' ||
            prev.type === 'RPAR') {
          tokens.push({ type: 'IMPLICIT_MUL', value: '*' })
        }
      }
      tokens.push({ type: 'LPAR', value: '(' })
      i++
      continue
    }
    if (ch === ')') {
      tokens.push({ type: 'RPAR', value: ')' })
      i++
      // 右括号后跟数字/变量/常量 -> 隐式乘法
      if (i < len && /[0-9.a-zA-Z(\-+(π]/.test(parsed[i])) {
        tokens.push({ type: 'IMPLICIT_MUL', value: '*' })
      }
      continue
    }

    // 阶乘
    if (ch === '!') {
      tokens.push({ type: 'FUNC', value: 'fact', argc: 0 })
      i++
      continue
    }

    // 百分号 (特殊后缀运算符，等价于 /100 但有场景含义)
    if (ch === '%') {
      tokens.push({ type: 'FUNC', value: 'percent', argc: 0 })
      i++
      continue
    }

    if (ch === ',') {
      tokens.push({ type: 'COMMA', value: ',' })
      i++
      continue
    }

    throw new CalcError(`SYNTAX ERROR at '${ch}'`)
  }

  // 把 IMPLICIT_MUL 转为普通 OP '*'
  return tokens.map(t => {
    if (t.type === 'IMPLICIT_MUL') {
      return { type: 'OP', value: '*', precedence: 3, rightAssoc: false } as Token
    }
    return t
  })
}

function isFunctionName(name: string): boolean {
  const names = [
    'sin', 'cos', 'tan', 'csc', 'sec', 'cot',
    'asin', 'acos', 'atan', 'acsc', 'asec', 'acot',
    'sinh', 'cosh', 'tanh', 'csch', 'sech', 'coth',
    'asinh', 'acosh', 'atanh',
    'log', 'ln', 'log2', 'log10',
    'sqrt', 'cbrt', 'abs', 'sign',
    'exp', 'squared', 'cubed', 'inv',
    'fact', 'percent', 'deg', 'rad',
    'floor', 'ceil', 'round', 'trunc', 'frac', 'int',
    'sin²', 'cos²', 'tan²',
    'Pol', 'Rec', 'nCr', 'nPr', 'GCD', 'LCM',
    'Rnd', 'Ran#', 'RanInt#', 'Int', 'Frac'
  ]
  return names.includes(name)
}

function isFunctionNameStart(ch: string): boolean {
  return /[a-zA-Z_]/.test(ch)
}

// ==================== Shunting-yard 调度场算法 ====================
function toRPN(tokens: Token[]): Token[] {
  const output: Token[] = []
  const stack: Token[] = []

  for (const tok of tokens) {
    switch (tok.type) {
      case 'NUM':
      case 'VAR':
      case 'CONST':
        output.push(tok)
        break

      case 'FUNC':
        stack.push(tok)
        break

      case 'COMMA':
        while (stack.length && stack[stack.length - 1].type !== 'LPAR') {
          output.push(stack.pop()!)
        }
        if (!stack.length) throw new CalcError('SYNTAX ERROR (comma)')
        break

      case 'OP': {
        while (stack.length) {
          const top = stack[stack.length - 1]
          if (top.type === 'OP') {
            const prec1 = tok.precedence!
            const prec2 = top.precedence!
            if ((!tok.rightAssoc && prec1 <= prec2) || (tok.rightAssoc && prec1 < prec2)) {
              output.push(stack.pop()!)
              continue
            }
          } else if (top.type === 'FUNC') {
            output.push(stack.pop()!)
            continue
          }
          break
        }
        stack.push(tok)
        break
      }

      case 'LPAR':
        stack.push(tok)
        break

      case 'RPAR':
        while (stack.length && stack[stack.length - 1].type !== 'LPAR') {
          output.push(stack.pop()!)
        }
        if (!stack.length) throw new CalcError('MISMATCHED PARENTHESIS')
        stack.pop() // 丢 LPAR
        if (stack.length && stack[stack.length - 1].type === 'FUNC') {
          output.push(stack.pop()!)
        }
        break
    }
  }

  while (stack.length) {
    const top = stack.pop()!
    if (top.type === 'LPAR' || top.type === 'RPAR') throw new CalcError('MISMATCHED PARENTHESIS')
    output.push(top)
  }

  return output
}

// ==================== RPN 求值 ====================
export interface CalcContext {
  angleMode: AngleMode
  mode: CalcMode
  baseN: BaseN
  variables: Record<string, number>
  ans: number
  complex?: boolean
}

function resolveConst(name: string): number {
  switch (name) {
    case 'pi': return Math.PI
    case 'e': return Math.E
    default: return NaN
  }
}

function applyUnary(op: string, v: number, ctx: CalcContext): number {
  switch (op) {
    case 'u+': return v
    case 'u-': return -v
  }
  throw new CalcError('SYNTAX ERROR')
}

function applyBin(op: string, a: number, b: number): number {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/':
    case '÷':
      if (b === 0) throw new CalcError('DIV BY ZERO')
      return a / b
    case '^':
      // 防爆内存：指数过大时提前拦截
      if (Math.abs(b) > 300 && Math.abs(a) > 1) throw new CalcError('OVERFLOW (exponent too large)')
      const r = Math.pow(a, b)
      if (!isFinite(r) && isFinite(a) && isFinite(b)) throw new CalcError('MATH ERROR')
      return r
    case 'E': return a * Math.pow(10, b)
    case '%': return a * b / 100
  }
  throw new CalcError('SYNTAX ERROR')
}

function applyFunc(name: string, args: number[], ctx: CalcContext): number {
  const a = args[0]
  switch (name) {
    // 三角函数
    case 'sin': return Math.sin(toRad(a, ctx.angleMode))
    case 'cos': return Math.cos(toRad(a, ctx.angleMode))
    case 'tan': return Math.tan(toRad(a, ctx.angleMode))
    case 'csc': return 1 / Math.sin(toRad(a, ctx.angleMode))
    case 'sec': return 1 / Math.cos(toRad(a, ctx.angleMode))
    case 'cot': return 1 / Math.tan(toRad(a, ctx.angleMode))
    case 'sin²': return Math.pow(Math.sin(toRad(a, ctx.angleMode)), 2)
    case 'cos²': return Math.pow(Math.cos(toRad(a, ctx.angleMode)), 2)
    case 'tan²': return Math.pow(Math.tan(toRad(a, ctx.angleMode)), 2)
    // 反三角
    case 'asin': return fromRad(Math.asin(a), ctx.angleMode)
    case 'acos': return fromRad(Math.acos(a), ctx.angleMode)
    case 'atan': return fromRad(Math.atan(a), ctx.angleMode)
    // 双曲
    case 'sinh': return Math.sinh(a)
    case 'cosh': return Math.cosh(a)
    case 'tanh': return Math.tanh(a)
    case 'asinh': return Math.asinh(a)
    case 'acosh': return Math.acosh(a)
    case 'atanh': return Math.atanh(a)
    // 对数/指数
    case 'log': case 'log10': return Math.log10(a)
    case 'ln': return Math.log(a)
    case 'log2': return Math.log2(a)
    case 'exp': return Math.exp(a)
    // 幂/根
    case 'sqrt':
      if (a < 0) throw new CalcError('MATH ERROR')
      return Math.sqrt(a)
    case 'cbrt': return Math.cbrt(a)
    case 'squared': return a * a
    case 'cubed': return a * a * a
    case 'inv':
      if (a === 0) throw new CalcError('DIV BY ZERO')
      return 1 / a
    // 阶乘/百分号
    case 'fact': return factorial(a)
    case 'percent': return a / 100
    // 绝对值/取整/符号
    case 'abs': return Math.abs(a)
    case 'sign': return Math.sign(a)
    case 'floor': return Math.floor(a)
    case 'ceil': return Math.ceil(a)
    case 'round': return Math.round(a)
    case 'trunc': case 'Int': case 'int': return Math.trunc(a)
    case 'frac': case 'Frac': return a - Math.trunc(a)
    // 角度单位转换（覆盖模式）
    case 'deg': return fromRad(a, 'Deg')
    case 'rad': return fromRad(a, 'Rad')
    // 随机
    case 'Ran#': return Math.random()
    case 'RanInt#': return randomInt(Math.ceil(args[0]), Math.floor(args[1]))
    case 'Rnd': return Math.round(a * 1e10) / 1e10
    // 二元
    case 'nPr': return permutation(args[0], args[1])
    case 'nCr': return combination(args[0], args[1])
    case 'GCD': return gcd(args[0], args[1])
    case 'LCM': return lcm(args[0], args[1])
    case 'Pol': {
      // Pol(x,y) -> r, 结果存 r=X; 角度θ存到辅助变量
      const r = Math.sqrt(args[0] * args[0] + args[1] * args[1])
      const theta = fromRad(Math.atan2(args[1], args[0]), ctx.angleMode)
      ctx.variables['X'] = r
      ctx.variables['Y'] = theta
      return r
    }
    case 'Rec': {
      // Rec(r,θ) -> x; y 存入
      const x = args[0] * Math.cos(toRad(args[1], ctx.angleMode))
      const y = args[0] * Math.sin(toRad(args[1], ctx.angleMode))
      ctx.variables['X'] = x
      ctx.variables['Y'] = y
      return x
    }
    case 'ROOT': {
      // ROOT(a,b,c) = 一元二次方程 ax²+bx+c=0 的根（存X,Y）
      const A = args[0], B = args[1], C = args[2]
      if (A === 0) {
        // 一次方程
        ctx.variables['X'] = -C / B
        ctx.variables['Y'] = NaN
        return ctx.variables['X']
      }
      const disc = B * B - 4 * A * C
      if (disc < 0 && !ctx.complex) throw new CalcError('NO REAL ROOT')
      const sq = ctx.complex ? Complex.sqrt(new Complex(disc, 0)) : Math.sqrt(disc) as any
      ctx.variables['X'] = (-B + (sq.re ?? sq)) / (2 * A)
      ctx.variables['Y'] = (-B - (sq.re ?? sq)) / (2 * A)
      return ctx.variables['X']
    }
  }
  throw new CalcError(`UNKNOWN FUNCTION '${name}'`)
}

// ==================== 复数类型（简化） ====================
class Complex {
  constructor(public re: number, public im: number = 0) {}
  static sqrt(c: Complex): Complex {
    const a = c.re, b = c.im
    if (b === 0) {
      if (a >= 0) return new Complex(Math.sqrt(a), 0)
      return new Complex(0, Math.sqrt(-a))
    }
    const m = Math.sqrt(a * a + b * b)
    const r2 = (a + m) / 2
    const i2 = (-a + m) / 2
    return new Complex(Math.sign(b) * Math.sqrt(i2), Math.sqrt(r2))
  }
}

// ==================== 主求值函数 ====================
export function evaluate(expr: string, ctx: CalcContext): number {
  const tokens = tokenize(expr)
  if (!tokens.length) throw new CalcError('')
  const rpn = toRPN(tokens)

  const stack: number[] = []
  for (const tok of rpn) {
    switch (tok.type) {
      case 'NUM':
        stack.push(tok.num!)
        break
      case 'VAR': {
        if (tok.value === 'M') {
          stack.push(ctx.variables['M'] ?? 0)
        } else if (tok.value in ctx.variables) {
          stack.push(ctx.variables[tok.value])
        } else {
          stack.push(0)
        }
        break
      }
      case 'CONST':
        if (tok.value === 'Ans') stack.push(ctx.ans)
        else stack.push(resolveConst(tok.value))
        break
      case 'OP':
        if (tok.unary) {
          if (!stack.length) throw new CalcError('SYNTAX ERROR')
          stack.push(applyUnary(tok.value, stack.pop()!, ctx))
        } else {
          if (stack.length < 2) throw new CalcError('SYNTAX ERROR')
          const b = stack.pop()!, a = stack.pop()!
          stack.push(applyBin(tok.value, a, b))
        }
        break
      case 'FUNC': {
        const argc = tok.argc ?? 1
        if (stack.length < argc) throw new CalcError('SYNTAX ERROR')
        const args: number[] = []
        for (let k = 0; k < argc; k++) args.unshift(stack.pop()!)
        stack.push(applyFunc(tok.value, args, ctx))
        break
      }
    }
  }

  if (stack.length !== 1) throw new CalcError('SYNTAX ERROR')
  const res = stack[0]
  if (typeof res !== 'number' || isNaN(res)) throw new CalcError('MATH ERROR')
  if (!isFinite(res)) throw new CalcError('MATH ERROR (overflow)')
  return res
}

// ==================== 输出格式化 ====================
/** 输出记数模式类型（可扩展） */
export type NotationMode = 'NORMAL' | 'SCI' | 'ENG' | 'FRAC' | 'LINEAR'

export function formatNumber(val: number, options: {
  notation?: NotationMode
  precision?: number
  baseN?: BaseN
  fraction?: boolean
} = {}): string {
  const { notation = 'NORMAL', precision = 10, fraction = false } = options
  if (options.baseN && options.baseN !== 'DEC') {
    return formatBaseN(val, options.baseN)
  }
  // FRAC 模式或 fraction 选项：连分数逼近
  if (notation === 'FRAC' || fraction) {
    return formatFraction(val)
  }
  if (notation === 'LINEAR') {
    return formatLinear(val, precision)
  }
  if (notation === 'NORMAL') {
    if (!isFinite(val)) return String(val)
    const abs = Math.abs(val)
    if (abs !== 0 && (abs >= 1e10 || abs < 1e-9)) {
      return formatSci(val, precision)
    }
    return truncateToPrecision(val, precision)
  }
  if (notation === 'SCI') return formatSci(val, precision)
  if (notation === 'ENG') return formatEng(val, precision)
  return truncateToPrecision(val, precision)
}

/** 整数 → 上标数字 Unicode */
const SUP_DIGITS: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻'
}
function toSup(n: number): string {
  return String(n).split('').map(ch => SUP_DIGITS[ch] ?? ch).join('')
}

function formatSci(val: number, prec: number): string {
  if (!isFinite(val)) return String(val)
  if (val === 0) return `0×10${toSup(0)}`
  const sign = val < 0 ? '-' : ''
  const abs = Math.abs(val)
  const exp = Math.floor(Math.log10(abs))
  const mant = abs / Math.pow(10, exp)
  const mantStr = truncateToPrecision(mant, prec)
  return `${sign}${mantStr}×10${toSup(exp)}`
}

function formatEng(val: number, prec: number): string {
  if (!isFinite(val)) return String(val)
  if (val === 0) return `0×10${toSup(0)}`
  const sign = val < 0 ? '-' : ''
  const abs = Math.abs(val)
  let exp = Math.floor(Math.log10(abs))
  exp = exp - mod(exp, 3)
  const mant = abs / Math.pow(10, exp)
  const mantStr = truncateToPrecision(mant, prec)
  return `${sign}${mantStr}×10${toSup(exp)}`
}

/** LINEAR 模式：严格线性小数，不自动切换科学计数法；千分位 + 完整精度展示；极端范围降级为普通线性串 */
function formatLinear(val: number, prec: number): string {
  if (!isFinite(val)) return String(val)
  if (val === 0) return '0'
  const sign = val < 0 ? '-' : ''
  const abs = Math.abs(val)
  // 四舍五入到 prec 位有效数字（通过 toPrecision）
  let str = abs.toPrecision(prec)
  // 如果 toPrecision 返回 e 记法，把它展开成十进制
  if (str.includes('e')) {
    const [mant, expStr] = str.split('e')
    let exp = parseInt(expStr, 10)
    // 分离 mant 的整数/小数
    let m = mant.replace('.', '')
    const dotInMant = mant.includes('.') ? mant.length - 1 - mant.indexOf('.') : 0
    const totalDecimals = dotInMant - exp
    if (totalDecimals <= 0) {
      // 全部整数部分：补 0 到末尾
      str = m + '0'.repeat(-totalDecimals)
    } else {
      // 需要小数点
      const intPartLen = m.length - totalDecimals
      if (intPartLen > 0) {
        str = m.slice(0, intPartLen) + '.' + m.slice(intPartLen)
      } else {
        str = '0.' + '0'.repeat(-intPartLen) + m
      }
    }
  }
  // 去掉末尾 0
  if (str.includes('.')) {
    str = str.replace(/0+$/, '').replace(/\.$/, '')
  }
  // 限制极端长度：如果最终线性串 > 40 位，退回普通小数格式
  if (str.replace(/[.,]/g, '').length > 40) {
    str = truncateToPrecision(abs, prec)
  }
  // 加千分位（整数部分）
  const dot = str.indexOf('.')
  if (dot >= 0) {
    str = str.slice(0, dot).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + str.slice(dot)
  } else {
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return sign + str
}

function formatFraction(val: number): string {
  if (!isFinite(val)) return String(val)
  const [num, den] = toFraction(val)
  if (den === 1) return String(num)
  // 带分数形式：|num| ≥ den 时展示为 a b/c
  const sign = num < 0 ? '−' : ''
  const absNum = Math.abs(num)
  if (absNum >= den) {
    const whole = Math.floor(absNum / den)
    const rem = absNum % den
    return rem === 0 ? `${sign}${whole}` : `${sign}${whole} ${rem}⁄${den}`
  }
  return `${sign}${absNum}⁄${den}`
}

function truncateToPrecision(val: number, prec: number): string {
  if (!isFinite(val)) return String(val)
  // 先四舍五入到 prec 位有效数字
  if (val === 0) return '0'
  const abs = Math.abs(val)
  const exp = Math.floor(Math.log10(abs))
  const factor = Math.pow(10, prec - 1 - exp)
  const rounded = Math.round(val * factor) / factor
  // 转字符串，去掉末尾0
  let str = rounded.toString()
  if (str.includes('.')) {
    str = str.replace(/0+$/, '').replace(/\.$/, '')
  }
  // 处理极长的浮点尾巴 (0.1+0.2)
  if (str.length > prec + 5) {
    str = rounded.toPrecision(prec)
    if (str.includes('e')) return str
    if (str.includes('.')) str = str.replace(/0+$/, '').replace(/\.$/, '')
  }
  return str
}

function toFraction(x: number, maxDen: number = 1000000): [number, number] {
  if (!isFinite(x)) return [Math.round(x), 1]
  const sign = x < 0 ? -1 : 1
  x = Math.abs(x)
  const whole = Math.floor(x)
  let r = x - whole
  if (r < 1e-12) return [sign * whole, 1]
  // 标准连分数递推：
  //   h_{-2}=0, h_{-1}=1 ; k_{-2}=1, k_{-1}=0
  //   h_n = a_n * h_{n-1} + h_{n-2}
  //   k_n = a_n * k_{n-1} + k_{n-2}
  // a0 = floor(r) — 对小数部分恒为 0，先显式推进一次再进入循环，避免索引错位
  let a = Math.floor(r)
  let h2 = 0, h1 = 1, h = a * h1 + h2
  let k2 = 1, k1 = 0, k = a * k1 + k2
  r = r - a
  let bestN = h, bestD = k
  let bestErr = Math.abs((x - whole) - h / k)
  for (let i = 0; i < 80; i++) {
    if (r < 1e-14) break
    const inv = 1 / r
    a = Math.floor(inv)
    const hNext = a * h + h1
    const kNext = a * k + k1
    if (kNext > maxDen) {
      // 溢出前用 a' 做最后一步收敛（在分母约束下取最接近的近似）
      const aP = Math.floor((maxDen - k1) / k)
      if (aP >= 1) {
        const hP = aP * h + h1
        const kP = aP * k + k1
        const eP = Math.abs((x - whole) - hP / kP)
        if (eP < bestErr) { bestErr = eP; bestN = hP; bestD = kP }
      }
      break
    }
    h2 = h1; h1 = h; h = hNext
    k2 = k1; k1 = k; k = kNext
    const e = Math.abs((x - whole) - h / k)
    if (e < bestErr) { bestErr = e; bestN = h; bestD = k }
    if (e < 1e-14) break
    r = inv - a
  }
  const num = sign * (whole * bestD + bestN)
  const den = bestD
  const g = gcd(Math.abs(num), den)
  if (g > 1) return [num / g, den / g]
  return [num, den]
}

// ==================== 引擎导出 ====================
export interface HistoryItem {
  id: number
  expression: string
  displayExpr: string
  result: number
  resultStr: string
  time: number
  mode: CalcMode
  angleMode: AngleMode
}

export interface EngineState {
  angleMode: AngleMode
  mode: CalcMode
  baseN: BaseN
  notation: NotationMode
  variables: Record<string, number>
  memory: number // M 独立存储器
  history: HistoryItem[]
  complex: boolean
  shift: boolean
  alpha: boolean
  insert: boolean
  precision: number
}

export function createInitialState(): EngineState {
  return {
    angleMode: 'Deg',
    mode: 'COMP',
    baseN: 'DEC',
    notation: 'NORMAL',
    variables: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, X: 0, Y: 0, M: 0 },
    memory: 0,
    history: [],
    complex: false,
    shift: false,
    alpha: false,
    insert: true,
    precision: 10
  }
}

// 变量按键 STO/RCL 使用：STO A 会把结果写入 A；RCL A 会读出 A
export function createCalcCtx(state: EngineState): CalcContext {
  const vars = { ...state.variables }
  vars['M'] = state.memory
  return {
    angleMode: state.angleMode,
    mode: state.mode,
    baseN: state.baseN,
    variables: vars,
    ans: state.history.length ? state.history[state.history.length - 1].result : 0,
    complex: state.complex
  }
}

export function commitVarsBack(state: EngineState, ctx: CalcContext) {
  for (const k of Object.keys(ctx.variables)) {
    if (k === 'M') state.memory = ctx.variables[k]
    else state.variables[k] = ctx.variables[k]
  }
}

/** 简化版：以默认状态 (Deg / COMP, 空变量) 计算表达式，仅用于高级面板的辅助输入框。 */
export function evaluateRaw(expr: string): number {
  const s = createInitialState()
  const ctx = createCalcCtx(s)
  return evaluate(expr, ctx)
}

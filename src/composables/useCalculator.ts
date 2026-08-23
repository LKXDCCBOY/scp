import { computed, reactive } from 'vue'
import {
  CalcError,
  ANGLE_MODES,
  CALC_MODES,
  BASE_N,
  createInitialState,
  createCalcCtx,
  commitVarsBack,
  evaluate,
  formatNumber,
  type EngineState,
  type HistoryItem
} from '@/engine/calculator'

let _hid = Date.now()

/**
 * 计算器状态管理 Composable
 * - expression / inputBuffer：用户正在输入的表达式字符串与显示表达式
 * - cursorPos：插入位置（光标）
 * - 按键动作映射：数字、运算符、函数、修饰键 SHIFT/ALPHA/INS、模式切换等
 */
export function useCalculator() {
  const state = reactive<EngineState>(createInitialState())

  // 用户可编辑表达式（线性输入 + 光标）
  const expression = reactive({
    raw: '',         // 实际用于计算的字符串
    display: '',     // 带美化符号的显示（如 × ÷ π √ ）
    cursor: 0        // 光标在 raw 中的 index
  })

  // 计算结果缓存
  const resultState = reactive({
    value: 0,
    display: '',
    error: ''
  })

  const screen = reactive({
    shake: false
  })

  // ==================== 渲染显示表达式 ====================
  function rebuildDisplay() {
    let s = expression.raw
    s = s.replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−')
    s = s.replace(/pi/g, 'π')
    s = s.replace(/sqrt\(/g, '√(').replace(/cbrt\(/g, '∛(')
    s = s.replace(/asin/g, 'sin⁻¹').replace(/acos/g, 'cos⁻¹').replace(/atan/g, 'tan⁻¹')
    s = s.replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^\(-1\)/g, '⁻¹')
    s = s.replace(/log2/g, 'log₂').replace(/log10/g, 'log')
    s = s.replace(/sinh/g, 's_h').replace(/cosh/g, 'c_h').replace(/tanh/g, 't_h')
    expression.display = s
  }

  // ==================== 表达式编辑 ====================
  function insertAtCursor(text: string, displayText?: string) {
    const raw = expression.raw
    expression.raw = raw.slice(0, expression.cursor) + text + raw.slice(expression.cursor)
    expression.cursor += text.length
    rebuildDisplay()
  }

  function backspace() {
    if (expression.cursor === 0) return
    // 先尝试整体删除"函数名+括号"
    let cut = 1
    const before = expression.raw.slice(0, expression.cursor)
    // 匹配已知函数名 (结尾是 '(')
    const funcs = [
      'sin⁻¹(', 'cos⁻¹(', 'tan⁻¹(', 'sin(', 'cos(', 'tan(',
      'asin(', 'acos(', 'atan(',
      'sinh(', 'cosh(', 'tanh(', 'asinh(', 'acosh(', 'atanh(',
      'sqrt(', 'cbrt(', 'ln(', 'log(', 'log2(', 'log10(',
      'abs(', 'exp(', 'floor(', 'ceil(', 'round(', 'trunc(', 'Int(', 'Frac(',
      'Pol(', 'Rec(', 'nCr(', 'nPr(', 'GCD(', 'LCM(',
      'RanInt#('
    ]
    // 映射 raw 里的写法
    const rawFuncs = [
      'sin(', 'cos(', 'tan(', 'asin(', 'acos(', 'atan(',
      'sinh(', 'cosh(', 'tanh(', 'asinh(', 'acosh(', 'atanh(',
      'sqrt(', 'cbrt(', 'ln(', 'log(', 'log2(', 'log10(',
      'abs(', 'exp(', 'floor(', 'ceil(', 'round(', 'trunc(', 'Int(', 'Frac(',
      'Pol(', 'Rec(', 'nCr(', 'nPr(', 'GCD(', 'LCM(',
      'RanInt#(', 'Ran#(', 'Rnd(', 'fact(', 'exp(', 'sign(',
      'squared(', 'cubed(', 'inv(', 'deg(', 'rad(', 'frac(', 'int(',
      'sin²(', 'cos²(', 'tan²('
    ]
    for (const fn of rawFuncs) {
      if (before.endsWith(fn)) { cut = fn.length; break }
    }
    expression.raw = before.slice(0, before.length - cut) + expression.raw.slice(expression.cursor)
    expression.cursor -= cut
    rebuildDisplay()
  }

  function clearAll() {
    expression.raw = ''
    expression.display = ''
    expression.cursor = 0
    resultState.error = ''
    resultState.display = ''
    state.shift = false
    state.alpha = false
  }

  function clearEntry() {
    // 删除整个表达式
    clearAll()
  }

  function moveCursorLeft() {
    if (expression.cursor > 0) expression.cursor--
    rebuildDisplay()
  }
  function moveCursorRight() {
    if (expression.cursor < expression.raw.length) expression.cursor++
    rebuildDisplay()
  }
  function moveCursorStart() { expression.cursor = 0; rebuildDisplay() }
  function moveCursorEnd() { expression.cursor = expression.raw.length; rebuildDisplay() }

  // ==================== 执行计算 ====================
  function execute(strictEmpty = true) {
    if (!expression.raw.trim()) {
      if (strictEmpty) return
    }
    try {
      const ctx = createCalcCtx(state)
      const expr = expression.raw.trim() || `${state.history.length ? state.history[state.history.length - 1].result : 0}`
      const val = evaluate(expr, ctx)
      const formatted = formatNumber(val, {
        notation: state.notation,
        precision: state.precision,
        baseN: state.mode === 'BASE-N' ? state.baseN : undefined
      })
      resultState.value = val
      resultState.display = formatted
      resultState.error = ''
      commitVarsBack(state, ctx)
      state.memory = ctx.variables['M'] ?? state.memory
      // Ans = result
      const last = state.history[state.history.length - 1]
      const ansVal = last?.result ?? 0
      ctx.variables['Ans'] = ansVal
      // 记录历史
      const historyItem: HistoryItem = {
        id: ++_hid,
        expression: expr,
        displayExpr: expression.display || expr,
        result: val,
        resultStr: formatted,
        time: Date.now(),
        mode: state.mode,
        angleMode: state.angleMode
      }
      state.history.unshift(historyItem)
      if (state.history.length > 200) state.history.pop()
      // 重置 shift/alpha
      state.shift = false
      state.alpha = false
    } catch (err) {
      const msg = err instanceof CalcError ? err.message : 'ERROR'
      resultState.error = msg
      resultState.display = ''
      screen.shake = true
      setTimeout(() => (screen.shake = false), 400)
    }
  }

  function useHistory(item: HistoryItem) {
    expression.raw = item.expression
    expression.cursor = expression.raw.length
    rebuildDisplay()
  }

  // ==================== 模式切换 ====================
  function cycleAngleMode() {
    const i = ANGLE_MODES.indexOf(state.angleMode)
    state.angleMode = ANGLE_MODES[(i + 1) % ANGLE_MODES.length]
  }
  function cycleMode() {
    const i = CALC_MODES.indexOf(state.mode)
    state.mode = CALC_MODES[(i + 1) % CALC_MODES.length]
    if (state.mode === 'BASE-N') state.baseN = 'DEC'
  }
  function cycleNotation() {
    const opts: EngineState['notation'][] = ['NORMAL', 'SCI', 'ENG']
    const i = opts.indexOf(state.notation)
    state.notation = opts[(i + 1) % opts.length]
  }
  function cycleBaseN() {
    const i = BASE_N.indexOf(state.baseN)
    state.baseN = BASE_N[(i + 1) % BASE_N.length]
  }
  function toggleShift() { state.shift = !state.shift; state.alpha = false }
  function toggleAlpha() { state.alpha = !state.alpha; state.shift = false }
  function toggleInsert() { state.insert = !state.insert }

  // ==================== 存储器 M 操作 ====================
  function memoryClear() { state.memory = 0 }
  function memoryRecall() {
    insertAtCursor(String(state.memory))
  }
  function memoryAdd() {
    // M+ 把当前结果/表达式结果加到 M
    try {
      const ctx = createCalcCtx(state)
      const v = evaluate(expression.raw || '0', ctx)
      state.memory += v
      resultState.display = `M = ${formatNumber(state.memory)}`
    } catch {}
  }
  function memorySub() {
    try {
      const ctx = createCalcCtx(state)
      const v = evaluate(expression.raw || '0', ctx)
      state.memory -= v
      resultState.display = `M = ${formatNumber(state.memory)}`
    } catch {}
  }
  function memoryStore() {
    // 触发 STO 模式：下一个按键 (A-F/X/Y/M) 作为目标变量
    pendingStore = true
    state.alpha = true
  }
  function memoryRcl() {
    pendingRcl = true
    state.alpha = true
  }

  let pendingStore = false
  let pendingRcl = false

  // 变量按键 (A-F/X/Y/M) 按下
  function handleVariableKey(v: string) {
    if (pendingStore) {
      try {
        const ctx = createCalcCtx(state)
        const val = expression.raw ? evaluate(expression.raw, ctx) : state.history[0]?.result ?? 0
        if (v === 'M') state.memory = val
        else state.variables[v] = val
        resultState.display = `${v} = ${formatNumber(val)}`
      } catch {}
      pendingStore = false
      state.alpha = false
      return
    }
    if (pendingRcl) {
      const val = v === 'M' ? state.memory : (state.variables[v] ?? 0)
      insertAtCursor(String(val))
      pendingRcl = false
      state.alpha = false
      return
    }
    insertAtCursor(v)
  }

  // ==================== 统一按键分发 ====================
  /**
   * 执行一个按键动作
   * @param key 按键 id（语义id，如 'sin','7','+','=','SHIFT','MODE','M+' 等）
   */
  function pressKey(key: string) {
    // Shift / Alpha 修饰：先判断是否覆盖
    const shift = state.shift
    const alpha = state.alpha
    if (!shift && !alpha && key === 'SHIFT') { toggleShift(); return }
    if (!shift && !alpha && key === 'ALPHA') { toggleAlpha(); return }
    if (!shift && !alpha && key === 'INS') { toggleInsert(); return }

    // 变量键
    if (alpha && !shift) {
      const map: Record<string, string> = {
        'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F',
        'X': 'X', 'Y': 'Y', 'M': 'M',
        '(-)': 'A', '.,': 'B', 'Hyp': 'C',
        'sin': 'D', 'cos': 'E', 'tan': 'F',
        'log': 'X', 'ln': 'Y'
      }
      if (key in map) { handleVariableKey(map[key]); return }
      // STO / RCL 是直接功能，不走 alpha 变量
    }

    // Shift 映射（卡西欧 shift 下的第二功能）
    if (shift && !alpha) {
      const shiftMap: Record<string, string> = {
        // 反三角
        'sin': 'asin(', 'cos': 'acos(', 'tan': 'atan(',
        // 反双曲
        'sinh': 'asinh(', 'cosh': 'acosh(', 'tanh': 'atanh(',
        // 对数反函数
        'log': '10^(', 'ln': 'exp(',
        // 幂/根
        'x²': 'cbrt(', 'x³': '^(-1)', '^': 'sqrt(',
        // 取整
        '(': 'abs(', ')': 'floor(',
        // 常量交换
        'pi': 'e', 'Ans': 'pi',
        // 排列组合
        'nPr': 'nCr(', 'Pol': 'Rec(',
        // 其他
        '(-)': 'abs(', 'EXP': 'exp(', 'DRG': '__CYCLE_ANGLE__',
        'ENG': '__CYCLE_NOTATION__', 'DEL': '__TOGGLE_INS__',
        'MC': '__MR__', 'Off': '__NOOP__', 'x!': 'nPr(',
        '.': 'RanInt#('
      }
      if (key in shiftMap) {
        const mapped = shiftMap[key]
        state.shift = false
        if (mapped === '__CYCLE_ANGLE__') { cycleAngleMode(); return }
        if (mapped === '__CYCLE_NOTATION__') { cycleNotation(); return }
        if (mapped === '__TOGGLE_INS__') { toggleInsert(); return }
        if (mapped === '__MR__') { memoryRecall(); return }
        if (mapped === '__NOOP__') { return }
        if (mapped) { insertAtCursor(mapped); return }
      }
    }

    // 清除 pending
    if (!pendingStore && !pendingRcl && key !== 'STO' && key !== 'RCL') {
      pendingStore = false
      pendingRcl = false
    }

    // 按键分类
    const k = key
    if (/^[0-9]$/.test(k)) { insertAtCursor(k); return }
    if (k === '.') { insertAtCursor('.'); return }
    if (k === '(') { insertAtCursor('('); return }
    if (k === ')') { insertAtCursor(')'); return }
    if (k === '+') { insertAtCursor('+'); return }
    if (k === '-') { insertAtCursor('-'); return }
    if (k === '×' || k === '*') { insertAtCursor('*'); return }
    if (k === '÷' || k === '/') { insertAtCursor('/'); return }
    if (k === '^') { insertAtCursor('^'); return }
    if (k === '%') { insertAtCursor('%'); return }
    if (k === '!') { insertAtCursor('!'); return }
    if (k === '(-)') { insertAtCursor('-'); return }
    if (k === 'EXP' || k === 'x10^') { insertAtCursor('E'); return }
    if (k === 'pi') { insertAtCursor('pi'); return }
    if (k === 'e') { insertAtCursor('e'); return }
    if (k === 'Ans') { insertAtCursor('Ans'); return }

    // 函数直接输入
    const funcMap: Record<string, string> = {
      'sin': 'sin(', 'cos': 'cos(', 'tan': 'tan(',
      'sinh': 'sinh(', 'cosh': 'cosh(', 'tanh': 'tanh(',
      'log': 'log(', 'ln': 'ln(', 'log2': 'log2(',
      'sqrt': 'sqrt(', 'cbrt': 'cbrt(', 'abs': 'abs(',
      'asin': 'asin(', 'acos': 'acos(', 'atan': 'atan(',
      'asinh': 'asinh(', 'acosh': 'acosh(', 'atanh': 'atanh(',
      'exp': 'exp(', 'floor': 'floor(', 'ceil': 'ceil(',
      'nPr': 'nPr(', 'nCr': 'nCr(', 'Pol': 'Pol(', 'Rec': 'Rec(',
      'inv': '^(-1)', 'rand': 'Ran#('
    }
    if (funcMap[k]) { insertAtCursor(funcMap[k]); return }

    // 幂运算快捷
    if (k === 'x²') { insertAtCursor('^2'); return }
    if (k === 'x³') { insertAtCursor('^3'); return }
    if (k === 'x!') { insertAtCursor('!'); return }

    // 编辑
    if (k === 'DEL') { backspace(); return }
    if (k === 'AC') { clearAll(); return }
    if (k === '◀') { moveCursorLeft(); return }
    if (k === '▶') { moveCursorRight(); return }
    if (k === '▲') { moveCursorStart(); return }
    if (k === '▼') { moveCursorEnd(); return }

    // 等号
    if (k === '=' || k === 'EXE' || k === 'ENTER') {
      execute(false)
      return
    }

    // 存储器
    if (k === 'STO') { memoryStore(); return }
    if (k === 'RCL') { memoryRcl(); return }
    if (k === 'M+') { memoryAdd(); return }
    if (k === 'M-') { memorySub(); return }
    if (k === 'MR') { memoryRecall(); return }
    if (k === 'MC') { memoryClear(); return }

    // 模式
    if (k === 'MODE') { cycleMode(); return }
    if (k === 'SETUP') { state.shift = true; cycleAngleMode(); return }
    if (k === 'DRG') { cycleAngleMode(); return }
    if (k === 'ENG') { cycleNotation(); return }
    if (k === 'NORM') { cycleNotation(); return }
    if (k === 'HYP') { insertAtCursor('sinh('); return }

    // 逗号
    if (k === ',') { insertAtCursor(','); return }

    // 常量
    if (k === 'CONST') { insertAtCursor('pi'); return }
  }

  function insertFunc(s: string) { insertAtCursor(s) }

  // ==================== 计算派生值 ====================
  const lastHistory = computed(() => state.history[0])
  const memoryNotEmpty = computed(() => state.memory !== 0)

  return {
    state,
    expression,
    resultState,
    screen,
    lastHistory,
    memoryNotEmpty,
    // actions
    pressKey,
    clearAll,
    backspace,
    execute,
    useHistory,
    cycleAngleMode,
    cycleMode,
    cycleNotation,
    cycleBaseN,
    toggleShift,
    toggleAlpha
  }
}

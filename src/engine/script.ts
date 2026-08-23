import { evaluate, type AngleMode } from './calculator'

/**
 * 最小数学脚本解释器 (类 Python 语法子集)
 * 支持: 赋值、print、for x in range(a,b)、if、数学表达式、函数定义、注释
 * 表达式复用 calculator.ts 引擎，支持科学函数
 */

export interface ScriptContext {
  vars: Record<string, number | string>
  angleMode: AngleMode
}

export interface ScriptResult {
  output: string[]
  vars: Record<string, number | string>
  error?: string
}

/** 运行数学脚本 */
export function runScript(code: string, ctx: Partial<ScriptContext> = {}): ScriptResult {
  const output: string[] = []
  const vars: Record<string, number | string> = { ...(ctx.vars ?? {}) }
  const angleMode: AngleMode = (ctx.angleMode ?? 'Deg')

  try {
    const lines = code.split(/\r?\n/)
    let i = 0
    while (i < lines.length) {
      const raw = lines[i]
      const line = stripComment(raw).trimEnd()
      if (!line.trim()) { i++; continue }

      // 处理多行块: for / if / def
      const blockMatch = line.match(/^(for|if|def)\s+(.+):\s*$/)
      if (blockMatch) {
        const blockType = blockMatch[1]
        const blockHead = blockMatch[2].trim()
        // 收集缩进块
        const blockLines: string[] = []
        i++
        let baseIndent = -1
        while (i < lines.length) {
          const bl = lines[i]
          const trimmed = bl.replace(/\t/g, '  ')
          if (!trimmed.trim() && !stripComment(trimmed).trim()) { i++; continue }
          const indent = trimmed.match(/^\s*/)?.[0].length ?? 0
          if (baseIndent < 0) baseIndent = indent
          if (indent < baseIndent) break
          blockLines.push(trimmed.slice(baseIndent))
          i++
        }
        if (blockType === 'for') {
          execFor(blockHead, blockLines, { vars, angleMode }, output)
        } else if (blockType === 'if') {
          execIf(blockHead, blockLines, lines.slice(i), { vars, angleMode }, output)
          // execIf 已返回消耗行，重新定位（当前只支持单块无else，不消耗外部行）
        } else if (blockType === 'def') {
          execDef(blockHead, blockLines, vars)
        }
        continue
      }

      execStatement(line, { vars, angleMode }, output)
      i++
    }
    return { output, vars }
  } catch (e: any) {
    return {
      output,
      vars,
      error: e?.message || String(e)
    }
  }
}

function stripComment(line: string): string {
  let out = ''
  let inStr: string | null = null
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inStr) {
      out += ch
      if (ch === inStr && line[i - 1] !== '\\') inStr = null
    } else if (ch === '#' || ch === ';') {
      break
    } else {
      out += ch
      if (ch === '"' || ch === "'") inStr = ch
    }
  }
  return out
}

function evalExpr(expr: string, ctx: ScriptContext): number | string {
  if (/^["'].*["']$/.test(expr.trim())) {
    return expr.trim().slice(1, -1)
  }
  const variables: Record<string, number> = { pi: Math.PI, e: Math.E }
  for (const k of Object.keys(ctx.vars)) {
    const v = ctx.vars[k]
    if (typeof v === 'number') variables[k] = v
  }
  const n = evaluate(expr, {
    angleMode: ctx.angleMode,
    mode: 'COMP',
    baseN: 'DEC',
    variables,
    ans: 0,
    complex: false
  })
  return n
}

function execStatement(line: string, ctx: ScriptContext, output: string[]) {
  // print
  const printM = line.match(/^print\s*\((.*)\)\s*$/)
  if (printM) {
    const parts = splitArgs(printM[1])
    const str = parts.map(p => formatValue(evalPart(p, ctx))).join(' ')
    output.push(str)
    return
  }
  // 赋值
  const assignM = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/)
  if (assignM) {
    const name = assignM[1]
    const rhs = assignM[2].trim()
    const val = evalPart(rhs, ctx)
    ctx.vars[name] = val
    return
  }
  // 函数调用（忽略返回值但允许其副作用如 print）
  if (/^[A-Za-z_][A-Za-z0-9_]*\s*\(/.test(line)) {
    evalPart(line, ctx)
    return
  }
  // 裸表达式 — 输出值
  if (line.trim()) {
    const val = evalPart(line, ctx)
    if (typeof val === 'number') {
      output.push(formatValue(val))
    }
  }
}

type UserFn = { params: string[]; body: string[] }
const userFns = new Map<string, UserFn>()

function execDef(head: string, body: string[], vars: Record<string, number | string>) {
  const m = head.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\((.*)\)\s*$/)
  if (!m) throw new Error(`SyntaxError: invalid function definition 'def ${head}:'`)
  const name = m[1]
  const params = m[2].split(',').map(s => s.trim()).filter(Boolean)
  userFns.set(name, { params, body })
}

function evalPart(expr: string, ctx: ScriptContext): number | string {
  expr = expr.trim()
  if (!expr) return 0

  // 字符串字面量
  const strM = expr.match(/^["'](.*)["']$/)
  if (strM) return strM[1]

  // 用户函数调用
  const fnM = expr.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\((.*)\)$/)
  if (fnM && userFns.has(fnM[1])) {
    const fn = userFns.get(fnM[1])!
    const argVals = splitArgs(fnM[2]).map(a => evalPart(a, ctx))
    const localVars: Record<string, number | string> = { ...ctx.vars }
    fn.params.forEach((p, idx) => { localVars[p] = argVals[idx] ?? 0 })
    const subCtx: ScriptContext = { vars: localVars, angleMode: ctx.angleMode }
    const localOutputs: string[] = []
    for (const bl of fn.body) {
      execStatement(stripComment(bl).trimEnd(), subCtx, localOutputs)
    }
    // 返回值使用特殊变量 returnValue（当前不支持 return 语句，最后一个赋值为结果或 0）
    return 0
  }

  // 数字字面量
  if (/^-?\d+(\.\d+)?$/.test(expr)) return parseFloat(expr)

  // 单变量
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(expr)) {
    if (expr in ctx.vars) {
      return ctx.vars[expr]
    }
  }

  // 字符串拼接简单处理：检测 "a"+x 场景
  if (/["']/.test(expr) && /\+/.test(expr)) {
    return evalStringConcat(expr, ctx)
  }

  // 数学表达式
  try {
    return evalExpr(expr, ctx)
  } catch {
    return 0
  }
}

function evalStringConcat(expr: string, ctx: ScriptContext): string {
  // 简易：按 + 切分分别求值然后拼接
  const parts: string[] = []
  let buf = ''
  let depth = 0
  let inStr: string | null = null
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i]
    if (inStr) {
      buf += ch
      if (ch === inStr) inStr = null
    } else if (ch === '"' || ch === "'") {
      buf += ch
      inStr = ch
    } else if (ch === '(') { depth++; buf += ch }
    else if (ch === ')') { depth--; buf += ch }
    else if (ch === '+' && depth === 0) {
      parts.push(buf); buf = ''
    } else {
      buf += ch
    }
  }
  if (buf) parts.push(buf)
  return parts.map(p => String(evalPart(p.trim(), ctx))).join('')
}

function splitArgs(s: string): string[] {
  const out: string[] = []
  let cur = ''
  let depth = 0
  let inStr: string | null = null
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (inStr) {
      cur += ch
      if (ch === inStr) inStr = null
    } else if (ch === '"' || ch === "'") {
      cur += ch; inStr = ch
    } else if (ch === '(') { depth++; cur += ch }
    else if (ch === ')') { depth--; cur += ch }
    else if (ch === ',' && depth === 0) {
      out.push(cur.trim()); cur = ''
    } else {
      cur += ch
    }
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

function formatValue(v: number | string): string {
  if (typeof v === 'string') return v
  if (Number.isInteger(v)) return String(v)
  // 去掉浮点误差
  if (Math.abs(Math.round(v * 1e10) / 1e10 - v) < 1e-12) {
    return parseFloat(v.toFixed(10)).toString()
  }
  return parseFloat(v.toPrecision(12)).toString()
}

function execFor(head: string, body: string[], ctx: ScriptContext, output: string[]) {
  const m = head.match(/^([A-Za-z_][A-Za-z0-9_]*)\s+in\s+range\s*\((.+)\)$/)
  if (!m) throw new Error(`SyntaxError: invalid for loop 'for ${head}:'`)
  const varName = m[1]
  const rangeArgs = splitArgs(m[2]).map(a => Number(evalPart(a, ctx)))
  let start = 0, stop = 0, step = 1
  if (rangeArgs.length === 1) { stop = rangeArgs[0] }
  else if (rangeArgs.length === 2) { start = rangeArgs[0]; stop = rangeArgs[1] }
  else if (rangeArgs.length >= 3) { start = rangeArgs[0]; stop = rangeArgs[1]; step = rangeArgs[2] }

  const safe = Math.min(100000, Math.abs((stop - start) / Math.max(0.0001, Math.abs(step))) + 10)
  let count = 0
  if (step > 0) {
    for (let v = start; v < stop; v += step) {
      if (count++ > safe) throw new Error('Loop too many iterations (>100k)')
      ctx.vars[varName] = v
      for (const bl of body) {
        execStatement(stripComment(bl).trimEnd(), ctx, output)
      }
    }
  } else {
    for (let v = start; v > stop; v += step) {
      if (count++ > safe) throw new Error('Loop too many iterations (>100k)')
      ctx.vars[varName] = v
      for (const bl of body) {
        execStatement(stripComment(bl).trimEnd(), ctx, output)
      }
    }
  }
}

function execIf(head: string, body: string[], _rest: string[], ctx: ScriptContext, output: string[]) {
  const cond = evalCondition(head, ctx)
  if (cond) {
    for (const bl of body) {
      execStatement(stripComment(bl).trimEnd(), ctx, output)
    }
  }
}

function evalCondition(cond: string, ctx: ScriptContext): boolean {
  // 支持 and/or/not 以及比较 ==, !=, <, <=, >, >=
  // 简化：按优先级分组
  const ops: Array<[string, (a: boolean, b: boolean) => boolean]> = [
    [' or ', (a, b) => a || b],
    [' and ', (a, b) => a && b]
  ]
  for (const [op, fn] of ops) {
    const idx = cond.indexOf(op)
    if (idx > 0) {
      const left = cond.slice(0, idx)
      const right = cond.slice(idx + op.length)
      return fn(evalCondition(left, ctx), evalCondition(right, ctx))
    }
  }
  if (cond.startsWith('not ')) return !evalCondition(cond.slice(4), ctx)

  const cmp = cond.match(/^(.+?)\s*(==|!=|<=|>=|<|>)\s*(.+)$/)
  if (cmp) {
    const a = numOrNaN(evalPart(cmp[1].trim(), ctx))
    const b = numOrNaN(evalPart(cmp[3].trim(), ctx))
    const op = cmp[2]
    switch (op) {
      case '==': return a === b
      case '!=': return a !== b
      case '<':  return a < b
      case '<=': return a <= b
      case '>':  return a > b
      case '>=': return a >= b
    }
  }
  const v = numOrNaN(evalPart(cond.trim(), ctx))
  return Boolean(v) && !isNaN(v)
}

function numOrNaN(v: number | string): number {
  if (typeof v === 'number') return v
  return NaN
}

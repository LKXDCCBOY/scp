/**
 * 扩展数学工具库（高端科学计算器功能）
 *  - 方程求解：二分 + 牛顿迭代（任意单变量方程）、二次/三次闭式解、二元/三元线性方程组
 *  - 矩阵：加法、减法、数乘、乘法、转置、行列式、逆、秩、LU 分解
 *  - 向量：加法、内积、外积（3D）、模、夹角、归一化、投影
 *  - 微积分：符号前向微分（基础函数集）、数值积分 (Simpson 1/3 + adaptive)、数值微分（中心差分）
 *  - 统计：均值、方差（样本/总体）、标准差、协方差、线性回归（y = a + b·x）、相关系数
 */

import { CalcError } from './calculator'

export type Matrix = number[][]
export type Vector = number[]

// ============================================================
// 方程求解
// ============================================================

/** 二次方程：ax² + bx + c = 0，返回复数根（用 [re,im] 数组表示） */
export function solveQuadratic(a: number, b: number, c: number): [number, number][] {
  if (!isFinite(a) || !isFinite(b) || !isFinite(c)) throw new CalcError('INVALID PARAM')
  if (Math.abs(a) < 1e-30) {
    // 退化为线性方程
    if (Math.abs(b) < 1e-30) return []
    return [[-c / b, 0]]
  }
  const disc = b * b - 4 * a * c
  const half = -b / (2 * a)
  if (disc >= 0) {
    const s = Math.sqrt(disc) / (2 * a)
    return [[half + s, 0], [half - s, 0]]
  } else {
    const s = Math.sqrt(-disc) / (2 * a)
    return [[half, s], [half, -s]]
  }
}

/** 三次方程：ax³ + bx² + cx + d = 0，Cardano 法，返回复数根 */
export function solveCubic(a: number, b: number, c: number, d: number): [number, number][] {
  if (!isFinite(a) || !isFinite(b) || !isFinite(c) || !isFinite(d)) throw new CalcError('INVALID PARAM')
  if (Math.abs(a) < 1e-30) return solveQuadratic(b, c, d)
  // 归一化 x³ + px + q = 0（depressed cubic）
  const p = (3 * a * c - b * b) / (3 * a * a)
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)
  const shift = -b / (3 * a)
  const disc = (q * q) / 4 + (p * p * p) / 27
  if (disc > 0) {
    const sq = Math.sqrt(disc)
    const u = Math.cbrt(-q / 2 + sq)
    const v = Math.cbrt(-q / 2 - sq)
    return [
      [shift + u + v, 0],
      [shift - (u + v) / 2, ((u - v) * Math.sqrt(3)) / 2],
      [shift - (u + v) / 2, -((u - v) * Math.sqrt(3)) / 2]
    ]
  }
  const r = Math.sqrt(-(p * p * p) / 27)
  const theta = Math.acos(Math.min(1, Math.max(-1, -q / (2 * r))))
  const k = 2 * Math.cbrt(r)
  const out: [number, number][] = []
  for (let i = 0; i < 3; i++) {
    out.push([shift + k * Math.cos((theta + 2 * Math.PI * i) / 3), 0])
  }
  return out
}

/** 一般非线性方程求根：f(x) = 0，混合方法：Bisection + Secant 兜底
 *  bracket: [lo, hi] 必须包含一个根（异号），给出初始搜索范围
 */
export function solveOneVar(f: (x: number) => number, lo = -1e6, hi = 1e6, tol = 1e-11, maxIter = 200): number {
  // 先用扩张法找一个异号区间
  let a = lo, b = hi, fa = f(a), fb = f(b)
  if (!isFinite(fa) || !isFinite(fb)) throw new CalcError('ERROR IN FUNCTION')
  // 如果两端同号，在 [a,b] 内扫描看是否存在异号子区间
  if (fa * fb > 0) {
    const N = 400
    let step = (b - a) / N
    let prev = fa, prevX = a
    let found = false
    for (let i = 1; i <= N; i++) {
      const x = a + step * i
      const y = f(x)
      if (!isFinite(y)) continue
      if (prev * y <= 0) { a = prevX; b = x; fa = prev; fb = y; found = true; break }
      prev = y; prevX = x
    }
    if (!found) {
      // 尝试 Brent-Style 扫描最小绝对值附近
      let best = fa, bx = a, by = fa
      for (let i = 0; i <= N; i++) {
        const x = a + ((b - a) * i) / N
        const y = Math.abs(f(x))
        if (y < by) { by = y; bx = x }
      }
      // 牛顿法从 bx 开始
      return _newton(f, bx, tol, maxIter)
    }
  }
  // 二分 + 加速
  let lastB = b
  for (let iter = 0; iter < maxIter; iter++) {
    const mid = (a + b) / 2
    const fm = f(mid)
    if (!isFinite(fm)) break
    if (Math.abs(fm) < tol || Math.abs(b - a) < tol) return mid
    if (fa * fm <= 0) { b = mid; fb = fm } else { a = mid; fa = fm }
    // 尝试 Illinois 线性插值加速一次
    if (iter % 2 === 1 && b !== lastB) {
      const s = b - fb * (b - a) / (fb - fa)
      if (s > Math.min(a, b) && s < Math.max(a, b)) {
        const fs = f(s)
        if (isFinite(fs)) {
          if (fa * fs <= 0) { b = s; fb = fs } else { a = s; fa = fs }
        }
      }
    }
    lastB = b
  }
  return (a + b) / 2
}

function _newton(f: (x: number) => number, x0: number, tol: number, maxIter: number): number {
  let x = x0, fx = f(x)
  for (let i = 0; i < maxIter; i++) {
    if (!isFinite(fx)) break
    if (Math.abs(fx) < tol) return x
    const h = Math.max(1e-8, Math.abs(x) * 1e-8)
    const df = (f(x + h) - f(x - h)) / (2 * h)
    if (!isFinite(df) || Math.abs(df) < 1e-20) break
    const next = x - fx / df
    if (!isFinite(next)) break
    if (Math.abs(next - x) < tol) return next
    x = next
    fx = f(x)
  }
  return x
}

/** 解 n 元线性方程组：A·x = b，Gauss 部分主元消元 */
export function solveLinear(A: Matrix, b: Vector): Vector {
  const n = A.length
  if (n === 0) return []
  if (!A.every(r => r.length === n)) throw new CalcError('MAT DIM')
  if (b.length !== n) throw new CalcError('VEC DIM')
  // 构造增广矩阵
  const aug = A.map((r, i) => [...r, b[i]])
  for (let i = 0; i < n; i++) {
    // 部分主元
    let pivotRow = i
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(aug[r][i]) > Math.abs(aug[pivotRow][i])) pivotRow = r
    }
    if (Math.abs(aug[pivotRow][i]) < 1e-18) throw new CalcError('SINGULAR')
    if (pivotRow !== i) [aug[i], aug[pivotRow]] = [aug[pivotRow], aug[i]]
    for (let r = i + 1; r < n; r++) {
      const factor = aug[r][i] / aug[i][i]
      for (let c = i; c <= n; c++) aug[r][c] -= factor * aug[i][c]
    }
  }
  // 回代
  const x = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    let s = aug[i][n]
    for (let j = i + 1; j < n; j++) s -= aug[i][j] * x[j]
    x[i] = s / aug[i][n]
  }
  return x
}

// ============================================================
// 矩阵工具
// ============================================================

export function matNew(rows: number, cols: number, fill = 0): Matrix {
  return Array.from({ length: rows }, () => new Array(cols).fill(fill))
}
export function matClone(A: Matrix): Matrix { return A.map(r => r.slice()) }
export function matEye(n: number): Matrix {
  const M = matNew(n, n)
  for (let i = 0; i < n; i++) M[i][i] = 1
  return M
}
export function matAdd(A: Matrix, B: Matrix): Matrix {
  if (A.length !== B.length || A[0].length !== B[0].length) throw new CalcError('MAT DIM')
  return A.map((r, i) => r.map((v, j) => v + B[i][j]))
}
export function matSub(A: Matrix, B: Matrix): Matrix {
  if (A.length !== B.length || A[0].length !== B[0].length) throw new CalcError('MAT DIM')
  return A.map((r, i) => r.map((v, j) => v - B[i][j]))
}
export function matScale(A: Matrix, s: number): Matrix {
  return A.map(r => r.map(v => v * s))
}
export function matMul(A: Matrix, B: Matrix): Matrix {
  const r = A.length, k = A[0].length, c = B[0].length
  if (B.length !== k) throw new CalcError('MAT DIM')
  const C = matNew(r, c)
  for (let i = 0; i < r; i++) {
    const Ai = A[i]
    for (let p = 0; p < k; p++) {
      const aip = Ai[p]
      if (aip === 0) continue
      const Bp = B[p]
      for (let j = 0; j < c; j++) C[i][j] += aip * Bp[j]
    }
  }
  return C
}
export function matTranspose(A: Matrix): Matrix {
  const r = A.length, c = A[0].length
  const T = matNew(c, r)
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) T[j][i] = A[i][j]
  return T
}

/** LU 分解（Doolittle，无行交换），返回 {L,U}。若奇异返回 null。
 *  仅作数值辅助（det、inv），一般求解已用带主元消元。 */
export function matLU(A: Matrix): { L: Matrix; U: Matrix } | null {
  const n = A.length
  if (A[0].length !== n) throw new CalcError('MAT DIM')
  const L = matEye(n), U = matNew(n, n)
  const M = matClone(A)
  for (let i = 0; i < n; i++) {
    if (Math.abs(M[i][i]) < 1e-18) return null
    for (let j = i; j < n; j++) {
      let s = M[i][j]
      for (let k = 0; k < i; k++) s -= L[i][k] * U[k][j]
      U[i][j] = s
    }
    for (let r = i + 1; r < n; r++) {
      let s = M[r][i]
      for (let k = 0; k < i; k++) s -= L[r][k] * U[k][i]
      L[r][i] = s / U[i][i]
    }
  }
  return { L, U }
}

export function matDet(A: Matrix): number {
  const n = A.length
  if (A[0].length !== n) throw new CalcError('MAT DIM')
  // 基于高斯消元求行列式（部分主元）
  const M = matClone(A)
  let det = 1
  for (let i = 0; i < n; i++) {
    let pivot = i
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(M[r][i]) > Math.abs(M[pivot][i])) pivot = r
    }
    if (Math.abs(M[pivot][i]) < 1e-18) return 0
    if (pivot !== i) { [M[i], M[pivot]] = [M[pivot], M[i]]; det = -det }
    det *= M[i][i]
    for (let r = i + 1; r < n; r++) {
      const f = M[r][i] / M[i][i]
      for (let c = i; c < n; c++) M[r][c] -= f * M[i][c]
    }
  }
  return det
}

export function matInv(A: Matrix): Matrix {
  const n = A.length
  if (A[0].length !== n) throw new CalcError('MAT DIM')
  // 增广：[A | I] → [I | A⁻¹]
  const aug = A.map((r, i) => {
    const row = [...r]
    for (let j = 0; j < n; j++) row.push(i === j ? 1 : 0)
    return row
  })
  for (let i = 0; i < n; i++) {
    let pivot = i
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(aug[r][i]) > Math.abs(aug[pivot][i])) pivot = r
    }
    if (Math.abs(aug[pivot][i]) < 1e-18) throw new CalcError('SINGULAR')
    if (pivot !== i) [aug[i], aug[pivot]] = [aug[pivot], aug[i]]
    const piv = aug[i][i]
    for (let c = i; c < 2 * n; c++) aug[i][c] /= piv
    for (let r = 0; r < n; r++) {
      if (r === i) continue
      const f = aug[r][i]
      if (Math.abs(f) < 1e-30) continue
      for (let c = i; c < 2 * n; c++) aug[r][c] -= f * aug[i][c]
    }
  }
  return aug.map(r => r.slice(n))
}

/** 矩阵的秩（基于 RREF，以 1e-12 容差判断） */
export function matRank(A: Matrix): number {
  const r = A.length, c = A[0].length
  const M = matClone(A)
  let rank = 0
  let col = 0
  for (let row = 0; row < r && col < c;) {
    let pivot = row
    for (let k = row + 1; k < r; k++) {
      if (Math.abs(M[k][col]) > Math.abs(M[pivot][col])) pivot = k
    }
    if (Math.abs(M[pivot][col]) < 1e-12) { col++; continue }
    if (pivot !== row) [M[row], M[pivot]] = [M[pivot], M[row]]
    const pv = M[row][col]
    for (let j = col; j < c; j++) M[row][j] /= pv
    for (let k = 0; k < r; k++) {
      if (k === row) continue
      const f = M[k][col]
      for (let j = col; j < c; j++) M[k][j] -= f * M[row][j]
    }
    rank++; row++; col++
  }
  return rank
}

// ============================================================
// 向量工具
// ============================================================

export function vecAdd(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) throw new CalcError('VEC DIM')
  return a.map((v, i) => v + b[i])
}
export function vecSub(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) throw new CalcError('VEC DIM')
  return a.map((v, i) => v - b[i])
}
export function vecScale(a: Vector, s: number): Vector { return a.map(v => v * s) }
export function vecDot(a: Vector, b: Vector): number {
  if (a.length !== b.length) throw new CalcError('VEC DIM')
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}
export function vecNorm(a: Vector): number { return Math.sqrt(vecDot(a, a)) }
export function vecNormalize(a: Vector): Vector {
  const n = vecNorm(a)
  if (n < 1e-30) throw new CalcError('MATH ERROR')
  return a.map(v => v / n)
}
/** 3D 叉积；2D 标量值 (a.x*b.y - a.y*b.x)。<4 维时返回标量 */
export function vecCross(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) throw new CalcError('VEC DIM')
  if (a.length === 2) return [a[0] * b[1] - a[1] * b[0]]
  if (a.length !== 3) throw new CalcError('VEC DIM')
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ]
}
export function vecAngle(a: Vector, b: Vector, rad = true): number {
  const c = vecDot(a, b) / (vecNorm(a) * vecNorm(b))
  const ang = Math.acos(Math.min(1, Math.max(-1, c)))
  return rad ? ang : ang * 180 / Math.PI
}
/** Proj_b(a) */
export function vecProject(a: Vector, b: Vector): Vector {
  const bNorm2 = vecDot(b, b)
  if (bNorm2 < 1e-30) throw new CalcError('MATH ERROR')
  return vecScale(b, vecDot(a, b) / bNorm2)
}

// ============================================================
// 数值微积分
// ============================================================

/** 数值微分：中心差分，四阶；h 自适应 */
export function derivative(f: (x: number) => number, x: number, order: 1 | 2 = 1): number {
  const h = Math.max(1e-7, Math.pow(Number.EPSILON, 1 / (order + 2))) * (1 + Math.abs(x))
  if (order === 1) return (-f(x + 2 * h) + 8 * f(x + h) - 8 * f(x - h) + f(x - 2 * h)) / (12 * h)
  return (-f(x + 2 * h) + 16 * f(x + h) - 30 * f(x) + 16 * f(x - h) - f(x - 2 * h)) / (12 * h * h)
}

/** 自适应 Simpson 积分 */
export function integrate(f: (x: number) => number, a: number, b: number, tol = 1e-9, maxDepth = 20): number {
  function simpson(lo: number, hi: number): number {
    const mid = (lo + hi) / 2
    return (hi - lo) * (f(lo) + 4 * f(mid) + f(hi)) / 6
  }
  function rec(lo: number, hi: number, depth: number, whole: number): number {
    const m = (lo + hi) / 2
    const l = simpson(lo, m), r = simpson(m, hi)
    const delta = l + r - whole
    if (depth >= maxDepth || Math.abs(delta) < 15 * tol) return l + r + delta / 15
    return rec(lo, m, depth + 1, l) + rec(m, hi, depth + 1, r)
  }
  if (!isFinite(a) || !isFinite(b)) throw new CalcError('INVALID RANGE')
  if (Math.abs(b - a) < 1e-30) return 0
  return rec(a, b, 0, simpson(a, b))
}

// ============================================================
// 统计 / 回归
// ============================================================

export interface Stats {
  n: number
  sum: number; sum2: number; min: number; max: number
  mean: number
  varPop: number; varSample: number
  stdPop: number; stdSample: number
  median: number
}
export function stats(xs: number[]): Stats {
  if (!xs.length) throw new CalcError('EMPTY DATA')
  let s = 0, s2 = 0, mn = Infinity, mx = -Infinity
  for (const v of xs) { if (v < mn) mn = v; if (v > mx) mx = v; s += v; s2 += v * v }
  const n = xs.length
  const mean = s / n
  const varPop = Math.max(0, s2 / n - mean * mean)
  const varSample = n > 1 ? Math.max(0, (s2 / n - mean * mean) * n / (n - 1)) : 0
  const sorted = xs.slice().sort((a, b) => a - b)
  const m = n >> 1
  const median = n & 1 ? sorted[m] : (sorted[m - 1] + sorted[m]) / 2
  return {
    n, sum: s, sum2: s2, min: mn, max: mx, mean,
    varPop, varSample, stdPop: Math.sqrt(varPop), stdSample: Math.sqrt(varSample), median
  }
}

export interface LinRegResult {
  a: number        // y = a + b*x   (截距)
  b: number        // 斜率
  r: number        // 相关系数
  r2: number       // 决定系数
  se_a: number; se_b: number   // 标准误
  // 预测值 ± 95% CI 的辅助
  n: number
}
/** 线性回归：y = a + b·x */
export function linearRegression(points: [number, number][]): LinRegResult {
  const n = points.length
  if (n < 2) throw new CalcError('NEED >=2')
  let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0
  for (const [x, y] of points) {
    sx += x; sy += y
    sxx += x * x; syy += y * y; sxy += x * y
  }
  const mx = sx / n, my = sy / n
  const Sxx = sxx - n * mx * mx
  const Syy = syy - n * my * my
  const Sxy = sxy - n * mx * my
  if (Math.abs(Sxx) < 1e-30) throw new CalcError('SINGULAR')
  const b = Sxy / Sxx
  const a = my - b * mx
  const r = Math.abs(Syy) < 1e-30 ? (Math.abs(b) < 1e-30 ? 1 : Math.sign(Syy)) : Sxy / Math.sqrt(Sxx * Syy)
  // 残差
  let sse = 0
  for (const [x, y] of points) sse += (y - a - b * x) ** 2
  const sigma2 = n > 2 ? sse / (n - 2) : 0
  const se_b = Math.sqrt(sigma2 / Sxx)
  const se_a = Math.sqrt(sigma2 * (1 / n + (mx * mx) / Sxx))
  return { a, b, r, r2: r * r, se_a, se_b, n }
}

/** 协方差（样本） */
export function covariance(xs: number[], ys: number[]): number {
  if (xs.length !== ys.length) throw new CalcError('VEC DIM')
  const n = xs.length
  if (n < 2) throw new CalcError('NEED >=2')
  let mx = 0, my = 0
  for (let i = 0; i < n; i++) { mx += xs[i]; my += ys[i] }
  mx /= n; my /= n
  let s = 0
  for (let i = 0; i < n; i++) s += (xs[i] - mx) * (ys[i] - my)
  return s / (n - 1)
}

// ============================================================
// 格式化辅助
// ============================================================

export function fmtComplex(pair: [number, number]): string {
  const [r, i] = pair
  const rStr = fmt(r), iStr = (Math.abs(i) === 1 ? '' : fmt(Math.abs(i))) + 'i'
  if (Math.abs(i) < 1e-10) return rStr
  if (Math.abs(r) < 1e-10) return (i < 0 ? '-' : '') + iStr
  return `${rStr}${i < 0 ? ' - ' : ' + '}${iStr}`
}
export function fmt(n: number, prec = 12): string {
  if (!isFinite(n)) return isNaN(n) ? 'NaN' : (n < 0 ? '-∞' : '∞')
  if (n === 0) return '0'
  const abs = Math.abs(n)
  if (abs >= 1e12 || abs < 1e-6) {
    return n.toExponential(prec - 2).replace(/\.?0+e/, 'e')
  }
  let s = n.toPrecision(prec).replace(/\.?0+$/, '')
  if (s.includes('.') && s.indexOf('e') < 0) return s
  return s
}
export function fmtVec(v: Vector, prec = 10): string {
  return '[' + v.map(n => fmt(n, prec)).join(', ') + ']'
}
export function fmtMat(A: Matrix, prec = 10): string {
  return A.map(r => '[' + r.map(n => fmt(n, prec)).join(', ') + ']').join('\n')
}

<template>
  <div class="glass-panel p-3 sm:p-4 h-full flex flex-col min-h-0 gap-2.5 sm:gap-3">
    <!-- 标题栏 -->
    <div class="flex items-center justify-between flex-none">
      <div class="flex items-center gap-2 min-w-0">
        <span class="font-semibold text-sm sm:text-base truncate"
              :style="{ color: 'var(--text)' }">{{ t('advanced.modules.' + module) }}</span>
        <span class="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full"
              :style="{ background: 'var(--primary-bg)', color: 'var(--primary-text)' }">
          v1.0
        </span>
      </div>
    </div>

    <!-- 模块内容 -->
    <div class="flex-1 min-h-0 overflow-y-auto scrollbar-thin pr-1">
      <!-- ====== 方程 ====== -->
      <section v-if="module === 'eqn'" class="space-y-3 sm:space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          <Card :title="t('advanced.quad.title')" :hint="t('advanced.quad.hint')">
            <div class="grid grid-cols-3 gap-2">
              <VBox v-model="quad[0]" label="a" />
              <VBox v-model="quad[1]" label="b" />
              <VBox v-model="quad[2]" label="c" />
            </div>
            <GoBtn @click="doQuad" />
            <ResultList v-if="out.quad.length" title="x₁, x₂, ..." :rows="out.quad" />
          </Card>
          <Card :title="t('advanced.cubic.title')" :hint="t('advanced.cubic.hint')">
            <div class="grid grid-cols-4 gap-2">
              <VBox v-model="cubic[0]" label="a" />
              <VBox v-model="cubic[1]" label="b" />
              <VBox v-model="cubic[2]" label="c" />
              <VBox v-model="cubic[3]" label="d" />
            </div>
            <GoBtn @click="doCubic" />
            <ResultList v-if="out.cubic.length" title="x₁, x₂, x₃" :rows="out.cubic" />
          </Card>
          <Card :title="t('advanced.nl.title')" :hint="t('advanced.nl.hint')">
            <VBox v-model="nlExpr" label="f(x)" mono />
            <div class="grid grid-cols-2 gap-2">
              <VBox v-model="nlRange[0]" label="x_min" />
              <VBox v-model="nlRange[1]" label="x_max" />
            </div>
            <GoBtn @click="doNl" />
            <div v-if="out.nl" class="mt-2 p-2 rounded-lg font-mono text-right"
                 :style="{ background: 'var(--expr-bg)', border: '1px solid var(--expr-border)', color: 'var(--text)' }">
              x = {{ out.nl }}
            </div>
          </Card>
          <Card class="sm:col-span-3" :title="t('advanced.linear.title')"
                :hint="t('advanced.linear.hint')">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div class="sm:col-span-2 grid grid-cols-1 gap-2">
                <label class="text-[11px] font-medium" :style="{ color: 'var(--text-dim)' }">A (矩阵，行用分号; 分隔)</label>
                <textarea v-model="linA" rows="3" class="rounded-lg p-2 font-mono text-xs outline-none resize-none"
                          @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                          style="background: var(--input-bg); border: 1px solid var(--input-border); color: var(--input-text);"
                          placeholder="1 2 3; 4 5 6; 7 8 10"></textarea>
              </div>
              <div class="sm:col-span-2 grid grid-cols-1 gap-2">
                <label class="text-[11px] font-medium" :style="{ color: 'var(--text-dim)' }">b (向量，逗号或空格分隔)</label>
                <textarea v-model="linB" rows="3" class="rounded-lg p-2 font-mono text-xs outline-none resize-none"
                          @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                          style="background: var(--input-bg); border: 1px solid var(--input-border); color: var(--input-text);"
                          placeholder="1, 2, 3"></textarea>
              </div>
            </div>
            <GoBtn @click="doLinear" />
            <ResultList v-if="out.lin.length" title="解 x" :rows="out.lin.map((v, i) => ({ label: 'x' + (i+1), value: v }))" />
          </Card>
        </div>
      </section>

      <!-- ====== 矩阵 ====== -->
      <section v-if="module === 'mat'" class="space-y-3 sm:space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-3">
          <Card class="lg:col-span-2" :title="t('advanced.mat.inputs')">
            <label class="text-[11px] font-medium" :style="{ color: 'var(--text-dim)' }">A</label>
            <textarea v-model="matA" rows="4" class="rounded-lg p-2 font-mono text-xs outline-none resize-none w-full"
                      @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                      style="background: var(--input-bg); border: 1px solid var(--input-border); color: var(--input-text);"
                      placeholder="1 2; 3 4"></textarea>
            <label class="text-[11px] font-medium mt-2 block" :style="{ color: 'var(--text-dim)' }">B</label>
            <textarea v-model="matB" rows="4" class="rounded-lg p-2 font-mono text-xs outline-none resize-none w-full"
                      @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                      style="background: var(--input-bg); border: 1px solid var(--input-border); color: var(--input-text);"
                      placeholder="5 6; 7 8"></textarea>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <OpBtn @click="opMat('A+B')">A+B</OpBtn>
              <OpBtn @click="opMat('A-B')">A-B</OpBtn>
              <OpBtn @click="opMat('A*B')">A·B</OpBtn>
              <OpBtn @click="opMat('Aᵀ')">Aᵀ</OpBtn>
              <OpBtn @click="opMat('|A|')">|A|</OpBtn>
              <OpBtn @click="opMat('A⁻¹')">A⁻¹</OpBtn>
              <OpBtn @click="opMat('rank')">rank(A)</OpBtn>
            </div>
          </Card>
          <Card class="lg:col-span-3" :title="t('advanced.mat.output')">
            <pre v-if="out.mat"
                 class="rounded-xl p-3 font-mono text-xs whitespace-pre-wrap break-words leading-relaxed overflow-auto max-h-[380px]"
                 :style="{ background: 'var(--expr-bg)', border: '1px solid var(--expr-border)', color: 'var(--text)' }">{{ out.mat }}</pre>
            <EmptyHint />
          </Card>
        </div>
      </section>

      <!-- ====== 向量 ====== -->
      <section v-if="module === 'vec'" class="space-y-3 sm:space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-3">
          <Card class="lg:col-span-2" :title="t('advanced.vec.inputs')">
            <div class="grid grid-cols-1 gap-2">
              <VBox v-model="vecA" label="a (逗号/空格分隔)" mono />
              <VBox v-model="vecB" label="b (逗号/空格分隔)" mono />
            </div>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <OpBtn @click="opVec('a+b')">a+b</OpBtn>
              <OpBtn @click="opVec('a-b')">a-b</OpBtn>
              <OpBtn @click="opVec('a·b')">a·b (内积)</OpBtn>
              <OpBtn @click="opVec('a×b')">a×b (叉积)</OpBtn>
              <OpBtn @click="opVec('|a|')">|a|</OpBtn>
              <OpBtn @click="opVec('|b|')">|b|</OpBtn>
              <OpBtn @click="opVec('û(a)')">a 归一化</OpBtn>
              <OpBtn @click="opVec('∠ab')">夹角 (°)</OpBtn>
              <OpBtn @click="opVec('proj_b(a)')">proj_b(a)</OpBtn>
            </div>
          </Card>
          <Card class="lg:col-span-3" :title="t('advanced.vec.output')">
            <pre v-if="out.vec"
                 class="rounded-xl p-3 font-mono text-xs whitespace-pre-wrap break-words leading-relaxed overflow-auto max-h-[380px]"
                 :style="{ background: 'var(--expr-bg)', border: '1px solid var(--expr-border)', color: 'var(--text)' }">{{ out.vec }}</pre>
            <EmptyHint />
          </Card>
        </div>
      </section>

      <!-- ====== 统计 ====== -->
      <section v-if="module === 'stat'" class="space-y-3 sm:space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-2 sm:gap-3">
          <Card class="lg:col-span-2" :title="t('advanced.stat.data')">
            <div class="grid grid-cols-1 gap-2">
              <div>
                <label class="text-[11px] font-medium" :style="{ color: 'var(--text-dim)' }">X 数据 (逗号/空格/换行分隔)</label>
                <textarea v-model="statX" rows="6" class="rounded-lg p-2 font-mono text-xs outline-none resize-none w-full"
                          @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                          style="background: var(--input-bg); border: 1px solid var(--input-border); color: var(--input-text);"
                          placeholder="1 2 3 4 5 6 7 8"></textarea>
              </div>
              <div>
                <label class="text-[11px] font-medium" :style="{ color: 'var(--text-dim)' }">
                  Y 数据 {{ t('advanced.stat.yHint') }}
                </label>
                <textarea v-model="statY" rows="4" class="rounded-lg p-2 font-mono text-xs outline-none resize-none w-full"
                          @focus="router.onFocus" @keydown.capture="router.onKeydownCapture" :readonly="router.readonly"
                          style="background: var(--input-bg); border: 1px solid var(--input-border); color: var(--input-text);"
                          placeholder="1.1 2.2 3.1 4.0 5.2 6.1 7.0 8.1"></textarea>
              </div>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              <OpBtn @click="doStatX">{{ t('advanced.stat.summaryX') }}</OpBtn>
              <OpBtn @click="doReg">{{ t('advanced.stat.linreg') }}</OpBtn>
            </div>
          </Card>
          <Card class="lg:col-span-3" :title="t('advanced.stat.result')">
            <pre v-if="out.stat"
                 class="rounded-xl p-3 font-mono text-xs whitespace-pre-wrap break-words leading-relaxed overflow-auto max-h-[380px]"
                 :style="{ background: 'var(--expr-bg)', border: '1px solid var(--expr-border)', color: 'var(--text)' }">{{ out.stat }}</pre>
            <EmptyHint />
          </Card>
        </div>
      </section>

      <!-- ====== 微积分 ====== -->
      <section v-if="module === 'calc'" class="space-y-3 sm:space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <Card :title="t('advanced.df.title')" :hint="t('advanced.df.hint')">
            <VBox v-model="dfExpr" label="f(x)" mono />
            <div class="grid grid-cols-2 gap-2">
              <VBox v-model="dfX" label="x" />
              <VBox v-model="dfOrder" label="阶数 (1/2)" />
            </div>
            <GoBtn @click="doDiff" />
            <ResultList v-if="out.df" :rows="out.df" />
          </Card>
          <Card :title="t('advanced.int.title')" :hint="t('advanced.int.hint')">
            <VBox v-model="intExpr" label="f(x)" mono />
            <div class="grid grid-cols-2 gap-2">
              <VBox v-model="intRange[0]" label="a" />
              <VBox v-model="intRange[1]" label="b" />
            </div>
            <GoBtn @click="doInt" />
            <div v-if="out.int" class="mt-2 p-2 rounded-lg font-mono text-right"
                 :style="{ background: 'var(--expr-bg)', border: '1px solid var(--expr-border)', color: 'var(--text)' }">
              ∫ = {{ out.int }}
            </div>
          </Card>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  solveQuadratic, solveCubic, solveOneVar, solveLinear,
  matAdd, matSub, matMul, matTranspose, matDet, matInv, matRank,
  vecAdd, vecSub, vecDot, vecCross, vecNorm, vecNormalize, vecAngle, vecProject,
  stats, linearRegression, covariance,
  derivative, integrate,
  fmt, fmtComplex, fmtVec, fmtMat,
  type Matrix, type Vector,
} from '@/engine/advanced'
import { evaluateRaw } from '@/engine/calculator'
import { t } from '@/i18n'
import { useInputRouter } from '@/composables/useInputRouter'
const { bindInputRouter } = useInputRouter()
const router = bindInputRouter()

// ============================================================
// 子组件（局部 inline，避免碎片化）
// ============================================================
import { defineComponent, h } from 'vue'
const Card = defineComponent({
  name: 'Card',
  props: ['title', 'hint'],
  setup(props, { slots }) {
    return () => h('div', {
      class: 'rounded-2xl p-3 sm:p-4',
      style: {
        background: 'var(--chip-bg)',
        border: '1px solid var(--chip-border)',
      }
    }, [
      h('div', { class: 'flex items-baseline justify-between mb-2 gap-2' }, [
        h('div', {
          class: 'font-semibold text-xs sm:text-sm',
          style: { color: 'var(--text)' }
        }, props.title),
        props.hint ? h('div', {
          class: 'text-[10px] sm:text-[11px]',
          style: { color: 'var(--text-muted)' }
        }, props.hint) : null,
      ]),
      slots.default?.(),
    ])
  }
})
const VBox = defineComponent({
  name: 'VBox',
  props: ['modelValue', 'label', 'mono'],
  emits: ['update:modelValue'],
  setup(p, { emit }) {
    return () => h('div', { class: 'flex flex-col gap-1' }, [
      h('label', {
        class: 'text-[11px] font-medium',
        style: { color: 'var(--text-dim)' }
      }, p.label),
      h('input', {
        value: p.modelValue,
        onInput: (e: InputEvent) => emit('update:modelValue', (e.target as HTMLInputElement).value),
        onFocus: (e: FocusEvent) => router.onFocus(e),
        onKeydownCapture: (e: KeyboardEvent) => router.onKeydownCapture(e),
        readonly: router.readonly,
        class: 'rounded-lg px-2.5 py-1.5 text-sm outline-none w-full',
        style: {
          background: 'var(--input-bg)',
          border: '1px solid var(--input-border)',
          color: 'var(--input-text)',
          fontFamily: p.mono ? 'JetBrains Mono, Consolas, monospace' : undefined,
        }
      })
    ])
  }
})
const GoBtn = defineComponent({
  name: 'GoBtn',
  emits: ['click'],
  setup(_, { emit, slots }) {
    return () => h('button', {
      onClick: () => emit('click'),
      class: 'mt-2.5 w-full py-2 rounded-xl text-sm font-semibold transition active:scale-[0.98]',
      style: {
        background: 'linear-gradient(145deg, #4f8cff, #3a6fe0)',
        color: 'white',
        boxShadow: '0 0 18px rgba(79,140,255,0.3)',
      }
    }, slots.default?.() || t('advanced.go'))
  }
})
const OpBtn = defineComponent({
  name: 'OpBtn',
  props: ['danger'],
  emits: ['click'],
  setup(props, { emit, slots }) {
    return () => h('button', {
      onClick: () => emit('click'),
      class: 'px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium border transition active:scale-[0.98]',
      style: {
        background: props.danger ? 'var(--danger-bg)' : 'var(--chip-bg)',
        borderColor: props.danger ? 'var(--danger-border)' : 'var(--chip-border)',
        color: props.danger ? 'var(--danger-text)' : 'var(--text-dim)',
      }
    }, slots.default?.())
  }
})
const ResultList = defineComponent({
  name: 'ResultList',
  props: ['rows', 'title'],
  setup(p) {
    type Row = { label?: string; value: string }
    const rows = (p.rows as Row[]) || []
    return () => h('div', { class: 'mt-2' }, [
      p.title ? h('div', {
        class: 'text-[10px] sm:text-[11px] mb-1',
        style: { color: 'var(--text-muted)' }
      }, p.title) : null,
      h('div', { class: 'space-y-1.5' }, rows.map((r) => {
        return h('div', {
          class: 'flex items-center justify-between px-2.5 py-1.5 rounded-lg',
          style: { background: 'var(--expr-bg)', border: '1px solid var(--expr-border)' }
        }, [
          r.label ? h('span', {
            class: 'text-[11px]',
            style: { color: 'var(--text-dim)' }
          }, r.label) : null,
          h('span', {
            class: 'font-mono font-semibold',
            style: { color: 'var(--text)' }
          }, r.value)
        ])
      }))
    ])
  }
})
const EmptyHint = defineComponent({
  name: 'EmptyHint',
  setup() {
    return () => h('div', {
      class: 'h-full min-h-[160px] flex items-center justify-center text-xs',
      style: { color: 'var(--text-muted)' }
    }, t('advanced.empty'))
  }
})

// ============================================================
// Props
// ============================================================
type ModId = 'eqn' | 'mat' | 'vec' | 'stat' | 'calc'
const props = defineProps<{ module: ModId }>()

// 方程
const quad = ref(['', '', ''])
const cubic = ref(['', '', '', ''])
const nlExpr = ref('')
const nlRange = ref(['', ''])
const linA = ref('')
const linB = ref('')

// 矩阵
const matA = ref('')
const matB = ref('')

// 向量
const vecA = ref('')
const vecB = ref('')

// 统计
const statX = ref('')
const statY = ref('')

// 微积分
const dfExpr = ref('')
const dfX = ref('')
const dfOrder = ref('')
const intExpr = ref('')
const intRange = ref(['', ''])

// ============================================================
// 输出
// ============================================================
const out = reactive({
  quad: [] as { label: string; value: string }[],
  cubic: [] as { label: string; value: string }[],
  nl: null as null | string,
  lin: [] as { label?: string; value: string }[],
  mat: null as null | string,
  vec: null as null | string,
  stat: null as null | string,
  df: null as null | { label: string; value: string }[],
  int: null as null | string,
})

// ============================================================
// 解析辅助
// ============================================================
function num(v: string, def = 0): number {
  const x = Number(v)
  return isFinite(x) ? x : (evaluateRawSafe(v) ?? def)
}
function evaluateRawSafe(s: string): number | null {
  try { return evaluateRaw(s) } catch { return null }
}
function makeFn(expr: string): (x: number) => number {
  return (x: number) => {
    try {
      return evaluateRaw(expr.replace(/\bx\b/g, '(' + x.toString() + ')'))
    } catch { return NaN }
  }
}
function parseMatrix(s: string): Matrix {
  const rows = s.trim().split(/\s*;\s*/).filter(r => r.length)
  const M = rows.map(r => r.trim().split(/[\s,]+/).filter(t => t.length).map(t => num(t)))
  if (!M.length || M.some(r => r.length !== M[0].length)) throw new Error('矩阵格式错误：请用空格/逗号分隔元素，分号分隔行')
  return M
}
function parseVector(s: string): Vector {
  const xs = s.trim().split(/[\s,;]+/).filter(t => t.length).map(t => num(t))
  if (!xs.length) throw new Error('向量为空')
  return xs
}
function parseVectorList(s: string): Vector {
  const xs = s.trim().split(/[\s,;\n\r]+/).filter(t => t.length).map(t => num(t))
  return xs
}

function errorBox(msg: string): string { return '⚠ ' + msg }

// ============================================================
// 方程
// ============================================================
function doQuad() {
  try {
    const r = solveQuadratic(num(quad.value[0]), num(quad.value[1]), num(quad.value[2]))
    out.quad = r.map((c, i) => ({ label: 'x' + (i + 1), value: fmtComplex(c) }))
  } catch (e: any) { out.quad = [{ label: '错误', value: errorBox(e?.message || String(e)) }] }
}
function doCubic() {
  try {
    const r = solveCubic(num(cubic.value[0]), num(cubic.value[1]), num(cubic.value[2]), num(cubic.value[3]))
    out.cubic = r.map((c, i) => ({ label: 'x' + (i + 1), value: fmtComplex(c) }))
  } catch (e: any) { out.cubic = [{ label: '错误', value: errorBox(e?.message || String(e)) }] }
}
function doNl() {
  try {
    const f = makeFn(nlExpr.value)
    const lo = num(nlRange.value[0]), hi = num(nlRange.value[1])
    const x = solveOneVar(f, Math.min(lo, hi), Math.max(lo, hi))
    out.nl = fmt(x) + '  （f(x)= ' + fmt(f(x)) + '）'
  } catch (e: any) { out.nl = errorBox(e?.message || String(e)) }
}
function doLinear() {
  try {
    const A = parseMatrix(linA.value)
    const b = parseVector(linB.value)
    const x = solveLinear(A, b)
    out.lin = x.map(v => ({ value: fmt(v) }))
  } catch (e: any) { out.lin = [{ label: '错误', value: errorBox(e?.message || String(e)) }] }
}

// ============================================================
// 矩阵
// ============================================================
function opMat(op: string) {
  try {
    const A = parseMatrix(matA.value)
    let text = ''
    switch (op) {
      case 'A+B': text = fmtMat(matAdd(A, parseMatrix(matB.value))); break
      case 'A-B': text = fmtMat(matSub(A, parseMatrix(matB.value))); break
      case 'A*B': text = fmtMat(matMul(A, parseMatrix(matB.value))); break
      case 'Aᵀ': text = fmtMat(matTranspose(A)); break
      case '|A|': text = 'det(A) = ' + fmt(matDet(A)); break
      case 'A⁻¹': text = fmtMat(matInv(A)); break
      case 'rank': text = 'rank(A) = ' + matRank(A).toString(); break
    }
    out.mat = text
  } catch (e: any) { out.mat = errorBox(e?.message || String(e)) }
}

// ============================================================
// 向量
// ============================================================
function opVec(op: string) {
  try {
    const a = parseVector(vecA.value)
    const b = parseVector(vecB.value)
    let text = ''
    switch (op) {
      case 'a+b': text = fmtVec(vecAdd(a, b)); break
      case 'a-b': text = fmtVec(vecSub(a, b)); break
      case 'a·b': text = 'a·b = ' + fmt(vecDot(a, b)); break
      case 'a×b': text = 'a×b = ' + fmtVec(vecCross(a, b)); break
      case '|a|': text = '|a| = ' + fmt(vecNorm(a)); break
      case '|b|': text = '|b| = ' + fmt(vecNorm(b)); break
      case 'û(a)': text = 'â = ' + fmtVec(vecNormalize(a)); break
      case '∠ab': text = '∠ab = ' + fmt(vecAngle(a, b, false)) + '°  =  ' + fmt(vecAngle(a, b, true)) + ' rad'; break
      case 'proj_b(a)': text = 'proj_b(a) = ' + fmtVec(vecProject(a, b)); break
    }
    out.vec = text
  } catch (e: any) { out.vec = errorBox(e?.message || String(e)) }
}

// ============================================================
// 统计
// ============================================================
function doStatX() {
  try {
    const xs = parseVectorList(statX.value)
    const s = stats(xs)
    const lines = [
      `样本量 n      = ${s.n}`,
      `Σ x           = ${fmt(s.sum)}`,
      `Σ x²          = ${fmt(s.sum2)}`,
      `最小值 min    = ${fmt(s.min)}`,
      `最大值 max    = ${fmt(s.max)}`,
      `均值 mean (x̄) = ${fmt(s.mean)}`,
      `中位数 median = ${fmt(s.median)}`,
      `总体方差 σ²   = ${fmt(s.varPop)}`,
      `总体标准差 σ  = ${fmt(s.stdPop)}`,
      `样本方差 s²   = ${fmt(s.varSample)}`,
      `样本标准差 s  = ${fmt(s.stdSample)}`,
    ]
    if (statY.value.trim()) {
      const ys = parseVectorList(statY.value)
      const sy = stats(ys)
      lines.push(
        '',
        `─── Y ───`,
        `均值 ȳ         = ${fmt(sy.mean)}`,
        `总体方差 σ²y   = ${fmt(sy.varPop)}`,
        `样本标准差 sy  = ${fmt(sy.stdSample)}`,
        `Cov(X,Y)       = ${fmt(covariance(xs, ys))}`,
      )
    }
    out.stat = lines.join('\n')
  } catch (e: any) { out.stat = errorBox(e?.message || String(e)) }
}
function doReg() {
  try {
    const xs = parseVectorList(statX.value)
    const ys = parseVectorList(statY.value)
    if (xs.length !== ys.length) throw new Error('X 与 Y 长度不一致')
    const pts: [number, number][] = xs.map((x, i) => [x, ys[i]])
    const r = linearRegression(pts)
    const lines = [
      `线性回归 y = a + b·x`,
      `截距 a       = ${fmt(r.a)}   (SE = ${fmt(r.se_a)})`,
      `斜率 b       = ${fmt(r.b)}   (SE = ${fmt(r.se_b)})`,
      ``,
      `相关系数 r    = ${fmt(r.r)}`,
      `决定系数 r²   = ${fmt(r.r2)}`,
      `样本数 n      = ${r.n}`,
      ``,
      `预测示例：`,
      `  x = 0  →  y = ${fmt(r.a)}`,
      `  x = 1  →  y = ${fmt(r.a + r.b)}`,
      `  x = x̄  →  y = ${fmt(r.a + r.b * (pts.reduce((s, p) => s + p[0], 0) / pts.length))}`,
    ]
    out.stat = lines.join('\n')
  } catch (e: any) { out.stat = errorBox(e?.message || String(e)) }
}

// ============================================================
// 微积分
// ============================================================
function doDiff() {
  try {
    const f = makeFn(dfExpr.value)
    const x = num(dfX.value)
    const order = Math.abs(Number(dfOrder.value) || 1) >= 2 ? 2 : 1
    const v = derivative(f, x, order as 1 | 2)
    out.df = [
      { label: `f(${fmt(x)})`, value: fmt(f(x)) },
      { label: order === 1 ? `f'(${fmt(x)})` : `f''(${fmt(x)})`, value: fmt(v) },
    ]
  } catch (e: any) { out.df = [{ label: '错误', value: errorBox(e?.message || String(e)) }] }
}
function doInt() {
  try {
    const f = makeFn(intExpr.value)
    const a = num(intRange.value[0]), b = num(intRange.value[1])
    const v = integrate(f, a, b)
    out.int = fmt(v)
  } catch (e: any) { out.int = errorBox(e?.message || String(e)) }
}
</script>

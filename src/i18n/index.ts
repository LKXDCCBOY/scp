import { ref, computed } from 'vue'
import { messages, type Lang } from './messages'

const currentLang = ref<Lang>('zh-CN')

/** 当前语言响应式引用 */
export const lang = computed({
  get: () => currentLang.value,
  set: (v: Lang) => { currentLang.value = v }
})

/** 支持的语言列表 */
export const languages: { code: Lang; label: string }[] = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en-US', label: 'EN' }
]

/** 翻译函数，支持点路径和插值 */
export function t(key: string, vars?: Record<string, string | number>): string {
  const dict = messages[currentLang.value] as any
  const parts = key.split('.')
  let val: any = dict
  for (const p of parts) {
    val = val?.[p]
    if (val === undefined) return key
  }
  if (typeof val !== 'string') return key
  // 插值替换
  if (vars) {
    return val.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
  }
  return val
}

/** 切换语言 */
export function setLang(l: Lang) {
  currentLang.value = l
}

/** 获取当前语言消息对象（用于复杂结构如代码示例） */
export function useMessages() {
  return computed(() => messages[currentLang.value])
}

import { ref } from 'vue'
import { t } from '@/i18n'

/** 悬浮按键提示共享状态 */
const hoveredKeyId = ref<string>('')

/** 设置当前悬浮的按键 ID */
export function setHoveredKey(id: string) {
  hoveredKeyId.value = id
}

/** 清除悬浮 */
export function clearHoveredKey() {
  hoveredKeyId.value = ''
}

/** 获取当前悬浮按键的功能说明文本 */
export function getHintText(): string {
  if (!hoveredKeyId.value) return t('hint.none')
  return t('hint.' + hoveredKeyId.value)
}

/** 响应式获取悬浮按键 ID */
export function useHoverHint() {
  return hoveredKeyId
}

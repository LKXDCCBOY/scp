import { ref, type Ref } from 'vue'

// 当前激活的输入目标
// - null / 'calc'：主计算器（通过 pressKey 处理）
// - HTMLInputElement / HTMLTextAreaElement：具体的 input/textarea
const activeInputTarget = ref<EventTarget | null>(null)

export function useInputRouter() {
  function setActiveTarget(el: EventTarget | null) {
    activeInputTarget.value = el
  }

  function getActiveTarget(): EventTarget | null {
    return activeInputTarget.value
  }

  function isInputTargetActive(): boolean {
    const t = activeInputTarget.value
    return t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement
  }

  // 将按键字符写入当前激活的 input/textarea
  function routeKeyToInput(keyName: string): boolean {
    const target = activeInputTarget.value
    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
      return false
    }
    const el = target as HTMLInputElement | HTMLTextAreaElement

    // 将按键名映射为要插入的字符
    const ch = mapKeyToChar(keyName)
    if (ch === null) return false

    el.focus()
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? el.value.length
    if (ch === '__BACKSPACE__') {
      if (start === end && start > 0) {
        el.value = el.value.slice(0, start - 1) + el.value.slice(end)
        const newPos = Math.max(0, start - 1)
        el.setSelectionRange(newPos, newPos)
      } else if (start !== end) {
        el.value = el.value.slice(0, start) + el.value.slice(end)
        el.setSelectionRange(start, start)
      }
    } else if (ch === '__DELETE__') {
      if (start === end && end < el.value.length) {
        el.value = el.value.slice(0, start) + el.value.slice(end + 1)
        el.setSelectionRange(start, start)
      } else if (start !== end) {
        el.value = el.value.slice(0, start) + el.value.slice(end)
        el.setSelectionRange(start, start)
      }
    } else if (ch === '__LEFT__') {
      const newPos = Math.max(0, start - 1)
      el.setSelectionRange(newPos, newPos)
    } else if (ch === '__RIGHT__') {
      const newPos = Math.min(el.value.length, end + 1)
      el.setSelectionRange(newPos, newPos)
    } else if (ch === '__HOME__') {
      el.setSelectionRange(0, 0)
    } else if (ch === '__END__') {
      el.setSelectionRange(el.value.length, el.value.length)
    } else if (ch === '__CLEAR__') {
      el.value = ''
      el.setSelectionRange(0, 0)
    } else {
      // 插入普通字符
      el.value = el.value.slice(0, start) + ch + el.value.slice(end)
      const newPos = start + ch.length
      el.setSelectionRange(newPos, newPos)
    }

    // 触发 v-model 更新
    el.dispatchEvent(new Event('input', { bubbles: true }))
    return true
  }

  function mapKeyToChar(k: string): string | null {
    switch (k) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
      case '.': case '+': case '-': case '*': case '/':
      case '(': case ')': case '^': case '%': case '!':
      case ',': case 'x': case 'X':
        return k === 'x' || k === 'X' ? 'x' : k
      case 'pi': return 'π'
      case 'e': return 'e'
      case 'DEL': return '__BACKSPACE__'
      case 'AC': return '__CLEAR__'
      case '◀': return '__LEFT__'
      case '▶': return '__RIGHT__'
      case '▲': return '__HOME__'
      case '▼': return '__END__'
      default: return null
    }
  }

  // 用于在 input/textarea 上绑定的事件处理对象
  function bindInputRouter(): {
    onFocus: (e: FocusEvent) => void
    onBlur: () => void
    onKeydownCapture: (e: KeyboardEvent) => void
    readonly: true
  } {
    return {
      onFocus: (e: FocusEvent) => setActiveTarget(e.currentTarget),
      onBlur: () => setActiveTarget(null),
      onKeydownCapture: (e: KeyboardEvent) => {
        // 阻止原生输入，只允许路由控制
        // 但允许 Ctrl+A/C/V/X/Z 等组合键通过
        if (e.ctrlKey || e.metaKey) return
        // 允许 Tab / Shift+Tab 用于切换焦点
        if (e.key === 'Tab') return
        e.preventDefault()
      },
      readonly: true,
    }
  }

  return {
    activeInputTarget: activeInputTarget as Ref<EventTarget | null>,
    setActiveTarget,
    getActiveTarget,
    isInputTargetActive,
    routeKeyToInput,
    bindInputRouter,
  }
}

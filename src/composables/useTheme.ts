import { ref, onMounted, watch } from 'vue'

export type ThemeMode = 'dark' | 'light' | 'system'

const THEME_KEY = 'sci-calc.theme'
const mode = ref<ThemeMode>((localStorage.getItem(THEME_KEY) as ThemeMode) || 'system')
const resolved = ref<'dark' | 'light'>('dark')

function apply(m: 'dark' | 'light') {
  resolved.value = m
  if (m === 'light') document.documentElement.setAttribute('data-theme', 'light')
  else document.documentElement.removeAttribute('data-theme')
}

function resolve() {
  if (mode.value === 'dark' || mode.value === 'light') return mode.value
  const mq = window.matchMedia('(prefers-color-scheme: light)')
  return mq.matches ? 'light' : 'dark'
}

export function useTheme() {
  function setMode(next: ThemeMode) {
    mode.value = next
    localStorage.setItem(THEME_KEY, next)
    apply(resolve())
  }
  function cycle() {
    const order: ThemeMode[] = ['system', 'dark', 'light']
    const i = order.indexOf(mode.value)
    setMode(order[(i + 1) % order.length])
  }
  onMounted(() => {
    apply(resolve())
    try {
      const mq = window.matchMedia('(prefers-color-scheme: light)')
      const onChange = () => { if (mode.value === 'system') apply(resolve()) }
      mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange)
    } catch { /* ignore */ }
  })
  watch(mode, () => apply(resolve()))
  return { themeMode: mode, resolvedTheme: resolved, setTheme: setMode, cycleTheme: cycle }
}

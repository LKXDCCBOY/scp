<template>
  <div class="h-full w-full flex flex-col">
    <!-- 背景极光 -->
    <div class="bg-aurora"></div>

    <!-- 顶部状态栏 -->
    <header class="flex-none w-full px-3 lg:px-4 py-1.5 flex items-center justify-between z-10 animate-fade-in gap-3">
      <div class="flex items-center gap-2 min-w-0">
        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500/60 to-purple-500/60 border backdrop-blur-md
                    flex items-center justify-center shadow-glow animate-logo-pulse overflow-hidden flex-none"
             :style="{ borderColor: 'var(--chip-border)' }">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div class="min-w-0">
          <h1 class="text-xs sm:text-sm font-semibold tracking-wide leading-tight truncate" :style="{ color: 'var(--text)' }">{{ t('app.title') }}</h1>
          <p class="text-[9px] sm:text-[10px] tracking-wider leading-tight truncate" :style="{ color: 'var(--text-muted)' }">{{ t('app.subtitle') }}</p>
        </div>
      </div>
      <!-- 右侧：主题切换 + 语言切换 + 标签页 -->
      <div class="flex items-center gap-1.5 sm:gap-2 flex-none">
        <!-- 主题切换 -->
        <button @click="cycleTheme"
                :title="themeButtonTitle"
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border backdrop-blur-md transition hover:scale-105 active:scale-95"
                :style="themeBtnStyle">
          <!-- 月亮（深色） -->
          <svg v-if="themeMode === 'dark'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
          </svg>
          <!-- 太阳（明亮） -->
          <svg v-else-if="themeMode === 'light'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="5"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
            <line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/>
            <line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/>
            <line x1="2" y1="12" x2="5" y2="12"/>
            <line x1="19" y1="12" x2="22" y2="12"/>
            <line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/>
            <line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/>
          </svg>
          <!-- 显示器（跟随系统） -->
          <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="12" rx="2"/>
            <line x1="8" y1="20" x2="16" y2="20"/>
            <line x1="12" y1="16" x2="12" y2="20"/>
          </svg>
        </button>
        <!-- Language 按钮 + 下拉列表 -->
        <div class="relative" data-lang-root>
          <button @click.stop="langMenuOpen = !langMenuOpen"
                  class="h-7 sm:h-8 px-2.5 rounded-lg flex items-center gap-1.5 border backdrop-blur-md transition hover:scale-105 active:scale-95"
                  :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text)' }">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span class="text-[10px] sm:text-[11px] font-medium">Language</span>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                 class="transition-transform"
                 :style="{ transform: langMenuOpen ? 'rotate(180deg)' : 'none', opacity: 0.6 }">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <!-- 下拉列表 -->
          <transition name="slide-up">
            <div v-if="langMenuOpen"
                 @click.stop
                 class="absolute right-0 top-full mt-1.5 min-w-[180px] rounded-xl border backdrop-blur-2xl shadow-2xl p-1.5 z-[100]"
                 :style="{ background: 'var(--panel-bg)', borderColor: 'var(--chip-border)' }">
              <button v-for="l in languages" :key="l.code"
                @click="pickLang(l.code)"
                class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition"
                :style="lang === l.code
                  ? { background: 'var(--primary-bg)', color: 'var(--primary-text)' }
                  : { color: 'var(--text)' }"
                :class="lang !== l.code ? 'hover:opacity-80' : ''">
                <span class="text-base">{{ l.flag }}</span>
                <span class="text-[12px] sm:text-[13px] font-medium flex-1">{{ l.label }}</span>
                <svg v-if="lang === l.code" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>
          </transition>
        </div>
        <!-- 标签页 -->
        <div class="flex items-center gap-1">
          <button v-for="tab in tabs" :key="tab.id"
            @click="activeTab = tab.id"
            class="mode-chip text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 transition-all duration-300"
            :class="{ active: activeTab === tab.id }">
            {{ t('tabs.' + tab.id) }}
          </button>
        </div>
      </div>
    </header>

    <!-- 横屏桌面：左键盘 + 右面板 -->
    <main class="flex-1 flex flex-col lg:flex-row min-h-0 px-3 sm:px-4 lg:px-5 pb-3 gap-3 relative z-10">

      <!-- ============ 左侧：键盘区 ============ -->
      <div class="flex-none lg:w-[340px] xl:w-[380px] flex flex-col min-h-0">
        <CalcKeyboard :state="state" @press="pressKeyOrRoute" class="flex-1 min-h-0" />
      </div>

      <!-- ============ 右侧：屏幕/绘图/Python ============ -->
      <div class="flex-1 flex flex-col min-h-0 min-w-0">
        <transition name="fade" mode="out-in">
          <CalcScreen
            v-if="activeTab === 'calc'"
            key="calc"
            :expression="expression"
            :result="resultState"
            :state="state"
            :shake="screen.shake"
            :memory-not-empty="memoryNotEmpty"
            :history="state.history"
            class="flex-1 min-h-0"
            @use-history="useHistory"
            @clear-history="clearHistory"
          />
          <GraphPanel
            v-else-if="activeTab === 'graph'"
            key="graph"
            :state="state"
            @insert="insertExpr"
          />
          <PythonPanel
            v-else-if="activeTab === 'python'"
            key="python"
            :state="state"
          />
          <AdvancedPanel
            v-else-if="activeTab === 'eqn'"
            key="eqn"
            module="eqn"
          />
          <AdvancedPanel
            v-else-if="activeTab === 'mat'"
            key="mat"
            module="mat"
          />
          <AdvancedPanel
            v-else-if="activeTab === 'vec'"
            key="vec"
            module="vec"
          />
          <AdvancedPanel
            v-else-if="activeTab === 'stat'"
            key="stat"
            module="stat"
          />
          <AdvancedPanel
            v-else-if="activeTab === 'calc-mod'"
            key="calc-mod"
            module="calc"
          />
        </transition>
      </div>
    </main>

    <!-- 右下角：关于按钮 -->
    <button @click="openAbout"
            title="关于 Prism Technology Studio"
            class="fixed bottom-3 right-3 z-50 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border backdrop-blur-md transition hover:scale-110 active:scale-95"
            :style="{ background: 'var(--chip-bg)', borderColor: 'var(--chip-border)', color: 'var(--text-dim)' }">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    </button>

    <!-- 左下角：悬浮按键说明 -->
    <transition name="slide-up">
      <div v-if="hintVisible"
           class="fixed bottom-2 left-2 z-50 max-w-[320px] sm:max-w-[380px] glass-panel px-2.5 py-1.5 flex items-start gap-2"
           :class="{ 'hint-empty': !hoveredKeyId }">
        <span class="text-[9px] sm:text-[10px] text-white/40 flex-none mt-0.5 whitespace-nowrap">{{ t('hint.title') }}</span>
        <span class="text-[11px] sm:text-xs text-white/75 leading-snug flex-1">{{ hintText }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import CalcScreen from '@/components/CalcScreen.vue'
import CalcKeyboard from '@/components/CalcKeyboard.vue'
import GraphPanel from '@/components/GraphPanel.vue'
import PythonPanel from '@/components/PythonPanel.vue'
import AdvancedPanel from '@/components/AdvancedPanel.vue'
import { useCalculator } from '@/composables/useCalculator'
import { useHoverHint } from '@/composables/useHoverHint'
import { useTheme } from '@/composables/useTheme'
import { useInputRouter } from '@/composables/useInputRouter'
import { t, lang, setLang, languages } from '@/i18n'

// Electron IPC for opening links
function openAbout() {
  if (window.calcNative && window.calcNative.isElectron) {
    window.calcNative.openExternal('https://ptstudio.top')
  } else {
    // Fallback for browser dev mode
    window.open('https://ptstudio.top', '_blank')
  }
}

const {
  state, expression, resultState, screen, memoryNotEmpty,
  pressKey, clearAll, execute, useHistory
} = useCalculator()

const hoveredKeyId = useHoverHint()
const hintText = computed(() => {
  if (!hoveredKeyId.value) return t('hint.none')
  return t('hint.' + hoveredKeyId.value)
})
const hintVisible = ref(true)

// 输入路由：决定输入进入计算器还是进入激活的 input/textarea
const { isInputTargetActive, routeKeyToInput } = useInputRouter()
function pressKeyOrRoute(k: string) {
  if (isInputTargetActive()) {
    if (routeKeyToInput(k)) return
  }
  pressKey(k)
}

// 主题
const { themeMode, resolvedTheme, cycleTheme } = useTheme()
const themeButtonTitle = computed(() => t('theme.mode.' + themeMode.value) + '  ·  ' + t('theme.hint'))
const themeBtnStyle = computed(() => ({
  background: resolvedTheme.value === 'light'
    ? 'linear-gradient(145deg, #fff8e7, #fef1c5)'
    : 'linear-gradient(145deg, rgba(30,30,50,0.9), rgba(18,18,30,0.75))',
  borderColor: resolvedTheme.value === 'light' ? 'rgba(251,191,36,0.35)' : 'rgba(79,140,255,0.3)',
  color: resolvedTheme.value === 'light' ? '#b45309' : '#93c5fd',
}))

const tabs = [
  { id: 'calc', label: 'calc' },
  { id: 'graph', label: 'graph' },
  { id: 'eqn', label: 'eqn' },
  { id: 'mat', label: 'mat' },
  { id: 'vec', label: 'vec' },
  { id: 'stat', label: 'stat' },
  { id: 'calc-mod', label: 'calc-mod' },
  { id: 'python', label: 'python' }
] as const
const activeTab = ref<'calc' | 'graph' | 'eqn' | 'mat' | 'vec' | 'stat' | 'calc-mod' | 'python'>('calc')

function clearHistory() {
  state.history.splice(0, state.history.length)
}

function insertExpr(s: string) {
  activeTab.value = 'calc'
  expression.raw = s
  expression.cursor = s.length
}

// 键盘输入
function onKey(e: KeyboardEvent) {
  // 如果焦点在 input/textarea 上，拦截所有物理键盘输入（防止歧义编码）
  // 仅保留 Ctrl/Cmd 组合键（用于复制粘贴撤销）和 Tab 焦点切换
  const tgt = e.target as HTMLElement | null
  const typingOnInput =
    (tgt instanceof HTMLInputElement) ||
    (tgt instanceof HTMLTextAreaElement)
  if (typingOnInput) {
    if (e.ctrlKey || e.metaKey) return
    if (e.key === 'Tab') return
    e.preventDefault()
    return
  }
  if (activeTab.value !== 'calc') return
  const k = e.key
  if (e.ctrlKey || e.metaKey || e.altKey) {
    if (e.ctrlKey && k.toLowerCase() === 'z') { clearAll(); e.preventDefault() }
    return
  }
  if (/^[0-9]$/.test(k)) pressKey(k)
  else if (k === '.') pressKey('.')
  else if (k === '+') pressKey('+')
  else if (k === '-') pressKey('-')
  else if (k === '*' || k === 'x' || k === 'X') pressKey('*')
  else if (k === '/') pressKey('/')
  else if (k === '(') pressKey('(')
  else if (k === ')') pressKey(')')
  else if (k === '^') pressKey('^')
  else if (k === '%') pressKey('%')
  else if (k === '!') pressKey('!')
  else if (k === '=') { pressKey('='); e.preventDefault() }
  else if (k === 'Enter') { pressKey('='); e.preventDefault() }
  else if (k === 'Backspace') pressKey('DEL')
  else if (k === 'Delete') pressKey('AC')
  else if (k === 'Escape') pressKey('AC')
  else if (k === 'ArrowLeft') pressKey('◀')
  else if (k === 'ArrowRight') pressKey('▶')
  else if (k === 'ArrowUp') pressKey('▲')
  else if (k === 'ArrowDown') pressKey('▼')
  else if (k.toLowerCase() === 'p') pressKey('pi')
  else if (k.toLowerCase() === 'e') pressKey('e')
  else if (k === ',') pressKey(',')
}

// ========== 语言菜单 ==========
const langMenuOpen = ref(false)
const currentLangInfo = computed(() => languages.find(l => l.code === lang.value) || languages[0])
function pickLang(c: any) {
  setLang(c)
  try { localStorage.setItem('scp.lang', String(c)) } catch { /* ignore */ }
  langMenuOpen.value = false
}
// 初始化语言
try {
  const saved = localStorage.getItem('scp.lang') as any
  if (saved && languages.some(l => l.code === saved)) setLang(saved)
} catch { /* ignore */ }

function onClickOutsideLangMenu(e: MouseEvent) {
  if (!langMenuOpen.value) return
  const el = (e.target as HTMLElement)?.closest?.('[data-lang-root]')
  if (!el) langMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  document.addEventListener('mousedown', onClickOutsideLangMenu)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.removeEventListener('mousedown', onClickOutsideLangMenu)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(-6px) scale(0.98); }
.fade-leave-to { opacity: 0; transform: translateY(6px) scale(0.98); }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(12px); }
.slide-up-leave-to { opacity: 0; transform: translateY(8px); }

.hint-empty { opacity: 0.55; }
</style>

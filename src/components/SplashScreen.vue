<template>
  <div v-if="visible" class="splash-screen">
    <div class="splash-content">
      <div class="logo-container">
        <img :src="logoUrl" alt="Prism Technology Studio Logo" class="studio-logo"
             @error="onImgError" />
      </div>
      <div class="copyright">©2026 Prism Technology Studio</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{ duration?: number }>()
const visible = ref(true)
const logoUrl = ref('/prism-logo.jpg')

function onImgError(e: Event) {
  console.warn('Failed to load logo, falling back to placeholder.')
  // Fallback to a simple text-based logo if image fails to load
  const target = e.target as HTMLImageElement
  target.style.display = 'none'
  const parent = target.parentElement
  if (parent) {
    parent.innerHTML = '<div class="logo-fallback">PTS</div>'
  }
}

onMounted(() => {
  const timer = setTimeout(() => {
    visible.value = false
  }, props.duration ?? 1000)
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333333; /* 灰色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 10vh 0; /* 上下留出空间 */
}

.logo-container {
  flex-grow: 1;
  display: flex;
  align-items: flex-start; /* 靠上部分 */
  justify-content: center;
  padding-top: 10vh;
}

.studio-logo {
  max-width: 300px;
  width: 60vw;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.logo-fallback {
  font-size: 80px;
  font-weight: 900;
  color: #fff;
  letter-spacing: 4px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.copyright {
  color: #888;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  padding-bottom: 5vh;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  calcNative: {
    platform: string
    version: string
    isElectron: boolean
    runPython: (code: string) => Promise<any>
    probePython: () => Promise<any>
    openExternal: (url: string) => void
    sayHello: () => string
  }
}

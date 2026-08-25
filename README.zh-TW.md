# SCP - 科學計算器 Plus

[![Languages](https://img.shields.io/badge/UI%20%E8%AA%9E%E8%A8%80-7-informational)](#)
&nbsp;🇨🇳&nbsp;🇭🇰&nbsp;🇺🇸&nbsp;🇯🇵&nbsp;🇷🇺&nbsp;🇫🇷&nbsp;🇩🇪

**文件語言：**
[🇨🇳 简体中文](./README.zh.md) | **🇭🇰 繁體中文** | [🇺🇸 English](./README.md) | [🇯🇵 日本語](./README.ja.md) | [🇷🇺 Русский](./README.ru.md) | [🇫🇷 Français](./README.fr.md) | [🇩🇪 Deutsch](./README.de.md)

> 介面語言切換入口：應用內頂部標題列右側 **Language** 下拉按鈕（共 7 種語言）

一款專業級科學計算器桌面應用，採用卡西歐風格軟鍵盤、磨砂玻璃 UI、多主題支援，以及進階數學運算能力。

由 **Prism Technology Studio** (c) 2026 開發

## 功能特色

### 核心計算器
- 卡西歐風格軟鍵盤輸入（無需實體鍵盤，消除字元編碼歧義）
- 標準四則運算與完整運算式求值
- 角度模式：度 / 弧度 / 梯度
- 顯示模式：一般 / 固定 / 科學 / 工程
- 計算歷史紀錄回溯
- 單位換算面板

### 函數繪圖
- 同時繪製多個函數
- 16 色調色盤區分曲線
- 滑鼠/觸控拖曳平移與滾輪縮放
- 自適應座標格線
- 全螢幕模式：左上角「選單」按鈕可從上方彈出函數控制列

### 進階數學
- **方程求解**：二次方程、三次方程、線性方程組、非線性方程
- **矩陣運算**：加、減、乘、轉置、行列式、反矩陣、秩
- **向量運算**：加、減、點積、叉積、模長、單位化、夾角、投影
- **統計分析**：平均值、中位數、變異數、標準差、四分位數、相關係數、線性迴歸
- **微積分**：數值微分與定積分

### Python 整合
- **數學腳本模式**：內建輕量直譯器（變數、函式、for-range 迴圈、if-else）
- **本機 Python**：透過 Electron IPC 呼叫系統 Python（需安裝）
- **Pyodide 模式**：瀏覽器內 WebAssembly Python（免安裝）

### UI / UX
- 磨砂玻璃特效（backdrop blur）
- 三種主題：跟隨系統 / 深色 / 亮色（CSS 變數驅動）
- 極光背景動畫與 Logo 脈動
- 按鍵懸浮提示：滑鼠游標停在任意按鍵上顯示功能說明
- 多語言（7 種）支援，頂部選單列 Language 按鈕切換
- 響應式配置：桌面端橫向顯示（左鍵盤、右螢幕）

### 桌面與行動端
- **Windows**：NSIS 安裝版、可攜式 EXE、ZIP 壓縮包
- **Android**：Capacitor 整合（APK 建置就緒）

## 技術堆疊

| 層級 | 技術 |
|------|------|
| 框架 | Vue 3 + TypeScript |
| 建置工具 | Vite |
| 樣式 | Tailwind CSS + CSS 變數 |
| 桌面端 | Electron 28 |
| 行動端 | Capacitor 5 (Android) |
| 打包 | electron-builder (NSIS / Portable / ZIP) |

## 專案結構

```
src/
  components/       # Vue UI 元件
    CalcScreen.vue       # 計算器顯示幕
    CalcKeyboard.vue     # 軟鍵盤配置
    CalcKey.vue           # 單一按鍵
    GraphPanel.vue        # 函數繪圖
    AdvancedPanel.vue     # 方程/矩陣/向量/統計/微積分
    PythonPanel.vue       # Python / 指令碼編輯器
    SettingsPanel.vue     # 單位換算與設定
    HistoryPanel.vue      # 計算歷史
  composables/     # Vue 組合式函式
    useCalculator.ts      # 計算器引擎狀態
    useInputRouter.ts     # 軟鍵盤輸入路由
    useHoverHint.ts       # 懸浮提示共享狀態
    useTheme.ts           # 主題管理
  engine/          # 核心數學引擎
    calculator.ts         # 運算式解析與求值
    advanced.ts           # 進階數學運算
    script.ts             # 數學指令碼直譯器
  i18n/            # 國際化
    messages.ts           # 簡中 / 繁中 / 英 / 日 / 俄 / 法 / 德 翻譯
    index.ts              # 翻譯組合式函式 + 語言註冊表
  constants/       # 按鍵配置定義
  types/            # TypeScript 型別定義
electron/
  main.js           # Electron 主程序
  preload.js        # 預載橋接 API
scripts/
  gen-icons.js      # 圖示生成（PNG / ICO）
```

## 快速開始

### 前置需求

- Node.js >= 18
- npm 或 yarn

### 安裝

```bash
npm install
```

### 開發

```bash
# Web 開發伺服器
npm run dev

# Electron 桌面端開發
npm run electron:dev
```

### 打包

```bash
# Windows 安裝版 + 可攜式 + ZIP
npm run electron:build:win

# 生成圖示
npm run icons

# Android APK（需 Android SDK）
npm run android:apk
```

打包產物輸出至 `release-final/` 目錄。

## 下載

預編譯二進位檔可在 [Releases](../../releases) 頁面下載：
- `SCP-Setup-1.1.0-x64.exe` — NSIS 安裝版（推薦）
- `SCP-Portable-1.1.0-x64.exe` — 可攜式（免安裝）
- `SCP-1.1.0-x64.zip` — ZIP 壓縮包

## 授權條款

**GNU General Public License v3.0** — 完整條款請參閱 [LICENSE](LICENSE) 檔案。

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## 關於

造訪 [ptstudio.top](https://ptstudio.top) 取得更多資訊。

Copyright (c) 2026 Prism Technology Studio

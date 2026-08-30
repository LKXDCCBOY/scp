# SCP - 科學計算器 Plus

![Version](https://img.shields.io/badge/Version-1.2.1-blue)
[![Languages](https://img.shields.io/badge/UI%20Languages-7-informational)](#)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Android-green)

**Documentation:**
[简体中文](./README.zh.md) | [繁體中文](./README.zh-TW.md) | **English** | [日本語](./README.ja.md) | [Русский](./README.ru.md) | [Francais](./README.fr.md) | [Deutsch](./README.de.md)

> **介面語言切換：** 應用內頂部列 -> **Language** 下拉選單（支援 7 種語言）

一款專業的**科學計算器**桌面與行動應用，配備 **Casio 風格**軟鍵盤、毛玻璃（Glassmorphism）介面、多主題支援、函數繪圖與幾何作圖工具，以及進階數學運算能力 —— 專為工程師、學生和科研人員打造。

由 **Prism Technology Studio** 開發 (c) 2026

---

## 功能特性

### 核心計算器（Casio 風格）
- **Casio 風格軟鍵盤** —— 僅透過螢幕按鍵輸入，消除字元編碼歧義
- 完整運算式求值，支援運算子優先順序與括號
- **SHIFT** / **ALPHA** 修飾鍵系統，用於切換二級功能
- **記憶體**：M+ / M- / STO / RCL（變數 A-F、X、Y、M）
- **角度模式**：Degree / Radian / Gradian（DRG 循環切換）
- **5 種輸出模式**：Normal / Scientific / Engineering / Fraction / Linear（透過 NORM/SCI/ENG 循環切換）
- 三角函數：sin / cos / tan 及反函數；雙曲函數：sinh / cosh / tanh 及反函數
- 冪與根：`x^2`、`x^3`、`^`、`sqrt`、`cbrt`、`1/x`、`|x|`
- 對數：`log`（以 10 為底）/ `ln`（自然對數）+ 反函數 `10^x` / `e^x`
- 常數：pi、e（尤拉數）
- 組合數學：階乘 `x!`、亂數
- **計算歷史**，支援召回、搜尋與一鍵重用
- **單位換算**面板

### 變數鍵盤（未知數）
- 主鍵盤上專用的 **VAR** 按鈕可開啟彈窗式變數小鍵盤
- **小寫字母**：a-z + pi（28 鍵）
- **大寫字母**：A-Z + theta + lambda（28 鍵）
- **希臘字母**：alpha、beta、gamma、delta、epsilon、mu、sigma、omega、phi、psi、eta、rho、tau、infinity（14 鍵）
- 支援計算器引擎中的所有單字母變數（A-Z、a-z）
- 用於繪圖的全域參數綁定面板（a、b、c、m、n、k、d、z）

### 函數繪圖 + 自由繪圖 + 幾何作圖

**多功能繪圖器**
- 同時繪製 **16** 個函數（16 色調色盤 —— 多函數情況下顏色不重複）
- 即時平移（拖曳）與縮放（滾輪）
- 自適應座標網格，自動標註
- 全螢幕模式，函數控制列可收合（左上角 **Menu** 按鈕，透過選單切換 / X 按鈕 / 點擊背景關閉）
- **參數方程式**：x(t) 與 y(t)，t 範圍可調
- **選中函數高亮**：選中的函數列顯示徽章 + 邊框高亮；畫布曲線採用雙描邊（外發光 + 內加粗）

**自由手繪（草圖模式）**
- 可在繪圖畫布上自由繪製或書寫
- 8 色調色盤（Blue / Rose / Emerald / Amber / Violet / Cyan / Pink / White）
- 可調線寬（1-8 px）
- 筆畫以**數學座標**儲存 —— 與網格一同平移和縮放
- 一鍵清除

**幾何作圖工具**

| 工具 | 說明 |
|------|-------------|
| **Point（點）** | 點擊任意位置放置帶標籤的點（P1、P2...） |
| **Line（直線）** | 兩次點擊 —— 繪製無限長直線（延伸至螢幕邊緣） |
| **Segment（線段）** | 兩次點擊 —— 繪製有限線段（帶端點標記） |
| **Parallel（平行線）** | 1. 點擊靠近某條直線/線段 2. 點擊一個點 —— 過該點作平行線 |
| **Perpendicular（垂線）** | 1. 點擊靠近某條直線/線段 2. 點擊一個點 —— 過該點作垂線 |
| **Intersection（交點）** | 1. 點擊靠近函數 A 2. 點擊靠近函數 B —— 透過 500 點掃描 + 50 次二分法求交點（精度約 1e-15），顯示點 + 座標 |

選中的參考線（平行線/垂線）以更亮的顏色、加粗描邊和發光效果高亮顯示。

### 進階數學（5 個專用分頁）

| 分頁 | 功能 |
|-----|-------------|
| **Equations（EQN，方程式）** | 二次方程式求解器（ax^2+bx+c=0，含複數根）；三次方程式求解器（Cardano 公式）；任意一元方程式求根（二分法 + 牛頓法）；n 元線性方程組（帶部分樞軸的高斯消去法） |
| **Matrices（MAT，矩陣）** | 矩陣 A/B/C + 運算 —— 加、減、乘、轉置、行列式、逆、秩、階梯形 |
| **Vectors（VEC，向量）** | 向量 a/b —— 加、減、點積、叉積、模、單位化、夾角、純量/向量投影 |
| **Statistics（STAT，統計）** | 輸入 X + 可選 Y 資料 -> 平均值、中位數、眾數、最小/最大值、Q1/Q3、變異數、標準差、共變異數、Pearson 相關係數（r）、線性迴歸 y = a + bx |
| **Calculus（MOD，微積分）** | 數值微分（一階與二階，四階中心差分）；自適應數值積分（Simpson 1/3 法） |

### Python 與數學腳本整合

一個面板內提供三種執行模式：

| 模式 | 說明 |
|------|-------------|
| **Math Script（數學腳本）** | 零載入、即時執行的輕量直譯器。支援：變數賦值、`print()`、`for x in range(a,b,c)`、`if`/`elif`/`else`、`def` 函式定義、所有科學函數（sin、cos、tan、log、ln、sqrt、abs、floor...） |
| **Native Python（原生 Python）** | 透過 Electron IPC 呼叫本地安裝的 Python 直譯器。支援標準庫 + 第三方套件。需要 PATH 中存在 Python 3。 |
| **Pyodide** | 瀏覽器內 WebAssembly Python —— 無需安裝。在沙盒中執行，附帶標準庫與 numpy。 |

**安全防護**（三種模式均適用）：
- 預掃描：拒絕 `**100000` 式巨型指數、`range(100000000)`、`[x]*100000000`、`"x"*100000000`
- Pyodide **15 秒逾時**（Promise.race）
- Pyodide stdout/stderr **200 KB 輸出截斷**
- 數學腳本：**500,000 條敘述上限** + **10,000 行輸出上限**（防止無窮迴圈）
- 計算器引擎：指數溢位預檢查（`|b| > 300 && |a| > 1`）
- 原生 Python：**5 MB stdout/stderr 緩衝上限** + 進程逾時

### 介面 / 互動體驗

- **毛玻璃（Glassmorphism）設計**，多層 `backdrop-blur` + 極光漸層背景
- **三種主題模式**（由 CSS 變數驅動，可動態切換）：
  - **Follow System（跟隨系統）** —— 跟隨作業系統主題
  - **Dark（深色）** —— 深空風格，已全面測試
  - **Light（淺色）** —— 簡潔白色，已全面測試（無不可見文字）
- 動畫極光背景與 Logo 脈動效果（僅使用 SVG 圖示 —— 全程無 emoji）
- **懸停提示** —— 滑鼠懸停任意按鍵時，左下角面板顯示其詳細功能說明
- **7 種語言介面**，透過頂部列 Language 下拉選單切換（地球 SVG 圖示）：
  - 簡體中文（zhongwen）
  - 繁體中文（fantizi）
  - English
  - 日語（nihongo）
  - 俄語（russkiy）
  - 法語（francais）
  - 德語（deutsch）
- **響應式版面配置**：桌面端橫向（左側按鍵，右側螢幕）；行動端直向（頂部螢幕，下方鍵盤），針對 380px 超窄螢幕與 520px 超矮螢幕動態縮放

### 桌面端與行動端

- **Windows**：NSIS 安裝包 + 可攜版 EXE + ZIP 壓縮檔
- **Android**：Capacitor 6 整合，APK 建置就緒（debug + release）

---

## 技術棧

| 層級 | 技術 |
|-------|-----------|
| 前端框架 | **Vue 3** + **TypeScript** |
| 建置工具 | **Vite** |
| 樣式 | **Tailwind CSS** + **CSS Variables**（主題化） |
| 桌面執行階段 | **Electron 28** |
| 行動執行階段 | **Capacitor 6**（Android，compileSdk 34，minSdk 22） |
| 打包 | `electron-builder` —— NSIS / Portable / ZIP |
| Android 建置 | Gradle 8.7 + AGP 8.5.2，騰訊 Gradle 鏡像 + 阿里雲 Maven 鏡像 |
| 圖示生成 | 自訂 Node 腳本 -> PNG（256/512）+ Windows ICO（6 種尺寸） |

---

## 專案結構

```
scp/
|-- src/
|   |-- components/          # Vue UI components
|   |   |-- CalcScreen.vue          # Calculator display screen
|   |   |-- CalcKeyboard.vue        # Soft keyboard layout + VAR popup
|   |   |-- CalcKey.vue             # Individual key with hover hint
|   |   |-- GraphPanel.vue          # Function plotter + drawing + geometry
|   |   |-- AdvancedPanel.vue       # Eqn / Matrix / Vector / Stats / Calc
|   |   |-- PythonPanel.vue         # Math Script / Native Python / Pyodide
|   |   |-- SettingsPanel.vue       # Unit conversion and settings
|   |   `-- HistoryPanel.vue        # Calculation history
|   |-- composables/          # Vue composition functions
|   |   |-- useCalculator.ts        # Calculator engine state
|   |   |-- useInputRouter.ts       # Soft-keyboard -> active input routing
|   |   |-- useHoverHint.ts         # Hover-hint shared state
|   |   `-- useTheme.ts             # Dark / Light / System theme mgmt
|   |-- engine/               # Core math engines
|   |   |-- calculator.ts           # Expression lexer + parser + evaluator
|   |   |-- advanced.ts             # Matrix, vector, stats, calc, eq solvers
|   |   `-- script.ts               # Math Script interpreter (variables + loops + funcs)
|   |-- i18n/                 # Internationalization (7 languages)
|   |   |-- messages.ts             # zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
|   |   `-- index.ts                # t() translate + language registry
|   |-- constants/            # Key layout definitions
|   |-- types/                # TypeScript type definitions
|   |-- App.vue               # Root component + Language menu
|   `-- style.css             # Global styles + CSS variables (themes)
|-- electron/
|   |-- main.js               # Electron main process (window, IPC Python)
|   `-- preload.js            # Preload bridge (calcNative API)
|-- android/                   # Capacitor 6 Android project
|-- scripts/
|   |-- gen-icons.js          # PNG + ICO icon generator
|   |-- android-envcheck.bat  # Android build environment checker
|   `-- android-build.bat     # One-click APK build script
|-- build-apk.bat             # Root-level APK build shortcut
|-- build/
|   `-- icon.ico              # Windows icon (16/32/48/64/128/256)
`-- package.json              # v1.2.1 - GPL-3.0 - electron-builder config
```

---

## 快速開始

### 前置需求
- **Node.js >= 18**（推薦：20 LTS）
- **npm**

### 安裝相依套件
```bash
npm install
```

### 開發
```bash
# Web dev server (http://localhost:5173)
npm run dev

# Electron desktop dev mode (app window)
npm run electron:dev
```

### 建置桌面端（Windows EXE）
```bash
# Build frontend assets (dist/)
npm run build

# Windows: NSIS installer + Portable EXE + ZIP
npm run electron:build:win
```

建置產物輸出至 `release-scp-v1.2.1b/`。

### 建置 Android（APK）

**一鍵建置（推薦）：**
```bash
# Debug APK (double-click or command line)
build-apk.bat debug

# Release APK
build-apk.bat release
```

**先進行環境檢查：**
```bash
scripts\android-envcheck.bat
```

建置腳本會自動偵測 JDK（優先順序：Android Studio JBR 21 -> JAVA_HOME -> Adoptium/Microsoft JDK -> PATH）與 Android SDK（ANDROID_HOME -> ANDROID_SDK_ROOT -> %LOCALAPPDATA%\Android\Sdk）。會拒絕 JDK 22（與 Gradle 8.7 不相容）。

建置產物輸出至 `release-android/`。

---

## 下載 v1.2.1

預編譯二進位檔案可在 [**GitHub Releases**](../../releases) 頁面取得：

| 檔案 | 說明 |
|------|-------------|
| `SCP-Setup-1.2.1-x64.exe`   | NSIS 安裝包 **（推薦）** —— 可選擇安裝目錄、建立捷徑 |
| `SCP-Portable-1.2.1-x64.exe`| 可攜獨立版 —— 無需安裝，雙擊即可執行 |
| `SCP-1.2.1-x64.zip`         | ZIP 壓縮檔 —— 解壓縮後執行 `SCP.exe` |
| `SCP-1.2.1-debug.apk`       | Android Debug APK —— 可直接安裝在 Android 5.1+ 上 |

---

## 授權條款

**GNU General Public License v3.0** —— 完整條款見 [LICENSE](LICENSE) 檔案。

Copyright (c) 2026 **Prism Technology Studio**

---

## 關於

造訪 [**ptstudio.top**](https://ptstudio.top) 了解更多關於我們產品的資訊。

Copyright (c) 2026 Prism Technology Studio - 保留一切權利

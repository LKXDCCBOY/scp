# SCP - Scientific Calculator Plus

![Version](https://img.shields.io/badge/Version-1.2.1-blue)
[![Languages](https://img.shields.io/badge/UI%20Languages-7-informational)](#)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Android-green)

**Documentation:**
[🇨🇳 简体中文](./README.zh.md) | [🇭🇰 繁體中文](./README.zh-TW.md) | **🇺🇸 English** | [🇯🇵 日本語](./README.ja.md) | [🇷🇺 Русский](./README.ru.md) | [🇫🇷 Français](./README.fr.md) | [🇩🇪 Deutsch](./README.de.md)

> **UI Language Switch:** In-app top bar → **Language** dropdown (7 languages available)

A professional **scientific calculator** desktop application with a **Casio-style** soft keyboard, glassmorphism UI, multi-theme support, function graphing with drawing & geometry tools, and advanced mathematical capabilities — built for engineers, students, and scientists.

Developed by **Prism Technology Studio** © 2026

---

## ✨ Features

### 🧮 Core Calculator (Casio-Style)
- **Casio-style soft keyboard** — input via on-screen keys only, eliminates character encoding ambiguity
- Full expression evaluation with operator precedence and parentheses
- **SHIFT** / **ALPHA** modifier system for secondary functions
- **Memory**: M+ / M− / STO / RCL (variables A–F, X, Y, M)
- **Angle modes**: Degree / Radian / Gradian (DRG cycling)
- **Notation modes**: Normal / Fixed / Scientific / Engineering (ENG / NORM)
- Trigonometric: sin / cos / tan + inverses; Hyperbolic: sinh / cosh / tanh + inverses
- Power & roots: `x²`, `x³`, `^`, `√`, `∛`, `1/x`, `|x|`
- Logarithmic: `log` (base 10) / `ln` (natural) + inverse `10^x` / `e^x`
- Constants: π (Pi), e (Euler's number)
- Combinatorics: factorial `x!`, random numbers
- **Calculation history** with recall + search + one-click reuse
- **Unit conversion** panel

### 📈 Function Graphing + Drawing + Geometry Construction

**Multi-Function Plotter**
- Plot **16** functions simultaneously (16-color palette — no color repeat for many functions)
- Real-time pan (drag) & zoom (scroll wheel)
- Adaptive coordinate grid with auto-labeling
- Fullscreen mode with collapsible function control bar (top-left **Menu** button)

**✏️ Free-Hand Drawing (Sketch Mode)**
- Draw or write freely on the graph canvas
- 8-color palette (Blue / Rose / Emerald / Amber / Violet / Cyan / Pink / White)
- Adjustable stroke width (1 – 8 px)
- Strokes are stored in **math coordinates** — they **pan & zoom together** with the grid
- One-click clear

**🛠️ Geometry Construction Tools**
| Tool | Description |
|------|-------------|
| **Point** | Click anywhere to place a labeled point (P1, P2…) |
| **Line** | Two clicks — draws an **infinite line** (extends to screen edges) |
| **Segment** | Two clicks — draws a **finite segment** (with endpoint markers) |
| **Parallel** | ① Click near a line/segment → ② Click a point → **parallel line** through that point |
| **Perpendicular** | ① Click near a line/segment → ② Click a point → **perpendicular line** through that point |
| **Intersection** | ① Click near function A → ② Click near function B → finds intersection via **500-point scan + 50× bisection** (precision ~1e-15), shows point + coordinates |

### 📐 Advanced Mathematics (5 dedicated tabs)
| Tab | Capabilities |
|-----|-------------|
| **Equations (EQN)** | • Quadratic solver (ax²+bx+c=0, incl. complex roots)<br>• Cubic solver (Cardano formula)<br>• Any univariate root-finding (Bisection + Newton)<br>• Linear system n×n (Gaussian elimination with partial pivot) |
| **Matrices (MAT)** | Matrix A/B/C + arithmetic — add, subtract, multiply, transpose, determinant, inverse, rank, Echelon form |
| **Vectors (VEC)** | Vector a/b — add, subtract, dot product, cross product, norm, normalization, angle between, scalar/vector projection |
| **Statistics (STAT)** | Input X + optional Y data → mean, median, mode, min/max, Q1/Q3, variance, standard deviation, covariance, Pearson correlation coefficient (r), **Linear Regression** y = a + bx |
| **Calculus (MOD)** | • Numerical differentiation (1st & 2nd order, 4th-order central difference)<br>• Adaptive numerical integration (Simpson 1/3) |

### 🐍 Python & Math Script Integration

Three execution modes in one panel:

| Mode | Description |
|------|-------------|
| **Math Script** | Zero-load, instant-run lightweight interpreter. Supports: variable assignment, `print()`, `for x in range(a,b,c)`, `if`/`elif`/`else`, `def` function definitions, all scientific functions (sin, cos, tan, log, ln, sqrt, abs, floor…) |
| **Native Python** | Calls the locally installed Python interpreter via Electron IPC. Supports standard library + third-party packages. Requires Python 3 on PATH. |
| **Pyodide** | In-browser WebAssembly Python — no installation needed. Runs in sandbox with standard library & numpy. |

**Safety safeguards** (all three modes):
- 🔴 Pre-scan: rejects `**100000` style giant exponent, `range(100000000)`, `[x]*100000000`, `"x"*100000000`
- ⏱️ Pyodide **15-second timeout** (`Promise.race`)
- 📊 Pyodide stdout/stderr **200 KB output truncation**
- 📊 Math script: **500,000 statements cap** + **10,000 output lines cap** (anti-infinite-loop)
- 🛡️ Calculator engine: exponent overflow pre-check (`|b| > 300 && |a| > 1`)
- 🛡️ Native Python: **5 MB stdout/stderr buffer cap** + process timeout

### 🎨 UI / UX

- **Glassmorphism (frosted glass) design** with multi-layer `backdrop-blur` + aurora gradient background
- **Three theme modes** (CSS-variable driven, dynamically switchable):
  - **Follow System** — follows OS theme
  - **Dark** — deep space, fully tested
  - **Light** — clean white, fully tested (no invisible text)
- Animated aurora background & logo pulse (SVG icons only — no emoji anywhere)
- **Hover hints** — mouse over any key shows its detailed function description in the bottom-left panel
- **7-languages UI** with top-bar Language dropdown (🌐 globe SVG icon):
  - 🇨🇳 **Simplified Chinese** (简体中文)
  - 🇭🇰 **Traditional Chinese** (繁體中文)
  - 🇺🇸 **English**
  - 🇯🇵 **Japanese** (日本語)
  - 🇷🇺 **Russian** (Русский)
  - 🇫🇷 **French** (Français)
  - 🇩🇪 **German** (Deutsch)
- Responsive layout: landscape (**keys left, screen right**) on desktop

### 💻 Desktop & 📱 Mobile
- **Windows**: NSIS installer + Portable EXE + ZIP archive
- **Android**: Capacitor 5 integration (APK build ready)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | **Vue 3** + **TypeScript** |
| Build Tool | **Vite** |
| Styling | **Tailwind CSS** + **CSS Variables** (theming) |
| Desktop Runtime | **Electron 28** |
| Mobile Runtime | **Capacitor 5** (Android) |
| Packaging | `electron-builder` — NSIS / Portable / ZIP |
| Icon Generation | Custom Node script → PNG (256/512) + Windows ICO (6 sizes) |

---

## 📁 Project Structure

```
scp/
├── src/
│   ├── components/          # Vue UI components
│   │   ├── CalcScreen.vue          # Calculator display screen
│   │   ├── CalcKeyboard.vue        # Soft keyboard layout
│   │   ├── CalcKey.vue             # Individual key with hover hint
│   │   ├── GraphPanel.vue          # Function plotter + drawing + geometry
│   │   ├── AdvancedPanel.vue       # Eqn / Matrix / Vector / Stats / Calc
│   │   ├── PythonPanel.vue         # Math Script / Native Python / Pyodide
│   │   ├── SettingsPanel.vue       # Unit conversion & settings
│   │   └── HistoryPanel.vue        # Calculation history
│   ├── composables/          # Vue composition functions
│   │   ├── useCalculator.ts        # Calculator engine state
│   │   ├── useInputRouter.ts       # Soft-keyboard → active input routing
│   │   ├── useHoverHint.ts         # Hover-hint shared state
│   │   └── useTheme.ts             # Dark / Light / System theme mgmt
│   ├── engine/               # Core math engines
│   │   ├── calculator.ts           # Expression lexer + parser + evaluator
│   │   ├── advanced.ts             # Matrix, vector, stats, calc, eq solvers
│   │   └── script.ts               # Math Script interpreter (variables + loops + funcs)
│   ├── i18n/                 # Internationalization (7 languages)
│   │   ├── messages.ts             # zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
│   │   └── index.ts                # t() translate + language registry
│   ├── constants/            # Key layout definitions
│   ├── types/                # TypeScript type definitions
│   ├── App.vue               # Root component + Language menu
│   └── style.css             # Global styles + CSS variables (themes)
├── electron/
│   ├── main.js               # Electron main process (window, IPC Python)
│   └── preload.js            # Preload bridge (calcNative API)
├── scripts/
│   └── gen-icons.js          # PNG + ICO icon generator
├── public/
│   ├── icon.svg              # Atom-logo brand icon (SVG)
│   ├── icon.png              # 512×512 atom logo
│   └── logo.png              # Topbar logo image
├── build/
│   └── icon.ico              # Windows icon (16/32/48/64/128/256)
└── package.json              # v1.2.1 · GPL-3.0 · electron-builder config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js ≥ 18** (recommended: 20 LTS)
- **npm** or **yarn**

### Install Dependencies
```bash
npm install
```

### Development
```bash
# Web dev server (http://localhost:5173)
npm run dev

# Electron desktop dev mode (app window)
npm run electron:dev
```

### Build Production Binaries
```bash
# Build frontend assets (dist/)
npm run build

# Windows: NSIS installer + Portable EXE + ZIP
npm run electron:build:win

# Regenerate PNG + ICO icons (requires icon.svg)
npm run icons

# Android APK (requires Android SDK, Capacitor CLI)
npm run android:apk
```

Build artifacts are output to `release-v1.2.1/` (or `release-final/`).

---

## ⬇️ Download v1.2.1

Pre-built binaries are available on the [**GitHub Releases**](../../releases) page:

| File | Description |
|------|-------------|
| `SCP-Setup-1.2.1-x64.exe`   | NSIS installer **(recommended)** — choose install folder, create shortcuts |
| `SCP-Portable-1.2.1-x64.exe`| Portable standalone **— no installation, double-click to run** |
| `SCP-1.2.1-x64.zip`         | ZIP archive — extract and run `SCP.exe` |

---

## 📜 License

**GNU General Public License v3.0** — see the [LICENSE](LICENSE) file for full terms.

Copyright © 2026 **Prism Technology Studio**

---

## 🏢 About

Visit [**ptstudio.top**](https://ptstudio.top) for more information about our products.

Copyright © 2026 Prism Technology Studio · All Rights Reserved

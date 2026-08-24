# SCP - Scientific Calculator Plus

**English** | [中文](./README.zh.md)

A professional scientific calculator desktop application with a Casio-style soft keyboard, glassmorphism UI, multi-theme support, and advanced mathematical capabilities.

Developed by **Prism Technology Studio** (c) 2026

## Features

### Core Calculator
- Casio-style soft keyboard input (no physical keyboard typing required — eliminates encoding ambiguity)
- Standard arithmetic with full expression evaluation
- Angle modes: Degree / Radian / Gradian
- Notation modes: Normal / Fixed / Scientific / Engineering
- Calculation history with recall
- Unit conversion panel

### Function Graphing
- Plot multiple functions simultaneously
- 16-color palette for curve differentiation
- Pan and zoom with mouse / touch
- Coordinate grid with adaptive scale

### Advanced Mathematics
- **Equation Solver**: Quadratic, cubic, and linear system equations
- **Matrix Operations**: Addition, subtraction, multiplication, transpose, determinant, inverse, rank
- **Vector Operations**: Addition, subtraction, dot product, cross product, norm, normalization, angle, projection
- **Statistics**: Mean, median, variance, standard deviation, quartiles, correlation, linear regression
- **Calculus**: Numerical derivative and definite integration

### Python Integration
- **Math Script Mode**: Built-in lightweight interpreter (variables, functions, for-range loops, if-else)
- **Native Python**: Call system Python via Electron IPC (if installed)
- **Pyodide Mode**: WebAssembly Python in-browser (no installation needed)

### UI / UX
- Glassmorphism (frosted glass) design with backdrop blur
- Three theme modes: Follow System / Dark / Light (CSS variable driven)
- Animated aurora background and logo pulse
- Hover hints: mouse over any key shows its function description
- Multilingual: Chinese / English toggle
- Responsive layout: landscape (keys left, screen right) on desktop

### Desktop & Mobile
- **Windows**: NSIS installer, portable EXE, and ZIP
- **Android**: Capacitor integration (APK build ready)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + CSS Variables |
| Desktop | Electron 28 |
| Mobile | Capacitor 5 (Android) |
| Packaging | electron-builder (NSIS / Portable / ZIP) |

## Project Structure

```
src/
  components/       # Vue UI components
    CalcScreen.vue       # Calculator display
    CalcKeyboard.vue     # Soft keyboard layout
    CalcKey.vue           # Individual key
    GraphPanel.vue        # Function plotter
    AdvancedPanel.vue     # Eqn / Matrix / Vector / Stats / Calculus
    PythonPanel.vue       # Python / script editor
    SettingsPanel.vue     # Unit conversion & settings
    HistoryPanel.vue      # Calculation history
  composables/     # Vue composition functions
    useCalculator.ts      # Calculator engine state
    useInputRouter.ts     # Soft-keyboard-to-input routing
    useHoverHint.ts       # Hover hint shared state
    useTheme.ts           # Theme management
  engine/          # Core math engine
    calculator.ts         # Expression parser & evaluator
    advanced.ts           # Advanced math operations
    script.ts             # Math script interpreter
  i18n/            # Internationalization
    messages.ts           # zh / en translation
    index.ts              # Translation composable
  constants/       # Key layout definitions
  types/            # TypeScript type definitions
electron/
  main.js           # Electron main process
  preload.js        # Preload bridge API
scripts/
  gen-icons.js      # Icon generation (PNG / ICO)
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Install

```bash
npm install
```

### Development

```bash
# Web dev server
npm run dev

# Electron desktop dev
npm run electron:dev
```

### Build

```bash
# Windows installer + portable + zip
npm run electron:build:win

# Generate icons
npm run icons

# Android APK (requires Android SDK)
npm run android:apk
```

Build artifacts are output to `release-final/`.

## Download

Pre-built binaries are available on the [Releases](../../releases) page:
- `SCP-Setup-1.0.1-x64.exe` — NSIS installer (recommended)
- `SCP-Portable-1.0.1-x64.exe` — Portable standalone EXE
- `SCP-1.0.1-x64.zip` — Zip archive

## License

MIT License — see [LICENSE](LICENSE) file.

## About

Visit [ptstudio.top](https://ptstudio.top) for more information.

Copyright (c) 2026 Prism Technology Studio

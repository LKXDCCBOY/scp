# SCP - 科学计算器 Plus

[English](./README.md) | **中文**

一款专业级科学计算器桌面应用，采用卡西欧风格软键盘、磨砂玻璃 UI、多主题支持，以及高级数学运算能力。

由 **Prism Technology Studio** (c) 2026 开发

## 功能特性

### 核心计算器
- 卡西欧风格软键盘输入（无需物理键盘，消除字符编码歧义）
- 标准四则运算与完整表达式求值
- 角度模式：度 / 弧度 / 梯度
- 显示模式：常规 / 固定 / 科学 / 工程
- 计算历史记录回溯
- 单位换算面板

### 函数绘图
- 同时绘制多个函数
- 16 色调色板区分曲线
- 鼠标/触摸拖拽平移与滚轮缩放
- 自适应坐标网格
- 全屏模式

### 高级数学
- **方程求解**：二次方程、三次方程、线性方程组、非线性方程
- **矩阵运算**：加、减、乘、转置、行列式、逆矩阵、秩
- **向量运算**：加、减、点积、叉积、模长、单位化、夹角、投影
- **统计分析**：均值、中位数、方差、标准差、四分位数、相关系数、线性回归
- **微积分**：数值求导与定积分

### Python 集成
- **数学脚本模式**：内置轻量解释器（变量、函数、for-range 循环、if-else）
- **本机 Python**：通过 Electron IPC 调用系统 Python（需安装）
- **Pyodide 模式**：浏览器内 WebAssembly Python（免安装）

### UI / UX
- 磨砂玻璃特效（backdrop blur）
- 三种主题：跟随系统 / 深色 / 明亮（CSS 变量驱动）
- 极光背景动画与 Logo 脉动
- 按键悬浮提示：鼠标悬停任意按键显示功能说明
- 多语言：中文 / 英文切换
- 响应式布局：桌面端横屏（左键盘、右屏幕）

### 桌面与移动端
- **Windows**：NSIS 安装版、便携版 EXE、ZIP 压缩包
- **Android**：Capacitor 集成（APK 构建就绪）

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Vue 3 + TypeScript |
| 构建工具 | Vite |
| 样式 | Tailwind CSS + CSS 变量 |
| 桌面端 | Electron 28 |
| 移动端 | Capacitor 5 (Android) |
| 打包 | electron-builder (NSIS / Portable / ZIP) |

## 项目结构

```
src/
  components/       # Vue UI 组件
    CalcScreen.vue       # 计算器显示屏
    CalcKeyboard.vue     # 软键盘布局
    CalcKey.vue           # 单个按键
    GraphPanel.vue        # 函数绘图
    AdvancedPanel.vue     # 方程/矩阵/向量/统计/微积分
    PythonPanel.vue       # Python / 脚本编辑器
    SettingsPanel.vue     # 单位换算与设置
    HistoryPanel.vue      # 计算历史
  composables/     # Vue 组合式函数
    useCalculator.ts      # 计算器引擎状态
    useInputRouter.ts     # 软键盘输入路由
    useHoverHint.ts       # 悬浮提示共享状态
    useTheme.ts           # 主题管理
  engine/          # 核心数学引擎
    calculator.ts         # 表达式解析与求值
    advanced.ts           # 高级数学运算
    script.ts             # 数学脚本解释器
  i18n/            # 国际化
    messages.ts           # 中 / 英翻译
    index.ts              # 翻译组合式函数
  constants/       # 按键布局定义
  types/            # TypeScript 类型定义
electron/
  main.js           # Electron 主进程
  preload.js        # 预加载桥接 API
scripts/
  gen-icons.js      # 图标生成（PNG / ICO）
```

## 快速开始

### 前置条件

- Node.js >= 18
- npm 或 yarn

### 安装

```bash
npm install
```

### 开发

```bash
# Web 开发服务器
npm run dev

# Electron 桌面端开发
npm run electron:dev
```

### 打包

```bash
# Windows 安装版 + 便携版 + ZIP
npm run electron:build:win

# 生成图标
npm run icons

# Android APK（需 Android SDK）
npm run android:apk
```

打包产物输出至 `release-final/` 目录。

## 下载

预编译二进制文件可在 [Releases](../../releases) 页面下载：
- `SCP-Setup-1.0.0-x64.exe` — NSIS 安装版（推荐）
- `SCP-Portable-1.0.0-x64.exe` — 便携版（免安装）
- `SCP-1.0.0-x64.zip` — ZIP 压缩包

## 许可证

MIT License — 见 [LICENSE](LICENSE) 文件。

## 关于

访问 [ptstudio.top](https://ptstudio.top) 获取更多信息。

Copyright (c) 2026 Prism Technology Studio

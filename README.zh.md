# SCP - 科学计算器 Plus

![Version](https://img.shields.io/badge/版本-1.2.1-blue)
[![Languages](https://img.shields.io/badge/界面%20语言-7-informational)](#)
[![License: GPL v3](https://img.shields.io/badge/许可证-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Platform](https://img.shields.io/badge/平台-Windows%20%7C%20Android-green)

**文档语言：**
[🇨🇳 **简体中文**](./README.zh.md) | [🇭🇰 繁體中文](./README.zh-TW.md) | [🇺🇸 English](./README.md) | [🇯🇵 日本語](./README.ja.md) | [🇷🇺 Русский](./README.ru.md) | [🇫🇷 Français](./README.fr.md) | [🇩🇪 Deutsch](./README.de.md)

> **界面语言切换入口：** 应用顶部标题栏右侧 **Language** 下拉按钮（共 7 种语言）

一款面向工程师、学生和科研人员的**专业科学计算器**桌面应用：**卡西欧风格**软键盘、磨砂玻璃 UI、多主题切换、函数绘图 + 涂鸦 + 几何构造、高等级数学功能。

由 **Prism Technology Studio** 开发 © 2026

---

## ✨ 功能概览

### 🧮 核心计算（卡西欧风格）
- **卡西欧软键盘**：所有输入通过屏幕按键完成，杜绝物理键盘字符编码歧义
- 完整表达式运算，支持运算符优先级与多层括号
- **SHIFT / ALPHA** 双修饰键体系，激活副功能
- **寄存器记忆**：M+ / M− / STO / RCL（变量 A–F、X、Y、M）
- **角度单位**：度（Deg）/ 弧度（Rad）/ 梯度（Grad），DRG 循环切换
- **数制显示**：Normal / Fixed / Scientific / Engineering（ENG / NORM）
- 三角函数：sin / cos / tan + 反函数；双曲：sinh / cosh / tanh + 反函数
- 幂与根：`x²`、`x³`、`^`、`√`、`∛`、`1/x`、`|x|`
- 对数：`log`（常用，底10）/ `ln`（自然）+ 反函数 `10^x` / `e^x`
- 常量：π（圆周率）、e（欧拉数）
- 组合数学：阶乘 `x!`、随机数
- **计算历史**：可检索、可一键复用
- **单位换算面板**

### 📈 函数绘图 + 涂鸦 + 几何构造

**多函数绘图器**
- 同时绘制 **16** 条函数曲线（16 色调色板，函数多时颜色不重复）
- 实时平移（拖拽）与缩放（滚轮）
- 自适应坐标网格与刻度标注
- 全屏模式：左上角「菜单」按钮控制函数控制栏滑入滑出

**✏️ 自由涂鸦（写字）模式**
- 画布上自由绘制线条与书写文字
- 8 色调色板（蓝 / 玫红 / 翠绿 / 琥珀 / 紫 / 青 / 粉 / 白）
- 线宽可调（1 – 8 px）
- 笔画存储于**数学坐标系**，跟随画布平移缩放同步变化
- 一键清空

**🛠️ 几何构造工具**
| 工具 | 说明 |
|------|------|
| **点** | 点击放置标记点（P1, P2…） |
| **直线** | 两次点击，绘制**无限长直线**（延长至屏幕边界） |
| **线段** | 两次点击，绘制**有限线段**（含端点标记） |
| **平行线** | ① 点选已有线/线段 → ② 点击经过点 → 生成**平行线** |
| **垂线** | ① 点选已有线/线段 → ② 点击经过点 → 生成**垂线** |
| **交点** | ① 点选函数 A → ② 点选函数 B → **500 点扫描 + 50 次二分法**（精度 ~1e-15），显示交点并标注精确坐标 |

### 📐 高级数学（5 个同级 Tab）
| 标签页 | 功能 |
|--------|------|
| **方程（EQN）** | • 一元二次求解（ax²+bx+c=0，含复根）<br>• 一元三次求解（卡丹公式）<br>• 任意一元根（二分法 + 牛顿法）<br>• n×n 线性方程组（部分主元高斯消元） |
| **矩阵（MAT）** | 矩阵 A/B/C 加、减、乘、转置、行列式、逆矩阵、秩、行阶梯型 |
| **向量（VEC）** | 向量 a/b 加、减、点积、叉积、模、归一化、夹角、标量/向量投影 |
| **统计（STAT）** | 输入 X + 可选 Y 数据 → 均值、中位数、众数、极值、Q1/Q3、方差、标准差、协方差、皮尔逊相关系数 r、**线性回归** y = a + bx |
| **微积分（MOD）** | • 数值微分（1 阶 & 2 阶，4 阶精度中心差分）<br>• 自适应数值积分（Simpson 1/3 辛普森法则） |

### 🐍 Python 与数学脚本

同一面板支持 **三种运行模式**：

| 模式 | 说明 |
|------|------|
| **数学脚本** | 零加载、即时运行的轻量解释器。支持：变量赋值、`print()`、`for x in range(a,b,c)`、`if/elif/else`、`def` 函数定义，全部科学函数（sin、cos、tan、log、ln、sqrt、abs、floor…） |
| **本机 Python** | 通过 Electron IPC 调用本机安装的 Python 解释器，支持标准库及第三方包。要求 PATH 中已安装 Python 3。 |
| **Pyodide** | 浏览器内 WebAssembly 版 Python，**无需安装**。沙箱中运行标准库与 numpy。 |

**安全防护（三层防爆内存）**
- 🔴 代码预扫描：拒绝 `**100000` 超大指数、`range(100000000)`、`[x]*100000000`、`"x"*100000000`
- ⏱️ Pyodide 运行时 **15 秒超时**（`Promise.race`）
- 📊 Pyodide stdout/stderr **200 KB 输出自动截断**
- 📊 数学脚本：总语句 **50 万上限** + 输出行 **1 万上限**（防死循环）
- 🛡️ 计算器引擎：指数运算溢出预检（`|b| > 300 && |a| > 1`）
- 🛡️ 本机 Python：stdout/stderr **5 MB 缓冲区上限** + 子进程超时

### 🎨 界面体验

- **磨砂玻璃设计**：多层 `backdrop-blur` 与极光渐变背景
- **三种主题模式**（CSS 变量驱动，实时切换）：
  - **跟随系统**：自动响应操作系统外观
  - **深色**：深空基调，全面验证
  - **明亮**：洁净白底，全面验证（无浅色文字不可见问题）
- 极光背景与 Logo 呼吸动画（纯 SVG 图标，**全局无 emoji**）
- **按键悬浮提示**：鼠标悬停任意按键，左下角显示完整功能说明
- **7 种界面语言**（顶部 Language 下拉按钮 · 🌐 地球 SVG 图标）：
  - 🇨🇳 **简体中文**
  - 🇭🇰 **繁體中文**
  - 🇺🇸 **English**
  - 🇯🇵 **日本語**
  - 🇷🇺 **Русский**
  - 🇫🇷 **Français**
  - 🇩🇪 **Deutsch**
- 横屏自适应布局：桌面端**左侧按键、右侧屏幕**

### 💻 桌面端 & 📱 移动端
- **Windows**：NSIS 安装包 + 便携版 EXE + ZIP 压缩包
- **Android**：Capacitor 5 集成（APK 构建就绪）

---

## 🛠️ 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | **Vue 3** + **TypeScript** |
| 构建工具 | **Vite** |
| 样式系统 | **Tailwind CSS** + **CSS 变量**（主题） |
| 桌面运行时 | **Electron 28** |
| 移动运行时 | **Capacitor 5**（Android） |
| 打包发行 | `electron-builder` — NSIS / Portable / ZIP |
| 图标生成 | 自定义 Node 脚本 → PNG（256/512） + Windows ICO（6 尺寸） |

---

## 📁 项目结构

```
scp/
├── src/
│   ├── components/          # Vue UI 组件
│   │   ├── CalcScreen.vue          # 计算器显示屏
│   │   ├── CalcKeyboard.vue        # 软键盘布局
│   │   ├── CalcKey.vue             # 单个按键（含悬浮提示）
│   │   ├── GraphPanel.vue          # 函数绘图 + 涂鸦 + 几何构造
│   │   ├── AdvancedPanel.vue       # 方程/矩阵/向量/统计/微积分
│   │   ├── PythonPanel.vue         # 数学脚本/本机 Python/Pyodide
│   │   ├── SettingsPanel.vue       # 单位换算与设置
│   │   └── HistoryPanel.vue        # 计算历史
│   ├── composables/          # Vue 组合式函数
│   │   ├── useCalculator.ts        # 计算引擎状态
│   │   ├── useInputRouter.ts       # 软键盘 → 激活输入路由
│   │   ├── useHoverHint.ts         # 悬浮提示共享状态
│   │   └── useTheme.ts             # 深色/浅色/跟随系统 主题
│   ├── engine/               # 核心数学引擎
│   │   ├── calculator.ts           # 表达式词法分析 + 解析 + 求值
│   │   ├── advanced.ts             # 矩阵、向量、统计、微积分、方程求解
│   │   └── script.ts               # 数学脚本解释器（变量/循环/函数）
│   ├── i18n/                 # 国际化（7 种语言）
│   │   ├── messages.ts             # zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
│   │   └── index.ts                # t() 翻译函数 + 语言注册
│   ├── constants/            # 按键布局定义
│   ├── types/                # TypeScript 类型定义
│   ├── App.vue               # 根组件 + 语言切换菜单
│   └── style.css             # 全局样式 + CSS 变量（主题）
├── electron/
│   ├── main.js               # Electron 主进程（窗口、IPC 调用本机 Python）
│   └── preload.js            # 预加载桥接（calcNative API）
├── scripts/
│   └── gen-icons.js          # PNG + ICO 图标生成脚本
├── public/
│   ├── icon.svg              # 原子 Logo 品牌图标（SVG）
│   ├── icon.png              # 512×512 原子 Logo 图像
│   └── logo.png              # 顶部栏 Logo 图像
├── build/
│   └── icon.ico              # Windows 应用图标（16/32/48/64/128/256）
└── package.json              # v1.2.1 · GPL-3.0 · electron-builder 配置
```

---

## 🚀 快速开始

### 环境要求
- **Node.js ≥ 18**（推荐 20 LTS）
- **npm** 或 **yarn**

### 安装依赖
```bash
npm install
```

### 开发
```bash
# Web 开发服务器（http://localhost:5173）
npm run dev

# Electron 桌面开发模式
npm run electron:dev
```

### 构建生产版本
```bash
# 构建前端产物（dist/）
npm run build

# Windows：NSIS 安装包 + 便携版 EXE + ZIP
npm run electron:build:win

# 重新生成 PNG + ICO 图标（依赖 icon.svg）
npm run icons

# Android APK（需要 Android SDK、Capacitor CLI）
npm run android:apk
```

构建产物输出至 `release-v1.2.1/`（或 `release-final/`）目录。

---

## ⬇️ 下载 v1.2.1

在 [**GitHub Releases**](../../releases) 页面下载预构建二进制文件：

| 文件 | 说明 |
|------|------|
| `SCP-Setup-1.2.1-x64.exe`   | NSIS 安装包**（推荐）**— 可选安装目录、创建快捷方式 |
| `SCP-Portable-1.2.1-x64.exe`| 便携版 EXE — 无需安装，双击即运行 |
| `SCP-1.2.1-x64.zip`         | ZIP 压缩包 — 解压后运行 `SCP.exe` |

---

## 📜 许可证

**GNU General Public License v3.0** — 完整条款见 [LICENSE](LICENSE) 文件。

版权所有 © 2026 **Prism Technology Studio**

---

## 🏢 关于

访问 [**ptstudio.top**](https://ptstudio.top) 了解 Prism Technology Studio 的更多产品。

版权所有 © 2026 Prism Technology Studio · 保留所有权利

# SCP - Scientific Calculator Plus

![Version](https://img.shields.io/badge/Version-1.2.1-blue)
[![Languages](https://img.shields.io/badge/UI%20Languages-7-informational)](#)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Android-green)

**Documentation:**
[简体中文](./README.zh.md) | [繁體中文](./README.zh-TW.md) | **English** | [日本語](./README.ja.md) | [Русский](./README.ru.md) | [Francais](./README.fr.md) | [Deutsch](./README.de.md)

> **界面语言切换：** 应用顶部栏 -> **语言**下拉菜单（支持 7 种语言）

一款面向工程师、学生和科研人员打造的专业**科学计算器**桌面与移动端应用，配备**卡西欧风格**软键盘、玻璃拟态界面、多主题支持、带绘图与几何工具的函数图像绘制，以及高级数学运算能力。

由 **Prism Technology Studio** 开发（c）2026

---

## 功能特性

### 核心计算器（卡西欧风格）
- **卡西欧风格软键盘** —— 仅通过屏幕按键输入，消除字符编码歧义
- 完整表达式求值，支持运算符优先级与括号
- **SHIFT** / **ALPHA** 修饰键系统，用于切换次级功能
- **存储器**：M+ / M- / STO / RCL（变量 A-F、X、Y、M）
- **角度模式**：度 / 弧度 / 百分度（DRG 循环切换）
- **5 种输出模式**：普通 / 科学计数 / 工程计数 / 分数 / 线性（通过 NORM/SCI/ENG 循环切换）
- 三角函数：sin / cos / tan 及反函数；双曲函数：sinh / cosh / tanh 及反函数
- 幂与根：`x^2`、`x^3`、`^`、`sqrt`、`cbrt`、`1/x`、`|x|`
- 对数：`log`（以 10 为底）/ `ln`（自然对数）及反函数 `10^x` / `e^x`
- 常量：pi、e（自然常数）
- 组合数学：阶乘 `x!`、随机数
- **计算历史**：可回调用 + 可搜索 + 一键复用
- **单位换算**面板

### 变量键盘（未知数）
- 主键盘上的专用 **VAR** 按钮，点击弹出变量键盘
- **小写字母**：a-z + pi（28 个按键）
- **大写字母**：A-Z + theta + lambda（28 个按键）
- **希腊字母**：alpha、beta、gamma、delta、epsilon、mu、sigma、omega、phi、psi、eta、rho、tau、infinity（14 个按键）
- 计算引擎支持所有单字母变量（A-Z、a-z）
- 用于绘图的全局参数绑定面板（a、b、c、m、n、k、d、z）

### 函数绘图 + 自由绘制 + 几何构造

**多函数绘图器**
- 同时绘制 **16** 个函数（16 色调色板 —— 函数较多时颜色不重复）
- 实时平移（拖拽）与缩放（滚轮）
- 自适应坐标网格，自动标注
- 全屏模式，带可折叠函数控制栏（左上角 **菜单** 按钮，可通过菜单开关 / X 按钮 / 点击背景关闭）
- **参数方程**：x(t) 和 y(t)，t 范围可调
- **选中函数高亮**：所选函数行显示徽章 + 边框高亮；画布曲线采用双重描边（外层发光 + 内层加粗）

**自由手绘（草图模式）**
- 在图形画布上自由绘制或书写
- 8 色调色板（蓝 / 玫红 / 翠绿 / 琥珀 / 紫罗兰 / 青色 / 粉红 / 白色）
- 笔触宽度可调（1-8 像素）
- 笔迹以**数学坐标**存储 —— 随网格一起平移和缩放
- 一键清空

**几何构造工具**

| 工具 | 说明 |
|------|------|
| **点** | 单击任意位置放置带标签的点（P1、P2...） |
| **直线** | 两次点击 —— 绘制一条无限长直线（延伸至屏幕边缘） |
| **线段** | 两次点击 —— 绘制一条有限线段（带端点标记） |
| **平行线** | 1. 点击靠近某条直线/线段 2. 点击一个点 —— 过该点作平行线 |
| **垂线** | 1. 点击靠近某条直线/线段 2. 点击一个点 —— 过该点作垂线 |
| **交点** | 1. 点击靠近函数 A 2. 点击靠近函数 B —— 通过 500 点扫描 + 50 次二分法求交点（精度约 1e-15），显示交点及坐标 |

选中的参考线（平行线/垂线）会以更亮的颜色、加粗笔触和发光效果高亮显示。

### 高级数学（5 个专属标签页）

| 标签页 | 功能 |
|-----|-------------|
| **方程（EQN）** | 二次方程求解器（ax^2+bx+c=0，含复数根）；三次方程求解器（卡尔达诺公式）；任意一元方程求根（二分法 + 牛顿法）；nxn 线性方程组（部分主元高斯消元法） |
| **矩阵（MAT）** | 矩阵 A/B/C + 运算 —— 加、减、乘、转置、行列式、逆矩阵、秩、阶梯形 |
| **向量（VEC）** | 向量 a/b —— 加、减、点积、叉积、模长、归一化、夹角、标量/向量投影 |
| **统计（STAT）** | 输入 X + 可选 Y 数据 -> 均值、中位数、众数、最小/最大值、Q1/Q3、方差、标准差、协方差、皮尔逊相关系数（r）、线性回归 y = a + bx |
| **微积分（MOD）** | 数值微分（一阶与二阶，四阶中心差分）；自适应数值积分（Simpson 1/3） |

### Python 与数学脚本集成

一个面板内提供三种执行模式：

| 模式 | 说明 |
|------|------|
| **数学脚本** | 零加载、即时运行的轻量级解释器。支持：变量赋值、`print()`、`for x in range(a,b,c)`、`if`/`elif`/`else`、`def` 函数定义、所有科学函数（sin、cos、tan、log、ln、sqrt、abs、floor...） |
| **原生 Python** | 通过 Electron IPC 调用本地安装的 Python 解释器。支持标准库 + 第三方包。需要 PATH 中存在 Python 3。 |
| **Pyodide** | 浏览器内 WebAssembly Python —— 无需安装。在沙箱中运行，附带标准库与 numpy。 |

**安全防护措施**（三种模式均适用）：
- 预扫描：拒绝 `**100000` 这类超大指数写法、`range(100000000)`、`[x]*100000000`、`"x"*100000000`
- Pyodide **15 秒超时**（Promise.race）
- Pyodide stdout/stderr **200 KB 输出截断**
- 数学脚本：**50 万条语句上限** + **1 万行输出上限**（防死循环）
- 计算器引擎：指数溢出预检查（`|b| > 300 && |a| > 1`）
- 原生 Python：**5 MB stdout/stderr 缓冲区上限** + 进程超时

### UI / UX

- **玻璃拟态（磨砂玻璃）设计**，多层 `backdrop-blur` 模糊 + 极光渐变背景
- **三种主题模式**（由 CSS 变量驱动，可动态切换）：
  - **跟随系统** —— 跟随操作系统主题
  - **深色** —— 深邃太空风格，已全面测试
  - **浅色** —— 洁净白色，已全面测试（无不可见文字）
- 动态极光背景与 Logo 脉冲动画（仅使用 SVG 图标 —— 任何地方都不使用 emoji）
- **悬停提示** —— 鼠标悬停任意按键时，左下角面板显示其详细功能说明
- **7 种语言的界面**，顶栏语言下拉菜单（地球 SVG 图标）：
  - 简体中文（zhongwen）
  - 繁體中文（fantizi）
  - 英语（English）
  - 日语（nihongo）
  - 俄语（russkiy）
  - 法语（francais）
  - 德语（deutsch）
- **响应式布局**：桌面端横屏（左侧按键、右侧屏幕）；移动端竖屏（上方屏幕、下方键盘），并针对 380px 超窄屏与 520px 超矮屏进行动态缩放

### 桌面端与移动端

- **Windows**：NSIS 安装程序 + 便携版 EXE + ZIP 压缩包
- **Android**：Capacitor 6 集成，可直接构建 APK（调试版 + 发布版）

---

## 技术栈

| 层级 | 技术 |
|-------|-----------|
| 前端框架 | **Vue 3** + **TypeScript** |
| 构建工具 | **Vite** |
| 样式 | **Tailwind CSS** + **CSS 变量**（主题） |
| 桌面运行时 | **Electron 28** |
| 移动端运行时 | **Capacitor 6**（Android，compileSdk 34，minSdk 22） |
| 打包 | `electron-builder` —— NSIS / 便携版 / ZIP |
| Android 构建 | Gradle 8.7 + AGP 8.5.2，腾讯 Gradle 镜像 + 阿里云 Maven 镜像 |
| 图标生成 | 自定义 Node 脚本 -> PNG（256/512）+ Windows ICO（6 种尺寸） |

---

## 项目结构

```
scp/
|-- src/
|   |-- components/          # Vue UI 组件
|   |   |-- CalcScreen.vue          # 计算器显示屏
|   |   |-- CalcKeyboard.vue        # 软键盘布局 + VAR 弹窗
|   |   |-- CalcKey.vue             # 单个按键，带悬停提示
|   |   |-- GraphPanel.vue          # 函数绘图 + 自由绘制 + 几何构造
|   |   |-- AdvancedPanel.vue       # 方程 / 矩阵 / 向量 / 统计 / 微积分
|   |   |-- PythonPanel.vue         # 数学脚本 / 原生 Python / Pyodide
|   |   |-- SettingsPanel.vue       # 单位换算与设置
|   |   `-- HistoryPanel.vue        # 计算历史
|   |-- composables/          # Vue 组合式函数
|   |   |-- useCalculator.ts        # 计算器引擎状态
|   |   |-- useInputRouter.ts       # 软键盘 -> 活动输入路由
|   |   |-- useHoverHint.ts         # 悬停提示共享状态
|   |   `-- useTheme.ts             # 深色 / 浅色 / 跟随系统主题管理
|   |-- engine/               # 核心数学引擎
|   |   |-- calculator.ts           # 表达式词法分析器 + 解析器 + 求值器
|   |   |-- advanced.ts             # 矩阵、向量、统计、微积分、方程求解器
|   |   `-- script.ts               # 数学脚本解释器（变量 + 循环 + 函数）
|   |-- i18n/                 # 国际化（7 种语言）
|   |   |-- messages.ts             # zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
|   |   `-- index.ts                # t() 翻译函数 + 语言注册表
|   |-- constants/            # 键盘布局定义
|   |-- types/                # TypeScript 类型定义
|   |-- App.vue               # 根组件 + 语言菜单
|   `-- style.css             # 全局样式 + CSS 变量（主题）
|-- electron/
|   |-- main.js               # Electron 主进程（窗口、IPC 调用 Python）
|   `-- preload.js            # 预加载桥接（calcNative API）
|-- android/                   # Capacitor 6 Android 项目
|-- scripts/
|   |-- gen-icons.js          # PNG + ICO 图标生成器
|   |-- android-envcheck.bat  # Android 构建环境检查脚本
|   `-- android-build.bat     # 一键 APK 构建脚本
|-- build-apk.bat             # 根级 APK 构建快捷方式
|-- build/
|   `-- icon.ico              # Windows 图标（16/32/48/64/128/256）
`-- package.json              # v1.2.1 - GPL-3.0 - electron-builder 配置
```

---

## 快速开始

### 前提条件
- **Node.js >= 18**（推荐：20 LTS）
- **npm**

### 安装依赖
```bash
npm install
```

### 开发
```bash
# Web 开发服务器（http://localhost:5173）
npm run dev

# Electron 桌面开发模式（应用窗口）
npm run electron:dev
```

### 构建桌面版（Windows EXE）
```bash
# 构建前端资源（dist/）
npm run build

# Windows：NSIS 安装程序 + 便携版 EXE + ZIP
npm run electron:build:win
```

构建产物输出到 `release-scp-v1.2.1b/`。

### 构建 Android（APK）

**一键构建（推荐）：**
```bash
# 调试版 APK（双击或命令行执行）
build-apk.bat debug

# 发布版 APK
build-apk.bat release
```

**先进行环境检查：**
```bash
scripts\android-envcheck.bat
```

构建脚本会自动检测 JDK（优先级：Android Studio JBR 21 -> JAVA_HOME -> Adoptium/Microsoft JDK -> PATH）和 Android SDK（ANDROID_HOME -> ANDROID_SDK_ROOT -> %LOCALAPPDATA%\Android\Sdk）。若检测到 JDK 22 将拒绝构建（与 Gradle 8.7 不兼容）。

构建产物输出到 `release-android/`。

---

## 下载 v1.2.1

预编译二进制文件可在 [**GitHub Releases**](../../releases) 页面获取：

| 文件 | 说明 |
|------|-------------|
| `SCP-Setup-1.2.1-x64.exe`   | NSIS 安装程序**（推荐）** —— 选择安装目录、创建快捷方式 |
| `SCP-Portable-1.2.1-x64.exe`| 便携独立版 —— 无需安装，双击即可运行 |
| `SCP-1.2.1-x64.zip`         | ZIP 压缩包 —— 解压后运行 `SCP.exe` |
| `SCP-1.2.1-debug.apk`       | Android 调试版 APK —— 可直接在 Android 5.1+ 上安装 |

---

## 许可证

**GNU 通用公共许可证 v3.0** —— 完整条款见 [LICENSE](LICENSE) 文件。

版权所有（c）2026 **Prism Technology Studio**

---

## 关于

访问 [**ptstudio.top**](https://ptstudio.top) 了解我们产品的更多信息。

版权所有（c）2026 Prism Technology Studio —— 保留所有权利

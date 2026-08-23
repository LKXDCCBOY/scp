/** 多语言文本字典 */
export const messages = {
  'zh-CN': {
    app: {
      title: 'SCP',
      subtitle: 'Scientific Calculator Plus'
    },
    // 悬浮提示
    hint: {
      title: '按键说明',
      none: '将鼠标悬停在按键上查看功能说明',
      SHIFT: 'SHIFT 修饰键 — 激活按键上方的橙色第二功能',
      ALPHA: 'ALPHA 修饰键 — 激活按键上方的红色变量输入',
      MODE: '切换计算模式 (COMP / CMPLX / STAT / BASE-N)',
      AC: '全部清除 — 清空表达式和结果',
      DEL: '删除光标前一个字符 (SHIFT: 切换插入/覆写模式)',
      '◀': '光标左移',
      '▶': '光标右移',
      'x²': '平方 — 计算 x 的 2 次方 (SHIFT: 立方根 cbrt)',
      '^': '幂运算 — x 的 y 次方 (SHIFT: 平方根 sqrt)',
      log: '常用对数 log₁₀(x) (SHIFT: 10 的 x 次方)',
      ln: '自然对数 ln(x) (SHIFT: e 的 x 次方)',
      '(-)': '输入负号 (SHIFT: 绝对值 abs)',
      HYP: '双曲函数前缀 (SHIFT: 反双曲函数)',
      sin: '正弦函数 sin(x) (SHIFT: 反正弦 asin)',
      cos: '余弦函数 cos(x) (SHIFT: 反余弦 acos)',
      tan: '正切函数 tan(x) (SHIFT: 反正切 atan)',
      STO: '存储 — 将当前值存入变量 A-F/X/Y/M',
      RCL: '召回 — 读取已存储的变量值',
      ENG: '工程记数法切换 (SHIFT: 普通记数法 NORM)',
      'x³': '立方 — 计算 x 的 3 次方 (SHIFT: 倒数 1/x)',
      pi: '圆周率 pi = 3.14159265... (SHIFT: 自然常数 e)',
      DRG: '角度单位切换 Deg/Rad/Grad',
      '7': '数字 7', '8': '数字 8', '9': '数字 9',
      sinh: '双曲正弦 sinh(x) (SHIFT: 反双曲正弦 asinh)',
      '(': '左括号 (SHIFT: 绝对值 abs)',
      ')': '右括号 (SHIFT: 向下取整 floor)',
      '4': '数字 4', '5': '数字 5', '6': '数字 6',
      cosh: '双曲余弦 cosh(x) (SHIFT: 反双曲余弦 acosh)',
      'M+': '将当前值加到独立存储器 M',
      'M-': '将当前值从独立存储器 M 中减去',
      '1': '数字 1', '2': '数字 2', '3': '数字 3',
      tanh: '双曲正切 tanh(x) (SHIFT: 反双曲正切 atanh)',
      '0': '数字 0', '.': '小数点 (SHIFT: 随机数)',
      '×': '乘法', '÷': '除法',
      Ans: '上一次计算结果 (SHIFT: 圆周率 pi)',
      EXP: '科学记数法 x10^ (SHIFT: e 的 x 次方)',
      '-': '减法', '+': '加法',
      'x!': '阶乘 x!',
      nPr: '排列 nPr (SHIFT: 组合 nCr)',
      Pol: '极坐标转换 Pol(r,theta) (SHIFT: 直角坐标 Rec)',
      ',': '参数分隔逗号',
      '%': '百分号', log2: '以 2 为底的对数 log₂(x)',
      '=': '等号 — 执行计算'
    },
    // 标签页
    tabs: {
      calc: '计算',
      graph: '绘图',
      eqn: '方程',
      mat: '矩阵',
      vec: '向量',
      stat: '统计',
      'calc-mod': '微积分',
      python: 'Python'
    },
    // 屏幕
    screen: {
      placeholder: '输入表达式后按 = 计算',
      history: '历史记录',
      historyCount: '条',
      clearHistory: '清空',
      noHistory: '暂无记录',
      noHistoryHint: '按 = 计算后会记录到这里',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    // 主题
    theme: {
      hint: '点击循环：跟随系统 / 深色 / 明亮',
      mode: { system: '跟随系统', dark: '深色主题', light: '明亮主题' }
    },
    // 绘图
    graph: {
      title: '函数绘图',
      resetView: '重置视图',
      zoomIn: '放大',
      zoomOut: '缩小',
      addFunc: '+ 添加函数',
      placeholder: 'f(x) 如 sin(x) 或 x^2-3',
      coordLabel: 'x: {x}  y: {y}',
      viewLabel: '缩放: {scale}x | 中心: ({cx}, {cy})'
    },
    // 高级工具
    advanced: {
      title: '高级数学工具',
      empty: '请选择功能并点击运算按钮',
      go: '▶ 运算',
      modules: {
        eqn: '方程',
        mat: '矩阵',
        vec: '向量',
        stat: '统计',
        calc: '微积分'
      },
      quad:   { title: '二次方程 ax²+bx+c=0', hint: '含复数根' },
      cubic:  { title: '三次方程 ax³+bx²+cx+d=0', hint: 'Cardano 公式' },
      nl:     { title: '任意单变量方程 f(x)=0', hint: '二分 + 牛顿迭代' },
      linear: { title: 'n 元线性方程组 A·x = b', hint: '高斯消元（部分主元）' },
      mat: { inputs: '输入 A 与 B', output: '结果' },
      vec: { inputs: '输入向量 a 与 b', output: '结果' },
      stat: {
        data: '数据输入',
        yHint: '（可选，用于回归/Cov）',
        summaryX: 'X 摘要统计',
        linreg: '线性回归 y=a+bx',
        result: '统计结果',
      },
      df:  { title: '数值微分（中心差分）', hint: '一阶 / 二阶，四阶精度' },
      int: { title: '自适应数值积分', hint: 'Simpson 1/3 自适应算法' },
    },
    // Python
    python: {
      title: 'Python 控制台',
      notLoaded: '未加载',
      loading: '加载中... (约10MB)',
      ready: '已就绪',
      load: '加载 Python',
      reload: '重新加载',
      clear: '清屏',
      editor: '编辑器',
      example: '示例...',
      run: '运行',
      running: '运行中...',
      placeholder: '输入 Python 代码... (Ctrl+Enter 运行)',
      output: '输出',
      outputCleared: '输出已清空',
      loadPrompt: '正在加载 Pyodide (WebAssembly Python)... 约 10MB',
      loadSuccess: 'Python 环境加载完成! 可以运行代码了',
      loadFail: '加载失败: {msg}',
      noOutput: '(无输出)',
      returnValue: '[返回值] {val}',
      mode: {
        math: '数学脚本',
        native: '本机 Python',
        pyodide: 'Pyodide'
      },
      script: {
        ready: '数学脚本模式已就绪',
        hint: '支持赋值/print/for range/if/def，直接运行无需加载',
        placeholder: `# 数学脚本（零加载，直接运行）
# 支持赋值、print、for x in range(a,b)、if、def 函数
# 全部科学函数可用：sin, cos, tan, log, ln, sqrt, abs, floor 等
# 按 Ctrl+Enter 立即执行`
      },
      native: {
        ok: '本机 Python 可用',
        checking: '正在检测本机 Python...',
        none: '未检测到本机 Python',
        placeholder: `# 使用本机已安装的 Python 解释器
# 支持标准库与第三方库 (numpy, pandas 等)
# 按 Ctrl+Enter 调用本机 python 运行`,
        ready: '已连接本机 Python',
        running: '正在调用本机 Python 解释器...',
        tip: '请先安装 Python 3 (python.org/downloads) 并勾选 Add to PATH，然后重启计算器'
      },
      pyodide: {
        tip: '点击右上角「加载 Python」启用 Pyodide（WebAssembly，约10MB）'
      },
      examples: {
        basic: '基本运算',
        func: '定义函数',
        loop: '循环与列表',
        math: '数学计算',
        matrix: '矩阵运算'
      }
    },
    // Python 示例代码
    code: {
      default: `# 欢迎使用 Python 控制台
# 支持标准数学库、numpy 等
# Ctrl+Enter 运行代码

import math

# 基本运算
print("2 + 3 =", 2 + 3)
print("sin(pi/4) =", math.sin(math.pi / 4))

# 定义函数
def f(x):
    return x**2 + 2*x + 1

print("f(5) =", f(5))

# 列表推导
squares = [x**2 for x in range(1, 6)]
print("平方数:", squares)
`,
      basic: `# 基本运算
a = 15
b = 4
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.4f}")
print(f"{a} // {b} = {a // b} (整除)")
print(f"{a} % {b} = {a % b} (取余)")
print(f"{a} ** {b} = {a ** b} (幂)")
`,
      func: `# 定义函数与递归
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print("5! =", factorial(5))
print("10! =", factorial(10))
print("斐波那契数列前10项:")
print([fibonacci(i) for i in range(10)])
`,
      loop: `# 循环与列表
total = 0
for i in range(1, 101):
    total += i
print("1到100的和:", total)

# 列表推导
evens = [x for x in range(20) if x % 2 == 0]
print("偶数:", evens)

# while 循环
n = 2
primes = []
while n < 30:
    is_prime = True
    for p in primes:
        if p * p > n:
            break
        if n % p == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(n)
    n += 1
print("30以内素数:", primes)
`,
      math: `# 数学计算
import math

print("pi =", math.pi)
print("e =", math.e)
print("sin(30deg) =", math.sin(math.radians(30)))
print("cos(60deg) =", math.cos(math.radians(60)))
print("log2(8) =", math.log2(8))
print("log10(1000) =", math.log10(1000))
print("sqrt(144) =", math.sqrt(144))

# 解一元二次方程 ax^2+bx+c=0
def solve_quadratic(a, b, c):
    disc = b**2 - 4*a*c
    if disc < 0:
        return None
    x1 = (-b + math.sqrt(disc)) / (2*a)
    x2 = (-b - math.sqrt(disc)) / (2*a)
    return (x1, x2)

roots = solve_quadratic(1, -5, 6)
print(f"x^2-5x+6=0 的根: {roots}")
`,
      matrix: `# 矩阵运算 (使用列表)
def mat_mul(A, B):
    rows_A = len(A)
    cols_A = len(A[0])
    cols_B = len(B[0])
    result = [[0]*cols_B for _ in range(rows_A)]
    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                result[i][j] += A[i][k] * B[k][j]
    return result

A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]

print("A =", A)
print("B =", B)
print("A x B =", mat_mul(A, B))

# 行列式 (2x2)
def det2(m):
    return m[0][0]*m[1][1] - m[0][1]*m[1][0]

print("det(A) =", det2(A))
`
    }
  },

  'en-US': {
    app: {
      title: 'SCP',
      subtitle: 'Scientific Calculator Plus'
    },
    hint: {
      title: 'Key Guide',
      none: 'Hover over a key to see its function',
      SHIFT: 'SHIFT modifier — activates orange secondary function above keys',
      ALPHA: 'ALPHA modifier — activates red variable input above keys',
      MODE: 'Switch calculation mode (COMP / CMPLX / STAT / BASE-N)',
      AC: 'All Clear — clears expression and result',
      DEL: 'Delete character before cursor (SHIFT: toggle insert/overwrite)',
      '◀': 'Move cursor left',
      '▶': 'Move cursor right',
      'x²': 'Square — x raised to power 2 (SHIFT: cube root cbrt)',
      '^': 'Power — x raised to y (SHIFT: square root sqrt)',
      log: 'Common logarithm log₁₀(x) (SHIFT: 10^x)',
      ln: 'Natural logarithm ln(x) (SHIFT: e^x)',
      '(-)': 'Enter negative sign (SHIFT: absolute value abs)',
      HYP: 'Hyperbolic function prefix (SHIFT: inverse hyperbolic)',
      sin: 'Sine sin(x) (SHIFT: arcsine asin)',
      cos: 'Cosine cos(x) (SHIFT: arccosine acos)',
      tan: 'Tangent tan(x) (SHIFT: arctangent atan)',
      STO: 'Store — save current value to variable A-F/X/Y/M',
      RCL: 'Recall — read stored variable value',
      ENG: 'Engineering notation toggle (SHIFT: normal notation NORM)',
      'x³': 'Cube — x raised to power 3 (SHIFT: reciprocal 1/x)',
      pi: 'Pi = 3.14159265... (SHIFT: Euler\'s number e)',
      DRG: 'Angle unit switch Deg/Rad/Grad',
      '7': 'Digit 7', '8': 'Digit 8', '9': 'Digit 9',
      sinh: 'Hyperbolic sine sinh(x) (SHIFT: inverse asinh)',
      '(': 'Left parenthesis (SHIFT: absolute value abs)',
      ')': 'Right parenthesis (SHIFT: floor function)',
      '4': 'Digit 4', '5': 'Digit 5', '6': 'Digit 6',
      cosh: 'Hyperbolic cosine cosh(x) (SHIFT: inverse acosh)',
      'M+': 'Add current value to memory M',
      'M-': 'Subtract current value from memory M',
      '1': 'Digit 1', '2': 'Digit 2', '3': 'Digit 3',
      tanh: 'Hyperbolic tangent tanh(x) (SHIFT: inverse atanh)',
      '0': 'Digit 0', '.': 'Decimal point (SHIFT: random number)',
      '×': 'Multiplication', '÷': 'Division',
      Ans: 'Previous answer (SHIFT: pi)',
      EXP: 'Scientific notation x10^ (SHIFT: e^x)',
      '-': 'Subtraction', '+': 'Addition',
      'x!': 'Factorial x!',
      nPr: 'Permutation nPr (SHIFT: combination nCr)',
      Pol: 'Polar conversion Pol(r,theta) (SHIFT: rectangular Rec)',
      ',': 'Argument separator comma',
      '%': 'Percent', log2: 'Base-2 logarithm log₂(x)',
      '=': 'Equals — execute calculation'
    },
    tabs: {
      calc: 'Calc',
      graph: 'Graph',
      eqn: 'Equations',
      mat: 'Matrix',
      vec: 'Vector',
      stat: 'Statistics',
      'calc-mod': 'Calculus',
      python: 'Python'
    },
    screen: {
      placeholder: 'Enter expression and press =',
      history: 'History',
      historyCount: 'items',
      clearHistory: 'Clear',
      noHistory: 'No records',
      noHistoryHint: 'Results will appear here after pressing =',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    theme: {
      hint: 'Click to cycle: System / Dark / Light',
      mode: { system: 'System', dark: 'Dark', light: 'Light' }
    },
    graph: {
      title: 'Function Plotter',
      resetView: 'Reset View',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      addFunc: '+ Add Function',
      placeholder: 'f(x) e.g. sin(x) or x^2-3',
      coordLabel: 'x: {x}  y: {y}',
      viewLabel: 'Zoom: {scale}x | Center: ({cx}, {cy})'
    },
    advanced: {
      title: 'Advanced Math Tools',
      empty: 'Pick a feature and click Compute',
      go: '▶ Compute',
      modules: {
        eqn: 'Equations',
        mat: 'Matrix',
        vec: 'Vector',
        stat: 'Statistics',
        calc: 'Calculus'
      },
      quad:   { title: 'Quadratic ax²+bx+c=0', hint: 'incl. complex roots' },
      cubic:  { title: 'Cubic ax³+bx²+cx+d=0', hint: 'Cardano formula' },
      nl:     { title: 'Any univariate f(x)=0', hint: 'Bisection + Newton' },
      linear: { title: 'n×n linear system A·x=b', hint: 'Gaussian partial pivot' },
      mat: { inputs: 'Input A & B', output: 'Result' },
      vec: { inputs: 'Input vectors a & b', output: 'Result' },
      stat: {
        data: 'Data Input',
        yHint: '(optional, for regression / Cov)',
        summaryX: 'X summary stats',
        linreg: 'Linear regression y=a+bx',
        result: 'Statistics Result',
      },
      df:  { title: 'Numerical derivative', hint: '1st / 2nd, 4th order central' },
      int: { title: 'Adaptive integration', hint: 'Adaptive Simpson 1/3' },
    },
    python: {
      title: 'Python Console',
      notLoaded: 'Not loaded',
      loading: 'Loading... (~10MB)',
      ready: 'Ready',
      load: 'Load Python',
      reload: 'Reload',
      clear: 'Clear',
      editor: 'Editor',
      example: 'Examples...',
      run: 'Run',
      running: 'Running...',
      placeholder: 'Enter Python code... (Ctrl+Enter to run)',
      output: 'Output',
      outputCleared: 'Output cleared',
      loadPrompt: 'Loading Pyodide (WebAssembly Python)... ~10MB',
      loadSuccess: 'Python environment loaded! Ready to run code',
      loadFail: 'Load failed: {msg}',
      noOutput: '(no output)',
      returnValue: '[return] {val}',
      mode: {
        math: 'Math Script',
        native: 'System Python',
        pyodide: 'Pyodide'
      },
      script: {
        ready: 'Math Script mode ready',
        hint: 'Supports assignment/print/for-range/if/def; instant run, zero load',
        placeholder: `# Math Script (zero-load instant execution)
# Supports assignment, print, for x in range(a,b), if, def functions
# All scientific functions available: sin, cos, tan, log, ln, sqrt, abs, floor, etc.
# Press Ctrl+Enter to run`
      },
      native: {
        ok: 'System Python available',
        checking: 'Checking for system Python...',
        none: 'System Python not detected',
        placeholder: `# Use your system Python interpreter
# Supports standard library and 3rd-party packages (numpy, pandas, ...)
# Press Ctrl+Enter to run via local python`,
        ready: 'Connected to system Python',
        running: 'Calling local Python interpreter...',
        tip: 'Install Python 3 from python.org/downloads (check "Add to PATH"), then restart the calculator'
      },
      pyodide: {
        tip: 'Click "Load Python" top-right to enable Pyodide (WebAssembly, ~10MB)'
      },
      examples: {
        basic: 'Basic Operations',
        func: 'Functions',
        loop: 'Loops & Lists',
        math: 'Math',
        matrix: 'Matrix'
      }
    },
    code: {
      default: `# Welcome to Python Console
# Supports standard math library, numpy, etc.
# Ctrl+Enter to run

import math

# Basic operations
print("2 + 3 =", 2 + 3)
print("sin(pi/4) =", math.sin(math.pi / 4))

# Define function
def f(x):
    return x**2 + 2*x + 1

print("f(5) =", f(5))

# List comprehension
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)
`,
      basic: `# Basic Operations
a = 15
b = 4
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.4f}")
print(f"{a} // {b} = {a // b} (floor)")
print(f"{a} % {b} = {a % b} (mod)")
print(f"{a} ** {b} = {a ** b} (power)")
`,
      func: `# Functions & Recursion
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print("5! =", factorial(5))
print("10! =", factorial(10))
print("Fibonacci first 10:")
print([fibonacci(i) for i in range(10)])
`,
      loop: `# Loops & Lists
total = 0
for i in range(1, 101):
    total += i
print("Sum 1-100:", total)

# List comprehension
evens = [x for x in range(20) if x % 2 == 0]
print("Evens:", evens)

# While loop - sieve
n = 2
primes = []
while n < 30:
    is_prime = True
    for p in primes:
        if p * p > n:
            break
        if n % p == 0:
            is_prime = False
            break
    if is_prime:
        primes.append(n)
    n += 1
print("Primes < 30:", primes)
`,
      math: `# Math
import math

print("pi =", math.pi)
print("e =", math.e)
print("sin(30deg) =", math.sin(math.radians(30)))
print("cos(60deg) =", math.cos(math.radians(60)))
print("log2(8) =", math.log2(8))
print("log10(1000) =", math.log10(1000))
print("sqrt(144) =", math.sqrt(144))

# Solve quadratic ax^2+bx+c=0
def solve_quadratic(a, b, c):
    disc = b**2 - 4*a*c
    if disc < 0:
        return None
    x1 = (-b + math.sqrt(disc)) / (2*a)
    x2 = (-b - math.sqrt(disc)) / (2*a)
    return (x1, x2)

roots = solve_quadratic(1, -5, 6)
print(f"Roots of x^2-5x+6: {roots}")
`,
      matrix: `# Matrix Operations
def mat_mul(A, B):
    rows_A = len(A)
    cols_A = len(A[0])
    cols_B = len(B[0])
    result = [[0]*cols_B for _ in range(rows_A)]
    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                result[i][j] += A[i][k] * B[k][j]
    return result

A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]

print("A =", A)
print("B =", B)
print("A x B =", mat_mul(A, B))

# Determinant (2x2)
def det2(m):
    return m[0][0]*m[1][1] - m[0][1]*m[1][0]

print("det(A) =", det2(A))
`
    }
  }
} as const

export type Lang = keyof typeof messages
export type MessageKey = string // 松散类型，运行时检查

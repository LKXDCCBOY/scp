/** 多语言文本字典 */
export const messages = {
  'zh-CN': {
    app: {
      title: 'SCP',
      subtitle: 'Scientific Calculator Plus'
    },
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
      x: '变量 x（函数自变量）',
      y: '变量 y（函数因变量）',
      '!': '阶乘符号 !',
      ',': '参数分隔逗号',
      '%': '百分号',
      '=': '等号 — 执行计算或方程赋值',
      SPC: '空格（矩阵/数据分隔）',
      ';': '分号（矩阵行分隔）',
      ':': '冒号（Python 代码块）',
      '<': '小于号（Python 比较）',
      '>': '大于号（Python 比较）',
      '↵': '换行（Python 多行代码）'
    },
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
    theme: {
      hint: '点击循环：跟随系统 / 深色 / 明亮',
      mode: { system: '跟随系统', dark: '深色主题', light: '明亮主题' }
    },
    graph: {
      title: '函数绘图',
      resetView: '重置视图',
      zoomIn: '放大',
      zoomOut: '缩小',
      addFunc: '+ 添加函数',
      placeholder: 'f(x) 如 sin(x) 或 x^2-3',
      coordLabel: 'x: {x}  y: {y}',
      viewLabel: '缩放: {scale}x | 中心: ({cx}, {cy})',
      fullscreen: '全屏',
      exitFullscreen: '退出全屏',
      modeFunction: '函数', modeDraw: '涂鸦', modeConstruct: '构造',
      clear: '清除',
      toolPoint: '点', toolLine: '直线', toolSegment: '线段',
      toolParallel: '平行线', toolPerp: '垂线', toolIntersect: '交点',
      hintPoint: '点击放置点',
      hintLine1: '点击第一个点', hintLine2: '点击第二个点',
      hintParallel1: '点击已有的线/线段', hintParallel2: '点击要经过的点',
      hintIntersect1: '点击第一个函数', hintIntersect2: '点击第二个函数'
    },
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
    code: {
      default: '',
      basic: '',
      func: '',
      loop: '',
      math: '',
      matrix: ''
    }
  },

  'en-US': {
    app: { title: 'SCP', subtitle: 'Scientific Calculator Plus' },
    hint: {
      title: 'Key Hints',
      none: 'Hover over a key to see its function',
      SHIFT: 'SHIFT modifier — activates orange secondary functions',
      ALPHA: 'ALPHA modifier — activates red variable input',
      MODE: 'Switch mode (COMP / CMPLX / STAT / BASE-N)',
      AC: 'All Clear — clears expression and result',
      DEL: 'Delete character before cursor (SHIFT: toggle insert/overwrite)',
      '◀': 'Cursor left', '▶': 'Cursor right',
      'x²': 'Square — x squared (SHIFT: cube root cbrt)',
      '^': 'Power — x to the y (SHIFT: square root sqrt)',
      log: 'Common log log₁₀(x) (SHIFT: 10^x)',
      ln: 'Natural log ln(x) (SHIFT: e^x)',
      '(-)': 'Negative sign (SHIFT: absolute value abs)',
      HYP: 'Hyperbolic prefix (SHIFT: inverse hyperbolic)',
      sin: 'Sine sin(x) (SHIFT: arcsin)',
      cos: 'Cosine cos(x) (SHIFT: arccos)',
      tan: 'Tangent tan(x) (SHIFT: arctan)',
      STO: 'Store — save value to variable A-F/X/Y/M',
      RCL: 'Recall — read stored variable',
      ENG: 'Engineering notation (SHIFT: normal NORM)',
      'x³': 'Cube — x cubed (SHIFT: reciprocal 1/x)',
      pi: 'Pi = 3.14159265... (SHIFT: Euler\'s number e)',
      DRG: 'Angle unit: Deg/Rad/Grad',
      '7': 'Digit 7', '8': 'Digit 8', '9': 'Digit 9',
      sinh: 'Hyperbolic sine sinh(x) (SHIFT: asinh)',
      '(': 'Left paren (SHIFT: abs)', ')': 'Right paren (SHIFT: floor)',
      '4': 'Digit 4', '5': 'Digit 5', '6': 'Digit 6',
      cosh: 'Hyperbolic cosine cosh(x) (SHIFT: acosh)',
      'M+': 'Add to memory M', 'M-': 'Subtract from memory M',
      '1': 'Digit 1', '2': 'Digit 2', '3': 'Digit 3',
      tanh: 'Hyperbolic tangent tanh(x) (SHIFT: atanh)',
      '0': 'Digit 0', '.': 'Decimal point (SHIFT: random)',
      '×': 'Multiply', '÷': 'Divide',
      Ans: 'Last answer (SHIFT: pi)',
      EXP: 'Scientific notation x10^ (SHIFT: e^x)',
      '-': 'Subtract', '+': 'Add',
      'x!': 'Factorial x!',
      x: 'Variable x (function input)', y: 'Variable y (function output)',
      '!': 'Factorial symbol', ',': 'Argument separator',
      '%': 'Percent', '=': 'Equals — execute calculation',
      SPC: 'Space (matrix/data separator)',
      ';': 'Semicolon (matrix row separator)',
      ':': 'Colon (Python block)', '<': 'Less than', '>': 'Greater than',
      '↵': 'Newline (Python multiline)'
    },
    tabs: { calc: 'Calc', graph: 'Graph', eqn: 'Equations', mat: 'Matrices', vec: 'Vectors', stat: 'Stats', 'calc-mod': 'Calculus', python: 'Python' },
    screen: {
      placeholder: 'Enter expression then press =',
      history: 'History', historyCount: 'items', clearHistory: 'Clear',
      noHistory: 'No records', noHistoryHint: 'Results will appear here after pressing =',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    theme: { hint: 'Click to cycle: System / Dark / Light', mode: { system: 'System', dark: 'Dark', light: 'Light' } },
    graph: {
      title: 'Function Plotter', resetView: 'Reset View', zoomIn: 'Zoom In', zoomOut: 'Zoom Out',
      addFunc: '+ Add Function', placeholder: 'f(x) e.g. sin(x) or x^2-3',
      coordLabel: 'x: {x}  y: {y}', viewLabel: 'Zoom: {scale}x | Center: ({cx}, {cy})',
      fullscreen: 'Fullscreen', exitFullscreen: 'Exit Fullscreen',
      modeFunction: 'Function', modeDraw: 'Draw', modeConstruct: 'Construct',
      clear: 'Clear',
      toolPoint: 'Point', toolLine: 'Line', toolSegment: 'Segment',
      toolParallel: 'Parallel', toolPerp: 'Perpendicular', toolIntersect: 'Intersect',
      hintPoint: 'Click to place a point',
      hintLine1: 'Click first point', hintLine2: 'Click second point',
      hintParallel1: 'Click near a line/segment', hintParallel2: 'Click point to pass through',
      hintIntersect1: 'Click near first function', hintIntersect2: 'Click near second function'
    },
    advanced: {
      title: 'Advanced Math Tools', empty: 'Select a feature and click Compute', go: '▶ Compute',
      modules: { eqn: 'Equations', mat: 'Matrices', vec: 'Vectors', stat: 'Statistics', calc: 'Calculus' },
      quad: { title: 'Quadratic ax²+bx+c=0', hint: 'including complex roots' },
      cubic: { title: 'Cubic ax³+bx²+cx+d=0', hint: 'Cardano formula' },
      nl: { title: 'Any univariate f(x)=0', hint: 'Bisection + Newton' },
      linear: { title: 'Linear system A·x=b (n×n)', hint: 'Gaussian elimination (partial pivot)' },
      mat: { inputs: 'Input A and B', output: 'Result' },
      vec: { inputs: 'Input vectors a and b', output: 'Result' },
      stat: { data: 'Data Input', yHint: '(optional, for regression/Cov)', summaryX: 'X Summary Statistics', linreg: 'Linear Regression y=a+bx', result: 'Statistics Result' },
      df: { title: 'Numerical Differentiation (central diff)', hint: '1st / 2nd order, 4th-order accuracy' },
      int: { title: 'Adaptive Numerical Integration', hint: 'Simpson 1/3 adaptive' }
    },
    python: {
      title: 'Python Console', notLoaded: 'Not loaded', loading: 'Loading... (~10MB)', ready: 'Ready',
      load: 'Load Python', reload: 'Reload', clear: 'Clear', editor: 'Editor', example: 'Example...',
      run: 'Run', running: 'Running...', placeholder: 'Enter Python code... (Ctrl+Enter to run)',
      output: 'Output', outputCleared: 'Output cleared',
      loadPrompt: 'Loading Pyodide (WebAssembly Python)... ~10MB',
      loadSuccess: 'Python environment loaded! Ready to run code',
      loadFail: 'Load failed: {msg}', noOutput: '(no output)', returnValue: '[Return] {val}',
      mode: { math: 'Math Script', native: 'Native Python', pyodide: 'Pyodide' },
      script: {
        ready: 'Math Script mode ready',
        hint: 'Supports assignment/print/for range/if/def, runs instantly with zero load',
        placeholder: '# Math Script (zero load, instant run)\n# Supports assignment, print, for x in range(a,b), if, def\n# All scientific functions: sin, cos, tan, log, ln, sqrt, abs, floor\n# Press Ctrl+Enter to execute'
      },
      native: {
        ok: 'Native Python available', checking: 'Detecting native Python...', none: 'No native Python found',
        placeholder: '# Use the locally installed Python interpreter\n# Supports standard library and third-party packages\n# Press Ctrl+Enter to run',
        ready: 'Connected to native Python', running: 'Calling native Python interpreter...',
        tip: 'Please install Python 3 (python.org/downloads), check "Add to PATH", then restart the calculator'
      },
      pyodide: { tip: 'Click "Load Python" to enable Pyodide (WebAssembly, ~10MB)' },
      examples: { basic: 'Basic Operations', func: 'Define Function', loop: 'Loops & Lists', math: 'Math Calculations', matrix: 'Matrix Operations' }
    },
    code: { default: '', basic: '', func: '', loop: '', math: '', matrix: '' }
  },

  'zh-TW': {
    app: { title: 'SCP', subtitle: 'Scientific Calculator Plus' },
    hint: {
      title: '按鍵說明',
      none: '將滑鼠游標停在按鍵上以檢視功能說明',
      SHIFT: 'SHIFT 修飾鍵 — 啟用按鍵上方的橙色第二功能',
      ALPHA: 'ALPHA 修飾鍵 — 啟用按鍵上方的紅色變數輸入',
      MODE: '切換計算模式 (COMP / CMPLX / STAT / BASE-N)',
      AC: '全部清除 — 清空運算式與結果',
      DEL: '刪除游標前一個字元 (SHIFT: 切換插入/覆寫模式)',
      '◀': '游標左移', '▶': '游標右移',
      'x²': '平方 — x 的 2 次方 (SHIFT: 立方根 cbrt)',
      '^': '冪運算 — x 的 y 次方 (SHIFT: 平方根 sqrt)',
      log: '常用對數 log₁₀(x) (SHIFT: 10 的 x 次方)',
      ln: '自然對數 ln(x) (SHIFT: e 的 x 次方)',
      '(-)': '輸入負號 (SHIFT: 絕對值 abs)',
      HYP: '雙曲函數前綴 (SHIFT: 反雙曲函數)',
      sin: '正弦函數 sin(x) (SHIFT: 反正弦 asin)',
      cos: '餘弦函數 cos(x) (SHIFT: 反餘弦 acos)',
      tan: '正切函數 tan(x) (SHIFT: 反正切 atan)',
      STO: '儲存 — 將目前值寫入變數 A-F/X/Y/M',
      RCL: '叫出 — 讀取已儲存的變數值',
      ENG: '工程記數法切換 (SHIFT: 一般記數法 NORM)',
      'x³': '立方 — x 的 3 次方 (SHIFT: 倒數 1/x)',
      pi: '圓周率 π = 3.14159265... (SHIFT: 自然常數 e)',
      DRG: '角度單位切換 Deg/Rad/Grad',
      '7': '數字 7', '8': '數字 8', '9': '數字 9',
      sinh: '雙曲正弦 sinh(x) (SHIFT: 反雙曲正弦 asinh)',
      '(': '左括號 (SHIFT: 絕對值 abs)',
      ')': '右括號 (SHIFT: 無條件捨去 floor)',
      '4': '數字 4', '5': '數字 5', '6': '數字 6',
      cosh: '雙曲餘弦 cosh(x) (SHIFT: 反雙曲餘弦 acosh)',
      'M+': '將目前值加入獨立記憶體 M',
      'M-': '從獨立記憶體 M 減去目前值',
      '1': '數字 1', '2': '數字 2', '3': '數字 3',
      tanh: '雙曲正切 tanh(x) (SHIFT: 反雙曲正切 atanh)',
      '0': '數字 0', '.': '小數點 (SHIFT: 隨機數)',
      '×': '乘法', '÷': '除法',
      Ans: '前一次計算結果 (SHIFT: 圓周率 π)',
      EXP: '科學記數法 x10^ (SHIFT: e 的 x 次方)',
      '-': '減法', '+': '加法',
      'x!': '階乘 x!',
      x: '變數 x（函數自變數）', y: '變數 y（函數應變數）',
      '!': '階乘符號 !', ',': '參數分隔逗號', '%': '百分比',
      '=': '等號 — 執行計算或方程式指定',
      SPC: '空白（矩陣/資料分隔）', ';': '分號（矩陣列分隔）',
      ':': '冒號（Python 程式區塊）', '<': '小於（Python 比較）',
      '>': '大於（Python 比較）', '↵': '換行（Python 多行程式）'
    },
    tabs: { calc: '計算', graph: '繪圖', eqn: '方程', mat: '矩陣', vec: '向量', stat: '統計', 'calc-mod': '微積分', python: 'Python' },
    screen: {
      placeholder: '輸入運算式後按 = 計算',
      history: '歷史紀錄', historyCount: '筆', clearHistory: '清空',
      noHistory: '尚無紀錄', noHistoryHint: '按 = 計算後會記錄於此',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    theme: {
      hint: '點擊依序切換：跟隨系統 / 深色 / 亮色',
      mode: { system: '跟隨系統', dark: '深色主題', light: '亮色主題' }
    },
    graph: {
      title: '函數繪圖', resetView: '重設視圖', zoomIn: '放大', zoomOut: '縮小',
      addFunc: '+ 新增函數', placeholder: 'f(x) 如 sin(x) 或 x^2-3',
      coordLabel: 'x: {x}  y: {y}', viewLabel: '縮放: {scale}x | 中心: ({cx}, {cy})',
      fullscreen: '全螢幕', exitFullscreen: '退出全螢幕',
      modeFunction: '函數', modeDraw: '塗鴉', modeConstruct: '構造',
      clear: '清除',
      toolPoint: '點', toolLine: '直線', toolSegment: '線段',
      toolParallel: '平行線', toolPerp: '垂線', toolIntersect: '交點',
      hintPoint: '點擊放置點',
      hintLine1: '點擊第一個點', hintLine2: '點擊第二個點',
      hintParallel1: '點擊已有的線/線段', hintParallel2: '點擊要經過的點',
      hintIntersect1: '點擊第一個函數', hintIntersect2: '點擊第二個函數'
    },
    advanced: {
      title: '進階數學工具', empty: '請選擇功能並點擊運算按鈕', go: '▶ 運算',
      modules: { eqn: '方程', mat: '矩陣', vec: '向量', stat: '統計', calc: '微積分' },
      quad:   { title: '二次方程 ax²+bx+c=0', hint: '含複數根' },
      cubic:  { title: '三次方程 ax³+bx²+cx+d=0', hint: 'Cardano 公式' },
      nl:     { title: '任意單變量方程 f(x)=0', hint: '二分 + 牛頓迭代' },
      linear: { title: 'n 元線性方程組 A·x = b', hint: '高斯消去（部分主元）' },
      mat: { inputs: '輸入 A 與 B', output: '結果' },
      vec: { inputs: '輸入向量 a 與 b', output: '結果' },
      stat: {
        data: '資料輸入', yHint: '（可選，用於迴歸/Cov）',
        summaryX: 'X 摘要統計', linreg: '線性迴歸 y=a+bx', result: '統計結果'
      },
      df:  { title: '數值微分（中心差分）', hint: '一階 / 二階，四階精度' },
      int: { title: '自適應數值積分', hint: 'Simpson 1/3 自適應演算法' }
    },
    python: {
      title: 'Python 主控台', notLoaded: '未載入', loading: '載入中...（約10MB）',
      ready: '就緒', load: '載入 Python', reload: '重新載入',
      clear: '清除畫面', editor: '編輯器', example: '範例...',
      run: '執行', running: '執行中...',
      placeholder: '輸入 Python 程式...（Ctrl+Enter 執行）',
      output: '輸出', outputCleared: '輸出已清除',
      loadPrompt: '正在載入 Pyodide (WebAssembly Python)... 約 10MB',
      loadSuccess: 'Python 環境載入完成！可以開始執行程式',
      loadFail: '載入失敗: {msg}', noOutput: '（無輸出）', returnValue: '[傳回值] {val}',
      mode: { math: '數學腳本', native: '本機 Python', pyodide: 'Pyodide' },
      script: {
        ready: '數學腳本模式就緒',
        hint: '支援指定/print/for range/if/def，直接執行無需載入',
        placeholder: `# 數學腳本（零載入，立即執行）
# 支援指定、print、for x in range(a,b)、if、def 函式
# 所有科學函式皆可用：sin, cos, tan, log, ln, sqrt, abs, floor 等
# 按下 Ctrl+Enter 立即執行`
      },
      native: {
        ok: '本機 Python 可用', checking: '正在偵測本機 Python...', none: '未偵測到本機 Python',
        placeholder: `# 使用電腦中已安裝的 Python 直譯器
# 支援標準函式庫與第三方套件 (numpy, pandas 等)
# 按 Ctrl+Enter 呼叫本機 python 執行`,
        ready: '已連接本機 Python', running: '正在呼叫本機 Python 直譯器...',
        tip: '請先安裝 Python 3 (python.org/downloads) 並勾選 Add to PATH，然後重啟計算機'
      },
      pyodide: { tip: '點擊右上角「載入 Python」以啟用 Pyodide（WebAssembly，約10MB）' },
      examples: { basic: '基本運算', func: '定義函式', loop: '迴圈與列表', math: '數學計算', matrix: '矩陣運算' }
    },
    code: { default: '', basic: '', func: '', loop: '', math: '', matrix: '' }
  },

  'ja-JP': {
    app: { title: 'SCP', subtitle: 'Scientific Calculator Plus' },
    hint: {
      title: 'キーガイド',
      none: 'キーの上にマウスを置くと機能が表示されます',
      SHIFT: 'SHIFT 修飾 — キー上部のオレンジ色セカンダリ機能を有効化',
      ALPHA: 'ALPHA 修飾 — キー上部の赤色変数入力を有効化',
      MODE: '計算モード切替 (COMP / CMPLX / STAT / BASE-N)',
      AC: 'オールクリア — 式と結果を消去',
      DEL: 'カーソル前の文字を削除 (SHIFT: 挿入/上書き切替)',
      '◀': 'カーソル左移動', '▶': 'カーソル右移動',
      'x²': '二乗 — x の 2 乗 (SHIFT: 立方根 cbrt)',
      '^': 'べき乗 — x の y 乗 (SHIFT: 平方根 sqrt)',
      log: '常用対数 log₁₀(x) (SHIFT: 10のx乗)',
      ln: '自然対数 ln(x) (SHIFT: eのx乗)',
      '(-)': '負号入力 (SHIFT: 絶対値 abs)',
      HYP: '双曲線関数プレフィックス (SHIFT: 逆双曲線関数)',
      sin: '正弦 sin(x) (SHIFT: 逆正弦 asin)',
      cos: '余弦 cos(x) (SHIFT: 逆余弦 acos)',
      tan: '正接 tan(x) (SHIFT: 逆正接 atan)',
      STO: 'ストア — 現在値を変数 A-F/X/Y/M に保存',
      RCL: 'リコール — 保存した変数値を読み出し',
      ENG: '工学記法切替 (SHIFT: 通常記法 NORM)',
      'x³': '三乗 — x の 3 乗 (SHIFT: 逆数 1/x)',
      pi: '円周率 π = 3.14159265... (SHIFT: ネイピア数 e)',
      DRG: '角度単位切替 Deg/Rad/Grad',
      '7': '数字 7', '8': '数字 8', '9': '数字 9',
      sinh: '双曲線正弦 sinh(x) (SHIFT: 逆双曲線正弦 asinh)',
      '(': '左括弧 (SHIFT: 絶対値 abs)',
      ')': '右括弧 (SHIFT: 床関数 floor)',
      '4': '数字 4', '5': '数字 5', '6': '数字 6',
      cosh: '双曲線余弦 cosh(x) (SHIFT: 逆双曲線余弦 acosh)',
      'M+': '独立メモリ M に現在値を加算',
      'M-': '独立メモリ M から現在値を減算',
      '1': '数字 1', '2': '数字 2', '3': '数字 3',
      tanh: '双曲線正接 tanh(x) (SHIFT: 逆双曲線正接 atanh)',
      '0': '数字 0', '.': '小数点 (SHIFT: 乱数)',
      '×': '乗算', '÷': '除算',
      Ans: '前回の計算結果 (SHIFT: 円周率 π)',
      EXP: '科学記法 x10^ (SHIFT: eのx乗)',
      '-': '減算', '+': '加算', 'x!': '階乗 x!',
      x: '変数 x（関数独立変数）', y: '変数 y（関数従属変数）',
      '!': '階乗記号 !', ',': '引数区切りカンマ', '%': 'パーセント',
      '=': '等号 — 計算実行または代入',
      SPC: 'スペース（行列/データ区切り）', ';': 'セミコロン（行列行区切り）',
      ':': 'コロン（Python コードブロック）', '<': '小なり（Python 比較）',
      '>': '大なり（Python 比較）', '↵': '改行（Python 複数行）'
    },
    tabs: { calc: '計算', graph: 'グラフ', eqn: '方程式', mat: '行列', vec: 'ベクトル', stat: '統計', 'calc-mod': '微積分', python: 'Python' },
    screen: {
      placeholder: '式を入力して = を押してください',
      history: '履歴', historyCount: '件', clearHistory: 'クリア',
      noHistory: '履歴なし', noHistoryHint: '= で計算するとここに表示されます',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    theme: {
      hint: 'クリックで切替: システム / ダーク / ライト',
      mode: { system: 'システム', dark: 'ダーク', light: 'ライト' }
    },
    graph: {
      title: '関数プロッター', resetView: 'ビューリセット', zoomIn: '拡大', zoomOut: '縮小',
      addFunc: '+ 関数追加', placeholder: 'f(x) 例 sin(x) または x^2-3',
      coordLabel: 'x: {x}  y: {y}', viewLabel: '倍率: {scale}x | 中心: ({cx}, {cy})',
      fullscreen: 'フルスクリーン', exitFullscreen: 'フルスクリーン終了',
      modeFunction: '関数', modeDraw: '手描き', modeConstruct: '作図',
      clear: 'クリア',
      toolPoint: '点', toolLine: '直線', toolSegment: '線分',
      toolParallel: '平行線', toolPerp: '垂線', toolIntersect: '交点',
      hintPoint: 'クリックして点を配置',
      hintLine1: '最初の点をクリック', hintLine2: '2番目の点をクリック',
      hintParallel1: '線/線分の近くをクリック', hintParallel2: '通過点をクリック',
      hintIntersect1: '最初の関数をクリック', hintIntersect2: '2番目の関数をクリック'
    },
    advanced: {
      title: '高度な数学ツール', empty: '機能を選んで「計算」をクリック', go: '▶ 計算',
      modules: { eqn: '方程式', mat: '行列', vec: 'ベクトル', stat: '統計', calc: '微積分' },
      quad:   { title: '二次方程式 ax²+bx+c=0', hint: '複素根を含む' },
      cubic:  { title: '三次方程式 ax³+bx²+cx+d=0', hint: 'Cardano の公式' },
      nl:     { title: '任意の一変数方程式 f(x)=0', hint: '二分法 + ニュートン法' },
      linear: { title: 'n元線形系 A·x = b', hint: '部分ピボット付きガウス消去' },
      mat: { inputs: 'A と B を入力', output: '結果' },
      vec: { inputs: 'ベクトル a と b を入力', output: '結果' },
      stat: {
        data: 'データ入力', yHint: '（省略可、回帰/共分散用）',
        summaryX: 'X 要約統計量', linreg: '線形回帰 y=a+bx', result: '統計結果'
      },
      df:  { title: '数値微分（中心差分）', hint: '1次 / 2次、4次精度' },
      int: { title: '適応的数値積分', hint: '適応 Simpson 1/3 則' }
    },
    python: {
      title: 'Python コンソール', notLoaded: '未読込', loading: '読込中...（約10MB）',
      ready: '準備完了', load: 'Python を読込', reload: '再読込',
      clear: 'クリア', editor: 'エディタ', example: '例...',
      run: '実行', running: '実行中...',
      placeholder: 'Python コードを入力...（Ctrl+Enter で実行）',
      output: '出力', outputCleared: '出力を消去しました',
      loadPrompt: 'Pyodide (WebAssembly Python) を読込中... 約 10MB',
      loadSuccess: 'Python 環境を読み込みました！コードを実行できます',
      loadFail: '読込失敗: {msg}', noOutput: '（出力なし）', returnValue: '[戻り値] {val}',
      mode: { math: '数式スクリプト', native: 'システム Python', pyodide: 'Pyodide' },
      script: {
        ready: '数式スクリプトモード準備完了',
        hint: '代入/print/for range/if/def に対応。ゼロ読込で即実行',
        placeholder: `# 数式スクリプト（ゼロ読込、即実行）
# 代入、print、for x in range(a,b)、if、def 関数に対応
# 全科学関数利用可: sin, cos, tan, log, ln, sqrt, abs, floor など
# Ctrl+Enter で即実行`
      },
      native: {
        ok: 'システム Python 利用可', checking: 'システム Python を確認中...', none: 'システム Python が見つかりません',
        placeholder: `# お使いのシステム Python インタプリタを使用
# 標準ライブラリとサードパーティ (numpy, pandas など) に対応
# Ctrl+Enter でローカル python を呼び出し`,
        ready: 'システム Python に接続しました', running: 'ローカル Python インタプリタを呼び出し中...',
        tip: 'python.org/downloads から Python 3 をインストール（Add to PATH にチェック）し、計算機を再起動してください'
      },
      pyodide: { tip: '右上「Python を読込」をクリックして Pyodide を有効化（WebAssembly、約10MB）' },
      examples: { basic: '基本演算', func: '関数定義', loop: 'ループとリスト', math: '数学', matrix: '行列演算' }
    },
    code: { default: '', basic: '', func: '', loop: '', math: '', matrix: '' }
  },

  'ru-RU': {
    app: { title: 'SCP', subtitle: 'Scientific Calculator Plus' },
    hint: {
      title: 'Справка по клавишам',
      none: 'Наведите курсор на клавишу, чтобы узнать её функцию',
      SHIFT: 'Модификатор SHIFT — активирует оранжевую вторичную функцию',
      ALPHA: 'Модификатор ALPHA — активирует ввод красных переменных',
      MODE: 'Переключить режим (COMP / CMPLX / STAT / BASE-N)',
      AC: 'Полная очистка — стирает выражение и результат',
      DEL: 'Стереть символ перед курсором (SHIFT: режим вставки/замены)',
      '◀': 'Курсор влево', '▶': 'Курсор вправо',
      'x²': 'Квадрат — x² (SHIFT: кубический корень cbrt)',
      '^': 'Степень — x^y (SHIFT: квадратный корень sqrt)',
      log: 'Десятичный логарифм log₁₀(x) (SHIFT: 10^x)',
      ln: 'Натуральный логарифм ln(x) (SHIFT: e^x)',
      '(-)': 'Ввод знака минус (SHIFT: модуль abs)',
      HYP: 'Префикс гиперболических функций (SHIFT: обратные гиперболические)',
      sin: 'Синус sin(x) (SHIFT: арксинус asin)',
      cos: 'Косинус cos(x) (SHIFT: арккосинус acos)',
      tan: 'Тангенс tan(x) (SHIFT: арктангенс atan)',
      STO: 'Запись — сохранить текущее значение в A-F/X/Y/M',
      RCL: 'Вызов — извлечь сохранённое значение',
      ENG: 'Инженерная нотация (SHIFT: обычная NORM)',
      'x³': 'Куб — x³ (SHIFT: обратная величина 1/x)',
      pi: 'Число пи π = 3.14159265... (SHIFT: число e)',
      DRG: 'Единицы угла Deg/Rad/Grad',
      '7': 'Цифра 7', '8': 'Цифра 8', '9': 'Цифра 9',
      sinh: 'Гиперболический синус sinh(x) (SHIFT: asinh)',
      '(': 'Открывающая скобка (SHIFT: модуль abs)',
      ')': 'Закрывающая скобка (SHIFT: округление floor)',
      '4': 'Цифра 4', '5': 'Цифра 5', '6': 'Цифра 6',
      cosh: 'Гиперболический косинус cosh(x) (SHIFT: acosh)',
      'M+': 'Добавить текущее значение в память M',
      'M-': 'Вычесть текущее значение из памяти M',
      '1': 'Цифра 1', '2': 'Цифра 2', '3': 'Цифра 3',
      tanh: 'Гиперболический тангенс tanh(x) (SHIFT: atanh)',
      '0': 'Цифра 0', '.': 'Десятичная точка (SHIFT: случайное число)',
      '×': 'Умножение', '÷': 'Деление',
      Ans: 'Предыдущий ответ (SHIFT: π)',
      EXP: 'Экспоненциальная запись x10^ (SHIFT: e^x)',
      '-': 'Вычитание', '+': 'Сложение',
      'x!': 'Факториал x!',
      x: 'Переменная x (аргумент функции)', y: 'Переменная y (значение функции)',
      '!': 'Знак факториала !', ',': 'Разделитель аргументов', '%': 'Процент',
      '=': 'Равно — выполнить вычисление или присваивание',
      SPC: 'Пробел (разделитель матриц/данных)', ';': 'Точка с запятой (разделитель строк матрицы)',
      ':': 'Двоеточие (блок Python)', '<': 'Меньше (сравнение Python)',
      '>': 'Больше (сравнение Python)', '↵': 'Перевод строки (многострочный Python)'
    },
    tabs: { calc: 'Расчёт', graph: 'График', eqn: 'Уравнения', mat: 'Матрицы', vec: 'Векторы', stat: 'Статистика', 'calc-mod': 'Мат. анализ', python: 'Python' },
    screen: {
      placeholder: 'Введите выражение и нажмите =',
      history: 'История', historyCount: 'зап.', clearHistory: 'Очистить',
      noHistory: 'Нет записей', noHistoryHint: 'Здесь появятся результаты после нажатия =',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    theme: {
      hint: 'Нажмите, чтобы переключить: Системная / Тёмная / Светлая',
      mode: { system: 'Система', dark: 'Тёмная', light: 'Светлая' }
    },
    graph: {
      title: 'Построитель графиков', resetView: 'Сброс вида', zoomIn: 'Приблизить', zoomOut: 'Отдалить',
      addFunc: '+ Добавить функцию', placeholder: 'f(x), напр. sin(x) или x^2-3',
      coordLabel: 'x: {x}  y: {y}', viewLabel: 'Масштаб: {scale}x | Центр: ({cx}, {cy})',
      fullscreen: 'На весь экран', exitFullscreen: 'Выйти из полноэкранного режима',
      modeFunction: 'Функция', modeDraw: 'Рисование', modeConstruct: 'Построение',
      clear: 'Очистить',
      toolPoint: 'Точка', toolLine: 'Прямая', toolSegment: 'Отрезок',
      toolParallel: 'Параллель', toolPerp: 'Перпендикуляр', toolIntersect: 'Пересечение',
      hintPoint: 'Кликните, чтобы поставить точку',
      hintLine1: 'Кликните первую точку', hintLine2: 'Кликните вторую точку',
      hintParallel1: 'Кликните рядом с прямой/отрезком', hintParallel2: 'Кликните точку для проведения',
      hintIntersect1: 'Кликните первую функцию', hintIntersect2: 'Кликните вторую функцию'
    },
    advanced: {
      title: 'Продвинутые математические инструменты',
      empty: 'Выберите функцию и нажмите Вычислить', go: '▶ Вычислить',
      modules: { eqn: 'Уравнения', mat: 'Матрицы', vec: 'Векторы', stat: 'Статистика', calc: 'Мат. анализ' },
      quad:   { title: 'Квадратное ax²+bx+c=0', hint: 'включая комплексные корни' },
      cubic:  { title: 'Кубическое ax³+bx²+cx+d=0', hint: 'Формула Кардано' },
      nl:     { title: 'Уравнение f(x)=0', hint: 'Бисекция + метод Ньютона' },
      linear: { title: 'Система A·x=b (n×n)', hint: 'Гаусс с частичным выбором главного элемента' },
      mat: { inputs: 'Введите A и B', output: 'Результат' },
      vec: { inputs: 'Введите векторы a и b', output: 'Результат' },
      stat: {
        data: 'Ввод данных', yHint: '(необязательно, для регрессии/ковариации)',
        summaryX: 'Описательная статистика X', linreg: 'Линейная регрессия y=a+bx', result: 'Статистический результат'
      },
      df:  { title: 'Численное дифференцирование', hint: '1-й / 2-й порядок, центральные разности 4-го порядка' },
      int: { title: 'Адаптивное интегрирование', hint: 'Адаптивное правило Симпсона 1/3' }
    },
    python: {
      title: 'Консоль Python', notLoaded: 'Не загружено', loading: 'Загрузка... (~10МБ)',
      ready: 'Готово', load: 'Загрузить Python', reload: 'Перезагрузить',
      clear: 'Очистить', editor: 'Редактор', example: 'Примеры...',
      run: 'Выполнить', running: 'Выполняется...',
      placeholder: 'Введите код Python... (Ctrl+Enter для запуска)',
      output: 'Вывод', outputCleared: 'Вывод очищен',
      loadPrompt: 'Загружается Pyodide (WebAssembly Python)... около 10 МБ',
      loadSuccess: 'Среда Python загружена! Можно выполнять код',
      loadFail: 'Ошибка загрузки: {msg}', noOutput: '(нет вывода)', returnValue: '[возврат] {val}',
      mode: { math: 'Математический скрипт', native: 'Системный Python', pyodide: 'Pyodide' },
      script: {
        ready: 'Режим математического скрипта готов',
        hint: 'Поддержка присваиваний/print/for-range/if/def, запуск мгновенно',
        placeholder: `# Математический скрипт (без загрузки, мгновенный запуск)
# Поддерживаются присваивания, print, for x in range(a,b), if, def
# Все научные функции доступны: sin, cos, tan, log, ln, sqrt, abs, floor и др.
# Нажмите Ctrl+Enter для выполнения`
      },
      native: {
        ok: 'Системный Python доступен', checking: 'Проверка системного Python...', none: 'Системный Python не обнаружен',
        placeholder: `# Используется системный интерпретатор Python
# Поддерживаются стандартная библиотека и сторонние пакеты (numpy, pandas...)
# Ctrl+Enter для запуска локального python`,
        ready: 'Подключен к системному Python', running: 'Вызов локального интерпретатора Python...',
        tip: 'Установите Python 3 с python.org/downloads (отметьте «Add to PATH»), затем перезапустите калькулятор'
      },
      pyodide: { tip: 'Нажмите «Загрузить Python» сверху справа, чтобы включить Pyodide (WebAssembly, ~10МБ)' },
      examples: { basic: 'Базовые операции', func: 'Функции', loop: 'Циклы и списки', math: 'Математика', matrix: 'Матрицы' }
    },
    code: { default: '', basic: '', func: '', loop: '', math: '', matrix: '' }
  },

  'fr-FR': {
    app: { title: 'SCP', subtitle: 'Scientific Calculator Plus' },
    hint: {
      title: 'Guide des touches',
      none: 'Survolez une touche pour voir sa fonction',
      SHIFT: 'Modificateur SHIFT — active la fonction secondaire orange',
      ALPHA: 'Modificateur ALPHA — active la saisie des variables rouges',
      MODE: 'Changer de mode (COMP / CMPLX / STAT / BASE-N)',
      AC: 'Tout effacer — vide l\'expression et le résultat',
      DEL: 'Supprime le caractère avant le curseur (SHIFT: bascule insertion/écrasement)',
      '◀': 'Curseur vers la gauche', '▶': 'Curseur vers la droite',
      'x²': 'Carré — x² (SHIFT: racine cubique cbrt)',
      '^': 'Puissance — x^y (SHIFT: racine carrée sqrt)',
      log: 'Logarithme décimal log₁₀(x) (SHIFT: 10^x)',
      ln: 'Logarithme népérien ln(x) (SHIFT: e^x)',
      '(-)': 'Signe moins (SHIFT: valeur absolue abs)',
      HYP: 'Préfixe hyperbolique (SHIFT: hyperboliques réciproques)',
      sin: 'Sinus sin(x) (SHIFT: arcsin)',
      cos: 'Cosinus cos(x) (SHIFT: arccos)',
      tan: 'Tangente tan(x) (SHIFT: arctan)',
      STO: 'Mémoriser — stocke la valeur dans A-F/X/Y/M',
      RCL: 'Rappel — lit la valeur stockée',
      ENG: 'Notation ingénieur (SHIFT: notation classique NORM)',
      'x³': 'Cube — x³ (SHIFT: inverse 1/x)',
      pi: 'Nombre pi π = 3.14159265... (SHIFT: nombre e)',
      DRG: 'Unité d\'angle Deg/Rad/Grad',
      '7': 'Chiffre 7', '8': 'Chiffre 8', '9': 'Chiffre 9',
      sinh: 'Sinus hyperbolique sinh(x) (SHIFT: asinh)',
      '(': 'Parenthèse ouvrante (SHIFT: valeur absolue abs)',
      ')': 'Parenthèse fermante (SHIFT: arrondi inférieur floor)',
      '4': 'Chiffre 4', '5': 'Chiffre 5', '6': 'Chiffre 6',
      cosh: 'Cosinus hyperbolique cosh(x) (SHIFT: acosh)',
      'M+': 'Ajouter la valeur à la mémoire M',
      'M-': 'Soustraire la valeur de la mémoire M',
      '1': 'Chiffre 1', '2': 'Chiffre 2', '3': 'Chiffre 3',
      tanh: 'Tangente hyperbolique tanh(x) (SHIFT: atanh)',
      '0': 'Chiffre 0', '.': 'Point décimal (SHIFT: nombre aléatoire)',
      '×': 'Multiplication', '÷': 'Division',
      Ans: 'Résultat précédent (SHIFT: π)',
      EXP: 'Notation scientifique x10^ (SHIFT: e^x)',
      '-': 'Soustraction', '+': 'Addition',
      'x!': 'Factorielle x!',
      x: 'Variable x (argument)', y: 'Variable y (valeur)',
      '!': 'Symbole factorielle !', ',': 'Séparateur d\'arguments', '%': 'Pourcentage',
      '=': 'Égal — calcule ou affecte',
      SPC: 'Espace (séparateur matrice/données)', ';': 'Point-virgule (séparateur lignes matrice)',
      ':': 'Deux-points (bloc Python)', '<': 'Inférieur (comparaison Python)',
      '>': 'Supérieur (comparaison Python)', '↵': 'Saut de ligne (Python multiligne)'
    },
    tabs: { calc: 'Calcul', graph: 'Graphiques', eqn: 'Équations', mat: 'Matrices', vec: 'Vecteurs', stat: 'Stats', 'calc-mod': 'Analyse', python: 'Python' },
    screen: {
      placeholder: 'Saisissez une expression puis appuyez sur =',
      history: 'Historique', historyCount: 'éléments', clearHistory: 'Effacer',
      noHistory: 'Aucun enregistrement', noHistoryHint: 'Les résultats apparaîtront ici après =',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    theme: {
      hint: 'Cliquez pour alterner : Système / Sombre / Clair',
      mode: { system: 'Système', dark: 'Sombre', light: 'Clair' }
    },
    graph: {
      title: 'Traceur de courbes', resetView: 'Réinitialiser la vue', zoomIn: 'Zoomer', zoomOut: 'Dézoomer',
      addFunc: '+ Ajouter une fonction', placeholder: 'f(x) ex: sin(x) ou x^2-3',
      coordLabel: 'x: {x}  y: {y}', viewLabel: 'Zoom: {scale}x | Centre: ({cx}, {cy})',
      fullscreen: 'Plein écran', exitFullscreen: 'Quitter le plein écran',
      modeFunction: 'Fonction', modeDraw: 'Dessin', modeConstruct: 'Construction',
      clear: 'Effacer',
      toolPoint: 'Point', toolLine: 'Droite', toolSegment: 'Segment',
      toolParallel: 'Parallèle', toolPerp: 'Perpendiculaire', toolIntersect: 'Intersection',
      hintPoint: 'Cliquez pour placer un point',
      hintLine1: 'Cliquez le premier point', hintLine2: 'Cliquez le second point',
      hintParallel1: 'Cliquez près d\'une droite/segment', hintParallel2: 'Cliquez le point de passage',
      hintIntersect1: 'Cliquez la première fonction', hintIntersect2: 'Cliquez la seconde fonction'
    },
    advanced: {
      title: 'Outils mathématiques avancés',
      empty: 'Choisissez une fonction puis cliquez sur Calculer', go: '▶ Calculer',
      modules: { eqn: 'Équations', mat: 'Matrices', vec: 'Vecteurs', stat: 'Statistiques', calc: 'Analyse' },
      quad:   { title: 'Équation quadratique ax²+bx+c=0', hint: 'racines complexes incluses' },
      cubic:  { title: 'Équation cubique ax³+bx²+cx+d=0', hint: 'formules de Cardan' },
      nl:     { title: 'Équation univariée f(x)=0', hint: 'Dichotomie + Newton' },
      linear: { title: 'Système linéaire A·x=b (n×n)', hint: 'Élimination de Gauss avec pivot partiel' },
      mat: { inputs: 'Saisir A et B', output: 'Résultat' },
      vec: { inputs: 'Saisir les vecteurs a et b', output: 'Résultat' },
      stat: {
        data: 'Saisie des données', yHint: '(facultatif, pour régression / Cov)',
        summaryX: 'Statistiques X', linreg: 'Régression linéaire y=a+bx', result: 'Résultat statistique'
      },
      df:  { title: 'Dérivation numérique', hint: '1er / 2nd ordre, différences centrées ordre 4' },
      int: { title: 'Intégration adaptative', hint: 'Règle de Simpson 1/3 adaptative' }
    },
    python: {
      title: 'Console Python', notLoaded: 'Non chargé', loading: 'Chargement... (~10Mo)',
      ready: 'Prêt', load: 'Charger Python', reload: 'Recharger',
      clear: 'Effacer', editor: 'Éditeur', example: 'Exemples...',
      run: 'Exécuter', running: 'Exécution...',
      placeholder: 'Saisir du code Python... (Ctrl+Enter pour exécuter)',
      output: 'Sortie', outputCleared: 'Sortie effacée',
      loadPrompt: 'Chargement de Pyodide (Python WebAssembly)... ~10 Mo',
      loadSuccess: 'Environnement Python chargé ! Vous pouvez exécuter du code',
      loadFail: 'Échec du chargement : {msg}', noOutput: '(pas de sortie)', returnValue: '[retour] {val}',
      mode: { math: 'Script mathématique', native: 'Python système', pyodide: 'Pyodide' },
      script: {
        ready: 'Mode script mathématique prêt',
        hint: 'Affectations/print/boucle for-range/if/def, exécution immédiate sans chargement',
        placeholder: `# Script mathématique (chargement nul, exécution immédiate)
# Affectations, print, for x in range(a,b), if, fonctions def
# Toutes les fonctions scientifiques disponibles : sin, cos, tan, log, ln, sqrt, abs, floor...
# Ctrl+Enter pour exécuter`
      },
      native: {
        ok: 'Python système disponible', checking: 'Vérification du Python système...', none: 'Python système introuvable',
        placeholder: `# Utilise l'interpréteur Python de votre système
# Bibliothèque standard et paquets tiers (numpy, pandas...) pris en charge
# Ctrl+Enter pour appeler python en local`,
        ready: 'Connecté au Python système', running: 'Appel de l\'interpréteur Python local...',
        tip: 'Installez Python 3 depuis python.org/downloads (cochez « Add to PATH »), puis redémarrez la calculatrice'
      },
      pyodide: { tip: 'Cliquez sur « Charger Python » en haut à droite pour activer Pyodide (WebAssembly, ~10Mo)' },
      examples: { basic: 'Opérations de base', func: 'Fonctions', loop: 'Boucles et listes', math: 'Mathématiques', matrix: 'Matrices' }
    },
    code: { default: '', basic: '', func: '', loop: '', math: '', matrix: '' }
  },

  'de-DE': {
    app: { title: 'SCP', subtitle: 'Scientific Calculator Plus' },
    hint: {
      title: 'Tastenübersicht',
      none: 'Fahren Sie mit der Maus über eine Taste, um ihre Funktion zu sehen',
      SHIFT: 'SHIFT-Modifikator — aktiviert die orange Zweitfunktion',
      ALPHA: 'ALPHA-Modifikator — aktiviert die rote Variableneingabe',
      MODE: 'Modus wechseln (COMP / CMPLX / STAT / BASE-N)',
      AC: 'Alles löschen — leeren Ausdruck und Ergebnis',
      DEL: 'Zeichen vor dem Cursor löschen (SHIFT: Einfügen/Überschreiben umschalten)',
      '◀': 'Cursor nach links', '▶': 'Cursor nach rechts',
      'x²': 'Quadrat — x² (SHIFT: Kubikwurzel cbrt)',
      '^': 'Potenz — x^y (SHIFT: Quadratwurzel sqrt)',
      log: 'Zehnerlogarithmus log₁₀(x) (SHIFT: 10^x)',
      ln: 'Natürlicher Logarithmus ln(x) (SHIFT: e^x)',
      '(-)': 'Vorzeichen minus (SHIFT: Betrag abs)',
      HYP: 'Präfix für hyperbolische Funktionen (SHIFT: Areahyperbolicus)',
      sin: 'Sinus sin(x) (SHIFT: Arkussin asin)',
      cos: 'Kosinus cos(x) (SHIFT: Arkuskosinus acos)',
      tan: 'Tangens tan(x) (SHIFT: Arkustangens atan)',
      STO: 'Speichern — aktuellen Wert in A-F/X/Y/M speichern',
      RCL: 'Abrufen — gespeicherten Wert lesen',
      ENG: 'Ingenieurnotation (SHIFT: Normale Notation NORM)',
      'x³': 'Kubik — x³ (SHIFT: Kehrwert 1/x)',
      pi: 'Kreiszahl π = 3.14159265... (SHIFT: Eulersche Zahl e)',
      DRG: 'Winkeleinheit Deg/Rad/Grad',
      '7': 'Ziffer 7', '8': 'Ziffer 8', '9': 'Ziffer 9',
      sinh: 'Sinus hyperbolicus sinh(x) (SHIFT: asinh)',
      '(': 'Öffnende Klammer (SHIFT: Betrag abs)',
      ')': 'Schließende Klammer (SHIFT: Abrunden floor)',
      '4': 'Ziffer 4', '5': 'Ziffer 5', '6': 'Ziffer 6',
      cosh: 'Kosinus hyperbolicus cosh(x) (SHIFT: acosh)',
      'M+': 'Aktuellen Wert zum Speicher M addieren',
      'M-': 'Aktuellen Wert vom Speicher M subtrahieren',
      '1': 'Ziffer 1', '2': 'Ziffer 2', '3': 'Ziffer 3',
      tanh: 'Tangens hyperbolicus tanh(x) (SHIFT: atanh)',
      '0': 'Ziffer 0', '.': 'Dezimalpunkt (SHIFT: Zufallszahl)',
      '×': 'Multiplikation', '÷': 'Division',
      Ans: 'Letztes Ergebnis (SHIFT: π)',
      EXP: 'Wissenschaftliche Schreibweise x10^ (SHIFT: e^x)',
      '-': 'Subtraktion', '+': 'Addition',
      'x!': 'Fakultät x!',
      x: 'Variable x (Funktionsargument)', y: 'Variable y (Funktionswert)',
      '!': 'Fakultätszeichen !', ',': 'Argumenttrennzeichen', '%': 'Prozent',
      '=': 'Gleichheit — Berechnung durchführen oder zuweisen',
      SPC: 'Leerzeichen (Matrix/Daten-Trenner)', ';': 'Semikolon (Matrix-Zeilenseparator)',
      ':': 'Doppelpunkt (Python-Block)', '<': 'Kleiner (Vergleich Python)',
      '>': 'Größer (Vergleich Python)', '↵': 'Zeilenumbruch (mehrzeiliges Python)'
    },
    tabs: { calc: 'Rechner', graph: 'Grafik', eqn: 'Gleichungen', mat: 'Matrizen', vec: 'Vektoren', stat: 'Statistik', 'calc-mod': 'Analysis', python: 'Python' },
    screen: {
      placeholder: 'Ausdruck eingeben und = drücken',
      history: 'Verlauf', historyCount: 'Einträge', clearHistory: 'Leeren',
      noHistory: 'Keine Einträge', noHistoryHint: 'Ergebnisse erscheinen hier nach =',
      modes: { COMP: 'COMP', CMPLX: 'CMPLX', STAT: 'STAT', 'BASE-N': 'BASE', 'EQN': 'EQN', 'MAT': 'MAT' },
      angles: { Deg: 'D', Rad: 'R', Grad: 'G' }
    },
    theme: {
      hint: 'Klicken zum Wechseln: System / Dunkel / Hell',
      mode: { system: 'System', dark: 'Dunkel', light: 'Hell' }
    },
    graph: {
      title: 'Funktionsplotter', resetView: 'Ansicht zurücksetzen', zoomIn: 'Vergrößern', zoomOut: 'Verkleinern',
      addFunc: '+ Funktion hinzufügen', placeholder: 'f(x) z. B. sin(x) oder x^2-3',
      coordLabel: 'x: {x}  y: {y}', viewLabel: 'Zoom: {scale}x | Zentrum: ({cx}, {cy})',
      fullscreen: 'Vollbild', exitFullscreen: 'Vollbild verlassen',
      modeFunction: 'Funktion', modeDraw: 'Zeichnen', modeConstruct: 'Konstruktion',
      clear: 'Löschen',
      toolPoint: 'Punkt', toolLine: 'Gerade', toolSegment: 'Strecke',
      toolParallel: 'Parallele', toolPerp: 'Senkrechte', toolIntersect: 'Schnittpunkt',
      hintPoint: 'Klicken, um Punkt zu setzen',
      hintLine1: 'Ersten Punkt klicken', hintLine2: 'Zweiten Punkt klicken',
      hintParallel1: 'Nahe einer Geraden/Strecke klicken', hintParallel2: 'Durchgangspunkt klicken',
      hintIntersect1: 'Erste Funktion klicken', hintIntersect2: 'Zweite Funktion klicken'
    },
    advanced: {
      title: 'Erweiterte Mathematik-Tools',
      empty: 'Feature auswählen und auf Berechnen klicken', go: '▶ Berechnen',
      modules: { eqn: 'Gleichungen', mat: 'Matrizen', vec: 'Vektoren', stat: 'Statistik', calc: 'Analysis' },
      quad:   { title: 'Quadratische ax²+bx+c=0', hint: 'inkl. komplexer Wurzeln' },
      cubic:  { title: 'Kubische ax³+bx²+cx+d=0', hint: 'Cardano-Formel' },
      nl:     { title: 'Beliebige Gleichung f(x)=0', hint: 'Bisektion + Newton' },
      linear: { title: 'Lineares System A·x=b (n×n)', hint: 'Gauß-Elimination mit Teilpivot' },
      mat: { inputs: 'A und B eingeben', output: 'Ergebnis' },
      vec: { inputs: 'Vektoren a und b eingeben', output: 'Ergebnis' },
      stat: {
        data: 'Dateneingabe', yHint: '(optional, für Regression / Kovarianz)',
        summaryX: 'X-Basisstatistik', linreg: 'Lineare Regression y=a+bx', result: 'Statistik-Ergebnis'
      },
      df:  { title: 'Numerische Differentiation', hint: '1. / 2. Ordnung, zentrale Differenzen 4. Ordnung' },
      int: { title: 'Adaptive Integration', hint: 'Adaptives Simpson 1/3-Verfahren' }
    },
    python: {
      title: 'Python-Konsole', notLoaded: 'Nicht geladen', loading: 'Laden... (~10MB)',
      ready: 'Bereit', load: 'Python laden', reload: 'Neu laden',
      clear: 'Leeren', editor: 'Editor', example: 'Beispiele...',
      run: 'Ausführen', running: 'Wird ausgeführt...',
      placeholder: 'Python-Code eingeben... (Ctrl+Enter zum Ausführen)',
      output: 'Ausgabe', outputCleared: 'Ausgabe geleert',
      loadPrompt: 'Pyodide (WebAssembly Python) wird geladen... ~10 MB',
      loadSuccess: 'Python-Umgebung geladen! Code kann ausgeführt werden',
      loadFail: 'Laden fehlgeschlagen: {msg}', noOutput: '(keine Ausgabe)', returnValue: '[Rückgabe] {val}',
      mode: { math: 'Mathe-Skript', native: 'System-Python', pyodide: 'Pyodide' },
      script: {
        ready: 'Mathe-Skriptmodus bereit',
        hint: 'Unterstützt Zuweisung/print/for-range/if/def, sofortiger Start ohne Laden',
        placeholder: `# Mathe-Skript (ohne Laden, sofort startbar)
# Unterstützt Zuweisungen, print, for x in range(a,b), if, def-Funktionen
# Alle wissenschaftlichen Funktionen verfügbar: sin, cos, tan, log, ln, sqrt, abs, floor usw.
# Strg+Enter zum Ausführen`
      },
      native: {
        ok: 'System-Python verfügbar', checking: 'System-Python wird überprüft...', none: 'Kein System-Python gefunden',
        placeholder: `# Verwendet den auf dem System installierten Python-Interpreter
# Unterstützt Standardbibliothek und Drittpakete (numpy, pandas usw.)
# Strg+Enter ruft das lokale python auf`,
        ready: 'Mit System-Python verbunden', running: 'Lokaler Python-Interpreter wird aufgerufen...',
        tip: 'Installieren Sie Python 3 von python.org/downloads (»Add to PATH« aktivieren), dann starten Sie den Rechner neu'
      },
      pyodide: { tip: 'Klicken Sie oben rechts auf „Python laden”, um Pyodide zu aktivieren (WebAssembly, ~10MB)' },
      examples: { basic: 'Grundrechenarten', func: 'Funktionen', loop: 'Schleifen und Listen', math: 'Mathematik', matrix: 'Matrizen' }
    },
    code: { default: '', basic: '', func: '', loop: '', math: '', matrix: '' }
  }
} as const

export type Lang = keyof typeof messages
export type MessageKey = string

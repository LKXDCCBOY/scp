# SCP - Scientific Calculator Plus

![Version](https://img.shields.io/badge/Version-1.2.1-blue)
[![Languages](https://img.shields.io/badge/UI%20Languages-7-informational)](#)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Android-green)

**ドキュメント:**
[简体中文](./README.zh.md) | [繁體中文](./README.zh-TW.md) | [English](./README.md) | **日本語** | [Русский](./README.ru.md) | [Francais](./README.fr.md) | [Deutsch](./README.de.md)

> **UI 言語切替:** アプリ内上部バー → **Language** ドロップダウン（7言語対応）

エンジニア、学生、科学者のために開発された、プロフェッショナル向け**科学計算機**のデスクトップ＆モバイルアプリケーションです。**カシオ風**ソフトキーボード、グラスモーフィズムUI、マルチテーマ対応、作図・幾何学ツール付きの関数グラフ描画、高度な数学機能を備えています。

開発：**Prism Technology Studio** (c) 2026

---

## 機能

### コア電卓（カシオ風）
- **カシオ風ソフトキーボード** -- 画面上のキー入力のみで、文字コードの曖昧さを解消
- 演算子の優先順位とかっこを考慮した完全な式評価
- 2次機能のための**SHIFT** / **ALPHA** 修飾キーシステム
- **メモリ**: M+ / M- / STO / RCL（変数 A-F、X、Y、M）
- **角度モード**: 度 / ラジアン / グラード（DRG で循環切替）
- **5つの出力モード**: 通常 / 科学 / 工学 / 分数 / リニア（NORM/SCI/ENG で循環切替）
- 三角関数: sin / cos / tan + 逆関数; 双曲線関数: sinh / cosh / tanh + 逆関数
- べき乗と根: `x^2`, `x^3`, `^`, `sqrt`, `cbrt`, `1/x`, `|x|`
- 対数: `log`（底10）/ `ln`（自然対数）+ 逆関数 `10^x` / `e^x`
- 定数: pi、e（ネイピア数）
- 組合せ数学: 階乗 `x!`、乱数
- 呼び出し + 検索 + ワンクリック再利用が可能な**計算履歴**
- **単位換算**パネル

### 変数キーボード（未知数）
- メインキーボードの専用**VAR**ボタンでポップアップ変数キーパッドを開く
- **小文字**: a-z + pi（28キー）
- **大文字**: A-Z + theta + lambda（28キー）
- **ギリシャ文字**: alpha、beta、gamma、delta、epsilon、mu、sigma、omega、phi、psi、eta、rho、tau、infinity（14キー）
- 電卓エンジンで全1文字変数（A-Z、a-z）をサポート
- グラフ描画用のグローバルパラメータ設定パネル（a、b、c、m、n、k、d、z）

### 関数グラフ描画 + 作図 + 幾何学構築

**マルチ関数プロッター**
- 同時に**16**個の関数をプロット（16色パレット -- 多数の関数でも色の重複なし）
- リアルタイムのパン（ドラッグ）とズーム（スクロールホイール）
- 自動ラベル付きの適応型座標グリッド
- 折りたたみ可能な関数コントロールバー付きフルスクリーンモード（左上の**メニュー**ボタン、メニューの切替 / Xボタン / 背景クリックで閉じる）
- **媒介変数方程式**: 調整可能な t 範囲付きの x(t) と y(t)
- **選択関数のハイライト**: 選択した関数行にバッジ + 枠線ハイライトを表示; キャンバス上の曲線は2重ストローク（外側グロー + 内側太線）で描画

**フリーハンド描画（スケッチモード）**
- グラフキャンバス上に自由に描画・書き込み
- 8色パレット（青 / ローズ / エメラルド / アンバー / バイオレット / シアン / ピンク / 白）
- 線幅の調整可能（1〜8 px）
- ストロークは**数学座標**で保存 -- グリッドと一緒にパン・ズームされる
- ワンクリックでクリア

**幾何学構築ツール**

| ツール | 説明 |
|--------|------|
| **点（Point）** | 任意の場所をクリックしてラベル付きの点（P1、P2...）を配置 |
| **直線（Line）** | 2回クリック -- 無限直線を描画（画面端まで延長） |
| **線分（Segment）** | 2回クリック -- 有限の線分を描画（端点マーカー付き） |
| **平行線（Parallel）** | 1. 直線/線分の近くをクリック 2. 点をクリック -- その点を通る平行線を描画 |
| **垂線（Perpendicular）** | 1. 直線/線分の近くをクリック 2. 点をクリック -- その点を通る垂線を描画 |
| **交点（Intersection）** | 1. 関数Aの近くをクリック 2. 関数Bの近くをクリック -- 500点スキャン + 50回の二分法（精度 ~1e-15）で交点を求め、点と座標を表示 |

選択した基準線（平行線/垂線）は、より明るい色・太いストローク・グロー効果でハイライト表示されます。

### 高度な数学（専用タブ5つ）

| タブ | 機能 |
|------|------|
| **方程式（EQN）** | 二次方程式ソルバー（ax^2+bx+c=0、複素数解を含む）; 三次方程式ソルバー（カルダノの公式）; 任意の一変数方程式の求根（二分法 + ニュートン法）; n次連立一次方程式（部分ピボット付きガウスの消去法） |
| **行列（MAT）** | 行列 A/B/C + 演算 -- 加算、減算、乗算、転置、行列式、逆行列、階数、階段形 |
| **ベクトル（VEC）** | ベクトル a/b -- 加算、減算、内積、外積、ノルム、正規化、なす角、スカラー/ベクトル射影 |
| **統計（STAT）** | X + 任意のYデータを入力 -> 平均、中央値、最頻値、最小/最大、Q1/Q3、分散、標準偏差、共分散、ピアソン相関係数（r）、線形回帰 y = a + bx |
| **微積分（MOD）** | 数値微分（1次・2次、4次中心差分）; 適応型数値積分（シンプソン1/3） |

### Python と数式スクリプトの統合

1つのパネルで3つの実行モード:

| モード | 説明 |
|--------|------|
| **数式スクリプト（Math Script）** | ロード不要で即実行できる軽量インタプリタ。対応: 変数代入、`print()`、`for x in range(a,b,c)`、`if`/`elif`/`else`、`def` による関数定義、すべての科学関数（sin、cos、tan、log、ln、sqrt、abs、floor...） |
| **ネイティブ Python（Native Python）** | Electron IPC 経由でローカルにインストールされた Python インタプリタを呼び出します。標準ライブラリ + サードパーティパッケージに対応。PATH に Python 3 が必要。 |
| **Pyodide** | ブラウザ内の WebAssembly Python -- インストール不要。標準ライブラリと numpy を備えたサンドボックス内で実行。 |

**安全対策**（全3モード共通）:
- 事前スキャン: `**100000` のような巨大指数、`range(100000000)`、`[x]*100000000`、`"x"*100000000` を拒否
- Pyodide の**15秒タイムアウト**（Promise.race）
- Pyodide の stdout/stderr **200 KB 出力切り捨て**
- 数式スクリプト: **50万ステートメント上限** + **1万出力行上限**（無限ループ対策）
- 電卓エンジン: 指数オーバーフローの事前チェック（`|b| > 300 && |a| > 1`）
- ネイティブ Python: **5 MB stdout/stderr バッファ上限** + プロセスタイムアウト

### UI / UX

- 多層 `backdrop-blur` + オーロラグラデーション背景による**グラスモーフィズム（すりガラス）デザイン**
- **3つのテーマモード**（CSS変数駆動、動的に切替可能）:
  - **システム追従（Follow System）** -- OS のテーマに追従
  - **ダーク（Dark）** -- 深宇宙、完全テスト済み
  - **ライト（Light）** -- クリーンな白、完全テスト済み（見えない文字なし）
- アニメーションするオーロラ背景とロゴのパルス（SVGアイコンのみ -- どこにも絵文字なし）
- **ホバーヒント** -- 任意のキーにマウスを重ねると、左下パネルにそのキーの詳細な機能説明を表示
- トップバーの Language ドロップダウン付き**7言語UI**（地球 SVG アイコン）:
  - 簡体字中国語（zhongwen）
  - 繁体字中国語（fantizi）
  - 英語（English）
  - 日本語（nihongo）
  - ロシア語（russkiy）
  - フランス語（francais）
  - ドイツ語（deutsch）
- **レスポンシブレイアウト**: デスクトップでは横向き（左にキー、右に画面）; モバイルでは縦向き（上に画面、下にキーボード）。380px の超狭幅・520px の超短高画面向けに動的スケーリング対応

### デスクトップとモバイル

- **Windows**: NSIS インストーラー + ポータブル EXE + ZIP アーカイブ
- **Android**: Capacitor 6 統合、APK ビルド対応済み（デバッグ + リリース）

---

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロントエンドフレームワーク | **Vue 3** + **TypeScript** |
| ビルドツール | **Vite** |
| スタイリング | **Tailwind CSS** + **CSS 変数**（テーマ） |
| デスクトップランタイム | **Electron 28** |
| モバイルランタイム | **Capacitor 6**（Android、compileSdk 34、minSdk 22） |
| パッケージング | `electron-builder` -- NSIS / Portable / ZIP |
| Android ビルド | Gradle 8.7 + AGP 8.5.2、Tencent Gradle ミラー + Aliyun Maven ミラー |
| アイコン生成 | カスタム Node スクリプト -> PNG（256/512）+ Windows ICO（6サイズ） |

---

## プロジェクト構成

```
scp/
|-- src/
|   |-- components/          # Vue UI コンポーネント
|   |   |-- CalcScreen.vue          # 電卓ディスプレイ画面
|   |   |-- CalcKeyboard.vue        # ソフトキーボードレイアウト + VAR ポップアップ
|   |   |-- CalcKey.vue             # ホバーヒント付きの個別キー
|   |   |-- GraphPanel.vue          # 関数プロッター + 描画 + 幾何学
|   |   |-- AdvancedPanel.vue       # 方程式 / 行列 / ベクトル / 統計 / 微積分
|   |   |-- PythonPanel.vue         # 数式スクリプト / ネイティブ Python / Pyodide
|   |   |-- SettingsPanel.vue       # 単位換算と設定
|   |   `-- HistoryPanel.vue        # 計算履歴
|   |-- composables/          # Vue コンポジション関数
|   |   |-- useCalculator.ts        # 電卓エンジンの状態
|   |   |-- useInputRouter.ts       # ソフトキーボード -> アクティブ入力のルーティング
|   |   |-- useHoverHint.ts         # ホバーヒントの共有状態
|   |   `-- useTheme.ts             # ダーク / ライト / システムテーマ管理
|   |-- engine/               # コア数学エンジン
|   |   |-- calculator.ts           # 式の字句解析 + 構文解析 + 評価
|   |   |-- advanced.ts             # 行列、ベクトル、統計、微積分、方程式ソルバー
|   |   `-- script.ts               # 数式スクリプトインタプリタ（変数 + ループ + 関数）
|   |-- i18n/                 # 国際化（7言語）
|   |   |-- messages.ts             # zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
|   |   `-- index.ts                # t() 翻訳関数 + 言語レジストリ
|   |-- constants/            # キーレイアウト定義
|   |-- types/                # TypeScript 型定義
|   |-- App.vue               # ルートコンポーネント + 言語メニュー
|   `-- style.css             # グローバルスタイル + CSS 変数（テーマ）
|-- electron/
|   |-- main.js               # Electron メインプロセス（ウィンドウ、IPC Python）
|   `-- preload.js            # プリロードブリッジ（calcNative API）
|-- android/                   # Capacitor 6 Android プロジェクト
|-- scripts/
|   |-- gen-icons.js          # PNG + ICO アイコン生成
|   |-- android-envcheck.bat  # Android ビルド環境チェッカー
|   `-- android-build.bat     # ワンクリック APK ビルドスクリプト
|-- build-apk.bat             # ルートレベルの APK ビルドショートカット
|-- build/
|   `-- icon.ico              # Windows アイコン（16/32/48/64/128/256）
`-- package.json              # v1.2.1 - GPL-3.0 - electron-builder 設定
```

---

## はじめに

### 前提条件
- **Node.js >= 18**（推奨: 20 LTS）
- **npm**

### 依存関係のインストール
```bash
npm install
```

### 開発
```bash
# Web 開発サーバー（http://localhost:5173）
npm run dev

# Electron デスクトップ開発モード（アプリウィンドウ）
npm run electron:dev
```

### デスクトップ版のビルド（Windows EXE）
```bash
# フロントエンド成果物をビルド（dist/）
npm run build

# Windows: NSIS インストーラー + ポータブル EXE + ZIP
npm run electron:build:win
```

ビルド成果物は `release-scp-v1.2.1b/` に出力されます。

### Android 版のビルド（APK）

**ワンクリックビルド（推奨）:**
```bash
# デバッグ APK（ダブルクリックまたはコマンドライン）
build-apk.bat debug

# リリース APK
build-apk.bat release
```

**最初に環境チェック:**
```bash
scripts\android-envcheck.bat
```

ビルドスクリプトは JDK（優先順位: Android Studio JBR 21 -> JAVA_HOME -> Adoptium/Microsoft JDK -> PATH）と Android SDK（ANDROID_HOME -> ANDROID_SDK_ROOT -> %LOCALAPPDATA%\Android\Sdk）を自動検出します。JDK 22（Gradle 8.7 と非互換）は拒否されます。

ビルド成果物は `release-android/` に出力されます。

---

## v1.2.1 のダウンロード

ビルド済みバイナリは [**GitHub Releases**](../../releases) ページで入手できます:

| ファイル | 説明 |
|---------|------|
| `SCP-Setup-1.2.1-x64.exe`   | NSIS インストーラー **（推奨）** -- インストールフォルダの選択、ショートカットの作成 |
| `SCP-Portable-1.2.1-x64.exe`| ポータブル単体版 -- インストール不要、ダブルクリックで実行 |
| `SCP-1.2.1-x64.zip`         | ZIP アーカイブ -- 解凍して `SCP.exe` を実行 |
| `SCP-1.2.1-debug.apk`       | Android デバッグ APK -- Android 5.1+ に直接インストール |

---

## ライセンス

**GNU General Public License v3.0** -- 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

Copyright (c) 2026 **Prism Technology Studio**

---

## 概要

製品の詳細については [**ptstudio.top**](https://ptstudio.top) をご覧ください。

Copyright (c) 2026 Prism Technology Studio - All Rights Reserved

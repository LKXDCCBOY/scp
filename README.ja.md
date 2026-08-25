# SCP - Scientific Calculator Plus

[![Languages](https://img.shields.io/badge/UI%20%E8%A8%80%E8%AA%9E-7-informational)](#)
&nbsp;🇨🇳&nbsp;🇭🇰&nbsp;🇺🇸&nbsp;🇯🇵&nbsp;🇷🇺&nbsp;🇫🇷&nbsp;🇩🇪

**ドキュメント言語：**
[🇨🇳 简体中文](./README.zh.md) | [🇭🇰 繁體中文](./README.zh-TW.md) | [🇺🇸 English](./README.md) | **🇯🇵 日本語** | [🇷🇺 Русский](./README.ru.md) | [🇫🇷 Français](./README.fr.md) | [🇩🇪 Deutsch](./README.de.md)

> UI言語切替：アプリ内上部バー → **Language** プルダウン（全7言語）

プロフェッショナル級の科学電卓デスクトップアプリ。カシオ風ソフトキーボード、グラスモーフィズムUI、マルチテーマ対応、高度な数学演算機能を備えています。

開発：**Prism Technology Studio** (c) 2026

## 機能一覧

### コア電卓機能
- カシオ風ソフトキーボード入力（物理キーボード不要、文字コードの曖昧さを解消）
- 標準四則演算と完全な式評価
- 角度モード：度 / ラジアン / グラード
- 表記モード：通常 / 固定小数 / 科学 / 工学
- 計算履歴の呼び出し
- 単位換算パネル

### 関数プロット
- 複数関数の同時描画
- 16 色パレットで曲線を判別
- マウス/タッチによるドラッグ移動とスクロールズーム
- 自動適応する座標グリッド
- フルスクリーンモード：左上の「メニュー」ボタンで関数コントロールバーを上部から展開

### 高度な数学
- **方程式**：二次方程式、三次方程式、線形システム、非線形方程式
- **行列演算**：加算、減算、乗算、転置、行列式、逆行列、階数
- **ベクトル演算**：加算、減算、内積、外積、ノルム、正規化、角度、射影
- **統計**：平均値、中央値、分散、標準偏差、四分位数、相関係数、線形回帰
- **微積分**：数値微分と定積分

### Python 統合
- **数式スクリプトモード**：軽量インタプリタ内蔵（代入、print、for-range、if-else、def）
- **システム Python**：Electron IPC 経由でローカル Python を呼び出し（要インストール）
- **Pyodide モード**：ブラウザ内 WebAssembly Python（インストール不要）

### UI / UX
- グラスモーフィズム（すりガラス）デザイン（backdrop blur）
- 3 種類のテーマ：システム追従 / ダーク / ライト（CSS 変数駆動）
- オーロラ背景アニメーションと Logo のパルス効果
- キーホバーヒント：マウスを任意のキーに重ねると機能説明を表示
- 多言語（7 言語）対応、トップバーの Language プルダウンで切替
- レスポンシブレイアウト：デスクトップでは横配置（左キーボード、右ディスプレイ）

### デスクトップ & モバイル
- **Windows**：NSIS インストーラー、ポータブル EXE、ZIP アーカイブ
- **Android**：Capacitor 統合（APK ビルド対応済み）

## 技術スタック

| レイヤー | 技術 |
|----------|------|
| フレームワーク | Vue 3 + TypeScript |
| ビルドツール | Vite |
| スタイル | Tailwind CSS + CSS 変数 |
| デスクトップ | Electron 28 |
| モバイル | Capacitor 5 (Android) |
| パッケージング | electron-builder (NSIS / Portable / ZIP) |

## プロジェクト構成

```
src/
  components/       # Vue UI コンポーネント
    CalcScreen.vue       # 電卓ディスプレイ
    CalcKeyboard.vue     # ソフトキーボードレイアウト
    CalcKey.vue           # 個々のキー
    GraphPanel.vue        # 関数プロッター
    AdvancedPanel.vue     # 方程式/行列/ベクトル/統計/微積分
    PythonPanel.vue       # Python / スクリプトエディタ
    SettingsPanel.vue     # 単位換算 & 設定
    HistoryPanel.vue      # 計算履歴
  composables/     # Vue コンポジション関数
    useCalculator.ts      # 電卓エンジン状態
    useInputRouter.ts     # ソフトキーボード入力ルーティング
    useHoverHint.ts       # ホバーヒント共有状態
    useTheme.ts           # テーマ管理
  engine/          # コア数学エンジン
    calculator.ts         # 式パーサ & 評価器
    advanced.ts           # 高度な数学演算
    script.ts             # 数式スクリプトインタプリタ
  i18n/            # 国際化
    messages.ts           # 簡中/繁中/英/日/俄/法/德 翻訳
    index.ts              # 翻訳コンポーザブル + 言語レジストリ
  constants/       # キーレイアウト定義
  types/            # TypeScript 型定義
electron/
  main.js           # Electron メインプロセス
  preload.js        # プリロードブリッジ API
scripts/
  gen-icons.js      # アイコン生成（PNG / ICO）
```

## クイックスタート

### 前提条件

- Node.js >= 18
- npm または yarn

### インストール

```bash
npm install
```

### 開発

```bash
# Web 開発サーバー
npm run dev

# Electron デスクトップ開発
npm run electron:dev
```

### ビルド

```bash
# Windows インストーラー + ポータブル + ZIP
npm run electron:build:win

# アイコン生成
npm run icons

# Android APK（要 Android SDK）
npm run android:apk
```

ビルド成果物は `release-final/` ディレクトリに出力されます。

## ダウンロード

ビルド済みバイナリは [Releases](../../releases) ページから入手できます：
- `SCP-Setup-1.1.0-x64.exe` — NSIS インストーラー（推奨）
- `SCP-Portable-1.1.0-x64.exe` — ポータブル単体 EXE
- `SCP-1.1.0-x64.zip` — ZIP アーカイブ

## ライセンス

**GNU General Public License v3.0** — 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## 概要について

詳しくは [ptstudio.top](https://ptstudio.top) をご覧ください。

Copyright (c) 2026 Prism Technology Studio

# SCP – Scientific Calculator Plus

[![Languages](https://img.shields.io/badge/UI%20Sprachen-7-informational)](#)
&nbsp;🇨🇳&nbsp;🇭🇰&nbsp;🇺🇸&nbsp;🇯🇵&nbsp;🇷🇺&nbsp;🇫🇷&nbsp;🇩🇪

**Dokumentationssprache:**
[🇨🇳 简体中文](./README.zh.md) | [🇭🇰 繁體中文](./README.zh-TW.md) | [🇺🇸 English](./README.md) | [🇯🇵 日本語](./README.ja.md) | [🇷🇺 Русский](./README.ru.md) | [🇫🇷 Français](./README.fr.md) | **🇩🇪 Deutsch**

> Sprachwechsel im Programm: obere Leiste → Dropdown **Language** (7 Sprachen)

Professioneller wissenschaftlicher Taschenrechner für den Desktop mit Soft-Tastatur im Casio-Stil, Glassmorphism-UI, mehreren Themes und erweiterten mathematischen Fähigkeiten.

Entwickelt von **Prism Technology Studio** (c) 2026

## Funktionen

### Kern-Taschenrechner
- Soft-Tastatur im Casio-Stil (keine Hardware-Tastatur nötig – beseitigt Kodierungs-Zweideutigkeiten)
- Standard-Arithmetik mit vollständiger Ausdrucksauswertung
- Winkelmodi: Grad / Bogenmaß / Gon
- Notationen: Normal / Fest / Wissenschaftlich / Ingenieur
- Berechnungsverlauf mit Abruf
- Einheitenumrechnungs-Panel

### Funktionsplotter
- Mehrere Funktionen gleichzeitig zeichnen
- 16-Farben-Palette zur Kurvenunterscheidung
- Verschieben (Maus/Touch) und Zoomen (Mausrad)
- Koordinatenraster mit adaptiver Skalierung
- Vollbildmodus: „Menü“-Schaltfläche oben links blendet die Funktionsleiste von oben ein

### Erweiterte Mathematik
- **Gleichungen**: quadratische, kubische, lineare Systeme, nichtlineare Gleichungen
- **Matrizen**: Addition, Subtraktion, Multiplikation, Transponierung, Determinante, Inverse, Rang
- **Vektoren**: Addition, Subtraktion, Skalar- und Kreuzprodukt, Betrag, Normalisierung, Winkel, Projektion
- **Statistik**: Mittelwert, Median, Varianz, Standardabweichung, Quartile, Korrelation, lineare Regression
- **Analysis**: numerische Differentiation und bestimmtes Integral

### Python-Integration
- **Mathe-Skript-Modus**: leichtgewichtiger eingebauter Interpreter (Variablen, Funktionen, for-range-Schleifen, if-else)
- **System-Python**: lokaler Python-Aufruf via Electron IPC (falls installiert)
- **Pyodide-Modus**: Python im Browser via WebAssembly (ohne Installation)

### Oberfläche (UI / UX)
- Glassmorphism-Design (Mattglas-Effekt mit backdrop blur)
- Drei Themes: System / Dunkel / Hell (CSS-Variablen-gesteuert)
- Animierter Aurora-Hintergrund und pulsierendes Logo
- Hover-Hinweise: Maus über eine Taste zeigt deren Funktionsbeschreibung
- Mehrsprachig (7 Sprachen), Language-Dropdown in der oberen Leiste
- Responsives Layout: auf Desktop im Querformat (Tastatur links, Display rechts)

### Desktop & Mobil
- **Windows**: NSIS-Installer, portable EXE, ZIP-Archiv
- **Android**: Capacitor-Integration (APK-Build fertig)

## Technologie-Stack

| Ebene | Technologie |
|-------|-------------|
| Framework | Vue 3 + TypeScript |
| Build-Tool | Vite |
| Styles | Tailwind CSS + CSS-Variablen |
| Desktop | Electron 28 |
| Mobil | Capacitor 5 (Android) |
| Verpackung | electron-builder (NSIS / Portable / ZIP) |

## Projektstruktur

```
src/
  components/       # Vue UI-Komponenten
    CalcScreen.vue       # Taschenrechner-Display
    CalcKeyboard.vue     # Layout der Soft-Tastatur
    CalcKey.vue           # Einzelne Taste
    GraphPanel.vue        # Funktionsplotter
    AdvancedPanel.vue     # Gleichungen/Matrizen/Vektoren/Statistik/Analysis
    PythonPanel.vue       # Python / Skript-Editor
    SettingsPanel.vue     # Einheitenumrechnung & Einstellungen
    HistoryPanel.vue      # Berechnungsverlauf
  composables/     # Vue Composition-Funktionen
    useCalculator.ts      # Zustand der Rechen-Engine
    useInputRouter.ts     # Eingabe-Routing der Soft-Tastatur
    useHoverHint.ts       # Gemeinsamer Zustand für Hover-Hinweise
    useTheme.ts           # Theme-Verwaltung
  engine/          # Mathematik-Kernengine
    calculator.ts         # Parser und Auswerter von Ausdrücken
    advanced.ts           # Erweiterte mathematische Operationen
    script.ts             # Interpreter für Mathe-Skripte
  i18n/            # Internationalisierung
    messages.ts           # Übersetzungen: zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
    index.ts              # Übersetzungs-Composable + Sprach-Registry
  constants/       # Definitionen der Tastenlayouts
  types/            # TypeScript-Typdefinitionen
electron/
  main.js           # Electron-Hauptprozess
  preload.js        # Preload-Bridge API
scripts/
  gen-icons.js      # Icon-Erzeugung (PNG / ICO)
```

## Schnellstart

### Voraussetzungen

- Node.js >= 18
- npm oder yarn

### Installation

```bash
npm install
```

### Entwicklung

```bash
# Web-Entwicklungsserver
npm run dev

# Electron-Desktop-Entwicklung
npm run electron:dev
```

### Build

```bash
# Windows Installer + Portabel + ZIP
npm run electron:build:win

# Icons generieren
npm run icons

# Android APK (benötigt Android SDK)
npm run android:apk
```

Build-Artefakte werden in `release-final/` abgelegt.

## Download

Vorkompilierte Binärdateien sind auf der Seite [Releases](../../releases) verfügbar:
- `SCP-Setup-1.1.0-x64.exe` — NSIS-Installer (empfohlen)
- `SCP-Portable-1.1.0-x64.exe` — portable Standalone-EXE
- `SCP-1.1.0-x64.zip` — ZIP-Archiv

## Lizenz

**GNU General Public License v3.0** — vollständiger Text in Datei [LICENSE](LICENSE).

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Über

Weitere Informationen auf [ptstudio.top](https://ptstudio.top).

Copyright (c) 2026 Prism Technology Studio

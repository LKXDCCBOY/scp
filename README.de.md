# SCP – Scientific Calculator Plus

![Version](https://img.shields.io/badge/Version-1.2.1-blue)
[![Languages](https://img.shields.io/badge/UI%20Languages-7-informational)](#)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Android-green)

**Dokumentation:**
[简体中文](./README.zh.md) | [繁體中文](./README.zh-TW.md) | [English](./README.md) | [日本語](./README.ja.md) | [Русский](./README.ru.md) | [Francais](./README.fr.md) | **Deutsch**

> **Sprachumschaltung in der UI:** Obere Leiste der App -> Dropdown **Sprache** (7 Sprachen verfügbar)

Eine professionelle **wissenschaftliche Taschenrechner**-App für Desktop und Mobilgeräte mit einer **Soft-Tastatur im Casio-Stil**, Glassmorphism-UI, Multi-Theme-Unterstützung, Funktionsgraphen mit Zeichen- und Geometriewerkzeugen sowie erweiterten mathematischen Fähigkeiten – entwickelt für Ingenieure, Studenten und Wissenschaftler.

Entwickelt von **Prism Technology Studio** (c) 2026

---

## Funktionen

### Kern-Taschenrechner (Casio-Stil)
- **Soft-Tastatur im Casio-Stil** – Eingabe ausschließlich über Bildschirmtasten, beseitigt Kodierungszweideutigkeiten
- Vollständige Ausdrucksauswertung mit Operator-Präzedenz und Klammern
- **SHIFT**/**ALPHA**-Modifikatorsystem für Sekundärfunktionen
- **Speicher**: M+ / M- / STO / RCL (Variablen A-F, X, Y, M)
- **Winkeleinheiten**: Grad / Bogenmaß / Gon (DRG-Umschaltung)
- **5 Ausgabeformate**: Normal / Wissenschaftlich / Technisch / Bruch / Linear (Umschaltung über NORM/SCI/ENG)
- Trigonometrie: sin / cos / tan + Umkehrfunktionen; Hyperbelfunktionen: sinh / cosh / tanh + Umkehrfunktionen
- Potenzen und Wurzeln: `x^2`, `x^3`, `^`, `sqrt`, `cbrt`, `1/x`, `|x|`
- Logarithmen: `log` (Basis 10) / `ln` (natürlich) + Umkehrung `10^x` / `e^x`
- Konstanten: pi, e (Eulersche Zahl)
- Kombinatorik: Fakultät `x!`, Zufallszahlen
- **Berechnungsverlauf** mit Abruf + Suche + Wiederverwendung per Klick
- **Einheitenumrechnungs**-Panel

### Variablen-Tastatur (Unbekannte)
- Dedizierter **VAR**-Button auf der Haupttastatur öffnet ein Popup-Ziffernfeld für Variablen
- **Kleinbuchstaben**: a-z + pi (28 Tasten)
- **Großbuchstaben**: A-Z + theta + lambda (28 Tasten)
- **Griechische Buchstaben**: alpha, beta, gamma, delta, epsilon, mu, sigma, omega, phi, psi, eta, rho, tau, unendlich (14 Tasten)
- Unterstützt alle Ein-Buchstaben-Variablen (A-Z, a-z) in der Taschenrechner-Engine
- Globales Parameter-Bindungs-Panel für Graphen (a, b, c, m, n, k, d, z)

### Funktionsgraphen + Zeichnen + Geometriekonstruktion

**Multi-Funktionsplotter**
- **16** Funktionen gleichzeitig zeichnen (16-Farben-Palette – keine Farbwiederholung bei vielen Funktionen)
- Verschieben (Ziehen) und Zoomen (Mausrad) in Echtzeit
- Adaptives Koordinatengitter mit automatischer Beschriftung
- Vollbildmodus mit einklappbarer Funktions-Steuerleiste (Button **Menü** oben links, Schließen über Menü-Umschalter / X-Button / Klick auf den Hintergrund)
- **Parametrische Gleichungen**: x(t) und y(t) mit einstellbarem t-Bereich
- **Hervorhebung ausgewählter Funktionen**: gewählte Funktionszeile zeigt Abzeichen + Rahmenhervorhebung; Kurve auf der Leinwand mit Doppelstrich (äußerer Glow + innerer fetter Strich)

**Freihandzeichnen (Skizzenmodus)**
- Frei auf der Graph-Leinwand zeichnen oder schreiben
- 8-Farben-Palette (Blau / Rosé / Smaragd / Bernstein / Violett / Cyan / Pink / Weiß)
- Einstellbare Strichbreite (1-8 px)
- Striche werden in **mathematischen Koordinaten** gespeichert – sie verschieben und zoomen sich mit dem Gitter mit
- Löschen mit einem Klick

**Geometriekonstruktionswerkzeuge**

| Werkzeug | Beschreibung |
|----------|--------------|
| **Punkt** | Klicken Sie irgendwohin, um einen beschrifteten Punkt zu platzieren (P1, P2...) |
| **Linie** | Zwei Klicks – zeichnet eine unendliche Linie (verlängert bis zu den Bildschirmrändern) |
| **Strecke** | Zwei Klicks – zeichnet eine endliche Strecke (mit Endpunkt-Markierungen) |
| **Parallel** | 1. In der Nähe einer Linie/Strecke klicken 2. Auf einen Punkt klicken – Parallele durch diesen Punkt |
| **Senkrecht** | 1. In der Nähe einer Linie/Strecke klicken 2. Auf einen Punkt klicken – Senkrechte durch diesen Punkt |
| **Schnittpunkt** | 1. In der Nähe von Funktion A klicken 2. In der Nähe von Funktion B klicken – findet den Schnittpunkt per 500-Punkte-Scan + 50x-Bisektion (Genauigkeit ~1e-15), zeigt Punkt + Koordinaten |

Ausgewählte Referenzlinien (parallel/senkrecht) werden mit hellerer Farbe, fettem Strich und Glow-Effekt hervorgehoben.

### Erweiterte Mathematik (5 spezielle Tabs)

| Tab | Fähigkeiten |
|-----|-------------|
| **Gleichungen (EQN)** | Quadratischer Löser (ax^2+bx+c=0, inkl. komplexer Wurzeln); Kubischer Löser (Cardano-Formel); Nullstellensuche für beliebige eindimensionale Funktionen (Bisektion + Newton); Lineares System nxn (Gauß-Elimination mit partieller Pivotierung) |
| **Matrizen (MAT)** | Matrix A/B/C + Arithmetik – Addieren, Subtrahieren, Multiplizieren, Transponieren, Determinante, Inverse, Rang, Stufenform |
| **Vektoren (VEC)** | Vektor a/b – Addieren, Subtrahieren, Skalarprodukt, Kreuzprodukt, Norm, Normalisierung, Winkel zwischen beiden, Skalar-/Vektorprojektion |
| **Statistik (STAT)** | Eingabe von X + optional Y-Daten -> Mittelwert, Median, Modus, Min/Max, Q1/Q3, Varianz, Standardabweichung, Kovarianz, Pearson-Korrelationskoeffizient (r), Lineare Regression y = a + bx |
| **Analysis (MOD)** | Numerische Differentiation (1. und 2. Ordnung, zentrale Differenz 4. Ordnung); Adaptive numerische Integration (Simpson 1/3) |

### Python- und Mathe-Skript-Integration

Drei Ausführungsmodi in einem Panel:

| Modus | Beschreibung |
|-------|--------------|
| **Mathe-Skript** | Leichtgewichtiger Interpreter ohne Ladezeit, sofort ausführbar. Unterstützt: Variablenzuweisung, `print()`, `for x in range(a,b,c)`, `if`/`elif`/`else`, `def`-Funktionsdefinitionen, alle wissenschaftlichen Funktionen (sin, cos, tan, log, ln, sqrt, abs, floor...) |
| **Natives Python** | Ruft den lokal installierten Python-Interpreter über Electron IPC auf. Unterstützt Standardbibliothek + Pakete von Drittanbietern. Erfordert Python 3 im PATH. |
| **Pyodide** | Python im Browser als WebAssembly – keine Installation nötig. Läuft in einer Sandbox mit Standardbibliothek und numpy. |

**Sicherheitsvorkehrungen** (alle drei Modi):
- Vorab-Scan: lehnt `**100000`-artige Riesenexponenten, `range(100000000)`, `[x]*100000000`, `"x"*100000000` ab
- Pyodide-**15-Sekunden-Timeout** (Promise.race)
- Pyodide stdout/stderr-**200-KB-Ausgabekürzung**
- Mathe-Skript: **Obergrenze von 500.000 Anweisungen** + **Obergrenze von 10.000 Ausgabezeilen** (Schutz vor Endlosschleifen)
- Taschenrechner-Engine: Vorabprüfung auf Exponentenüberlauf (`|b| > 300 && |a| > 1`)
- Natives Python: **5-MB-Puffer-Obergrenze für stdout/stderr** + Prozess-Timeout

### UI / UX

- **Glassmorphism-Design (Milchglas)** mit mehrschichtigem `backdrop-blur` + Aurora-Verlaufshintergrund
- **Drei Theme-Modi** (CSS-Variablen-gesteuert, dynamisch umschaltbar):
  - **System folgen** – folgt dem Betriebssystem-Theme
  - **Dunkel** – tiefes Weltall, vollständig getestet
  - **Hell** – sauberes Weiß, vollständig getestet (kein unsichtbarer Text)
- Animierter Aurora-Hintergrund und pulsierendes Logo (nur SVG-Icons – keine Emojis)
- **Hover-Hinweise** – Maus über einer Taste zeigt deren detaillierte Funktionsbeschreibung im Panel unten links
- **7-sprachige UI** mit Sprach-Dropdown in der oberen Leiste (Globus-SVG-Icon):
  - Vereinfachtes Chinesisch (zhongwen)
  - Traditionelles Chinesisch (fantizi)
  - Englisch
  - Japanisch (nihongo)
  - Russisch (russkiy)
  - Französisch (francais)
  - Deutsch (deutsch)
- **Responsives Layout**: Querformat (Tasten links, Bildschirm rechts) auf dem Desktop; Hochformat (Bildschirm oben, Tastatur unten) auf Mobilgeräten mit dynamischer Skalierung für 380-Px-extraschmale und 520-Px-extrakurze Bildschirme

### Desktop und Mobil

- **Windows**: NSIS-Installer + Portable EXE + ZIP-Archiv
- **Android**: Capacitor-6-Integration, APK-Build bereit (Debug + Release)

---

## Technologie-Stack

| Ebene | Technologie |
|-------|-------------|
| Frontend-Framework | **Vue 3** + **TypeScript** |
| Build-Tool | **Vite** |
| Styling | **Tailwind CSS** + **CSS-Variablen** (Theming) |
| Desktop-Laufzeit | **Electron 28** |
| Mobile Laufzeit | **Capacitor 6** (Android, compileSdk 34, minSdk 22) |
| Verpackung | `electron-builder` – NSIS / Portable / ZIP |
| Android-Build | Gradle 8.7 + AGP 8.5.2, Tencent-Gradle-Spiegel + Aliyun-Maven-Spiegel |
| Icon-Erzeugung | Eigenes Node-Skript -> PNG (256/512) + Windows-ICO (6 Größen) |

---

## Projektstruktur

```
scp/
|-- src/
|   |-- components/          # Vue-UI-Komponenten
|   |   |-- CalcScreen.vue          # Taschenrechner-Anzeige
|   |   |-- CalcKeyboard.vue        # Soft-Tastatur-Layout + VAR-Popup
|   |   |-- CalcKey.vue             # Einzelne Taste mit Hover-Hinweis
|   |   |-- GraphPanel.vue          # Funktionsplotter + Zeichnen + Geometrie
|   |   |-- AdvancedPanel.vue       # Eqn / Matrix / Vektor / Statistik / Calc
|   |   |-- PythonPanel.vue         # Mathe-Skript / Natives Python / Pyodide
|   |   |-- SettingsPanel.vue       # Einheitenumrechnung und Einstellungen
|   |   `-- HistoryPanel.vue        # Berechnungsverlauf
|   |-- composables/          # Vue-Composition-Funktionen
|   |   |-- useCalculator.ts        # Zustand der Taschenrechner-Engine
|   |   |-- useInputRouter.ts       # Soft-Tastatur -> Routing der aktiven Eingabe
|   |   |-- useHoverHint.ts         # Gemeinsamer Zustand für Hover-Hinweise
|   |   `-- useTheme.ts             # Verwaltung der Themes Dunkel / Hell / System
|   |-- engine/               # Kern-Mathe-Engines
|   |   |-- calculator.ts           # Ausdrucks-Lexer + Parser + Evaluator
|   |   |-- advanced.ts             # Löser für Matrizen, Vektoren, Statistik, Calc, Gleichungen
|   |   `-- script.ts               # Mathe-Skript-Interpreter (Variablen + Schleifen + Funktionen)
|   |-- i18n/                 # Internationalisierung (7 Sprachen)
|   |   |-- messages.ts             # zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
|   |   `-- index.ts                # t()-Übersetzung + Sprach-Registry
|   |-- constants/            # Definitionen der Tastenlayouts
|   |-- types/                # TypeScript-Typdefinitionen
|   |-- App.vue               # Root-Komponente + Sprachmenü
|   `-- style.css             # Globale Styles + CSS-Variablen (Themes)
|-- electron/
|   |-- main.js               # Electron-Hauptprozess (Fenster, IPC Python)
|   `-- preload.js            # Preload-Bridge (calcNative-API)
|-- android/                   # Capacitor-6-Android-Projekt
|-- scripts/
|   |-- gen-icons.js          # PNG- + ICO-Icon-Generator
|   |-- android-envcheck.bat  # Prüfer der Android-Build-Umgebung
|   `-- android-build.bat     # Ein-Klick-APK-Build-Skript
|-- build-apk.bat             # APK-Build-Verknüpfung auf Root-Ebene
|-- build/
|   `-- icon.ico              # Windows-Icon (16/32/48/64/128/256)
`-- package.json              # v1.2.1 – GPL-3.0 – electron-builder-Konfiguration
```

---

## Erste Schritte

### Voraussetzungen
- **Node.js >= 18** (empfohlen: 20 LTS)
- **npm**

### Abhängigkeiten installieren
```bash
npm install
```

### Entwicklung
```bash
# Web-Entwicklungsserver (http://localhost:5173)
npm run dev

# Electron-Desktop-Entwicklungsmodus (App-Fenster)
npm run electron:dev
```

### Desktop-Build (Windows-EXE)
```bash
# Frontend-Assets bauen (dist/)
npm run build

# Windows: NSIS-Installer + Portable EXE + ZIP
npm run electron:build:win
```

Build-Artefakte werden in `release-scp-v1.2.1b/` abgelegt.

### Android-Build (APK)

**Ein-Klick-Build (empfohlen):**
```bash
# Debug-APK (Doppelklick oder Kommandozeile)
build-apk.bat debug

# Release-APK
build-apk.bat release
```

**Zuerst die Umgebung prüfen:**
```bash
scripts\android-envcheck.bat
```

Das Build-Skript erkennt JDK automatisch (Priorität: Android Studio JBR 21 -> JAVA_HOME -> Adoptium/Microsoft-JDK -> PATH) und Android SDK (ANDROID_HOME -> ANDROID_SDK_ROOT -> %LOCALAPPDATA%\Android\Sdk). JDK 22 wird abgelehnt (nicht kompatibel mit Gradle 8.7).

Build-Artefakte werden in `release-android/` abgelegt.

---

## Download v1.2.1

Vorkompilierte Binärdateien sind auf der Seite [**GitHub Releases**](../../releases) verfügbar:

| Datei | Beschreibung |
|-------|--------------|
| `SCP-Setup-1.2.1-x64.exe`   | NSIS-Installer **(empfohlen)** – Installationsordner wählen, Verknüpfungen erstellen |
| `SCP-Portable-1.2.1-x64.exe`| Portable Standalone-Version – keine Installation, Doppelklick zum Ausführen |
| `SCP-1.2.1-x64.zip`         | ZIP-Archiv – entpacken und `SCP.exe` ausführen |
| `SCP-1.2.1-debug.apk`       | Android-Debug-APK – direkt auf Android 5.1+ installieren |

---

## Lizenz

**GNU General Public License v3.0** – den vollständigen Wortlaut finden Sie in der Datei [LICENSE](LICENSE).

Copyright (c) 2026 **Prism Technology Studio**

---

## Über uns

Besuchen Sie [**ptstudio.top**](https://ptstudio.top) für weitere Informationen über unsere Produkte.

Copyright (c) 2026 Prism Technology Studio – Alle Rechte vorbehalten

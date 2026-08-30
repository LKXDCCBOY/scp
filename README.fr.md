# SCP - Scientific Calculator Plus

![Version](https://img.shields.io/badge/Version-1.2.1-blue)
[![Languages](https://img.shields.io/badge/Langues%20UI-7-informational)](#)
[![License: GPL v3](https://img.shields.io/badge/Licence-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Platform](https://img.shields.io/badge/Plateforme-Windows%20%7C%20Android-green)

**Documentation :**
[简体中文](./README.zh.md) | [繁體中文](./README.zh-TW.md) | [English](./README.md) | [日本語](./README.ja.md) | [Русский](./README.ru.md) | **Français** | [Deutsch](./README.de.md)

> **Changement de langue de l'interface :** barre supérieure de l'application -> menu déroulant **Langue** (7 langues disponibles)

Une application de **calculatrice scientifique** professionnelle pour ordinateur de bureau et mobile, dotée d'un clavier logiciel **façon Casio**, d'une interface en verre dépoli (glassmorphism), de la prise en charge de plusieurs thèmes, du tracé de fonctions avec outils de dessin et de géométrie, ainsi que de capacités mathématiques avancées -- conçue pour les ingénieurs, les étudiants et les scientifiques.

Développé par **Prism Technology Studio** (c) 2026

---

## Fonctionnalités

### Calculatrice principale (style Casio)
- **Clavier logiciel façon Casio** -- saisie exclusivement via les touches à l'écran, élimine toute ambiguïté d'encodage des caractères
- Évaluation complète des expressions avec priorité des opérateurs et parenthèses
- Système de modificateurs **SHIFT** / **ALPHA** pour les fonctions secondaires
- **Mémoire** : M+ / M- / STO / RCL (variables A-F, X, Y, M)
- **Modes d'angle** : Degrés / Radians / Grades (cycle DRG)
- **5 modes de sortie** : Normal / Scientifique / Ingénieur / Fraction / Linéaire (cycle via NORM/SCI/ENG)
- Trigonométrie : sin / cos / tan + inverses ; hyperboliques : sinh / cosh / tanh + inverses
- Puissances et racines : `x^2`, `x^3`, `^`, `sqrt`, `cbrt`, `1/x`, `|x|`
- Logarithmes : `log` (base 10) / `ln` (naturel) + inverses `10^x` / `e^x`
- Constantes : pi, e (nombre d'Euler)
- Combinatoire : factorielle `x!`, nombres aléatoires
- **Historique des calculs** avec rappel + recherche + réutilisation en un clic
- **Panneau de conversion d'unités**

### Clavier de variables (inconnues)
- Bouton dédié **VAR** sur le clavier principal : ouvre un clavier de variables contextuel
- **Lettres minuscules** : a-z + pi (28 touches)
- **Lettres majuscules** : A-Z + thêta + lambda (28 touches)
- **Lettres grecques** : alpha, bêta, gamma, delta, epsilon, mu, sigma, oméga, phi, psi, êta, rho, tau, infini (14 touches)
- Prend en charge toutes les variables à une lettre (A-Z, a-z) dans le moteur de calcul
- Panneau de liaison de paramètres globaux pour le tracé (a, b, c, m, n, k, d, z)

### Tracé de fonctions + dessin + construction géométrique

**Traceur multifonctions**
- Trace **16** fonctions simultanément (palette de 16 couleurs -- aucune répétition de couleur pour de nombreuses fonctions)
- Déplacement panoramique en temps réel (glisser-déposer) et zoom (molette de la souris)
- Grille de coordonnées adaptative avec étiquetage automatique
- Mode plein écran avec barre de contrôle des fonctions repliable (bouton **Menu** en haut à gauche, fermeture via la bascule du menu / le bouton X / un clic en arrière-plan)
- **Équations paramétriques** : x(t) et y(t) avec plage de t réglable
- **Mise en évidence de la fonction sélectionnée** : la ligne de la fonction choisie affiche un badge + un contour surligné ; la courbe du canevas utilise un double trait (lueur externe + gras interne)

**Dessin à main levée (mode esquisse)**
- Dessiner ou écrire librement sur le canevas du graphique
- Palette de 8 couleurs (Bleu / Rose / Émeraude / Ambre / Violet / Cyan / Rose clair / Blanc)
- Épaisseur de trait réglable (1-8 px)
- Les traits sont stockés en **coordonnées mathématiques** -- ils effectuent un panoramique et un zoom avec la grille
- Effacement en un clic

**Outils de construction géométrique**

| Outil | Description |
|-------|-------------|
| **Point** | Cliquez n'importe où pour placer un point étiqueté (P1, P2...) |
| **Ligne** | Deux clics -- trace une ligne infinie (s'étend jusqu'aux bords de l'écran) |
| **Segment** | Deux clics -- trace un segment fini (avec marqueurs d'extrémité) |
| **Parallèle** | 1. Cliquez près d'une ligne/d'un segment 2. Cliquez sur un point -- ligne parallèle passant par ce point |
| **Perpendiculaire** | 1. Cliquez près d'une ligne/d'un segment 2. Cliquez sur un point -- ligne perpendiculaire passant par ce point |
| **Intersection** | 1. Cliquez près de la fonction A 2. Cliquez près de la fonction B -- calcule l'intersection via un balayage de 500 points + bisection 50x (précision ~1e-15), affiche le point + les coordonnées |

Les lignes de référence sélectionnées (parallèles/perpendiculaires) sont mises en évidence avec une couleur plus vive, un trait gras et un effet de lueur.

### Mathématiques avancées (5 onglets dédiés)

| Onglet | Fonctionnalités |
|--------|-----------------|
| **Équations (EQN)** | Résolution du second degré (ax^2+bx+c=0, racines complexes incluses) ; résolution du troisième degré (formule de Cardan) ; recherche de racines univariées quelconques (bisection + Newton) ; systèmes linéaires nxn (élimination de Gauss avec pivot partiel) |
| **Matrices (MAT)** | Matrices A/B/C + arithmétique -- addition, soustraction, multiplication, transposition, déterminant, inverse, rang, forme échelonnée |
| **Vecteurs (VEC)** | Vecteurs a/b -- addition, soustraction, produit scalaire, produit vectoriel, norme, normalisation, angle entre deux vecteurs, projection scalaire/vectorielle |
| **Statistiques (STAT)** | Saisie de X + données Y optionnelles -> moyenne, médiane, mode, min/max, Q1/Q3, variance, écart type, covariance, coefficient de corrélation de Pearson (r), régression linéaire y = a + bx |
| **Analyse (MOD)** | Dérivation numérique (1er et 2e ordre, différence centrale du 4e ordre) ; intégration numérique adaptative (Simpson 1/3) |

### Intégration Python et script mathématique

Trois modes d'exécution dans un seul panneau :

| Mode | Description |
|------|-------------|
| **Script mathématique** | Interpréteur léger sans chargement, à exécution instantanée. Prend en charge : affectation de variables, `print()`, `for x in range(a,b,c)`, `if`/`elif`/`else`, définitions de fonctions `def`, toutes les fonctions scientifiques (sin, cos, tan, log, ln, sqrt, abs, floor...) |
| **Python natif** | Appelle l'interpréteur Python installé localement via IPC Electron. Prend en charge la bibliothèque standard + les paquets tiers. Nécessite Python 3 dans le PATH. |
| **Pyodide** | Python WebAssembly dans le navigateur -- aucune installation requise. S'exécute dans un bac à sable avec la bibliothèque standard et numpy. |

**Garde-fous de sécurité** (les trois modes) :
- Pré-analyse : rejette les exposants géants de type `**100000`, `range(100000000)`, `[x]*100000000`, `"x"*100000000`
- Délai d'attente de **15 secondes** pour Pyodide (Promise.race)
- **Troncature de la sortie à 200 Ko** pour stdout/stderr de Pyodide
- Script mathématique : **limite de 500 000 instructions** + **limite de 10 000 lignes de sortie** (anti-boucle infinie)
- Moteur de calcul : pré-vérification du dépassement d'exposant (`|b| > 300 && |a| > 1`)
- Python natif : **limite du tampon stdout/stderr à 5 Mo** + délai d'attente du processus

### Interface (UI / UX)

- **Design en verre dépoli (glassmorphism)** avec `backdrop-blur` multicouche + fond en dégradé aurore
- **Trois modes de thème** (pilotés par variables CSS, commutables dynamiquement) :
  - **Suivre le système** -- suit le thème du système d'exploitation
  - **Sombre** -- espace profond, entièrement testé
  - **Clair** -- blanc épuré, entièrement testé (aucun texte invisible)
- Fond aurore animé et pulsation du logo (icônes SVG uniquement -- aucun emoji)
- **Infobulles au survol** -- passer la souris sur une touche affiche sa description détaillée dans le panneau en bas à gauche
- **Interface en 7 langues** avec menu déroulant Langue dans la barre supérieure (icône SVG globe) :
  - Chinois simplifié (zhongwen)
  - Chinois traditionnel (fantizi)
  - Anglais
  - Japonais (nihongo)
  - Russe (russkiy)
  - Français (francais)
  - Allemand (deutsch)
- **Mise en page réactive** : paysage (touches à gauche, écran à droite) sur ordinateur de bureau ; portrait (écran en haut, clavier en dessous) sur mobile avec mise à l'échelle dynamique pour les écrans ultra-étroits de 380px et ultra-courts de 520px

### Bureau et mobile

- **Windows** : installateur NSIS + EXE portable + archive ZIP
- **Android** : intégration Capacitor 6, build APK prêt (debug + release)

---

## Pile technique

| Couche | Technologie |
|--------|-------------|
| Framework frontend | **Vue 3** + **TypeScript** |
| Outil de build | **Vite** |
| Styles | **Tailwind CSS** + **variables CSS** (thèmes) |
| Environnement d'exécution bureau | **Electron 28** |
| Environnement d'exécution mobile | **Capacitor 6** (Android, compileSdk 34, minSdk 22) |
| Empaquetage | `electron-builder` -- NSIS / Portable / ZIP |
| Build Android | Gradle 8.7 + AGP 8.5.2, miroir Gradle Tencent + miroir Maven Aliyun |
| Génération d'icônes | Script Node personnalisé -> PNG (256/512) + ICO Windows (6 tailles) |

---

## Structure du projet

```
scp/
|-- src/
|   |-- components/          # Vue UI components
|   |   |-- CalcScreen.vue          # Calculator display screen
|   |   |-- CalcKeyboard.vue        # Soft keyboard layout + VAR popup
|   |   |-- CalcKey.vue             # Individual key with hover hint
|   |   |-- GraphPanel.vue          # Function plotter + drawing + geometry
|   |   |-- AdvancedPanel.vue       # Eqn / Matrix / Vector / Stats / Calc
|   |   |-- PythonPanel.vue         # Math Script / Native Python / Pyodide
|   |   |-- SettingsPanel.vue       # Unit conversion and settings
|   |   `-- HistoryPanel.vue        # Calculation history
|   |-- composables/          # Vue composition functions
|   |   |-- useCalculator.ts        # Calculator engine state
|   |   |-- useInputRouter.ts       # Soft-keyboard -> active input routing
|   |   |-- useHoverHint.ts         # Hover-hint shared state
|   |   `-- useTheme.ts             # Dark / Light / System theme mgmt
|   |-- engine/               # Core math engines
|   |   |-- calculator.ts           # Expression lexer + parser + evaluator
|   |   |-- advanced.ts             # Matrix, vector, stats, calc, eq solvers
|   |   `-- script.ts               # Math Script interpreter (variables + loops + funcs)
|   |-- i18n/                 # Internationalization (7 languages)
|   |   |-- messages.ts             # zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
|   |   `-- index.ts                # t() translate + language registry
|   |-- constants/            # Key layout definitions
|   |-- types/                # TypeScript type definitions
|   |-- App.vue               # Root component + Language menu
|   `-- style.css             # Global styles + CSS variables (themes)
|-- electron/
|   |-- main.js               # Electron main process (window, IPC Python)
|   `-- preload.js            # Preload bridge (calcNative API)
|-- android/                   # Capacitor 6 Android project
|-- scripts/
|   |-- gen-icons.js          # PNG + ICO icon generator
|   |-- android-envcheck.bat  # Android build environment checker
|   `-- android-build.bat     # One-click APK build script
|-- build-apk.bat             # Root-level APK build shortcut
|-- build/
|   `-- icon.ico              # Windows icon (16/32/48/64/128/256)
`-- package.json              # v1.2.1 - GPL-3.0 - electron-builder config
```

---

## Pour commencer

### Prérequis
- **Node.js >= 18** (recommandé : 20 LTS)
- **npm**

### Installer les dépendances
```bash
npm install
```

### Développement
```bash
# Web dev server (http://localhost:5173)
npm run dev

# Electron desktop dev mode (app window)
npm run electron:dev
```

### Créer le build bureau (EXE Windows)
```bash
# Build frontend assets (dist/)
npm run build

# Windows: NSIS installer + Portable EXE + ZIP
npm run electron:build:win
```

Les artefacts de build sont écrits dans `release-scp-v1.2.1b/`.

### Créer le build Android (APK)

**Build en un clic (recommandé) :**
```bash
# Debug APK (double-click or command line)
build-apk.bat debug

# Release APK
build-apk.bat release
```

**Vérifier l'environnement d'abord :**
```bash
scripts\android-envcheck.bat
```

Le script de build détecte automatiquement le JDK (priorité : Android Studio JBR 21 -> JAVA_HOME -> Adoptium/Microsoft JDK -> PATH) et le SDK Android (ANDROID_HOME -> ANDROID_SDK_ROOT -> %LOCALAPPDATA%\Android\Sdk). Il rejette le JDK 22 (incompatible avec Gradle 8.7).

Les artefacts de build sont écrits dans `release-android/`.

---

## Télécharger v1.2.1

Les binaires précompilés sont disponibles sur la page [**GitHub Releases**](../../releases) :

| Fichier | Description |
|---------|-------------|
| `SCP-Setup-1.2.1-x64.exe`   | Installateur NSIS **(recommandé)** -- choisir le dossier d'installation, créer des raccourcis |
| `SCP-Portable-1.2.1-x64.exe`| Portable autonome -- aucune installation, double-clic pour lancer |
| `SCP-1.2.1-x64.zip`         | Archive ZIP -- extraire et exécuter `SCP.exe` |
| `SCP-1.2.1-debug.apk`       | APK Android de débogage -- à installer directement sur Android 5.1+ |

---

## Licence

**GNU General Public License v3.0** -- voir le fichier [LICENSE](LICENSE) pour les conditions complètes.

Copyright (c) 2026 **Prism Technology Studio**

---

## À propos

Visitez [**ptstudio.top**](https://ptstudio.top) pour plus d'informations sur nos produits.

Copyright (c) 2026 Prism Technology Studio - Tous droits réservés

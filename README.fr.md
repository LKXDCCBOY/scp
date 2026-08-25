# SCP — Scientific Calculator Plus

[![Languages](https://img.shields.io/badge/Langues%20UI-7-informational)](#)
&nbsp;🇨🇳&nbsp;🇭🇰&nbsp;🇺🇸&nbsp;🇯🇵&nbsp;🇷🇺&nbsp;🇫🇷&nbsp;🇩🇪

**Langue de la documentation :**
[🇨🇳 简体中文](./README.zh.md) | [🇭🇰 繁體中文](./README.zh-TW.md) | [🇺🇸 English](./README.md) | [🇯🇵 日本語](./README.ja.md) | [🇷🇺 Русский](./README.ru.md) | **🇫🇷 Français** | [🇩🇪 Deutsch](./README.de.md)

> Sélecteur de langue dans l'appli : barre supérieure → menu déroulant **Language** (7 langues)

Calculatrice scientifique professionnelle pour bureau, avec un clavier logiciel façon Casio, une interface en verre dépoli (glassmorphism), plusieurs thèmes et des fonctions mathématiques avancées.

Développé par **Prism Technology Studio** (c) 2026

## Fonctionnalités

### Calculatrice principale
- Clavier logiciel façon Casio (pas besoin de clavier physique — élimine les ambiguïtés d'encodage)
- Arithmétique standard avec évaluation complète d'expressions
- Modes d'angle : Degrés / Radians / Grades
- Notations : Normale / Fixe / Scientifique / Ingénieur
- Historique des calculs avec rappel
- Panneau de conversion d'unités

### Tracé de courbes
- Tracé simultané de plusieurs fonctions
- Palette de 16 couleurs pour distinguer les courbes
- Pan/zoom à la souris ou au tactile
- Grille de coordonnées à échelle adaptative
- Mode plein écran : bouton « Menu » en haut à gauche dévoile la barre de contrôle par le haut

### Mathématiques avancées
- **Équations** : du second degré, du troisième degré, systèmes linéaires, équations non linéaires
- **Matrices** : addition, soustraction, multiplication, transposition, déterminant, inverse, rang
- **Vecteurs** : addition, soustraction, produit scalaire et vectoriel, norme, normalisation, angle, projection
- **Statistiques** : moyenne, médiane, variance, écart type, quartiles, corrélation, régression linéaire
- **Analyse** : dérivation numérique et intégrale définie

### Intégration Python
- **Mode script mathématique** : interpréteur intégré léger (variables, fonctions, boucles for-range, if-else)
- **Python système** : appel du Python local via IPC Electron (si installé)
- **Mode Pyodide** : Python WebAssembly dans le navigateur (aucune installation requise)

### Interface (UI / UX)
- Design « glassmorphism » (verre dépoli, effet backdrop blur)
- 3 thèmes : Système / Sombre / Clair (pilotés par variables CSS)
- Fond animé façon aurore boréale et pulsation du logo
- Infos au survol : passez la souris sur une touche pour voir sa description
- Multilingue (7 langues), bouton Language dans la barre supérieure
- Mise en page responsive : sur bureau, orientation paysage (clavier à gauche, écran à droite)

### Bureau & mobile
- **Windows** : installateur NSIS, EXE portable, archive ZIP
- **Android** : intégration Capacitor (prêt pour la construction APK)

## Pile technique

| Couche | Technologie |
|--------|-------------|
| Framework | Vue 3 + TypeScript |
| Outil de build | Vite |
| Styles | Tailwind CSS + variables CSS |
| Bureau | Electron 28 |
| Mobile | Capacitor 5 (Android) |
| Paquetage | electron-builder (NSIS / Portable / ZIP) |

## Structure du projet

```
src/
  components/       # Composants UI Vue
    CalcScreen.vue       # Écran de la calculatrice
    CalcKeyboard.vue     # Agencement du clavier logiciel
    CalcKey.vue           # Touche individuelle
    GraphPanel.vue        # Traceur de courbes
    AdvancedPanel.vue     # Équations/Matrices/Vecteurs/Stats/Analyse
    PythonPanel.vue       # Console / éditeur Python
    SettingsPanel.vue     # Conversions d'unités & paramètres
    HistoryPanel.vue      # Historique des calculs
  composables/     # Fonctions de composition Vue
    useCalculator.ts      # État du moteur de calcul
    useInputRouter.ts     # Routage des saisies clavier logicielles
    useHoverHint.ts       # État partagé pour les infos au survol
    useTheme.ts           # Gestion des thèmes
  engine/          # Moteur mathématique
    calculator.ts         # Parseur et évaluateur d'expressions
    advanced.ts           # Opérations mathématiques avancées
    script.ts             # Interpréteur de script mathématique
  i18n/            # Internationalisation
    messages.ts           # Traductions zh-CN / zh-TW / en-US / ja-JP / ru-RU / fr-FR / de-DE
    index.ts              # Composable de traduction + registre des langues
  constants/       # Définitions des agencements de touches
  types/            # Définitions de types TypeScript
electron/
  main.js           # Processus principal Electron
  preload.js        # API pont preload
scripts/
  gen-icons.js      # Génération d'icônes (PNG / ICO)
```

## Démarrage rapide

### Prérequis

- Node.js >= 18
- npm ou yarn

### Installation

```bash
npm install
```

### Développement

```bash
# Serveur de développement Web
npm run dev

# Développement bureau Electron
npm run electron:dev
```

### Build

```bash
# Windows : installateur + portable + ZIP
npm run electron:build:win

# Générer les icônes
npm run icons

# APK Android (nécessite Android SDK)
npm run android:apk
```

Les artefacts de build sont écrits dans `release-final/`.

## Téléchargement

Les binaires précompilés sont disponibles sur la page [Releases](../../releases) :
- `SCP-Setup-1.1.0-x64.exe` — Installateur NSIS (recommandé)
- `SCP-Portable-1.1.0-x64.exe` — EXE portable autonome
- `SCP-1.1.0-x64.zip` — Archive ZIP

## Licence

**GNU General Public License v3.0** — voir le fichier [LICENSE](LICENSE) pour le texte complet.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## À propos

Visitez [ptstudio.top](https://ptstudio.top) pour en savoir plus.

Copyright (c) 2026 Prism Technology Studio

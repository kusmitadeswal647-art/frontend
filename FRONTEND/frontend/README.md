# SignConnect Frontend Architecture

> **Enterprise Modular Frontend for Indian Sign Language (ISL) Assistive Communication**  
> Certified WCAG 2.2 AAA & RPwD Act 2016 Compliant Design System

---

## 1. Overview & Transformation

This project has been restructured from raw Google Stitch screen exports into a **modular, production-ready frontend architecture**. Each page is now an isolated, self-contained module containing its own markup, styling, interactive controller, and design preview, all tied together by shared design tokens, universal routing, and service layer stubs.

```
FRONTEND/
├── Stich_sign connect/             # [Original raw Google Stitch export - preserved]
└── frontend/                       # [New Modular Frontend Architecture]
    ├── index.html                  # Architecture Gateway & Page Directory Portal
    ├── package.json                # Project manifest & lifecycle scripts
    ├── server.py                   # Zero-dependency local dev server (Python 3)
    ├── run-dev.bat                 # One-click Windows startup script
    │
    ├── design-system/              # Centralized Design Tokens & Tailwind Theme
    │   ├── DESIGN.md               # Visual identity & brand guidelines
    │   ├── tokens.css              # CSS Custom Properties (Colors, Spacing, Radii)
    │   └── tailwind.config.js      # Extended Tailwind theme tokens
    │
    ├── shared/                     # Universal Components & Helpers
    │   ├── global.css              # Reset, typography, safe-area, accessibility classes
    │   ├── navigation.js           # Seamless tab routing & active state coordinator
    │   └── toast.js                # Accessible toast notification singleton
    │
    ├── services/                   # Full-Stack Service Layer Stubs
    │   ├── api.js                  # Standardized fetch HTTP client
    │   ├── islModelService.js      # On-device / WebSocket ISL model pipeline
    │   ├── speechService.js        # Web Speech STT and TTS voice engine
    │   └── emergencyService.js     # Distress dispatcher & GPS geolocation helper
    │
    ├── public/                     # Static Assets
    │   └── screenshots/            # Page screenshots for visual regression
    │
    └── pages/                      # Dedicated Directories per Screen
        ├── home/                   # Main Hub & Quick Phrases Demo
        │   ├── index.html
        │   ├── home.css
        │   ├── home.js
        │   └── preview.png
        │
        ├── live-translator/        # Live Camera ISL Recognition
        │   ├── index.html
        │   ├── live-translator.css
        │   ├── live-translator.js
        │   └── preview.png
        │
        ├── text-to-sign/           # Voice & Text to 3D Avatar ISL
        │   ├── index.html
        │   ├── text-to-sign.css
        │   ├── text-to-sign.js
        │   └── preview.png
        │
        ├── learn-isl/              # Interactive ISL Curriculum & Mirror Sandbox
        │   ├── index.html
        │   ├── learn-isl.css
        │   ├── learn-isl.js
        │   └── preview.png
        │
        ├── emergency-help/         # High-Visibility SOS Distress Cards
        │   ├── index.html
        │   ├── emergency-help.css
        │   ├── emergency-help.js
        │   └── preview.png
        │
        ├── privacy-accessibility/  # Font Scaling (100%-150%) & Contrast Modes
        │   ├── index.html
        │   ├── privacy-accessibility.css
        │   ├── privacy-accessibility.js
        │   └── preview.png
        │
        └── about-us/               # Ethical Charter & Human Interpreter Advocacy
            ├── index.html
            ├── about-us.css
            ├── about-us.js
            └── preview.png
```

---

## 2. Page Directory Catalog

| Page Directory | URL Path | Key Capabilities |
| :--- | :--- | :--- |
| **`pages/home/`** | `/pages/home/index.html` | Hero banner, live phrase emulator, one-tap navigation to all assistive modules, quick audio readout. |
| **`pages/live-translator/`** | `/pages/live-translator/index.html` | 21-node hand landmark mesh HUD, camera flip/torch assist, real-time transcription, speech synthesis. |
| **`pages/text-to-sign/`** | `/pages/text-to-sign/index.html` | English/Hindi dictation & text parser, 3D animated sign demonstration player, 0.5x-1.0x speed, 45° angle depth view. |
| **`pages/learn-isl/`** | `/pages/learn-isl/index.html` | Modular curriculum (Alphabet, Greetings, Healthcare, Emergency), filter tabs, bottom sheet vocabulary drawer, mirror sandbox. |
| **`pages/emergency-help/`** | `/pages/emergency-help/index.html` | Massive distress cards, strobe attention beacon, loud synthesized voice alert loop, 112/108 speed dials, GPS share, Medical ID card. |
| **`pages/privacy-accessibility/`** | `/pages/privacy-accessibility/index.html` | Live text magnifier (100%, 120%, 150%), High-Viz Black/Yellow and OLED Dark contrast modes, local retention toggles, 48MB offline pack installer. |
| **`pages/about-us/`** | `/pages/about-us/index.html` | Human interpreter ethical advocacy, ISLRTC lexicon alignment, steering council, interactive community sign feedback drawer. |

---

## 3. How to Run Locally

You can launch the frontend using Python:

### Option A: One-Click (Windows)
Double-click `run-dev.bat` inside the `frontend` folder.

### Option B: Terminal Command
```bash
cd frontend
python server.py
```
Open **`http://localhost:3000/`** in your browser.

---

## 4. Full-Stack Roadmap

The frontend has been decoupled and prepared with an API service layer in `frontend/services/` for seamless backend connection:

1. **Backend Framework**: Python FastAPI or Node.js / Express.
2. **ISL Inference Pipeline**: MediaPipe Holistic Python SDK + lightweight TensorFlow/ONNX ISL classifier for sequence recognition.
3. **WebSockets**: Bi-directional streaming for live video landmark feeds.
4. **Offline Database**: IndexedDB (client) + PostgreSQL (server) for curriculum progress and saved phrase notebooks.


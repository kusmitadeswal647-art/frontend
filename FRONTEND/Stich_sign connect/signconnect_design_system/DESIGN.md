---
name: SignConnect Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#444653'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#163b2d'
  on-tertiary: '#ffffff'
  tertiary-container: '#2e5243'
  on-tertiary-container: '#9dc4b1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#c3ecd7'
  tertiary-fixed-dim: '#a8cfbc'
  on-tertiary-fixed: '#002115'
  on-tertiary-fixed-variant: '#294e3f'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  title-md:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an accessible, dignified, and calm visual environment for two-way Indian Sign Language (ISL) communication. The target audience encompasses Deaf, Hard of Hearing, and hearing individuals interacting across personal, educational, healthcare, and administrative contexts. 

The aesthetic is strictly non-gamified, supportive, and institutional without feeling cold. Grounded in a modern institutional style, the design prioritizes absolute predictability, effortless legibility, and high-contrast recognition. Every interaction communicates respect, clarity, and safety, avoiding hyperactive micro-interactions or distracting ornamentation to keep total cognitive focus on camera viewports, live translation captions, and communication tools.

## Colors

The palette balances authoritative slate blues, affirming mint greens, and high-contrast charcoal text over a warm neutral canvas:

- **Primary (`#1E40AF`):** Deep institutional blue providing an accessible foundation for interactive controls, core brand anchors, and prominent active navigation elements. Exceeds WCAG AAA contrast against light backgrounds.
- **Secondary (`#059669`):** Forest mint green used for confirmed recognition states, active ISL interpretation badges, and positive system statuses.
- **Tertiary (`#D1FAE5`):** Soft, soothing mint tint applied to container backgrounds, status pill fills, and non-intrusive notification banners.
- **Neutral (`#0F172A`):** High-density charcoal slate for primary body typography and display text, eliminating the eye fatigue of pure `#000000` while delivering uncompromising legibility.
- **Surfaces:** Backdrops rely on warm off-white (`#FBFBF9`) and subdued panel beige (`#F4F1EA`) to soften harsh screen glare during extended video sessions, layered against crisp `#FFFFFF` cards.

## Typography

Inter serves as the universal typeface across all levels due to its tall x-height, clear letter distinction, and robust legibility under low visual acuity conditions. 

Generous line heights (minimum 1.5x body text) prevent crowded baselines, facilitating fluid reading for real-time ISL translations and transcription feeds. Display sizes on mobile scale down cleanly below 32px to eliminate line-wrapping friction. Character spacing remains open and uniform across all weights.

## Layout & Spacing

The layout adopts a flexible 12-column grid on desktop and tablet, converting to a single-column stacked layout on mobile. Desktop spaces maintain wide 2rem canvas margins and 1.5rem gutters, preserving a spacious rhythm that avoids sensory overload.

Layout priorities focus on unobstructed video and visual feedback:
- The video detection frame maintains fixed 16:9 or 4:3 aspect ratios without dynamic layout shifts during recognition.
- Captions and transcripts reside in dedicated side panels (desktop) or sticky bottom sheets (mobile), preventing dynamic overlap with signers' hand regions.
- Touch targets adhere to a minimum 48px square footprint across all responsive breakpoints.

## Elevation & Depth

To sustain a calm and institutional environment, this design system minimizes heavy, dramatic drop shadows in favor of tonal layering and soft, low-contrast outlines:

- **Base Canvas:** Neutral tint (`#FBFBF9`).
- **Surface Level 1 (Cards, Viewports):** Pure white (`#FFFFFF`) with a 1px structural border in `#E2E8F0`.
- **Surface Level 2 (Floating Action Bars, Toolbars):** `#FFFFFF` paired with an ultra-soft ambient shadow (`0 2px 8px rgba(15, 23, 42, 0.06)`) and a 1px border (`#CBD5E1`).
- **Surface Level 3 (Modals, High-Priority Overlays):** Deep ambient shadow (`0 8px 24px rgba(15, 23, 42, 0.10)`), accompanied by a solid backdrop dim (`rgba(15, 23, 42, 0.40)`).

Glassmorphism and motion blurs are strictly excluded to maintain crisp optical borders for users with vestibular or visual processing differences.

## Shapes

The design system implements a roundedness factor of `2` (base radius of 0.5rem / 8px). This creates gentle, friendly contours while maintaining a structured, dependable institutional framework.

- Standard buttons, text inputs, and chips utilize `0.5rem` (8px).
- Content cards, translation containers, and camera feed wrappers use `rounded-lg` (`1rem` / 16px).
- Full dialog panels, modals, and persistent drawer trays adopt `rounded-xl` (`1.5rem` / 24px).
- Pill shapes are reserved strictly for concise status badges (e.g., "ISL Live", "Calibrated").

## Components

### Buttons
- **Primary:** Solid `#1E40AF` fill with `#FFFFFF` text. Focus rings display a 3px outer outline in `#2563EB` offset by 2px white space. Height: 48px minimum.
- **Secondary:** Surface `#FFFFFF` with 1.5px border in `#1E40AF` and text in `#1E40AF`. Hover state transitions to `#EFF6FF`.
- **Supportive / Tertiary:** Tinted `#D1FAE5` background with `#059669` text for non-intrusive actions like replay or copy transcript.

### Chips & Status Indicators
- **Active Detection Badge:** Background `#D1FAE5`, text `#059669`, accompanied by a solid 8px green status dot.
- **Vocabulary Tags:** Flat `#F4F1EA` background with `#0F172A` label text, providing effortless filtering without visual competition.

### Form Inputs & Controls
- **Text Inputs:** Height 48px, `#FFFFFF` background, `#CBD5E1` border, transitioning to `#1E40AF` border on focus with a high-visibility ring. Helper text renders at `body-sm` in `#475569`.
- **Checkboxes & Radios:** Scaled to 20px x 20px with thick 2px indicators for physical clarity. Checked fill uses `#1E40AF`.

### Cards & Panels
- **Video Capture Card:** 1px border in `#E2E8F0`, rounded-lg corners, framing the camera stream with subtle grid overlay guidelines that signal optimal hand-placement zones without cluttering the view.
- **Live Translation Feed Card:** Clean white container with distinct spacing between sign phrases, complete with integrated quick-pause and text-to-speech triggers.

### Communication Tools
- **Emergency / Quick Sign Bar:** Persistent bottom shelf housing critical sign shortcuts, styled with dignified muted blue fills and high-contrast symbols for rapid activation.
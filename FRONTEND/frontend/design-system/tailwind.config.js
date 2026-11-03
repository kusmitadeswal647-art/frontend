/**
 * SignConnect Design System - Universal Tailwind Configuration
 * Compatible with both Browser CDN (<script src="...">) and Node/Bundler environments (module.exports).
 */
const signConnectTailwindConfig = {
  darkMode: "class",
  content: [
    "./pages/**/*.{html,js}",
    "./shared/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        "inverse-surface": "#283044",
        "secondary-fixed-dim": "#68dba9",
        "on-error": "#ffffff",
        "on-primary-container": "#a8b8ff",
        "on-secondary": "#ffffff",
        "on-secondary-fixed-variant": "#005137",
        "on-surface-variant": "#444653",
        "on-tertiary-container": "#9dc4b1",
        "inverse-primary": "#b8c4ff",
        "surface-container-high": "#e2e7ff",
        "surface": "#faf8ff",
        "on-primary-fixed": "#001453",
        "primary-fixed-dim": "#b8c4ff",
        "on-primary": "#ffffff",
        "outline": "#757684",
        "on-secondary-fixed": "#002114",
        "secondary-container": "#82f5c1",
        "tertiary-fixed-dim": "#a8cfbc",
        "primary": "#00288e",
        "error": "#ba1a1a",
        "tertiary": "#163b2d",
        "outline-variant": "#c4c5d5",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-fixed": "#002115",
        "surface-bright": "#faf8ff",
        "on-tertiary": "#ffffff",
        "surface-tint": "#3755c3",
        "secondary": "#006c4a",
        "on-primary-fixed-variant": "#173bab",
        "inverse-on-surface": "#eef0ff",
        "on-tertiary-fixed-variant": "#294e3f",
        "surface-dim": "#d2d9f4",
        "secondary-fixed": "#85f8c4",
        "surface-variant": "#dae2fd",
        "primary-fixed": "#dde1ff",
        "on-secondary-container": "#00714e",
        "on-background": "#131b2e",
        "surface-container-highest": "#dae2fd",
        "tertiary-container": "#2e5243",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "primary-container": "#1e40af",
        "tertiary-fixed": "#c3ecd7",
        "background": "#faf8ff",
        "surface-container": "#eaedff",
        "on-surface": "#131b2e",
        "surface-container-low": "#f2f3ff"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "sm": "0.25rem",
        "md": "0.5rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "gutter": "1.5rem",
        "gutter-mobile": "1rem",
        "margin": "2rem",
        "margin-mobile": "1rem"
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "display-lg": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "label-lg": ["Inter", "sans-serif"],
        "display-lg-mobile": ["Inter", "sans-serif"],
        "title-md": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"]
      },
      fontSize: {
        "body-md": ["1rem", { lineHeight: "1.625rem", fontWeight: "400" }],
        "display-lg": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.875rem", fontWeight: "400" }],
        "label-md": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.02em", fontWeight: "600" }],
        "label-lg": ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em", fontWeight: "600" }],
        "display-lg-mobile": ["1.75rem", { lineHeight: "2.25rem", letterSpacing: "-0.01em", fontWeight: "700" }],
        "title-md": ["1.125rem", { lineHeight: "1.625rem", fontWeight: "600" }],
        "headline-md": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "headline-lg": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-sm": ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }]
      }
    }
  }
};

// Browser Global Support (Tailwind CDN)
if (typeof window !== "undefined") {
  window.tailwind = window.tailwind || {};
  window.tailwind.config = signConnectTailwindConfig;
}
if (typeof tailwind !== "undefined") {
  tailwind.config = signConnectTailwindConfig;
}

// CommonJS / Node Module Support
if (typeof module !== "undefined" && module.exports) {
  module.exports = signConnectTailwindConfig;
}

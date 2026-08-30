/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'landscape-lg': { 'raw': '(min-width: 1024px) and (orientation: landscape)' },
      'landscape-md': { 'raw': '(min-width: 768px) and (orientation: landscape)' }
    },
    extend: {
      colors: {
        calc: {
          dark: '#0a0a0f',
          darker: '#050508',
          panel: 'rgba(20, 20, 30, 0.45)',
          panelLight: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.12)',
          primary: '#4f8cff',
          accent: '#ff6b6b',
          func: '#7c5cff',
          num: 'rgba(40, 40, 55, 0.6)',
          op: 'rgba(79, 140, 255, 0.35)',
          eq: '#4f8cff',
          text: '#ffffff',
          textDim: 'rgba(255, 255, 255, 0.6)'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'key-press': '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.05)',
        glow: '0 0 30px rgba(79, 140, 255, 0.3)'
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        'press': 'press 0.12s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shake': 'shake 0.4s ease-in-out',
        'ripple': 'ripple 0.6s ease-out',
        'logo-pulse': 'logoPulse 3s ease-in-out infinite',
        'tab-glow': 'tabGlow 1.5s ease-in-out infinite'
      },
      keyframes: {
        press: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.94)' },
          '100%': { transform: 'scale(1)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 140, 255, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(79, 140, 255, 0.4)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        logoPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(79, 140, 255, 0.25)', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 25px rgba(124, 92, 255, 0.45)', transform: 'scale(1.05)' }
        },
        tabGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(79, 140, 255, 0.2)' },
          '50%': { boxShadow: '0 0 16px rgba(79, 140, 255, 0.4)' }
        }
      }
    }
  },
  plugins: []
}

// tailwind.config.js
// This file is auto-generated from your design tokens
// To update, modify the tokens in packages/tokens/src/ and run: pnpm run sync-tokens

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      'colors': {
            'black': '#000000',
            'white': '#ffffff',
            'gray': {
                  '50': '#f7f8f9',
                  '100': '#f3f4f5',
                  '200': '#ebebeb',
                  '300': '#e4e4e4',
                  '400': '#b3b9bf',
                  '500': '#8f949a',
                  '600': '#6f757d',
                  '700': '#4c5258',
                  '800': '#2f2f2f'
            },
            'navy': {
                  '100': '#f0f3f7',
                  '200': '#e3e9ef',
                  '300': '#b6c3d2',
                  '400': '#164b8f',
                  '500': '#0e3a6c',
                  '600': '#0a2d54',
                  '700': '#07203c'
            },
            'red': {
                  '100': '#f5e6eb',
                  '200': '#ebccd7',
                  '300': '#d199af',
                  '400': '#b76687',
                  '500': '#a30134',
                  '600': '#7a0125',
                  '700': '#52011a'
            },
            'destructive': {
                  '100': '#fbeaea',
                  '200': '#f7d5d5',
                  '300': '#efabab',
                  '400': '#e78181',
                  '500': '#d92b2b',
                  '600': '#b12222',
                  '700': '#8a1919'
            },
            'error': {
                  '100': '#ffe6e6',
                  '200': '#ffcccc',
                  '300': '#ff9999',
                  '400': '#ff6666',
                  '500': '#eb0000',
                  '600': '#cc0000',
                  '700': '#990000'
            },
            'success': {
                  '100': '#f0f8f9',
                  '200': '#e6f2f3',
                  '300': '#bfe0e2',
                  '400': '#99ced1',
                  '500': '#007d85',
                  '600': '#00646a',
                  '700': '#004b4f'
            },
            'warning': {
                  '100': '#fdf7f0',
                  '200': '#f8efe6',
                  '300': '#efdcbf',
                  '400': '#e6c999',
                  '500': '#b75b00',
                  '600': '#924900',
                  '700': '#6e3700'
            },
            'focus': {
                  '200': '#fff3e6',
                  '300': '#ffe6cc',
                  '400': '#ffcc80',
                  '500': '#ff9900',
                  '600': '#cc7700',
                  '700': '#995500'
            },
            'pink': {
                  '100': '#fffbfc',
                  '200': '#fff7f9',
                  '300': '#ffeff2',
                  '400': '#ffe6eb',
                  '500': '#ffe3ea',
                  '600': '#ccb6bb',
                  '700': '#99898c'
            },
            'charcoal': {
                  '100': '#f2f3f4',
                  '200': '#e5e7e9',
                  '300': '#bcc1c6',
                  '400': '#939ba3',
                  '500': '#39444f',
                  '600': '#2d3640',
                  '700': '#212830'
            }
      },
      'spacing': {
            '0': '0px',
            '1': '1px',
            '2': '2px',
            '4': '4px',
            '6': '6px',
            '8': '8px',
            '10': '10px',
            '12': '12px',
            '14': '14px',
            '16': '16px',
            '18': '18px',
            '20': '20px',
            '21': '21px',
            '22': '22px',
            '24': '24px',
            '32': '32px',
            '40': '40px',
            '48': '48px',
            '80': '80px'
      },
      'fontSize': {
            'xs': '0.625rem',
            'sm': '0.875rem',
            'base': '1rem',
            'lg': '1.125rem',
            'xl': '1.75rem',
            '2xl': '2.375rem',
            '3xl': '2.875rem'
      },
      'fontWeight': {
            'light': '300',
            'regular': '400',
            'medium': '500',
            'semibold': '600',
            'bold': '700'
      },
      'borderRadius': {
            'none': '0px',
            'xs': '2px',
            'sm': '4px',
            'md': '8px',
            'lg': '12px',
            'xl': '16px',
            'full': '80px'
      },
      'boxShadow': {
            'none': 'none',
            'xs': '0px 0px 0px 0px rgba(0, 0, 0, 0),\r\n    2px 0px 0px 0px rgba(0, 0, 0, 0.16)',
            'sm': '0px 4px 8px 0px rgba(0, 0, 0, 0),\r\n    4px 0px 0px 0px rgba(0, 0, 0, 0.16)',
            'md': '0px 6px 12px 0px rgba(0, 0, 0, 0),\r\n    8px 0px 0px 0px rgba(0, 0, 0, 0.16)',
            'lg': '0px 8px 16px 0px rgba(0, 0, 0, 0),\r\n    16px 0px 0px 0px rgba(0, 0, 0, 0.16)',
            'xl': '0px 12px 24px 0px rgba(0, 0, 0, 0),\r\n    24px 0px 0px 0px rgba(0, 0, 0, 0.16)',
            'focus': '0 0 0 3px rgba(183, 91, 0, 0.3)',
            'focus-primary': '0 0 0 3px rgba(14, 58, 108, 0.2)',
            'focus-success': '0 0 0 3px rgba(0, 125, 133, 0.3)',
            'focus-warning': '0 0 0 3px rgba(183, 91, 0, 0.3)',
            'focus-destructive': '0 0 0 3px rgba(217, 43, 43, 0.2)',
            'focus-error': '0 0 0 3px rgba(235, 0, 0, 0.2)'
      }
},
  },
  plugins: [require('tailwindcss-animate')],
}

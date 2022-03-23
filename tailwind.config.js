module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    fontFamily: {
      'primary': ['Lato', 'sans-serif'],
      'header': ['Merriweather', 'serif']
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem'
      }
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square'
    },
    extend: {
      colors: {
        'primary': 'rgba(0,0,0,0.87)',
        'background': '#FAFAFA',
        'divider': 'rgba(0, 0, 0, 0.12)',
        'nav-light': '#424242',
        'nav-dark': '#353535',
        'nav-hover': '#AAAAAA',
        'light': 'rgba(0,0,0,0.4)',
        'link': '#03B0EE',
        'link-hover': '#4CAF50',
        'disabled': 'rgba(0,0,0,0.4)',
        'chip': '#3F51B5',
        'chip-light': 'rgba(63, 81, 181, 0.1)',
        'chip-old': 'rgba(0, 0, 0, 0.1)',
        'traffic-red': '#EF5350',
        'traffic-amber': '#FFB300',
        'traffic-green': '#4CAF50'
      },
      lineHeight: {
        'chip': '1.7rem'
      },
      dropShadow: {
        'header': '0 1px 2px rgba(0, 0, 0, 0.50)'
      },
      backgroundImage: {
        'header1': 'url("/public/img/header1.jpg")',
        'header2': 'url("/public/img/header2.jpg")',
        'header3': 'url("/public/img/header3.jpg")',
        'noise': 'url("/public/img/noise.png")'
      },
      transitionDuration: {
        '2000': '2000ms'
      }
    }
  }
}

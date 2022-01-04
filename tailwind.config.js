module.exports = {
  purge: [],
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9595',
          darker: '#D85E5E'
        },
        success: {
          DEFAULT: '#5AC460'
        },
        danger: {
          DEFAULT: '#EA423A'
        },
        bgPrimary: {
          DEFAULT: '#F7F8FA',
        },
        muted: {
          DEFAULT: '#6C757D',
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

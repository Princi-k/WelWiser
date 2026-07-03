module.exports = {
  theme: {
    extend: {
      keyframes: {
        shooting: {
          '0%': { transform: 'translate(0,0) rotate(-45deg)', opacity: '1' },
          '100%': { transform: 'translate(-500px,500px) rotate(-45deg)', opacity: '0' },
        },
      },
      animation: {
        shooting: 'shooting 2s linear infinite',
      },
    },
  },
};


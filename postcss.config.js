export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      replace: true,
      mediaQuery: true,
      minPixelValue: 0,
      include: [/node_modules\/antd/],
    },
  },
};

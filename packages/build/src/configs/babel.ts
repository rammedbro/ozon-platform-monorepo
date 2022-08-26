export const babelConfig = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      corejs: '3.6',
      targets: {
        edge: 16,
        safari: 11,
        ios: 11,
        firefox: 54,
        chrome: 54,
        opera: 39,
        samsung: 4,
      },
    }],
    '@babel/preset-typescript',
    '@vue/babel-preset-jsx'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {
      decoratorsBeforeExport: false
    }],
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-runtime', {
      regenerator: false
    }],
  ],
};

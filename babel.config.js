module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@components': './components',
          '@common': './components/common',
          '@screens': './components/screens',
        },
        root: '.',
      },
    ],
    'jest-hoist',
  ],
};

export default {
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    sourcemap: true,
    minFile: true,
  },
  cssModules: true,
  injectCSS: true,
  doc: { typescript: true },
};

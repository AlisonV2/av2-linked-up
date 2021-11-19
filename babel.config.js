const plugins = [];
if (process.env.NODE_ENV === 'e2e') {
  plugins.push([
    'babel-plugin-istanbul',
    {
      extension: ['.js', '.vue'],
      all: true,
      include: ['src'],
      exclude: ['./src/registerServiceWorker.js']
    },
  ]);
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins,
  env: {
    test: {
      plugins: ['transform-require-context']
    }
  }
};

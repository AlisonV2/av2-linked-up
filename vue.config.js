/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    chainWebpack: (config) => {
      config.plugin('html').tap((args) => {
        args[0].title = 'Linked Up';
        return args;
      });
    },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'scss',
        patterns: ['./src/assets/styles/globals/globals.scss'],
      },
    },
  };
  

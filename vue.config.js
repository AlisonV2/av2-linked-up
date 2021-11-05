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
    // devServer: {
    //   public: '0.0.0.0:8080',
    //   watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300,
    //     poll: 1000,
    //   },
    // }
  };
  

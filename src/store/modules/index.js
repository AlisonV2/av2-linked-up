import { camelCase } from 'lodash';

/**
 * Script for autoloading modules from vuex store
 * @exports modules
 * @requires lodash
 */
const requireModule = require.context('.', false, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') {
    return;
  }

  const moduleConfig = requireModule(fileName);
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = moduleConfig.default || moduleConfig;
});

export default modules;

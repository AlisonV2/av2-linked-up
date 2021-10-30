import _ from 'lodash';

/**
 * Script for autoloading components in app folder as GlobalComponents
 * @exports GlobalComponents 
 * @requires Lodash
 */
export default {
  install(app) {
    const baseComponents = require.context(
      '../components/app/',
      false,
      /[A-Za-z0-9-_,\s]+\.vue$/i
    );

    baseComponents.keys().forEach((fileName) => {
      const componentConfig = baseComponents(fileName);
      const componentName = _.upperFirst(
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
      );
      
      app.component(
        `App${componentName}`,
        componentConfig.default || componentConfig
      );
    });
  },
};

/**
 * This script merges the coverage reports from Cypress and Jest into a single one,
 * inside the "coverage" folder
 */
 const { execSync } = require('child_process');
 const fs = require('fs-extra');

 const run = (commands) => {
   commands.forEach((command) => execSync(command, { stdio: 'inherit' }));
 };

 fs.emptyDirSync('reports');
 fs.copyFileSync(
   'cypress-cover/coverage-final.json',
   'reports/from-cypress.json'
 );
 fs.copyFileSync(
   'jest-cover/coverage-final.json',
   'reports/from-jest.json'
 );

 fs.emptyDirSync('./coverage');

 run([
   'cross-env NODE_ENV=e2e npx nyc merge reports cover/coverage.json && cross-env NODE_ENV=e2e npx nyc report --temp-dir reports --reporter lcov --report-dir cover'
 ]);
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
 // Run "nyc merge" inside the reports folder, merging the two coverage files into one,
 // then generate the final report on the coverage folder
 run([
   // "nyc merge" will create a "coverage.json" file on the root, we move it to .nyc_output
   'cross-env NODE_ENV=e2e npx nyc merge reports temp/coverage.json',
   'cross-env NODE_ENV=e2e npx nyc report --temp-dir reports --reporter lcov --report-dir coverage'
 ]);
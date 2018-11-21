const spawn = require('cross-spawn');
const { isOptedIn, resolveBin } = require('./utils');

const args = process.argv.slice(2);

const config = [];

if (!isOptedIn('pre-commit')) {
  process.exit(0);
}

const lintStagedResult = spawn.sync(resolveBin('lint-staged'), [...config, ...args], {
  env: {
    HUSKY_GIT_PARAMS: process.env.HUSKY_GIT_PARAMS,
  },
  stdio: 'inherit',
});

if (lintStagedResult.status !== 0) {
  process.exit(lintStagedResult.status);
}

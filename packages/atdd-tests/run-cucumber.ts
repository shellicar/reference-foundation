import { exit } from 'node:process';
// https://github.com/cucumber/cucumber-js/blob/main/docs/javascript_api.md#minimal-example
import { loadConfiguration, runCucumber } from '@cucumber/cucumber/api';

const { runConfiguration } = await loadConfiguration();
const { success } = await runCucumber(runConfiguration);
console.log('Test results: %s', success);
exit(success ? 0 : 1);

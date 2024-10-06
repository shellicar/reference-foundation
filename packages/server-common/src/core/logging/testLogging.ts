import type { Logger } from "winston";

export const testLogging = (logger: Logger) => {
  logger.log({
    level: 'info',
    message: 'Pass an object and this works',
    additional: 'properties',
    are: 'passed along',
  });

  logger.info({
    message: 'Use a helper method if you want',
    additional: 'properties',
    are: 'passed along',
  });

  // ***************
  // Allows for parameter-based logging
  // ***************
  logger.log('info', 'Pass a message and this works', {
    additional: 'properties',
    are: 'passed along',
    newTest: 'hooray 6',
  });

  logger.info('Use a helper method if you want', {
    additional: 'properties',
    are: 'passed along',
  });

  // ***************
  // Allows for string interpolation
  // ***************
  // info: test message my string {}
  logger.log('info', 'test message %s', 'my string');

  // info: test message 123 {}
  logger.log('info', 'test message %d', 123);

  // info: test message first second {number: 123}
  logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

  // prints "Found error at %s"
  logger.info('Found %s at %s', 'error', new Date());
  logger.info('Found %s at %s', 'error', new Error('chill winston'));
  logger.info('Found %s at %s', 'error', /WUT/);
  logger.info('Found %s at %s', 'error', true);
  logger.info('Found %s at %s', 'error', 100.0);
  logger.info('Found %s at %s', 'error', ['1, 2, 3']);

  logger.error(new Error('test error 1'));
  logger.error('test error 2', new Error('error message 2'));
};

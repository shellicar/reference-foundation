import winston from 'winston';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport';

export const logger = winston.createLogger({
  // format: format.combine(format.errors({ stack: true }), format.splat(), format.json()),
  level: 'debug',
  transports: [
    new winston.transports.Console({
      // format: formatters,
      // format: format.combine(format.colorize(), format.simple()),
    }),
    new OpenTelemetryTransportV3(),
  ],
});


export const testLogging = () => {  
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
    newTest: 'hooray',
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
};

testLogging();

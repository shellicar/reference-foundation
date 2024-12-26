import { Deferred } from '@shellicar-core-foundation/common/Deferred';
import type { Logger } from 'winston';

type LoggerType = Pick<Logger, 'info' | 'error' | 'debug'>;

const createLogger = async (): Promise<LoggerType> => {
  try {
    const { logger } = await import('@shellicar-core-foundation/monitor/logger');
    return logger;
  } catch (err) {
    const consoleLogger: LoggerType = {
      info: (message: any, ...meta: any[]): Logger => {
        console.log(message, ...meta);
        return consoleLogger as Logger;
      },
      error: (message: any, ...meta: any[]): Logger => {
        console.error(message, ...meta);
        return consoleLogger as Logger;
      },
      debug: (message: any, ...meta: any[]): Logger => {
        console.debug(message, ...meta);
        return consoleLogger as Logger;
      },
    };
    consoleLogger.error(err);
    return consoleLogger;
  }
};

type BaseHandler = (...args: any[]) => any;

export const createAsyncHandler = <THandler extends BaseHandler>(
  name: string,
  importHandler: () => Promise<{ handler: THandler }>,
): THandler => {
  const handlerDeferred = new Deferred<THandler>();

  const initialize = async () => {
    const logger = await createLogger();

    try {
      logger.debug(`Initializing ${name} handler`);
      const { handler } = await importHandler();
      logger.info(`${name} handler initialized`);
      handlerDeferred.resolve(handler);
    } catch (err) {
      logger.error(`Failed to initialize ${name} handler`, err);
      handlerDeferred.resolve((() => ({
        status: 503,
        body: JSON.stringify({ errors: [{ message: 'Service temporarily unavailable' }] }),
        headers: { 'Content-Type': 'application/json' },
      })) as THandler);
    }
  };

  initialize();

  return ((...args) => handlerDeferred.promise.then((handler: THandler) => handler(...args))) as THandler;
};

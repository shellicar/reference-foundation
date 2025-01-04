import type { HttpHandler, HttpResponseInit } from '@azure/functions';
import versionJson from '@shellicar/build-version/version';
import { logger } from '@shellicar-core-foundation/monitor/logger';
import { IManager } from '@shellicar-core-foundation/server-common/interfaces';
import { container } from '../../core/di/container';

export const handler: HttpHandler = async () => {
  const manager = container.resolve(IManager);
  const response: HttpResponseInit = {
    status: 200,
    body: JSON.stringify({
      message: 'hello world',
      manager: await manager.manage(),
      version: versionJson,
    }),
    headers: {
      'content-type': 'application/json',
    },
  };
  logger.info('Returning response', response);
  return response;
};

import { type HttpHandler, app } from '@azure/functions';
import { startHttpDependency, startOperation } from '@shellicar-foundation-core/server-common/core/insights/startOperation';
import { IManager } from '@shellicar-foundation-core/server-common/interfaces';
import { KnownSeverityLevel } from 'applicationinsights';
import { container } from '../core/di/container';
import { logger } from '@shellicar-foundation-core/server-common/core/logging/logger';
import { telemetryClient } from '@shellicar-foundation-core/server-common/core/insights/client';
import { testLogging } from '@shellicar-foundation-core/server-common/core/logging/testLogging';

const handler: HttpHandler = async (context, req) => {
  using op = startOperation('test-func 2');
  logger.warn('Hello World 1', {
    hello: 'world 1',
    myVersion: 'hooray 6',
  });
  using dep = startHttpDependency('https://api.github.com/test123', 'GET');
  telemetryClient.trackTrace({ message: 'HttpTrigger - Start' });
  telemetryClient.trackTrace({
    message: 'HttpTrigger - Start',
    severity: KnownSeverityLevel.Critical,
  });
  const manager = container.resolve(IManager);

  testLogging(logger);
  logger.warn('Done! 1', {
    hello: 'world 1',
  });
  dep.error('uhoh');
  op.success('yay');
  return {
    status: 200,
    body: JSON.stringify({
      message: 'hello world',
      manager: await manager.manage(),
    }),
  };
};

app.http('HttpTrigger', {
  handler,
  methods: ['GET'],
  authLevel: 'anonymous',
});

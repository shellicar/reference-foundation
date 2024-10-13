import { type WarmupHandler, app } from '@azure/functions';
import { IManager } from '@shellicar-core-foundation/server-common/interfaces';
import { container } from '../core/di/container';

const handler: WarmupHandler = async () => {
  container.resolve(IManager);
};

app.warmup('Warmup', {
  handler,
});

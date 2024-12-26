import type { WarmupHandler } from '@azure/functions';
import { IManager } from '@shellicar-core-foundation/server-common/interfaces';
import { container } from '../../core/di/container';

export const handler: WarmupHandler = async () => {
  container.resolve(IManager);
};

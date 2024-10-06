import { ManagerModule } from '@shellicar-core-foundation/server-common/module';
import { createServiceCollection } from '@shellicar/core-di';

const services = createServiceCollection();
services.registerModules([ManagerModule]);
export const container = services.buildProvider();

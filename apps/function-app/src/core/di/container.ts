import { createServiceCollection } from '@shellicar/core-di';
import { ManagerModule } from '@shellicar-core-foundation/server-common/module';

const services = createServiceCollection();
services.registerModules(ManagerModule);
export const container = services.buildProvider();

import { ServiceCenter, ServiceConsumer } from './service';

export const ServiceConfig = {
  [ServiceCenter.ADMIN]: {
    client: {
      clientId: ServiceCenter.ADMIN,
      brokers: [],
    },
    subscribe: { fromBeginning: true },
    consumer: {
      groupId: ServiceConsumer.ADMIN,
    },
  },
};

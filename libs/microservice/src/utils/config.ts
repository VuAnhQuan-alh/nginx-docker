import { ServiceCenter, ServiceConsumer } from './service';

export const ServiceConfig = {
  [ServiceCenter.ADMIN]: {
    client: {
      clientId: ServiceCenter.ADMIN,
      brokers: [process.env.KAFKA_BROKER],
    },
    subscribe: { fromBeginning: true },
    consumer: {
      groupId: ServiceConsumer.PETPOT,
    },
  },
};

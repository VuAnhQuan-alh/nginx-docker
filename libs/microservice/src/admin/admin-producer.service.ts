import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { ServiceMessage, ServiceName } from '../utils/service';

@Injectable()
export class AdminProducerService implements OnModuleInit {
  protected logger = new Logger(AdminProducerService.name);

  constructor(
    @Inject(ServiceName.ADMIN) private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(ServiceMessage.GET_ADMIN);
    this.client.subscribeToResponseOf(ServiceMessage.AUTHENTICATION);
    await this.client.connect();
    this.logger.log(`Kafka say hello ${ServiceName.ADMIN}`);
  }

  getHello(): string {
    this.client
      .send(ServiceMessage.GET_ADMIN, JSON.stringify({ message: 'producer' }))
      .subscribe((data: string) => {
        console.log({ 'admin-send': data });
      });
    return `Hello ${ServiceName.ADMIN}`;
  }
}

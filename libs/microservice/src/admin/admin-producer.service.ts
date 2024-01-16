import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { ServiceMessage, ServiceName } from '../utils/service';

@Injectable()
export class AdminProducerService implements OnModuleInit {
  constructor(
    @Inject(ServiceName.ADMIN) private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(ServiceMessage.GET_ADMIN);
    await this.client.connect();
  }

  getHello(): string {
    return `Hello ${ServiceName.ADMIN}`;
  }
}

import { EntityManager } from 'typeorm';

import { AbstractOrmRepository } from '@libs/common/database/abstract.orm.repository';
import { Injectable } from '@nestjs/common';

import { SuperEntity } from './entities/super.entity';

@Injectable()
export class SuperService extends AbstractOrmRepository<SuperEntity> {
  constructor(manager: EntityManager) {
    super(SuperEntity, manager);
  }
}

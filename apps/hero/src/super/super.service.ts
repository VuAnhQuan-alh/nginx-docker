import { AbstractOrmRepository } from '@libs/common/database/abstract.orm.repository';
import { Injectable } from '@nestjs/common';
import { SuperEntity } from './entities/super.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class SuperService extends AbstractOrmRepository<SuperEntity> {
  constructor(manager: EntityManager) {
    super(SuperEntity, manager);
  }
}

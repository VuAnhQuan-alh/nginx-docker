import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import cuid2 from '@paralleldrive/cuid2';

import { AbstractOrmEntity } from './abstract.orm.entity';

export abstract class AbstractOrmRepository<
  T extends AbstractOrmEntity,
> extends Repository<T> {
  constructor(
    protected readonly _entity: EntityTarget<T>,
    protected readonly _entityManager: EntityManager,
  ) {
    super(_entity, _entityManager);
  }

  async findOne(query: FindOneOptions<T>): Promise<T | undefined> {
    return this._entityManager.findOne(this._entity, query);
  }

  async findAll(query: FindOneOptions<T>): Promise<T[]> {
    return this._entityManager.find(this._entity, query);
  }

  async createEntity(data: DeepPartial<Omit<T, 'id'>>): Promise<T> {
    const id = cuid2.createId();
    // @ts-ignore
    const entity = this._entityManager.create(this._entity, {
      ...data,
      id,
    });
    return this._entityManager.save(entity);
  }

  async updateEntity(
    query: FindOneOptions<T>,
    data: DeepPartial<T>,
  ): Promise<T> {
    // @ts-ignore
    await this._entityManager.update(this._entity, query, data);
    return this.findOne(query);
  }

  async deleteById(id: number): Promise<void> {
    await this._entityManager.delete(this._entity, id);
  }

  protected getQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this._entityManager.createQueryBuilder(this._entity, alias);
  }
}

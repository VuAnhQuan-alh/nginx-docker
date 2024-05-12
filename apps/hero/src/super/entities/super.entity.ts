import { AbstractOrmEntity } from '@libs/common/database/abstract.orm.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class SuperEntity extends AbstractOrmEntity {
  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column()
  identify: string;

  @Column()
  level: string;

  @Column()
  profession: string;
}

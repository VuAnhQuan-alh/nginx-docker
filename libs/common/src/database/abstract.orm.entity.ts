import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AbstractOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

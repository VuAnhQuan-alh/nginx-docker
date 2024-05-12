import { OmitType } from '@nestjs/mapped-types';
import { SuperEntity } from '../entities/super.entity';

export class CreateHeroDTO extends OmitType(SuperEntity, ['id']) {}

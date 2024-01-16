import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerDTO } from './create-owner.dto';

export class UpdateOwnerDTO extends PartialType(CreateOwnerDTO) {}

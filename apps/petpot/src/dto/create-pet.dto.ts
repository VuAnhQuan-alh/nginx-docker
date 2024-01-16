import { OmitType } from '@nestjs/mapped-types';

import { PetDocument } from '../models/pet.schema';

export class CreatePetDTO extends OmitType(PetDocument, ['code']) {}

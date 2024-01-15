import { OmitType } from '@nestjs/mapped-types';
import { ServiceDocument } from '../models/service.schema';

export class CreateServiceDTO extends OmitType(ServiceDocument, ['code']) {}

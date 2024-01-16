import { OmitType } from '@nestjs/mapped-types';

import { PromotionDocument } from '../models/promotion.schema';

export class CreatePromotionDTO extends OmitType(PromotionDocument, ['code']) {}

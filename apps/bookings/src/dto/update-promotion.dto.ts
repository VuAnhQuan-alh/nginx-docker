import { PartialType } from '@nestjs/mapped-types';

import { CreateBookingDTO } from './create-booking.dto';

export class UpdatePromotionDTO extends PartialType(CreateBookingDTO) {}

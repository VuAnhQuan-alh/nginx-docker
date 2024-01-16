import { PartialType } from '@nestjs/mapped-types';

import { CreateBookingDTO } from './create-booking.dto';

export class UpdateServiceDTO extends PartialType(CreateBookingDTO) {}

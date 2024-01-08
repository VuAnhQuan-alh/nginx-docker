import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from './promotion.schema';
import { Type } from 'class-transformer';

export type TypeBookingDocument = Booking & Document;

@Schema()
export class Booking extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ type: [String], default: () => [] })
  petIds: string[];

  @Prop({ default: null })
  time: Date;

  @Prop({ type: [String], default: () => [] })
  services: string[];

  @Prop({ type: [PromotionSchema] })
  @Type(() => Promotion)
  promotion: Promotion[];

  @Prop({ required: true })
  staffId: string;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);

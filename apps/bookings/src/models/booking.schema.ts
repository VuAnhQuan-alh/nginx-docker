import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PromotionDocument, PromotionSchema } from './promotion.schema';
import { Type } from 'class-transformer';
import { ServiceDocument } from './service.schema';

export type TypeBookingDocument = BookingDocument & Document;

@Schema()
export class BookingDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ type: [String], default: () => [] })
  petIds: string[];

  @Prop({ default: null })
  time: Date;

  @Prop({ type: [ServiceDocument] })
  @Type(() => ServiceDocument)
  services: ServiceDocument[];

  @Prop({ type: [PromotionSchema] })
  @Type(() => PromotionDocument)
  promotion: PromotionDocument[];

  @Prop({ required: true })
  staffId: string;
}
export const BookingSchema = SchemaFactory.createForClass(BookingDocument);

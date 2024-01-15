import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TypeServiceDocument = ServiceDocument & Document;

@Schema()
export class ServiceDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ required: true })
  timeSlot: string;

  @Prop({ default: null })
  startDate: Date;

  @Prop({ default: null })
  endDate: Date;
}
export const ServiceSchema = SchemaFactory.createForClass(ServiceDocument);

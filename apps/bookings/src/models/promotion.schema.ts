import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './service.schema';
import { Type } from 'class-transformer';

export type TypePromotionDocument = Promotion & Document;

@Schema()
export class Promotion extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ default: null })
  name: string;

  @Prop({ min: 0, required: true })
  discount: number;

  @Prop({ default: null })
  startDate: Date;

  @Prop({ default: null })
  endDate: Date;

  @Prop({ type: [ServiceSchema], default: () => [] })
  @Type(() => Service)
  serviceIds: Service[];
}
export const PromotionSchema = SchemaFactory.createForClass(Promotion);

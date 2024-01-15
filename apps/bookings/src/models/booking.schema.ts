import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { PromotionDocument } from './promotion.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ServiceDocument } from './service.schema';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export type TypeBookingDocument = BookingDocument & Document;

@Schema({ timestamps: true })
export class BookingDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ type: [String], default: () => [] })
  @IsNotEmpty()
  @IsArray()
  petIds: string[];

  @Prop({ required: true })
  @IsNotEmpty()
  @IsDateString()
  time: Date;

  @Prop({ type: [SchemaTypes.ObjectId], ref: ServiceDocument.name })
  @Type(() => ServiceDocument)
  @IsNotEmpty()
  @IsArray()
  services: ServiceDocument[];

  @Prop({ type: [SchemaTypes.ObjectId], ref: PromotionDocument.name })
  @Type(() => PromotionDocument)
  @IsOptional()
  @IsArray()
  promotion: PromotionDocument[];

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  staffId: string;
}
export const BookingSchema = SchemaFactory.createForClass(BookingDocument);

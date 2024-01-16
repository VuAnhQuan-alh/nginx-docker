import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { TypePromotion } from '@libs/common/constant/enum.fields';
import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TypePromotionDocument = PromotionDocument & Document;

@Schema({ timestamps: true })
export class PromotionDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ default: null })
  @IsOptional()
  @IsString()
  name: string;

  @Prop({ min: 0, required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount: number;

  @Prop({
    type: String,
    enum: Object.values(TypePromotion),
    default: TypePromotion.RATE,
  })
  @IsNotEmpty()
  @IsEnum(TypePromotion)
  type: TypePromotion;

  @Prop({ default: null })
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @Prop({ default: null })
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @Prop({ default: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @Max(20)
  quantity: number;
}
export const PromotionSchema = SchemaFactory.createForClass(PromotionDocument);

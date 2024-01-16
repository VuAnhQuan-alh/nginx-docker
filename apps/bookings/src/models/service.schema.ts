import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export type TypeServiceDocument = ServiceDocument & Document;

@Schema({ timestamps: true })
export class ServiceDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ min: 0, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  timeSlot: string;

  @Prop({ default: null })
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @Prop({ default: null })
  @IsOptional()
  @IsDateString()
  endDate: Date;
}
export const ServiceSchema = SchemaFactory.createForClass(ServiceDocument);

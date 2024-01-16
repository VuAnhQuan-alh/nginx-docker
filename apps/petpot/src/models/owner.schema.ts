import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TypeOwnerDocument = OwnerDocument & Document;

@Schema({ timestamps: true })
export class OwnerDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop()
  @IsOptional()
  @IsDateString()
  birthday: Date;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Prop()
  @IsOptional()
  @IsString()
  identifier: string;

  @Prop({ default: null })
  @IsOptional()
  @IsString()
  staffId: string;
}
export const OwnerSchema = SchemaFactory.createForClass(OwnerDocument);

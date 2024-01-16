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
import { SchemaTypes } from 'mongoose';
import { OwnerDocument } from './owner.schema';
import { Type } from 'class-transformer';

export type TypePetDocument = PetDocument & Document;

@Schema({ timestamps: true })
export class PetDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ default: null })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @Prop({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  weight: number;

  @Prop({ default: null })
  @IsOptional()
  @IsString()
  identifier: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: OwnerDocument.name })
  @Type(() => OwnerDocument)
  @IsNotEmpty()
  ownerId: OwnerDocument;
}
export const PetSchema = SchemaFactory.createForClass(PetDocument);

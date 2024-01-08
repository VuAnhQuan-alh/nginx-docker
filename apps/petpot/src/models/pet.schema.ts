import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TypePetDocument = Pet & Document;

@Schema()
export class Pet extends AbstractDocument {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  birthday: Date;

  @Prop({ default: 0 })
  weight: number;

  @Prop({ default: null })
  identifier: string;
}
export const PetSchema = SchemaFactory.createForClass(Pet);

import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

export type TypeUserDocument = User & Document;

@Schema()
export class User extends AbstractDocument {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ default: null })
  fullName: string;

  @Prop({ required: true })
  @Exclude()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

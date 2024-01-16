import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TypeUserDocument = UserDocument & Document;

@Schema({ timestamps: true })
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ default: null })
  @IsString()
  @IsOptional()
  fullName: string;

  @Prop({ required: true })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(UserDocument);

import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { TypeRoles } from '@libs/common/constant/enum.fields';
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

  @Prop({ default: [TypeRoles.USER] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles: TypeRoles[];

  @Prop({ default: 0 })
  @IsNumber()
  @IsOptional()
  point: number;
}
export const UserSchema = SchemaFactory.createForClass(UserDocument);

import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export type TypeUserDocument = UserDocument & Document;

@Schema({ timestamps: true })
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true, required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Prop({ default: null })
  @IsString()
  @IsOptional()
  fullName: string;

  @Prop({ required: true, select: false })
  @IsString()
  @IsNotEmpty()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(UserDocument);

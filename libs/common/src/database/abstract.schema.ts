import { Prop, Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
  autoIndex: true,
})
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @Prop({ default: null })
  deletedAt: Date;
}

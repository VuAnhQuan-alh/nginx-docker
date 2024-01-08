import { Prop, Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { SchemaTypes, Types, now } from 'mongoose';
import { BaseSchema } from './base.schema';

@BaseSchema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret.__v;
      return ret;
    },
  },
})
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

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

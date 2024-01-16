import { Transform } from 'class-transformer';
import { now, SchemaTypes, Types } from 'mongoose';

import { Prop, Schema } from '@nestjs/mongoose';

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
}

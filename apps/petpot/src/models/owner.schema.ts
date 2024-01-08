import { AbstractDocument } from '@libs/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TypeOwnerDocument = Owner & Document;

@Schema()
export class Owner extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop()
  birthday: Date;

  @Prop({ required: true })
  phone: string;

  @Prop()
  identifier: string;

  @Prop({ required: true })
  staffId: string;
}
export const OwnerSchema = SchemaFactory.createForClass(Owner);

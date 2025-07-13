import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  order: number;

  @Prop({ default: null })
  icon: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

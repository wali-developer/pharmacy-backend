import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: null })
  order: number;

  @Prop({ default: null })
  icon: string;

  @Prop({ enum: ['Active', 'Inactive'], default: 'Active' })
  status: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

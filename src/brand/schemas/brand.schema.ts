import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { SubCategory } from 'src/sub-categories/schemas/category.schema';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Category', required: true })
  categories: Types.ObjectId[] | Category[];

  @Prop({ type: [Types.ObjectId], ref: 'SubCategory', default: [] })
  subCategories: Types.ObjectId[] | SubCategory[];

  @Prop({ default: null })
  icon: string;

  @Prop({ enum: ['Active', 'Inactive'], default: 'Active' })
  status: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

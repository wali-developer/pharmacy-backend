import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type SubCategoryDocument = SubCategory & Document;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: null })
  icon: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({ enum: ['Active', 'Inactive'], default: 'Active' })
  status: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

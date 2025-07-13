import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private Category: Model<CategoryDocument>,
  ) {}

  create(dto: CreateCategoryDto) {
    return this.Category.create(dto);
  }

  findAll() {
    return this.Category.find();
  }

  findOne(id: number) {
    return this.Category.findById(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.Category.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.Category.findByIdAndDelete(id);
  }
}

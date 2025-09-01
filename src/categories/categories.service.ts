import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { paginate } from 'src/common/utils';
import {
  CreateCategoryDto,
  QueryCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private Category: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateCategoryDto) {
    return await this.Category.create(dto);
  }

  async findAll(query: QueryCategoryDto) {
    const { page, limit, search, status } = query;

    const filters: {
      name?: string | { $regex: string; $options: string };
      status?: string;
    } = {};
    if (search) {
      filters.name = { $regex: search, $options: 'i' };
    }
    if (status) {
      filters.status = status;
    }

    return await paginate(this.Category, filters, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
  }

  async findOne(id: string) {
    return await this.Category.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCat = await this.Category.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        new: true,
      },
    );
    if (!updatedCat) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return updatedCat;
  }

  async remove(id: string) {
    const deleted = await this.Category.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Brand not found`);
    }
    return deleted;
  }
}

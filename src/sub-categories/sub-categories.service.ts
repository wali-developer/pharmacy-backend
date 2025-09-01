import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory, SubCategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { ICommonQueryParams } from 'src/common/dto/common.dto';
import { paginate } from 'src/common/utils';
import {
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
} from './dto/subCategory.dto';
import { IFilter } from './types';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategory.name) private model: Model<SubCategoryDocument>,
  ) {}

  async create(dto: CreateSubCategoryDto) {
    return await this.model.create(dto);
  }

  async findAll(query: ICommonQueryParams) {
    const { page, limit, search, status, category } = query;

    const filters: IFilter = {};
    if (search) {
      filters.name = { $regex: search, $options: 'i' };
    }
    if (status) {
      filters.status = status;
    }

    if (category) {
      filters.category = category;
    }

    return await paginate(this.model, filters, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      populate: { path: 'category', select: 'name' },
    });
  }

  async findOne(id: string) {
    const result = await this.model.findById(id).populate('category');
    if (!result) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return result;
  }

  async update(id: string, updateCategoryDto: UpdateSubCategoryDto) {
    const updatedCat = await this.model.findByIdAndUpdate(
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
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`SubCategory not found`);
    }
    return deleted;
  }
}

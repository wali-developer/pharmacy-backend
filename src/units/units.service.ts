import { Injectable, NotFoundException } from '@nestjs/common';
import { Unit, UnitDocument } from './schemas/unit.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUnitDto, UpdateUnitDto } from './dto/unit.dto';
import { Model } from 'mongoose';
import { ICommonQueryParams } from 'src/common/dto/common.dto';
import { paginate } from 'src/common/utils';

@Injectable()
export class UnitsService {
  constructor(@InjectModel(Unit.name) private model: Model<UnitDocument>) {}

  async create(dto: CreateUnitDto) {
    return await this.model.create(dto);
  }

  async findAll(query: ICommonQueryParams) {
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

    return await paginate(this.model, filters, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, dto: UpdateUnitDto) {
    const updatedUnit = await this.model.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updatedUnit) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return updatedUnit;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Unit not found`);
    }
    return deleted;
  }
}

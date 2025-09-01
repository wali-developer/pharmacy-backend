import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBrandDto, UpdateBrandDto } from './dto/brand.dto';
import { paginate } from 'src/common/utils';
import { ICommonQueryParams } from 'src/common/dto/common.dto';
import { BlobService } from 'src/blob/blob.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private Brand: Model<BrandDocument>,
    private readonly blobService: BlobService,
  ) {}

  async create(createBrandDto: CreateBrandDto, file?: Express.Multer.File) {
    let iconUrl: string | null = null;
    if (file) {
      const uploadResult = await this.blobService.upload(file, 'icons');
      iconUrl = uploadResult.url;
    }

    const newBrand = new this.Brand({
      ...createBrandDto,
      icon: iconUrl,
    });

    return await newBrand.save();
  }

  findAll(query: ICommonQueryParams) {
    const { page, limit, search, status, category } = query;

    const filters: {
      name?: string | { $regex: string; $options: string };
      status?: string;
      category?: string;
    } = {};

    if (search) {
      filters.name = { $regex: search, $options: 'i' };
    }
    if (status) {
      filters.status = status;
    }
    if (category) {
      filters.category = category;
    }

    return paginate(this.Brand, filters, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      populate: [
        { path: 'categories', select: 'name' },
        { path: 'subCategories', select: 'name' },
      ],
    });
  }

  findOne(id: string) {
    return this.Brand.findById(id);
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
    file?: Express.Multer.File,
  ) {
    const exist = await this.Brand.findById(id);

    if (!exist) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    let iconUrl: string | null = null;
    if (file) {
      const uploadResult = await this.blobService.updateFile(
        exist.icon,
        file,
        'icons',
      );
      iconUrl = uploadResult.url;
    }

    const updatedBrand = await this.Brand.findByIdAndUpdate(
      id,
      { ...updateBrandDto, icon: iconUrl || exist.icon },
      {
        new: true,
      },
    );
    if (!updatedBrand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return updatedBrand;
  }

  async remove(id: string) {
    const deleted = await this.Brand.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Brand not found`);
    }
    return deleted;
  }
}

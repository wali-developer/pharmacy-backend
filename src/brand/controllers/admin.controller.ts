import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BrandService } from '../brand.service';
import {
  CreateBrandDto,
  QueryBrandDto,
  UpdateBrandDto,
} from '../dto/brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/brands')
export class AdminBrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.brandService.create(createBrandDto, file);
  }

  @Get()
  findAll(@Query() query: QueryBrandDto) {
    return this.brandService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.brandService.update(id, updateBrandDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}

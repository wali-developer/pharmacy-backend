import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { AdminBrandController } from './controllers/admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { BlobService } from 'src/blob/blob.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [AdminBrandController],
  providers: [BrandService, BlobService],
})
export class BrandModule {}

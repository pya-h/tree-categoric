import { Module } from '@nestjs/common';
import { TreeCategoryController } from './tree-category.controller';
import { TreeCategoryService } from './tree-category.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TreeCategoryController],
  providers: [TreeCategoryService, PrismaService],
})
export class TreeCategoryModule {}

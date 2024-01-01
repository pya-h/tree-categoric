import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TreeCategoryCreateDto } from './tree-category-create.dto';
import { TreeCategoryUpdateDto } from './tree-category-update.dto';

@Injectable()
export class TreeCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: TreeCategoryCreateDto) {
    return this.prisma.treeCategory.create({ data });
  }

  async findAll() {
    return this.prisma.treeCategory.findMany({
      include: { subCategories: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.treeCategory.findUnique({
      where: { id },
      include: { subCategories: true },
    });
  }

  async update(id: string, data: TreeCategoryUpdateDto) {
    return this.prisma.treeCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.treeCategory.delete({ where: { id } });
  }
}

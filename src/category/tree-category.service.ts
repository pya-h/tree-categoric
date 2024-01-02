import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TreeCategoryCreateDto } from './tree-category-create.dto';
import { TreeCategoryUpdateDto } from './tree-category-update.dto';
import { TreeCategory } from '@prisma/client';

@Injectable()
export class TreeCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: TreeCategoryCreateDto) {
    return this.prisma.treeCategory.create({ data });
  }

  async findAll() {
    const allCategories = await this.prisma.treeCategory.findMany({
      include: {
        subCategories: true,
      },
    });

    const uniqueCategories = this.removeDuplicateSubcategories(allCategories);

    return uniqueCategories;
  }

  private removeDuplicateSubcategories(
    categories: TreeCategory[],
  ): TreeCategory[] {
    // by default, prisma returns subcategories twice, once as a subcategory, and once as a seperate row;
    // this piece of code prevents that
    const uniqueCategoriesMap = new Map<string, TreeCategory>();

    categories.forEach((category) => {
      if (!category.parent_id || !uniqueCategoriesMap.has(category.parent_id)) {
        uniqueCategoriesMap.set(category.id, category);
      }
    });

    return Array.from(uniqueCategoriesMap.values());
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TreeCategoryService } from './tree-category.service';
import { TreeCategoryCreateDto } from './tree-category-create.dto';
import { TreeCategoryUpdateDto } from './tree-category-update.dto';

@Controller('category')
export class TreeCategoryController {
  constructor(private readonly treeCategoryService: TreeCategoryService) {}

  @Post()
  async create(@Body() data: TreeCategoryCreateDto) {
    return this.treeCategoryService.create(data);
  }

  @Get()
  async findAll() {
    return this.treeCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.treeCategoryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: TreeCategoryUpdateDto) {
    return this.treeCategoryService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.treeCategoryService.delete(id);
  }
}

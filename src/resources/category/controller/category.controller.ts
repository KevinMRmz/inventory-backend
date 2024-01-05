import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { APIResponse } from '@common/types';
import { CategoryEntity } from '../entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<APIResponse<CategoryEntity[]>> {
    return await this._categoryService.handleGetCategoriesResponse();
  }

  @Get(':id')
  async getCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<APIResponse<CategoryEntity>> {
    return await this._categoryService.handleGetCategoryResponse(id);
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<APIResponse<CategoryEntity>> {
    return await this._categoryService.handleCreateCategoryResponse(
      createCategoryDto,
    );
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<APIResponse<CategoryEntity>> {
    return await this._categoryService.handleUpdateCategoryResponse(
      id,
      updateCategoryDto,
    );
  }

  // TODO:
  // Create delete category controller
}

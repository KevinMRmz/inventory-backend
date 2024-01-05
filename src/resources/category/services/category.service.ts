import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/prisma/prisma.service';
import { APIResponse } from '@common/types';
import { CategoryEntity } from '../entity';
import {
  CategoryNotFoundException,
  CategoryNameAlreadyExistsException,
} from '../errors';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';

@Injectable()
export class CategoryService {
  constructor(private readonly _prismaService: PrismaService) {}

  // TODO:
  // ADD query to sort, pagination, limit
  async getCategories(): Promise<CategoryEntity[]> {
    return await this._prismaService.category.findMany();
  }

  async handleGetCategoriesResponse(): Promise<APIResponse<CategoryEntity[]>> {
    const data = await this.getCategories();

    return {
      statusCode: HttpStatus.OK,
      data,
      count: data.length,
    };
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.findCategoryById(id);

    if (!category) {
      throw new CategoryNotFoundException();
    }

    return category;
  }

  async findCategoryById(id: number): Promise<CategoryEntity | null> {
    const category = await this._prismaService.category.findUnique({
      where: { id },
    });

    if (!category) return null;

    return category;
  }

  async handleGetCategoryResponse(
    id: number,
  ): Promise<APIResponse<CategoryEntity>> {
    const data = await this.getCategoryById(id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async getCategoryByName(categoryName: string): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(categoryName);

    if (!category) {
      throw new CategoryNotFoundException();
    }

    return category;
  }

  async findCategoryByName(
    categoryName: string,
  ): Promise<CategoryEntity | null> {
    const category = await this._prismaService.category.findUnique({
      where: { categoryName },
    });

    if (!category) return null;

    return category;
  }

  async handleCategoryCreation(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const { categoryName } = createCategoryDto;

    const category = await this.findCategoryByName(categoryName);

    if (category) {
      throw new CategoryNameAlreadyExistsException();
    }

    return await this.createCategory(createCategoryDto);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this._prismaService.category.create({
      data: {
        categoryName: createCategoryDto.categoryName,
      },
    });
  }

  async handleCreateCategoryResponse(
    createCategoryDto: CreateCategoryDto,
  ): Promise<APIResponse<CategoryEntity>> {
    const data = await this.handleCategoryCreation(createCategoryDto);

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  // TODO:
  // when category name changes, all products are updated
  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.getCategoryById(id);

    const { categoryName } = updateCategoryDto;

    if (
      categoryName &&
      category.categoryName !== categoryName &&
      (await this.findCategoryByName(categoryName))
    ) {
      throw new CategoryNameAlreadyExistsException();
    }

    return await this._prismaService.category.update({
      where: { id: category.id },
      data: { categoryName },
    });
  }

  // TODO:
  // UPDATE ALL PRODUCTS
  async handleUpdateCategoryResponse(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<APIResponse<CategoryEntity>> {
    const data = await this.updateCategory(id, updateCategoryDto);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async deleteCategory(id: number): Promise<CategoryEntity> {
    const category = await this.getCategoryById(id);

    return await this._prismaService.category.delete({
      where: { id: category.id },
    });
  }

  async handleDeleteCategoryResponse(
    id: number,
  ): Promise<APIResponse<CategoryEntity>> {
    const data = await this.deleteCategory(id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}

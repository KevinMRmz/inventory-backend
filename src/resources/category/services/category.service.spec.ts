import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaService } from '../../../common/modules/prisma/prisma.service';
import {
  CategoryNotFoundException,
  CategoryNameAlreadyExistsException,
} from '../errors';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const categoriesMock = [
        {
          id: 1,
          categoryName: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest
        .spyOn(prismaService.category, 'findMany')
        .mockResolvedValue(categoriesMock);

      const result = await categoryService.getCategories();

      expect(result).toEqual(categoriesMock);
    });
  });

  describe('handleGetCategoriesResponse', () => {
    it('should return APIResponse with categories', async () => {
      const categoriesMock = [
        {
          id: 1,
          categoryName: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest
        .spyOn(categoryService, 'getCategories')
        .mockResolvedValue(categoriesMock);

      const result = await categoryService.handleGetCategoriesResponse();

      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data).toEqual(categoriesMock);
      expect(result.count).toBe(categoriesMock.length);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

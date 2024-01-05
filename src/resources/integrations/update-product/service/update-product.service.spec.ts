import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductService } from './update-product.service';
import { ProductService } from '../../../product/services/product.service';
import { CategoryService } from '../../../category/services/category.service';
import { UpdateProductDto } from '../../../product/dtos';
import { CategoryNotFoundException } from '../../../category/errors';

describe('UpdateProductService', () => {
  let updateProductService: UpdateProductService;
  let productService: ProductService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductService,
        {
          provide: ProductService,
          useValue: {
            handleUpdateProductResponse: jest.fn(),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findCategoryByName: jest.fn(),
          },
        },
      ],
    }).compile();

    updateProductService =
      module.get<UpdateProductService>(UpdateProductService);
    productService = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('updateProduct', () => {
    it('should update the product and return the response', async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        branch: 'LG',
        model: 'OLED EVO 55',
        description: 'Television nueva',
        serial_no: 'ht0NkXrwqG2YrSdPVw%3A170465',
        isAvailable: false,
        categoryName: 'Screen',
      };

      const category = {
        id: 1,
        categoryName: 'Screen',
        createdAt: '2024-01-05T17:01:27.352Z',
        updatedAt: '2024-01-05T17:02:32.077Z',
      };

      jest
        .spyOn(categoryService, 'findCategoryByName')
        .mockResolvedValue(category as any);

      jest
        .spyOn(productService, 'handleUpdateProductResponse')
        .mockResolvedValue({} as any);

      const result = await updateProductService.updateProduct(
        productId,
        updateProductDto,
      );

      expect(categoryService.findCategoryByName).toHaveBeenCalledWith(
        updateProductDto.categoryName,
      );
      expect(productService.handleUpdateProductResponse).toHaveBeenCalledWith(
        productId,
        updateProductDto,
      );
      expect(result).toEqual({});
    });

    it('should throw CategoryNotFoundException if category is not found', async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        // Provide necessary update data here
        // ...
      };

      jest.spyOn(categoryService, 'findCategoryByName').mockResolvedValue(null); // Simulate category not found

      await expect(
        updateProductService.updateProduct(productId, updateProductDto),
      ).rejects.toThrowError(CategoryNotFoundException);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

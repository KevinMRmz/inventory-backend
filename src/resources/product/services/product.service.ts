import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../../../common/modules/prisma/prisma.service';
import { ProductEntity } from '../entity';
import { APIResponse } from './../../../common/types';
import {
  ProductNotFoundException,
  SerialNoAlreadyExistsException,
} from '../errors';
import { CreateProductDto, UpdateProductDto } from '../dtos';

@Injectable()
export class ProductService {
  constructor(private readonly _prismaService: PrismaService) {}

  // TODO:
  // create a query to sort, limit and page
  async getProducts(): Promise<ProductEntity[]> {
    return await this._prismaService.product.findMany({});
  }

  async handleGetProductsResponse(): Promise<APIResponse<ProductEntity[]>> {
    const data = await this.getProducts();

    return {
      statusCode: HttpStatus.OK,
      data,
      count: data.length,
    };
  }

  async getProductById(id: number): Promise<ProductEntity> {
    const product = await this.findProductById(id);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return product;
  }

  async findProductById(id: number): Promise<ProductEntity | null> {
    const product = await this._prismaService.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return product;
  }

  async handleGetProductResponse(
    id: number,
  ): Promise<APIResponse<ProductEntity>> {
    const data = await this.getProductById(id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async getProductBySerialNo(serialNo: string): Promise<ProductEntity> {
    const product = await this.findProductBySerialNo(serialNo);

    if (!product) {
      throw new ProductNotFoundException();
    }

    return product;
  }

  async findProductBySerialNo(serialNo: string): Promise<ProductEntity> {
    const product = await this._prismaService.product.findUnique({
      where: {
        serial_no: serialNo,
      },
    });

    if (!product) return null;

    return product;
  }

  private async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this._prismaService.product.create({
      data: {
        branch: createProductDto.branch,
        model: createProductDto.model,
        description: createProductDto.description,
        serial_no: createProductDto.serial_no,
        isAvailable: createProductDto.isAvailable,
        categoryName: createProductDto.categoryName,
      },
    });
  }

  async handleCreateProductResponse(
    createProductDto: CreateProductDto,
  ): Promise<APIResponse<ProductEntity>> {
    const data = await this.createProduct(createProductDto);

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  async handleUpdateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.getProductById(id);

    const { serial_no } = product;
    const { serial_no: serial_no_dto } = updateProductDto;

    if (
      serial_no_dto &&
      updateProductDto.serial_no !== serial_no &&
      (await this.findProductBySerialNo(serial_no))
    ) {
      throw new SerialNoAlreadyExistsException();
    }

    return await this.updateProduct(id, updateProductDto);
  }

  private async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this._prismaService.product.update({
      where: { id },
      data: {
        branch: updateProductDto.branch,
        model: updateProductDto.model,
        description: updateProductDto.description,
        serial_no: updateProductDto.serial_no,
        isAvailable: updateProductDto.isAvailable,
        categoryName: updateProductDto.categoryName,
      },
    });
  }

  async handleUpdateProductResponse(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<APIResponse<ProductEntity>> {
    const data = await this.handleUpdateProduct(id, updateProductDto);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}

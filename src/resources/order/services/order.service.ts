import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/modules/prisma/prisma.service';
import { OrderEntity } from '../entities';
import { APIResponse } from '../../../common/types';
import { OrderNotFoundException } from '../errors';

@Injectable()
export class OrderService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getOrders(): Promise<OrderEntity[]> {
    return await this._prismaService.order.findMany();
  }

  async handleGetOrderResponse(): Promise<APIResponse<OrderEntity[]>> {
    const data = await this.getOrders();

    return {
      statusCode: HttpStatus.OK,
      data,
      count: data.length,
    };
  }

  async getOrderById(id: number): Promise<OrderEntity> {
    const order = await this.findOrderById(id);

    if (!order) {
      throw new OrderNotFoundException();
    }

    return order;
  }

  async findOrderById(id: number): Promise<OrderEntity | null> {
    const order = await this._prismaService.order.findUnique({
      where: { id },
    });

    if (!order) return null;

    return order;
  }
}

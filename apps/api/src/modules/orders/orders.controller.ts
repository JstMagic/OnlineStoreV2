import { Body, Controller, Headers, Post, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import type { Order } from '../../interfaces';
import { QueryOrdersDto } from './dto/query-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Headers('x-cart-id') cartId: string, @Body() dto: CreateOrderDto): Order {
    return this.ordersService.create(cartId, dto);
  }
  @Get()
  list(@Query() query: QueryOrdersDto): Order[] {
    return this.ordersService.findOrdersByCustomer(query.customerId || '');
  }
}

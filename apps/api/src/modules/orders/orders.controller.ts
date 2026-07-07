import { Body, Controller, Headers, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import type { Order } from '../../interfaces';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Headers('x-cart-id') cartId: string, @Body() dto: CreateOrderDto): Order {
    return this.ordersService.create(cartId, dto);
  }
}

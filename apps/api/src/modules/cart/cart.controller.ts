import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import type { Cart } from '../../interfaces';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Headers('x-cart-id') cartId: string): Cart {
    return this.cartService.getCart(cartId);
  }

  @Post()
  addItem(@Headers('x-cart-id') cartId: string, @Body() dto: AddToCartDto): Cart {
    return this.cartService.addItem(cartId, dto);
  }

  @Patch(':id')
  updateItem(
    @Headers('x-cart-id') cartId: string,
    @Param('id') productId: string,
    @Body() dto: UpdateCartItemDto,
  ): Cart {
    return this.cartService.updateItem(cartId, Number(productId), dto);
  }

  @Delete(':id')
  removeItem(@Headers('x-cart-id') cartId: string, @Param('id') productId: string): Cart {
    return this.cartService.removeItem(cartId, Number(productId));
  }

  @Delete()
  clearCart(@Headers('x-cart-id') cartId: string): void {
    this.cartService.clearCart(cartId);
  }
}

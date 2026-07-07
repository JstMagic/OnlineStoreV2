import { Injectable } from '@nestjs/common';
import type { Order, CartItem } from '../../interfaces';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
  ) {}

  create(cartId: string, dto: CreateOrderDto): Order {
    const cart = this.cartService.getCart(cartId);
    if (cart.items.length === 0) throw new Error('Cart is empty');

    const items: CartItem[] = [];
    let total = 0;
    for (const ci of cart.items) {
      const product = this.productsService.findById(ci.productId);
      if (!product) throw new Error(`Product ${ci.productId} not found`);
      total += product.price * ci.quantity;
      items.push({ productId: ci.productId, quantity: ci.quantity });
    }

    const order: Order = {
      id: this.nextId++,
      customer: { ...dto },
      items,
      total,
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);

    this.cartService.clearCart(cartId);
    return order;
  }
}

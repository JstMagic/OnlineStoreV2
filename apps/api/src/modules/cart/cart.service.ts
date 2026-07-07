import { Injectable } from '@nestjs/common';
import type { Cart, CartItem } from '../../interfaces';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  private carts = new Map<string, Cart>();

  constructor(private readonly productsService: ProductsService) {}

  getCart(cartId: string): Cart {
    if (!this.carts.has(cartId)) {
      this.carts.set(cartId, { id: cartId, items: [] });
    }
    return this.carts.get(cartId)!;
  }

  addItem(cartId: string, dto: AddToCartDto): Cart {
    const product = this.productsService.findById(dto.productId);
    if (!product) throw new Error('Product not found');

    const cart = this.getCart(cartId);
    const existing = cart.items.find(i => i.productId === dto.productId);
    if (existing) {
      existing.quantity += dto.quantity;
    } else {
      cart.items.push({ productId: dto.productId, quantity: dto.quantity });
    }
    return cart;
  }

  updateItem(cartId: string, productId: number, dto: { quantity: number }): Cart {
    const cart = this.getCart(cartId);
    const item = cart.items.find(i => i.productId === productId);
    if (!item) throw new Error('Cart item not found');
    item.quantity = dto.quantity;
    return cart;
  }

  removeItem(cartId: string, productId: number): Cart {
    const cart = this.getCart(cartId);
    cart.items = cart.items.filter(i => i.productId !== productId);
    return cart;
  }

  clearCart(cartId: string): void {
    this.carts.delete(cartId);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (!product) throw new BadRequestException('Product not found');

    const cart = this.getCart(cartId);
    const existing = cart.items.find(i => i.productId === dto.productId);
    const currentQty = existing ? existing.quantity : 0;
    if (currentQty + dto.quantity > product.stock) {
      throw new BadRequestException('Insufficient stock');
    }
    if (existing) {
      existing.quantity += dto.quantity;
    } else {
      cart.items.push({ productId: dto.productId, quantity: dto.quantity });
    }
    return cart;
  }

  updateItem(cartId: string, productId: number, dto: { quantity: number }): Cart {
    const product = this.productsService.findById(productId);
    if (!product) throw new BadRequestException('Product not found');

    const cart = this.getCart(cartId);
    const item = cart.items.find(i => i.productId === productId);
    if (!item) throw new BadRequestException('Cart item not found');

    if (dto.quantity > product.stock) {
      throw new BadRequestException('Insufficient stock');
    }

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

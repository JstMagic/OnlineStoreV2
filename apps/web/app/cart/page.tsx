'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import CartItemRow from '@/components/CartItem';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { cart, cartId, updateItem, removeItem } = useCart();
  const [products, setProducts] = useState<Map<number, Product>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      if (!cart || cart.items.length === 0) { setLoading(false); return; }
      const ids = cart.items.map(i => i.productId);
      const proms = ids.map(id => api.getProduct(id));
      const prods = await Promise.all(proms);
      const map = new Map<number, Product>();
      prods.forEach(p => map.set(p.id, p));
      setProducts(map);
      setLoading(false);
    }
    loadProducts();
  }, [cart]);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <EmptyState message="Your cart is empty" action={<Link href="/products" className="text-blue-600 underline">Continue Shopping</Link>} />
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => {
    const prod = products.get(item.productId);
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.items.map(item => {
        const prod = products.get(item.productId);
        if (!prod) return null;
        return (
          <CartItemRow
            key={item.productId}
            product={prod}
            quantity={item.quantity}
            onUpdate={(qty) => updateItem(item.productId, qty)}
            onRemove={() => removeItem(item.productId)}
          />
        );
      })}
      <div className="text-right mt-6 text-2xl font-bold">
        Total: {formatPrice(total)}
      </div>
      <div className="mt-6 text-right">
        <Link href="/checkout" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

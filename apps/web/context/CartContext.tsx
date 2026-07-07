'use client';
import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { api } from '@/lib/api';
import type { Cart } from '@/lib/types';

interface CartContextType {
  cart: Cart | null;
  cartId: string;
  loading: boolean;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId] = useState(() => {
    if (typeof window === 'undefined') return '';
    let id = localStorage.getItem('cartId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('cartId', id);
    }
    return id;
  });
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (!cartId) return;
    const data = await api.getCart(cartId);
    setCart(data);
    setLoading(false);
  }, [cartId]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = async (productId: number, quantity: number) => {
    const updated = await api.addToCart(cartId, { productId, quantity });
    setCart(updated);
  };
  const updateItem = async (productId: number, quantity: number) => {
    const updated = await api.updateCartItem(cartId, productId, quantity);
    setCart(updated);
  };
  const removeItem = async (productId: number) => {
    const updated = await api.removeCartItem(cartId, productId);
    setCart(updated);
  };
  const clearCart = async () => {
    await api.clearCart(cartId);
    setCart(null);
  };

  return (
    <CartContext.Provider value={{ cart, cartId, loading, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

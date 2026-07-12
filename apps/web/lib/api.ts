import type { Product, Category, Cart, Order, OrderCustomer } from './types';

const isServer = typeof window === 'undefined';
const BASE = isServer
  ? (process.env.API_INTERNAL_URL || 'http://localhost:8080')
  : (process.env.NEXT_PUBLIC_API_URL || '/api');

async function fetchApi<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${endpoint}`;
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export const api = {
  getProducts: (params?: URLSearchParams) =>
    fetchApi<Product[]>(`/products?${params?.toString() ?? ''}`),
  getProduct: (id: number) => fetchApi<Product>(`/products/${id}`),
  getCategories: () => fetchApi<Category[]>('/categories'),
  getCart: (cartId: string) =>
    fetchApi<Cart>('/cart', { headers: { 'x-cart-id': cartId } }),
  addToCart: (cartId: string, data: { productId: number; quantity: number }) =>
    fetchApi<Cart>('/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-cart-id': cartId },
      body: JSON.stringify(data),
    }),
  updateCartItem: (cartId: string, productId: number, quantity: number) =>
    fetchApi<Cart>(`/cart/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-cart-id': cartId },
      body: JSON.stringify({ quantity }),
    }),
  removeCartItem: (cartId: string, productId: number) =>
    fetchApi<Cart>(`/cart/${productId}`, {
      method: 'DELETE',
      headers: { 'x-cart-id': cartId },
    }),
  clearCart: (cartId: string) =>
    fetchApi<void>('/cart', { method: 'DELETE', headers: { 'x-cart-id': cartId } }),
  placeOrder: (cartId: string, customer: OrderCustomer) =>
    fetchApi<Order>('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-cart-id': cartId },
      body: JSON.stringify(customer),
    }),
};

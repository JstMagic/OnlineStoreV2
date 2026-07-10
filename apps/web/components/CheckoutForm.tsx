'use client';
import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import type { Order } from '@/lib/types';
import OrderSummary from './OrderSummary';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const { cart, cartId, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [priceMap] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    if (!cart || cart.items.length === 0) return;
    async function computeTotal() {
      let sum = 0;
      const promises = cart!.items.map(async (item) => {
        if (priceMap.has(item.productId)) {
          const price = priceMap.get(item.productId)!;
          sum += price * item.quantity;
          return;
        }
        const prod = await api.getProduct(item.productId);
        priceMap.set(item.productId, prod.price);
        sum += prod.price * item.quantity;
      });
      await Promise.all(promises);
      setTotal(sum);
    }
    computeTotal();
  }, [cart, priceMap]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) return;
    setSubmitting(true);
    try {
      const order: Order = await api.placeOrder(cartId, form);
      await clearCart();
      router.push(`/order-confirmation?orderId=${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <Input label="Full Name" required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} />
      <Input label="Email" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <Input label="Phone" type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
      <Input label="Address" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
      <OrderSummary total={total} />
      <Button type="submit" disabled={submitting} className="w-full mt-4">
        {submitting ? 'Placing Order…' : 'Place Order'}
      </Button>
    </form>
  );
}

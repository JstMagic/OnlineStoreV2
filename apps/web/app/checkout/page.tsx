'use client';
import { useCart } from '@/context/CartContext';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const { cart } = useCart();
  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <EmptyState message="Your cart is empty" action={<Link href="/products" className="text-blue-600 underline">Shop now</Link>} />
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}

'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-green-600">Order Placed!</h1>
      <p className="mt-4 text-lg">Thank you for your purchase.</p>
      {orderId && <p className="mt-2 text-gray-600">Order ID: #{orderId}</p>}
      <Link href="/products" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
        Continue Shopping
      </Link>
    </div>
  );
}

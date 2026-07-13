'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">OnlineStoreV2</Link>
        <nav className="flex gap-6 items-center">
          <Link href="/products" className="hover:text-blue-600">Shop</Link>
          <Link href="/support" className="hover:text-blue-600">Support</Link>
          <Link href="/cart" className="relative hover:text-blue-600">
            Cart {itemCount > 0 && <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

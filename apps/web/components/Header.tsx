'use client';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { t } = useTranslation();
  const { cart } = useCart();
  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">{t('welcome')}</Link>
        <nav className="flex gap-6 items-center">
          <Link href="/products" className="hover:text-blue-600">{t('shop')}</Link>
          <Link href="/support" className="hover:text-blue-600">{t('support')}</Link>
          <Link href="/policy" className="hover:text-blue-600">{t('policy')}</Link>
          <Link href="/faq" className="hover:text-blue-600">{t('faq')}</Link>
          <Link href="/cart" className="relative hover:text-blue-600">
            <FaShoppingCart className="inline-block text-2xl" />
            {itemCount > 0 && <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

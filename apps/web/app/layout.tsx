import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';

export const metadata: Metadata = {
  title: 'OnlineStoreV2',
  description: 'Modern online boutique',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <CartProvider>
          <ClientErrorBoundary>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ClientErrorBoundary>
        </CartProvider>
      </body>
    </html>
  );
}

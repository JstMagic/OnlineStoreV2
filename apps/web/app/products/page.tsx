import { Suspense } from 'react';
import ProductList from './ProductList';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductList />
      </Suspense>
    </div>
  );
}

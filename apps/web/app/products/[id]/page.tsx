import { api } from '@/lib/api';
import ProductDetails from './ProductDetails';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await api.getProduct(Number(id));
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductDetails product={product} />
    </Suspense>
  );
}

import { api } from '@/lib/api';
import ProductDetails from './ProductDetails';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await api.getProduct(Number(params.id));
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductDetails product={product} />
    </Suspense>
  );
}

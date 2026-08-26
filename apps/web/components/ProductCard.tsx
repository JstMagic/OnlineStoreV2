import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
        <p className="text-gray-500 mt-1">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}

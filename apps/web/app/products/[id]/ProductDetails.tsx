'use client';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import QuantitySelector from '@/components/QuantitySelector';

export default function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await addItem(product.id, qty);
    setAdding(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg object-cover" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-1">{product.category}</p>
        <p className="text-2xl font-semibold mt-4">{formatPrice(product.price)}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <div className="mt-6 flex items-center gap-4">
          <QuantitySelector quantity={qty} onChange={setQty} />
          <button
            onClick={handleAdd}
            disabled={adding}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {adding ? 'Adding…' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

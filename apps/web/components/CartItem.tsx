'use client';
import QuantitySelector from './QuantitySelector';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface Props {
  product: Product;
  quantity: number;
  onUpdate: (qty: number) => void;
  onRemove: () => void;
}

export default function CartItemRow({ product, quantity, onUpdate, onRemove }: Props) {
  return (
    <div className="flex gap-4 py-4 border-b items-center">
      <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-gray-600">{formatPrice(product.price)}</p>
      </div>
      <QuantitySelector quantity={quantity} onChange={onUpdate} />
      <p className="w-24 text-right font-semibold">{formatPrice(product.price * quantity)}</p>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700 ml-2">✕</button>
    </div>
  );
}

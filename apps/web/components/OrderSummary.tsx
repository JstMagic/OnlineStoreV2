import { formatPrice } from '@/lib/utils';

export default function OrderSummary({ total }: { total: number }) {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-semibold mb-2">Order Summary</h3>
      <p className="text-lg font-bold">Total: {formatPrice(total)}</p>
    </div>
  );
}

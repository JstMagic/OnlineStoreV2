export default function QuantitySelector({ quantity, onChange }: { quantity: number; onChange: (qty: number) => void }) {
  return (
    <div className="flex items-center border rounded">
      <button onClick={() => onChange(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-gray-100">−</button>
      <span className="px-3 py-1">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
    </div>
  );
}

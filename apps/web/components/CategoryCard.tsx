import Link from 'next/link';
import type { Category } from '@/lib/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/products?category=${category.slug}`} className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
      {category.imageUrl && (
        <img src={category.imageUrl} alt={category.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
      <span className="absolute bottom-4 left-4 text-white font-semibold text-lg">{category.name}</span>
    </Link>
  );
}

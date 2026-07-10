import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { api } from '@/lib/api';
import type { Product, Category } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await api.getProducts(new URLSearchParams({ _limit: '4' }));
  const categories = await api.getCategories();

  return (
    <>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(c => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>
    </>
  );
}

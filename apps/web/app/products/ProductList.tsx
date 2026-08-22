'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import type { Product, Category } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProductList() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('');
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (sort) params.set('sort', sort);

        const [prods, cats] = await Promise.all([
          api.getProducts(params),
          api.getCategories(),
        ]);

        if (ignore) return;
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        if (ignore) return;
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [category, sort, retryKey]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load products: {error}</p>
        <button
          onClick={() => setRetryKey((k) => k + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 mb-8">
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="border rounded px-3 py-2">
          <option value="">Default</option>
          <option value="name">Name (A-Z)</option>
          <option value="price">Price (low to high)</option>
        </select>
      </div>
      <ProductGrid products={products} />
    </>
  );
}

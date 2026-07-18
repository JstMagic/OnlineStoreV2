import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold tracking-tight">Summer Collection 2026</h1>
        <p className="mt-4 text-xl text-gray-300">Discover curated styles for every day.</p>
        <Link href="/products" className="mt-8 inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </div>
    </section>
  );
}

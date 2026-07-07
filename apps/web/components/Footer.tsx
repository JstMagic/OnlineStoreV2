export default function Footer() {
  return (
    <footer className="border-t mt-16 py-8 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} OnlineStoreV2. All rights reserved.
      </div>
    </footer>
  );
}

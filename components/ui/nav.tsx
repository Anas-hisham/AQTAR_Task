import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xl font-bold">ProductStore</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium hover:underline">
            Products
          </Link>
          <Link href="/product/new" className="text-sm font-medium hover:underline">
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}
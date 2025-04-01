/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of high-quality products
          </p>
        </div>
        <Link href="/product/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="mb-2 line-clamp-2 min-h-[2.5rem] text-lg font-semibold">
                  {product.title}
                </h2>
                <p className="text-xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <span className="rounded-full bg-secondary px-3 py-1 text-sm">
                  {product.category}
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
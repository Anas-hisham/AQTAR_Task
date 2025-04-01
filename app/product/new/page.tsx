'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const productData = {
      title: formData.get('title'),
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description'),
      image: formData.get('image'),
      category: formData.get('category'),
    };

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8" data-aos="fade-right">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <Card 
        className="mx-auto max-w-2xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <CardHeader data-aos="fade-down" data-aos-delay="200">
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>
            Add a new product to the marketplace.
          </CardDescription>
        </CardHeader>
        
        <CardContent data-aos="fade-in" data-aos-delay="300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="400">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Product title"
              />
            </div>
            
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="450">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                placeholder="99.99"
              />
            </div>
            
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="500">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Product description"
              />
            </div>
            
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="550">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="600">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                required
                placeholder="Product category"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              data-aos="fade-up"
              data-aos-delay="650"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
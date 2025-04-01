"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AOS from "aos";
import "aos/dist/aos.css";
export default function EditProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);
  // Fetch product data on the client-side
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
      const data = await res.json();
      setProduct(data);
      setFormData({
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
      });
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    // if (res.ok) {
      router.push(`/product/${params.id}`);
    // }
  };

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl"  data-aos="fade-up"
        data-aos-delay="100">
        <CardHeader  data-aos="fade-right" data-aos-delay="200">
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>Update product information.</CardDescription>
        </CardHeader>
        <CardContent data-aos="fade-left" data-aos-delay="300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="400">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 " data-aos="zoom-in" data-aos-delay="450">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 "data-aos="zoom-in" data-aos-delay="500">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="550">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2" data-aos="zoom-in" data-aos-delay="600">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

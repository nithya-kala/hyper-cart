"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCartStore from "@/components/store/cartStore";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  type Product = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    category: string;
    stock: number;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { items, addToCart, removeFromCart } = useCartStore();
  const router = useRouter();

  const categories = ["All", "Electronics", "Clothing", "Accessories"];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        // data.imageUrl = getRandImg()
        setProducts(data);
        setFilteredProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category and price
  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          (selectedCategory === "All" ||
            product.category === selectedCategory) &&
          product.price <= priceRange
      )
    );
  }, [selectedCategory, priceRange, products]);

  if (loading)
    return <div className="p-6 text-center">Loading products...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Filters Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger className="w-56 border-gray-300 shadow-sm">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-col w-72">
          <label className="text-gray-600 font-semibold">
            Price Range: ${priceRange}
          </label>
          <Slider
            min={0}
            max={100}
            value={[priceRange]}
            onValueChange={(val) => setPriceRange(val[0])}
            className="mt-2"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <CardContent className="flex flex-col items-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-48 h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Category: {product.category}
              </p>
              <p className="text-lg font-semibold text-blue-600">
                ${product.price}
              </p>
              <p
                className={`text-sm ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </p>
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => removeFromCart(product.id)}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold">
              Items in Cart: {items.length}
            </div>
            <div className="text-lg font-semibold">
              Total Price: $
              {items.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </div>
          </div>
          {items.length > 0 && (
            <Button
              onClick={() => router.push("/checkout")}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

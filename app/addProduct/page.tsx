"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import AddProductForm from "@/components/add-product-form";

export default function ProductForm() {
  const categories = ["All", "Electronics", "Clothing", "Accessories"];
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: categories[0],
    stock: "",
    imageURL: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("stock", product.stock);
      formData.append("imageUrl", product.imageURL); // Send URL instead of file

      // Send product data to API
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast({
        title: "Success!",
        description: "✅ Product added successfully!",
      });
      router.refresh(); // Refresh the page to show the new product
    } catch (error) {
      toast({ title: "❌ Error adding product", description: `${error}` });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("stock", values.stockAvailability);
      formData.append("imageUrl", values.imageUrl);

      // Send product data to API
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast({
        title: "Success!",
        description: "✅ Product added successfully!",
      });
      router.refresh(); // Refresh the page to show the new product
    } catch (error) {
      toast({ title: "❌ Error adding product", description: `${error}` });
    } finally {
      setLoading(false);
      router.push("/products");
    }
  };

  return <AddProductForm loading={loading} onSubmit={onSubmit} />;
}

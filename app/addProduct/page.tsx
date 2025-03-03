"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import AddProductForm from "@/components/add-product-form";
import { useUser } from "reactfire";

export default function ProductForm() {
  const categories = ["All", "Electronics", "Clothing", "Accessories"];
  const router = useRouter();
  const { status, data: user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!user) return router.push("/login");
  }, [user, status, router]);

  const onSubmit = async (values: any) => {
    setLoading(true);
    if (!user) return console.error("User not logged in");
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("stock", values.stockAvailability);
      formData.append("imageUrl", values.imageUrl);
      const token = await user.getIdToken();

      // Send product data to API
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

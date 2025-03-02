"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to HyperCart</h1>
      <p className="text-lg mb-8">
        Your one-stop shop for everything you need!
      </p>

      <div className="flex space-x-4">
        <Button
          className="bg-white text-indigo-600 hover:bg-gray-200 px-6 py-3 rounded-lg text-lg font-semibold"
          onClick={() => router.push("/products")}
        >
          Browse Products
        </Button>
        <Button
          className="bg-white text-indigo-600 hover:bg-gray-200 px-6 py-3 rounded-lg text-lg font-semibold"
          onClick={() => router.push("/orders")}
        >
          My Orders
        </Button>
      </div>
    </div>
  );
}

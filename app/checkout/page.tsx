"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "reactfire";
import useCartStore from "@/components/store/cartStore";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function CheckoutPage() {
  const router = useRouter();
  const { status, data: user } = useUser();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const { items, clearCart } = useCartStore();

  useEffect(() => {
    if (status === "loading") return;
    if (!user) return router.push("/login");
  }, [user, status, router]);

  const handleCheckout = async () => {
    const orderDetails = {
      userEmail: user?.email,
      address,
      paymentMethod,
      items,
      status: "Pending",
    };
    console.log("Order Placed:", orderDetails);

    if (!user) return console.error("User not logged in");
    try {
      const token = await user.getIdToken();

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      console.log("Order API Response:", data);

      toast({
        title: "Success!",
        description: "✅ Order placed successfully!",
      });
      clearCart(); // Clear cart after successful checkout
      router.push("/orders"); // Navigate to Orders page
    } catch (error) {
      console.error("Error placing order:", error);
      toast({ title: "❌ Error placing order", description: `${error}` });
    }
  };

  if (status === "loading") return <span>loading...</span>;

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="block mb-2 font-semibold">Shipping Address</label>
        <Textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="mb-4"
        />

        <label className="block mb-2 font-semibold">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Card">Credit/Debit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash">Cash on Delivery</option>
        </select>

        <Button
          onClick={handleCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

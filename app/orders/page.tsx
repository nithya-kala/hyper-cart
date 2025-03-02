"use client";

import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "reactfire";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface Order {
  id: string;
  userEmail: string;
  address: string;
  paymentMethod: string;
  items: { name: string; quantity: number }[];
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: user } = useUser();

  console.log("User: ", user)

  useEffect(() => {
    
    const fetchOrders = async () => {   
      try {    
        // await new Promise(resolve => setTimeout(resolve, 5000));

        const token = await user?.getIdToken();
        const res = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
        fetchOrders();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      {loading && <p>Loading orders or Please login...</p>}
      {/* {!user && <p> User Not found</p>} */}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <Card className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userEmail}</TableCell>
                  <TableCell>
                    {order.items.map((item) => (
                      <p key={item.name}>
                        {item.name}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status) as "secondary" | "default" | "outline" | "destructive"}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}

// Function to set badge color based on order status
function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "secondary";
    case "shipped":
      return "default";
    case "delivered":
      return "success";
    default:
      return "outline";
  }
}

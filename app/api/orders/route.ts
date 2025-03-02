import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { authMiddleware } from "@/lib/authMiddleware";

/**
 * ✅ POST: Create an Order (Authenticated with Middleware)
 */
export async function POST(req: Request) {
  try {
    // ✅ Authenticate request using middleware
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) return authResult; // If middleware returns an error, stop execution

    const { decodedUser } = authResult;

    // ✅ Parse request body
    const { userEmail, address, paymentMethod, items, status } = await req.json();

    if (!userEmail || !address || !paymentMethod || !items || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Create order object
    const newOrder = {
      userEmail: decodedUser.email, // Ensure the user is creating an order for their own email
      address,
      paymentMethod,
      items,
      status,
      createdAt: new Date(),
    };

    // ✅ Store in Firestore
    const docRef = await db.collection("orders").add(newOrder);

    return NextResponse.json({ id: docRef.id, ...newOrder }, { status: 201 });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

/**
 * ✅ GET: Fetch Orders for Logged-in User (Authenticated)
 */
export async function GET(req: Request) {
    try {
      // ✅ Authenticate request using middleware
      const authResult = await authMiddleware(req);
      if (authResult instanceof NextResponse) return authResult; // If middleware returns an error, stop execution
  
      const { decodedUser } = authResult;
  
      // ✅ Fetch orders for the logged-in user
      const ordersSnapshot = await db.collection("orders")
        .where("userEmail", "==", decodedUser.email)
        .orderBy("createdAt", "desc")
        .get();

        console.log("decodedUser: ",decodedUser.email)
  
      const orders = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
      console.error("Error Fetching Orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
  }

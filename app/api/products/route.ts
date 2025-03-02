""
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { storage } from "@/components/firebase-providers";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// GET /api/products - Fetch all products
export async function GET() {
  try {
    console.log("📦 Fetching products from Firestore...");
    const snapshot = await db.collection("products").get();
    
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products - Add a new product with image
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageUrl = formData.get("imageUrl") as File;
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const stock = parseInt(formData.get("stock") as string);

    // Save product in Firestore
    console.log("🔄 Saving product data to Firestore...");
    const docRef = await db.collection("products").add({
      name,
      imageUrl,
      price,
      category,
      stock,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id, message: "Product added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

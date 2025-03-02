import { NextResponse } from "next/server";
import { auth } from "./firebaseAdmin";

/**
 * ✅ Middleware to verify Firebase Authentication token
 * @param {Request} req - Incoming request object
 * @returns {Promise<NextResponse | {decodedUser: object}>} - Either an error response or the authenticated user
 */
export async function authMiddleware(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedUser = await auth.verifyIdToken(token);
    console.log("Authenticated User:", decodedUser);
    return { decodedUser }; // Pass user data to the handler
  } catch (error) {
    console.error("Invalid Token:", error);
    return NextResponse.json({ error: "Unauthorized - Invalid Token" }, { status: 401 });
  }
}

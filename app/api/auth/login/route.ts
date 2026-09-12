import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "@/lib/neon";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const result = await sql`
      SELECT id, full_name, email, password_hash, role, department, profile_image, provider
      FROM users
      WHERE email = ${email}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result[0];

    // Check if user registered via Google (no password)
    if (user.provider === "google" && !user.password_hash) {
      return NextResponse.json(
        {
          error:
            "This account uses Google Sign-In. Please login with Google.",
        },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user data (in production, you'd generate a JWT/session token)
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          role: user.role,
          department: user.department,
          profileImage: user.profile_image,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

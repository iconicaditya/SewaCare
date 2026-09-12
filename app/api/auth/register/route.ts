import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sql from "@/lib/neon";
import cloudinary from "@/lib/cloudinary";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const department = (formData.get("department") as string) || null;
    const profileImage = formData.get("profileImage") as File | null;

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Upload profile image to Cloudinary if provided
    let profileImageUrl: string | null = null;
    if (profileImage) {
      const bytes = await profileImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Convert buffer to base64 data URI
      const base64 = buffer.toString("base64");
      const dataUri = `data:${profileImage.type};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "SewaCare/profiles",
        public_id: `profile_${Date.now()}`,
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
        ],
      });

      profileImageUrl = uploadResult.secure_url;
    }

    // Insert user into database
    const result = await sql`
      INSERT INTO users (full_name, email, password_hash, role, department, profile_image, provider)
      VALUES (${fullName}, ${email}, ${passwordHash}, ${role}, ${department}, ${profileImageUrl}, 'credentials')
      RETURNING id, full_name, email, role, department, profile_image, created_at
    `;

    const user = result[0];

    // Send welcome email (non-blocking)
    sendWelcomeEmail({
      to: email,
      fullName,
      provider: "credentials",
    }).catch((err) => console.error("Welcome email failed:", err));

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          role: user.role,
          department: user.department,
          profileImage: user.profile_image,
          createdAt: user.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

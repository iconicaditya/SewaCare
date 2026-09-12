import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { neon } from "@neondatabase/serverless";
import { sendWelcomeEmail } from "@/lib/email";

const sql = neon(process.env.DATABASE_URL!);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const existingUser = await sql`
            SELECT id, full_name, profile_image FROM users WHERE email = ${user.email!}
          `;

          if (existingUser.length === 0) {
            // ── New user: INSERT with Google data ───────────────────
            await sql`
              INSERT INTO users (full_name, email, profile_image, provider, provider_id)
              VALUES (
                ${user.name || "Google User"},
                ${user.email!},
                ${user.image},
                'google',
                ${account.providerAccountId}
              )
            `;

            // Send welcome email
            await sendWelcomeEmail({
              to: user.email!,
              fullName: user.name || "Google User",
              provider: "google",
            });
          } else {
            // ── Existing user: UPDATE name & profile image from Google
            const dbUser = existingUser[0];
            const newName = user.name || dbUser.full_name;
            const newImage = user.image || dbUser.profile_image;

            // Always keep Google data fresh
            if (newName !== dbUser.full_name || newImage !== dbUser.profile_image) {
              await sql`
                UPDATE users
                SET full_name = ${newName},
                    profile_image = ${newImage},
                    provider_id = ${account.providerAccountId},
                    updated_at = NOW()
                WHERE email = ${user.email!}
              `;
            }
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (token as any).provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        // Fetch fresh user data from database
        const result = await sql`
          SELECT id, full_name, role, department, profile_image
          FROM users
          WHERE email = ${session.user.email}
        `;

        if (result.length > 0) {
          const dbUser = result[0];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const u = session.user as any;
          u.id = dbUser.id;
          u.fullName = dbUser.full_name;
          u.role = dbUser.role;
          u.department = dbUser.department;
          u.profileImage = dbUser.profile_image;
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

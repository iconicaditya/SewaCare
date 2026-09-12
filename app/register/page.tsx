"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Camera, X, Loader2, AlertCircle } from "lucide-react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ─── Validation Schema ───────────────────────────────────────────────
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    role: z.string().min(1, "Please select a role"),
    department: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.agreeTerms === true, {
    message: "You must agree to the terms",
    path: ["agreeTerms"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Component ───────────────────────────────────────────────────────
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Profile image state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      department: "",
      agreeTerms: false,
    },
  });

  const agreeTermsValue = watch("agreeTerms") as boolean;

  // ─── Image Handlers ──────────────────────────────────────────────
  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleImageRemove = useCallback(() => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ─── Form Submit Handler ─────────────────────────────────────────
  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Build FormData for file upload
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (data.department) {
        formData.append("department", data.department);
      }
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Registration failed. Please try again.");
        return;
      }

      // Registration successful — redirect to login
      router.push("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Google Sign-In Handler ──────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError("Google sign-in failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* ── Left Panel - Background Image (Fixed) ──────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] h-screen sticky top-0 flex-shrink-0 relative overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80"
          alt="Hospital"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/85 via-emerald-800/80 to-teal-700/75" />
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
          <div className="mb-16">
            <img
              src="/logo.png"
              alt="SewaCare Logo"
              className="h-14 w-auto"
            />
          </div>

          <h1 className="text-white text-5xl xl:text-6xl font-bold leading-tight mb-6">
            Join SewaCare.
            <br />
            Deliver better care.
          </h1>

          <p className="text-emerald-100/80 text-lg leading-relaxed max-w-md">
            Create your account and start providing
            <br />
            compassionate, efficient healthcare.
          </p>
        </div>
      </div>

      {/* ── Right Panel - Registration Form (Scrollable) ─────────────── */}
      <div className="w-full lg:w-[45%] overflow-y-auto bg-white px-8 sm:px-12 lg:px-16 xl:px-20 py-10">
        <div className="w-full max-w-[420px] mx-auto flex flex-col justify-center min-h-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
          <p className="text-gray-500 text-sm mb-6">Fill in the details below to get started.</p>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
            {/* ── Profile Image Upload ──────────────────────────────── */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative group">
                <div
                  className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer hover:border-emerald-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                      {/* Remove overlay on hover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageRemove();
                        }}
                        className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Camera className="w-5 h-5 text-gray-400" />
                      <span className="text-[10px] text-gray-400 font-medium">Upload</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                <p className="text-xs text-gray-400 mt-0.5">Optional · JPG, PNG · Max 5MB</p>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="text-xs text-red-500 hover:text-red-600 font-medium mt-1 transition-colors"
                  >
                    Remove photo
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* ── Full Name ─────────────────────────────────────────── */}
            <div className="mb-4">
              <label htmlFor="reg-fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="reg-fullName"
                type="text"
                autoComplete="name"
                placeholder="Dr. John Smith"
                {...register("fullName")}
                className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                  errors.fullName ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            {/* ── Email ─────────────────────────────────────────────── */}
            <div className="mb-4">
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                {...register("email")}
                className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* ── Role ──────────────────────────────────────────────── */}
            <div className="mb-4">
              <label htmlFor="reg-role" className="block text-sm font-medium text-gray-700 mb-1.5">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="reg-role"
                {...register("role")}
                className={`w-full px-4 py-2.5 text-sm border rounded-lg bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors appearance-none ${
                  errors.role ? "border-red-400" : "border-gray-300"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="admin">Administrator</option>
                <option value="lab_technician">Lab Technician</option>
                <option value="pharmacist">Pharmacist</option>
              </select>
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
            </div>

            {/* ── Department ────────────────────────────────────────── */}
            <div className="mb-4">
              <label htmlFor="reg-department" className="block text-sm font-medium text-gray-700 mb-1.5">
                Department
              </label>
              <select
                id="reg-department"
                {...register("department")}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">Select department (optional)</option>
                <option value="emergency">Emergency</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="oncology">Oncology</option>
                <option value="radiology">Radiology</option>
                <option value="general">General Medicine</option>
              </select>
            </div>

            {/* ── Password ──────────────────────────────────────────── */}
            <div className="mb-4">
              <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  {...register("password")}
                  className={`w-full px-4 py-2.5 pr-11 text-sm border rounded-lg bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                    errors.password ? "border-red-400" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* ── Confirm Password ──────────────────────────────────── */}
            <div className="mb-4">
              <label htmlFor="reg-confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                  className={`w-full px-4 py-2.5 pr-11 text-sm border rounded-lg bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-colors ${
                    errors.confirmPassword ? "border-red-400" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* ── Terms Checkbox ────────────────────────────────────── */}
            <div className="flex items-start gap-2.5 mb-6">
              <input
                type="checkbox"
                id="reg-terms"
                checked={agreeTermsValue || false}
                onChange={(e) => setValue("agreeTerms", e.target.checked, { shouldValidate: true })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-700 focus:ring-emerald-600/30 cursor-pointer"
              />
              <label htmlFor="reg-terms" className="text-sm text-gray-500 cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-xs text-red-500 -mt-4 mb-4">{errors.agreeTerms.message}</p>
            )}

            {/* ── Submit ────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-600 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600/50 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogleSignIn} disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50">
            <FaGoogle className="w-4 h-4" />
            Continue with Google
          </button>

          {/* Social Row */}
          <div className="flex gap-3 mt-3">
            <button type="button" className="flex-1 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
              <FaGithub className="w-5 h-5" />
            </button>
            <button type="button" className="flex-1 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
              <FaApple className="w-5 h-5" />
            </button>
            <button type="button" className="flex-1 flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
              <FaXTwitter className="w-4 h-4" />
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

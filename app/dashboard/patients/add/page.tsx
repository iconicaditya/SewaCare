"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  User,
  Heart,
  Phone,
} from "lucide-react";
import FormField from "@/components/ui/form-field";

function generatePatientId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `PAT-${num}`;
}

function calculateAge(dob: string): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function AddPatientPage() {
  const router = useRouter();
  const [patientId] = useState(generatePatientId);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    bloodGroup: "",
    allergies: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const age = calculateAge(formData.dateOfBirth);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(
        `Patient ${formData.fullName} (${patientId}) has been registered successfully!`
      );
      router.push("/dashboard/patients");
    }
  };

  const inputClasses =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/patients"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Register New Patient
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Fill in the patient information below
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/patients"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Patient
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Auto-generated Patient ID */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              Patient ID:
            </span>
            <span className="text-sm font-mono font-semibold text-emerald-600">
              {patientId}
            </span>
            <span className="text-xs text-gray-400">(Auto-generated)</span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Full Name" required error={errors.fullName}>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Gender" required error={errors.gender}>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>

              <FormField
                label="Date of Birth"
                required
                error={errors.dateOfBirth}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  {age > 0 && (
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {age} years old
                    </span>
                  )}
                </div>
              </FormField>

              <FormField label="Phone Number" required error={errors.phone}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., 9841234567"
                  className={inputClasses}
                />
              </FormField>

              <div className="md:col-span-2">
                <FormField label="Address" required error={errors.address}>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows={3}
                    className={`${inputClasses} resize-none`}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-gray-900">
                Medical Information
              </h2>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Blood Group">
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </FormField>

              <FormField label="Known Allergies">
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., Penicillin, Sulfa drugs (comma separated)"
                  className={inputClasses}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-gray-900">
                Emergency Contact
              </h2>
            </div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="Contact Name">
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Relationship">
                <input
                  type="text"
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                  placeholder="e.g., Spouse, Parent"
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Contact Phone">
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="Emergency contact phone"
                  className={inputClasses}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pb-6">
          <Link
            href="/dashboard/patients"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Patient
          </button>
        </div>
      </form>
    </div>
  );
}

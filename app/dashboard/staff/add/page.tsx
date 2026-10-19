"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import SectionHeader from "@/components/ui/section-header";

const departments = ["General Medicine", "Cardiology", "Orthopedics", "Pediatrics", "Emergency", "Laboratory", "Radiology", "Pharmacy", "Nursing", "Billing", "Administration", "HR", "Inventory", "Operation Theatre", "ICU", "Blood Bank"];
const roles = ["Administrator", "Hospital Manager", "Doctor", "Nurse", "Receptionist", "Lab Technician", "Radiology Technician", "Pharmacist", "Accountant", "Inventory Manager", "HR Staff", "OT Staff", "ICU Staff", "Blood Bank Staff"];

export default function AddStaffPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", gender: "Male", address: "",
    jobTitle: "", department: "", role: "", joiningDate: "", employmentStatus: "Full-time", accountStatus: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Staff member added successfully! (Mock - no backend)");
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-6">
      <PageHeader title="Add Staff Member" description="Create a new staff account" actions={
        <Link href="/dashboard/staff" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Staff
        </Link>
      } />
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <SectionHeader title="Basic Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div><label className={labelClass}>Full Name *</label><input className={inputClass} value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required /></div>
            <div><label className={labelClass}>Email *</label><input type="email" className={inputClass} value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
            <div><label className={labelClass}>Phone *</label><input type="tel" className={inputClass} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
            <div><label className={labelClass}>Gender</label>
              <select className={inputClass} value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className={labelClass}>Address</label><textarea className={inputClass} rows={2} value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <SectionHeader title="Employment Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div><label className={labelClass}>Employee ID</label><input className={`${inputClass} bg-gray-50`} value="Auto-generated" readOnly /></div>
            <div><label className={labelClass}>Job Title *</label><input className={inputClass} value={form.jobTitle} onChange={e => setForm({...form, jobTitle: e.target.value})} required /></div>
            <div><label className={labelClass}>Department *</label>
              <select className={inputClass} value={form.department} onChange={e => setForm({...form, department: e.target.value})} required>
                <option value="">Select Department</option>
                {departments.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Role *</label>
              <select className={inputClass} value={form.role} onChange={e => setForm({...form, role: e.target.value})} required>
                <option value="">Select Role</option>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Joining Date *</label><input type="date" className={inputClass} value={form.joiningDate} onChange={e => setForm({...form, joiningDate: e.target.value})} required /></div>
            <div><label className={labelClass}>Employment Status</label>
              <select className={inputClass} value={form.employmentStatus} onChange={e => setForm({...form, employmentStatus: e.target.value})}>
                <option>Full-time</option><option>Part-time</option><option>Contract</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <SectionHeader title="Account" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div><label className={labelClass}>Username / Email</label><input className={`${inputClass} bg-gray-50`} value={form.email || "Auto from email"} readOnly /></div>
            <div><label className={labelClass}>Account Status</label>
              <select className={inputClass} value={form.accountStatus} onChange={e => setForm({...form, accountStatus: e.target.value})}>
                <option>Active</option><option>Inactive</option><option>Locked</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Staff Member
          </button>
          <Link href="/dashboard/staff" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

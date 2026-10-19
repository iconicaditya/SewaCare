"use client";

import { useState } from "react";
import { Save, Building2, Settings, Bell, Palette } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";

const tabs = [
  { id: "hospital", label: "Hospital Information", icon: Building2 },
  { id: "departments", label: "Departments" },
  { id: "services", label: "Services & Charges" },
  { id: "system", label: "System Preferences" },
  { id: "notifications", label: "Notification Preferences", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("hospital");

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="System configuration and preferences" />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "hospital" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <SectionHeader title="Hospital Information" description="Basic hospital details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Hospital Name</label><input className={inputClass} defaultValue="SewaCare Hospital" /></div>
            <div><label className={labelClass}>Phone</label><input className={inputClass} defaultValue="01-4221000" /></div>
            <div><label className={labelClass}>Email</label><input type="email" className={inputClass} defaultValue="info@sewacare.com" /></div>
            <div><label className={labelClass}>Website</label><input className={inputClass} defaultValue="www.sewacare.com" /></div>
            <div className="md:col-span-2"><label className={labelClass}>Address</label><input className={inputClass} defaultValue="New Baneshwor, Kathmandu, Nepal" /></div>
          </div>
          <div><label className={labelClass}>Logo</label>
            <div className="flex items-center gap-4 mt-1">
              <img src="/logo.png" alt="Hospital Logo" className="h-12 w-auto" />
              <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium">Change Logo</button>
            </div>
          </div>
          <button onClick={() => alert("Settings saved! (Mock)")} className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      )}
      {activeTab === "departments" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <SectionHeader title="Department Configuration" description="Manage active departments" />
          <p className="text-sm text-gray-500 mt-4">Department management is available at <a href="/dashboard/departments" className="text-emerald-600 hover:underline">Departments</a></p>
        </div>
      )}
      {activeTab === "services" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <SectionHeader title="Services & Charges" description="Manage hospital service pricing" />
          <p className="text-sm text-gray-500 mt-4">Service management is available at <a href="/dashboard/billing/services" className="text-emerald-600 hover:underline">Services & Charges</a></p>
        </div>
      )}
      {activeTab === "system" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <SectionHeader title="System Preferences" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Date Format</label>
              <select className={inputClass}><option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select>
            </div>
            <div><label className={labelClass}>Time Format</label>
              <select className={inputClass}><option>24 Hour</option><option>12 Hour</option></select>
            </div>
            <div><label className={labelClass}>Currency</label>
              <select className={inputClass}><option>NPR (रु)</option><option>USD ($)</option></select>
            </div>
            <div><label className={labelClass}>Language</label>
              <select className={inputClass}><option>English</option><option>Nepali</option></select>
            </div>
          </div>
          <button onClick={() => alert("Settings saved! (Mock)")} className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      )}
      {activeTab === "notifications" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <SectionHeader title="Notification Preferences" />
          <div className="space-y-4">
            {["New Appointment", "Appointment Reminder", "Lab Report Ready", "Radiology Report Ready", "Low Stock Alert", "Medicine Expiry Alert", "Bed Availability", "New Admission", "Discharge", "Staff Notification"].map((pref) => (
              <label key={pref} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700">{pref}</span>
                <div className="relative">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-emerald-500 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                </div>
              </label>
            ))}
          </div>
          <button onClick={() => alert("Notification preferences saved! (Mock)")} className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}

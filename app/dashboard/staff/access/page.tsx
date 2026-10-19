"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { staff } from "@/lib/mock/staff";

const sectionGroups = [
  { label: "CLINICAL", sections: ["Patients", "Reception", "Appointments", "Consultations", "Laboratory", "Radiology", "Emergency", "Hospitalization", "ICU", "Operation Theatre", "Blood Bank"] },
  { label: "PHARMACY & INVENTORY", sections: ["Pharmacy", "Inventory", "Equipment"] },
  { label: "FINANCE", sections: ["Billing", "Insurance", "Finance"] },
  { label: "STAFF", sections: ["Staff Management", "Departments"] },
  { label: "REPORTS", sections: ["Reports", "Notifications", "Documents", "Audit Logs"] },
  { label: "SYSTEM", sections: ["Settings"] },
];

export default function AccessManagementPage() {
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [access, setAccess] = useState<Record<string, boolean>>({});

  const selectedStaff = staff.find((s) => s.id === selectedStaffId);

  const toggleSection = (section: string) => {
    setAccess((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleAll = (sections: string[]) => {
    const allChecked = sections.every((s) => access[s]);
    const updated = { ...access };
    sections.forEach((s) => { updated[s] = !allChecked; });
    setAccess(updated);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Access Management" description="Assign section access to staff members" />
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Staff Member</label>
        <select
          className="w-full max-w-md border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
          value={selectedStaffId}
          onChange={(e) => {
            setSelectedStaffId(e.target.value);
            const s = staff.find((st) => st.id === e.target.value);
            if (s) {
              const initial: Record<string, boolean> = {};
              sectionGroups.forEach((g) => g.sections.forEach((sec) => { initial[sec] = false; }));
              setAccess(initial);
            }
          }}
        >
          <option value="">Choose a staff member...</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>{s.fullName} — {s.role} ({s.department})</option>
          ))}
        </select>
      </div>
      {selectedStaff && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                {selectedStaff.fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{selectedStaff.fullName}</p>
                <p className="text-xs text-gray-500">{selectedStaff.department} · {selectedStaff.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" defaultValue={selectedStaff.department}>
                  {[...new Set(staff.map(s => s.department))].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" defaultValue={selectedStaff.role}>
                  {["Administrator", "Hospital Manager", "Doctor", "Nurse", "Receptionist", "Lab Technician", "Radiology Technician", "Pharmacist", "Accountant", "Inventory Manager", "HR Staff", "OT Staff", "ICU Staff", "Blood Bank Staff"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>
          {sectionGroups.map((group) => (
            <div key={group.label} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{group.label}</h3>
                <button onClick={() => toggleAll(group.sections)} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                  {group.sections.every((s) => access[s]) ? "Unselect All" : "Select All"}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {group.sections.map((section) => (
                  <label key={section} className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${access[section] ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                    <input type="checkbox" checked={!!access[section]} onChange={() => toggleSection(section)} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm text-gray-700">{section}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <button onClick={() => alert("Access permissions saved! (Mock)")} className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium">
              Save Access Permissions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

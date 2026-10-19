"use client";

import { useState } from "react";
import { Stethoscope, Eye, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

const icuTreatments = [
  { id: "TRT-001", patientName: "Laxman Basnet", patientId: "PAT-015", treatmentType: "Mechanical Ventilation", medication: "Propofol + Fentanyl infusion", dose: "20-50 mcg/kg/min", startDate: "2026-09-12", status: "Active" },
  { id: "TRT-002", patientName: "Laxman Basnet", patientId: "PAT-015", treatmentType: "Vasopressor Support", medication: "Noradrenaline", dose: "0.05 mcg/kg/min", startDate: "2026-09-12", status: "Active" },
  { id: "TRT-003", patientName: "Laxman Basnet", patientId: "PAT-015", treatmentType: "Diuretic Therapy", medication: "Furosemide", dose: "40mg IV", startDate: "2026-09-12", status: "Active" },
  { id: "TRT-004", patientName: "Gopal Bisht", patientId: "PAT-011", treatmentType: "Post-Op Recovery", medication: "Paracetamol + Tramadol", dose: "1g + 50mg Q6H", startDate: "2026-09-01", status: "Active" },
  { id: "TRT-005", patientName: "Gopal Bisht", patientId: "PAT-011", treatmentType: "Cardiac Rehabilitation", medication: "Bisoprolol + Aspirin", dose: "5mg + 75mg daily", startDate: "2026-09-03", status: "Active" },
  { id: "TRT-006", patientName: "Ashok Khatri", patientId: "PAT-013", treatmentType: "Pain Management", medication: "Morphine PCA", dose: "1-2mg Q10min", startDate: "2026-09-09", status: "Completed" },
  { id: "TRT-007", patientName: "Ashok Khatri", patientId: "PAT-013", treatmentType: "Antibiotic Prophylaxis", medication: "Cefuroxime", dose: "750mg IV TDS", startDate: "2026-09-09", status: "Completed" },
  { id: "TRT-008", patientName: "Krishna Prasad Adhikari", patientId: "PAT-005", treatmentType: "Insulin Infusion", medication: "Regular Insulin", dose: "5 units/hr", startDate: "2026-09-12", status: "Active" },
  { id: "TRT-009", patientName: "Krishna Prasad Adhikari", patientId: "PAT-005", treatmentType: "Fluid Resuscitation", medication: "Normal Saline + RL", dose: "500ml/hr", startDate: "2026-09-12", status: "Completed" },
  { id: "TRT-010", patientName: "Deepa Karki", patientId: "PAT-008", treatmentType: "Antihistamine", medication: "Cetirizine + Ranitidine", dose: "10mg + 50mg IV", startDate: "2026-09-07", status: "Completed" },
  { id: "TRT-011", patientName: "Deepa Karki", patientId: "PAT-008", treatmentType: "Corticosteroid", medication: "Hydrocortisone", dose: "200mg IV stat", startDate: "2026-09-07", status: "Completed" },
];

export default function ICUTreatmentPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(icuTreatments.map((t) => t.status))];

  const columns = [
    {
      key: "id",
      label: "Treatment ID",
      sortable: true,
      render: (item: (typeof icuTreatments)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof icuTreatments)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-sm font-medium text-red-700 shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.patientName}</p>
            <p className="text-xs text-gray-500">{item.patientId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "treatmentType",
      label: "Treatment Type",
      sortable: true,
      render: (item: (typeof icuTreatments)[0]) => (
        <span className="text-gray-900 font-medium">{item.treatmentType}</span>
      ),
    },
    {
      key: "medication",
      label: "Medication / Dose",
      sortable: true,
      render: (item: (typeof icuTreatments)[0]) => (
        <div>
          <p className="text-sm text-gray-900">{item.medication}</p>
          <p className="text-xs text-gray-500">{item.dose}</p>
        </div>
      ),
    },
    {
      key: "startDate",
      label: "Start Date",
      sortable: true,
      render: (item: (typeof icuTreatments)[0]) => (
        <span className="text-gray-600 text-sm">{item.startDate}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof icuTreatments)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Active: "success",
          Completed: "info",
          Paused: "warning",
        };
        return (
          <StatusBadge
            status={item.status}
            variant={variantMap[item.status] || "default"}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="ICU Treatment"
        description="Current treatments and medications for ICU patients"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Add Treatment
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Treatments</p>
          <p className="text-2xl font-bold text-gray-900">{icuTreatments.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600">
            {icuTreatments.filter((t) => t.status === "Active").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-blue-600">
            {icuTreatments.filter((t) => t.status === "Completed").length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={icuTreatments.filter((t) => {
          if (statusFilter !== "all" && t.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search treatments..."
        searchKeys={["patientName", "treatmentType", "medication"]}
        actions={(item) => (
          <Dropdown
            trigger={
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </button>
            }
            items={[
              { label: "View Details", icon: Eye, onClick: () => {} },
              { label: "Edit", icon: Edit, onClick: () => {} },
              { label: "Delete", icon: Trash2, onClick: () => {}, variant: "danger" },
            ]}
          />
        )}
        pageSize={10}
        emptyMessage="No treatments found"
      />
    </div>
  );
}

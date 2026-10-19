"use client";

import { useState } from "react";
import { FileText, Eye, Edit, Trash2 } from "lucide-react";
import { prescriptions } from "@/lib/mock/prescriptions";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function PharmacyPrescriptionsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(prescriptions.map((p) => p.status))];

  const totalCount = prescriptions.length;
  const activeCount = prescriptions.filter((p) => p.status === "Active").length;
  const completedCount = prescriptions.filter((p) => p.status === "Completed").length;
  const cancelledCount = prescriptions.filter((p) => p.status === "Cancelled").length;

  const columns = [
    {
      key: "id",
      label: "Rx ID",
      sortable: true,
      render: (item: (typeof prescriptions)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof prescriptions)[0]) => (
        <span className="text-gray-900 font-medium">{item.patientName}</span>
      ),
    },
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof prescriptions)[0]) => (
        <span className="text-gray-600 text-sm">{item.doctorName}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: (typeof prescriptions)[0]) => (
        <span className="text-gray-600 text-sm">{item.date}</span>
      ),
    },
    {
      key: "medicines",
      label: "Medicines",
      sortable: false,
      render: (item: (typeof prescriptions)[0]) => (
        <div className="flex flex-wrap gap-1">
          {item.medicines.slice(0, 2).map((med, idx) => (
            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
              {med.name}
            </span>
          ))}
          {item.medicines.length > 2 && (
            <span className="text-xs text-gray-500">+{item.medicines.length - 2} more</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof prescriptions)[0]) => {
        const variantMap: Record<string, "success" | "info" | "danger"> = {
          Active: "success",
          Completed: "info",
          Cancelled: "danger",
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
        title="Prescriptions"
        description="View and manage pharmacy prescriptions"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            New Prescription
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Prescriptions</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
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
        data={prescriptions.filter((p) => {
          if (statusFilter !== "all" && p.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search by patient name..."
        searchKeys={["patientName", "doctorName"]}
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
        emptyMessage="No prescriptions found"
      />
    </div>
  );
}

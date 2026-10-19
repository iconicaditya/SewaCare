"use client";

import { useState } from "react";
import { ClipboardCheck, Eye, Edit, Trash2 } from "lucide-react";
import { dispensingRecords } from "@/lib/mock/pharmacy";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function DispensingPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(dispensingRecords.map((d) => d.status))];

  const totalCount = dispensingRecords.length;
  const dispensedCount = dispensingRecords.filter((d) => d.status === "Dispensed").length;
  const partialCount = dispensingRecords.filter((d) => d.status === "Partially Dispensed").length;
  const pendingCount = dispensingRecords.filter((d) => d.status === "Pending").length;

  const columns = [
    {
      key: "id",
      label: "Dispensing ID",
      sortable: true,
      render: (item: (typeof dispensingRecords)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "prescriptionId",
      label: "Prescription",
      sortable: true,
      render: (item: (typeof dispensingRecords)[0]) => (
        <span className="text-blue-600 text-sm font-medium">{item.prescriptionId}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof dispensingRecords)[0]) => (
        <span className="text-gray-900 font-medium">{item.patientName}</span>
      ),
    },
    {
      key: "medicines",
      label: "Medicines",
      sortable: false,
      render: (item: (typeof dispensingRecords)[0]) => (
        <div className="flex flex-col gap-0.5">
          {item.medicines.map((med, idx) => (
            <span key={idx} className="text-xs text-gray-600">
              {med.name} ({med.dispensed}/{med.quantity})
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "dispensedBy",
      label: "Dispensed By",
      sortable: true,
      render: (item: (typeof dispensingRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.dispensedBy}</span>
      ),
    },
    {
      key: "dispensedAt",
      label: "Date & Time",
      sortable: true,
      render: (item: (typeof dispensingRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.dispensedAt}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof dispensingRecords)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info"> = {
          Dispensed: "success",
          "Partially Dispensed": "warning",
          Pending: "info",
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
        title="Dispensing"
        description="Track medicine dispensing records"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            New Dispensing
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Dispensed</p>
          <p className="text-2xl font-bold text-emerald-600">{dispensedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Partially Dispensed</p>
          <p className="text-2xl font-bold text-amber-600">{partialCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-blue-600">{pendingCount}</p>
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
        data={dispensingRecords.filter((d) => {
          if (statusFilter !== "all" && d.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search dispensing records..."
        searchKeys={["patientName", "prescriptionId"]}
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
        emptyMessage="No dispensing records found"
      />
    </div>
  );
}

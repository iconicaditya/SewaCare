"use client";

import { useState } from "react";
import { ClipboardCheck, Eye, Edit, Trash2 } from "lucide-react";
import { surgeryRecords } from "@/lib/mock/operation-theatre";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function SurgeryRecordsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(surgeryRecords.map((r) => r.status))];

  const columns = [
    {
      key: "id",
      label: "Record ID",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700 shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span className="font-medium text-gray-900">{item.patientName}</span>
        </div>
      ),
    },
    {
      key: "surgeryType",
      label: "Procedure",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => (
        <p className="text-sm text-gray-900 max-w-[200px] truncate" title={item.surgeryType}>
          {item.surgeryType}
        </p>
      ),
    },
    {
      key: "surgeon",
      label: "Surgeon",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => (
        <span className="text-gray-700">{item.surgeon}</span>
      ),
    },
    {
      key: "startTime",
      label: "Start Time",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.startTime || "—"}</span>
      ),
    },
    {
      key: "endTime",
      label: "End Time",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.endTime || "—"}</span>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => (
        <span className="text-gray-700 text-sm">{item.duration || "—"}</span>
      ),
    },
    {
      key: "outcome",
      label: "Outcome",
      sortable: true,
      render: (item: (typeof surgeryRecords)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Completed: "success",
          "In Progress": "warning",
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
        title="Surgery Records"
        description="View completed and in-progress surgery records"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Add Record
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-2xl font-bold text-gray-900">{surgeryRecords.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">
            {surgeryRecords.filter((r) => r.status === "Completed").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-amber-600">
            {surgeryRecords.filter((r) => r.status === "In Progress").length}
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
        data={surgeryRecords.filter((r) => {
          if (statusFilter !== "all" && r.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search surgery records..."
        searchKeys={["patientName", "surgeryType", "surgeon", "id"]}
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
        emptyMessage="No surgery records found"
      />
    </div>
  );
}

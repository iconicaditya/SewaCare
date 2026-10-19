"use client";

import { useState } from "react";
import { Heart, Eye, Edit, Trash2, Activity } from "lucide-react";
import { icuPatients } from "@/lib/mock/icu";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function ICUPatientsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(icuPatients.map((p) => p.status))];

  const totalPatients = icuPatients.length;
  const criticalCount = icuPatients.filter((p) => p.status === "Critical").length;
  const stableCount = icuPatients.filter((p) => p.status === "Stable").length;
  const improvingCount = icuPatients.filter((p) => p.status === "Improving").length;

  const columns = [
    {
      key: "id",
      label: "Patient ID",
      sortable: true,
      render: (item: (typeof icuPatients)[0]) => (
        <span className="font-medium text-emerald-600">{item.patientId}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof icuPatients)[0]) => (
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
            <p className="text-xs text-gray-500">
              {item.age}y, {item.gender}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "diagnosis",
      label: "Condition",
      sortable: true,
      render: (item: (typeof icuPatients)[0]) => (
        <div>
          <p className="text-sm text-gray-900 max-w-[200px] truncate" title={item.diagnosis}>
            {item.diagnosis}
          </p>
          {item.ventilator && (
            <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium mt-0.5">
              <Activity className="h-3 w-3" /> Ventilator
            </span>
          )}
        </div>
      ),
    },
    {
      key: "bedNumber",
      label: "Bed",
      sortable: true,
      render: (item: (typeof icuPatients)[0]) => (
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
          {item.bedNumber}
        </span>
      ),
    },
    {
      key: "assignedDoctor",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof icuPatients)[0]) => (
        <span className="text-gray-700">{item.assignedDoctor}</span>
      ),
    },
    {
      key: "admissionDate",
      label: "Admission Date",
      sortable: true,
      render: (item: (typeof icuPatients)[0]) => (
        <span className="text-gray-600 text-sm">{item.admissionDate}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof icuPatients)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Critical: "danger",
          Stable: "success",
          Improving: "info",
          "Transfer Pending": "warning",
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
        title="ICU Patients"
        description="Monitor and manage intensive care unit patients"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Admit Patient
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total ICU Patients</p>
          <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Critical</p>
          <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Stable</p>
          <p className="text-2xl font-bold text-emerald-600">{stableCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Improving</p>
          <p className="text-2xl font-bold text-blue-600">{improvingCount}</p>
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
        data={icuPatients.filter((p) => {
          if (statusFilter !== "all" && p.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search ICU patients..."
        searchKeys={["patientName", "patientId", "diagnosis", "assignedDoctor"]}
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
        emptyMessage="No ICU patients found"
      />
    </div>
  );
}

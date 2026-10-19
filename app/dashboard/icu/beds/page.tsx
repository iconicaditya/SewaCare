"use client";

import { useState } from "react";
import { Bed, Eye, Edit, Trash2 } from "lucide-react";
import { icuBeds } from "@/lib/mock/icu";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function ICUBedsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const totalBeds = icuBeds.length;
  const availableCount = icuBeds.filter((b) => b.status === "Available").length;
  const occupiedCount = icuBeds.filter((b) => b.status === "Occupied").length;
  const maintenanceCount = icuBeds.filter((b) => b.status === "Maintenance").length;

  const columns = [
    {
      key: "id",
      label: "Bed ID",
      sortable: true,
      render: (item: (typeof icuBeds)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "number",
      label: "Bed Number",
      sortable: true,
      render: (item: (typeof icuBeds)[0]) => (
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
          {item.number}
        </span>
      ),
    },
    {
      key: "zone",
      label: "Zone",
      sortable: true,
      render: (item: (typeof icuBeds)[0]) => (
        <span className="text-gray-700">{item.zone}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof icuBeds)[0]) =>
        item.patientName ? (
          <div>
            <p className="font-medium text-gray-900">{item.patientName}</p>
            <p className="text-xs text-gray-500">{item.patientId}</p>
          </div>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: "ventilator",
      label: "Ventilator",
      sortable: true,
      render: (item: (typeof icuBeds)[0]) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            item.ventilator
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {item.ventilator ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof icuBeds)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Available: "success",
          Occupied: "info",
          Maintenance: "danger",
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
        title="ICU Beds"
        description="Manage ICU bed allocations and availability"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Bed className="h-4 w-4" />
            Add Bed
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Beds</p>
          <p className="text-2xl font-bold text-gray-900">{totalBeds}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Available</p>
          <p className="text-2xl font-bold text-emerald-600">{availableCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Occupied</p>
          <p className="text-2xl font-bold text-blue-600">{occupiedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Maintenance</p>
          <p className="text-2xl font-bold text-red-600">{maintenanceCount}</p>
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
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={icuBeds.filter((b) => {
          if (statusFilter !== "all" && b.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search ICU beds..."
        searchKeys={["number", "zone", "patientName", "id"]}
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
        emptyMessage="No ICU beds found"
      />
    </div>
  );
}

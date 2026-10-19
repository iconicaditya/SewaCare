"use client";

import { useState } from "react";
import { Scissors, Eye, Edit, Trash2 } from "lucide-react";
import { operationTheatres } from "@/lib/mock/operation-theatre";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function OperationTheatresPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const totalOTs = operationTheatres.length;
  const availableCount = operationTheatres.filter((o) => o.status === "Available").length;
  const occupiedCount = operationTheatres.filter((o) => o.status === "Occupied").length;
  const maintenanceCount = operationTheatres.filter((o) => o.status === "Maintenance").length;

  const columns = [
    {
      key: "id",
      label: "OT ID",
      sortable: true,
      render: (item: (typeof operationTheatres)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "OT Name",
      sortable: true,
      render: (item: (typeof operationTheatres)[0]) => (
        <span className="font-medium text-gray-900">{item.name}</span>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      render: (item: (typeof operationTheatres)[0]) => {
        const colorMap: Record<string, string> = {
          "Major Surgery": "bg-blue-100 text-blue-700",
          "Minor Surgery": "bg-green-100 text-green-700",
          Interventional: "bg-purple-100 text-purple-700",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              colorMap[item.type] || "bg-gray-100 text-gray-700"
            }`}
          >
            {item.type}
          </span>
        );
      },
    },
    {
      key: "equipment",
      label: "Equipment",
      sortable: false,
      render: (item: (typeof operationTheatres)[0]) => (
        <div className="flex flex-wrap gap-1">
          {item.equipment.slice(0, 3).map((eq) => (
            <span
              key={eq}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
            >
              {eq}
            </span>
          ))}
          {item.equipment.length > 3 && (
            <span className="text-xs text-gray-400">+{item.equipment.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: "lastSterilized",
      label: "Last Sterilized",
      sortable: true,
      render: (item: (typeof operationTheatres)[0]) => (
        <span className="text-gray-600 text-sm">{item.lastSterilized}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof operationTheatres)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Available: "success",
          Occupied: "warning",
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
        title="Operation Theatres"
        description="Manage operation theatres and equipment"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Scissors className="h-4 w-4" />
            Add OT
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total OTs</p>
          <p className="text-2xl font-bold text-gray-900">{totalOTs}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Available</p>
          <p className="text-2xl font-bold text-emerald-600">{availableCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Occupied</p>
          <p className="text-2xl font-bold text-amber-600">{occupiedCount}</p>
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
        data={operationTheatres.filter((o) => {
          if (statusFilter !== "all" && o.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search operation theatres..."
        searchKeys={["name", "type", "id"]}
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
        emptyMessage="No operation theatres found"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Wrench, Eye, Edit, Trash2 } from "lucide-react";
import { maintenanceRecords } from "@/lib/mock/equipment";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function MaintenancePage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const types = [...new Set(maintenanceRecords.map((m) => m.maintenanceType))];
  const statuses = [...new Set(maintenanceRecords.map((m) => m.status))];

  const totalCount = maintenanceRecords.length;
  const completedCount = maintenanceRecords.filter((m) => m.status === "Completed").length;
  const inProgressCount = maintenanceRecords.filter((m) => m.status === "In Progress").length;
  const scheduledCount = maintenanceRecords.filter((m) => m.status === "Scheduled").length;
  const totalCost = maintenanceRecords.reduce((sum, m) => sum + m.cost, 0);

  const columns = [
    {
      key: "id",
      label: "Maintenance ID",
      sortable: true,
      render: (item: (typeof maintenanceRecords)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "equipmentName",
      label: "Equipment",
      sortable: true,
      render: (item: (typeof maintenanceRecords)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.equipmentName}</p>
          <p className="text-xs text-gray-500">{item.equipmentId}</p>
        </div>
      ),
    },
    {
      key: "scheduledDate",
      label: "Maintenance Date",
      sortable: true,
      render: (item: (typeof maintenanceRecords)[0]) => (
        <div>
          <p className="text-sm text-gray-900">{item.scheduledDate}</p>
          {item.completedDate && (
            <p className="text-xs text-gray-500">Completed: {item.completedDate}</p>
          )}
        </div>
      ),
    },
    {
      key: "maintenanceType",
      label: "Type",
      sortable: true,
      render: (item: (typeof maintenanceRecords)[0]) => {
        const typeColorMap: Record<string, string> = {
          Preventive: "bg-blue-100 text-blue-700",
          Corrective: "bg-amber-100 text-amber-700",
          Calibration: "bg-purple-100 text-purple-700",
          Emergency: "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColorMap[item.maintenanceType] || "bg-gray-100 text-gray-700"}`}
          >
            {item.maintenanceType}
          </span>
        );
      },
    },
    {
      key: "technician",
      label: "Technician/Vendor",
      sortable: true,
      render: (item: (typeof maintenanceRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.technician}</span>
      ),
    },
    {
      key: "cost",
      label: "Cost",
      sortable: true,
      render: (item: (typeof maintenanceRecords)[0]) => (
        <span className="text-gray-900 font-medium">NPR {item.cost.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof maintenanceRecords)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "danger" | "info"> = {
          Completed: "success",
          "In Progress": "warning",
          Scheduled: "info",
          Overdue: "danger",
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
        title="Maintenance Records"
        description="Track and manage equipment maintenance schedules"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Schedule Maintenance
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-amber-600">{inProgressCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Scheduled</p>
          <p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-2xl font-bold text-gray-900">NPR {totalCost.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
        data={maintenanceRecords.filter((m) => {
          if (typeFilter !== "all" && m.maintenanceType !== typeFilter) return false;
          if (statusFilter !== "all" && m.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search maintenance records..."
        searchKeys={["equipmentName", "technician", "description"]}
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
        emptyMessage="No maintenance records found"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Monitor, Eye, Edit, Trash2, Wrench } from "lucide-react";
import { equipmentList } from "@/lib/mock/equipment";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function EquipmentListPage() {
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const departments = [...new Set(equipmentList.map((e) => e.department))];
  const statuses = [...new Set(equipmentList.map((e) => e.status))];

  const totalCount = equipmentList.length;
  const operationalCount = equipmentList.filter((e) => e.status === "Operational").length;
  const maintenanceCount = equipmentList.filter((e) => e.status === "Under Maintenance").length;
  const outOfServiceCount = equipmentList.filter((e) => e.status === "Out of Service").length;

  const statusLabel: Record<string, string> = {
    Operational: "Active",
    "Under Maintenance": "Maintenance",
    "Out of Service": "Out of Service",
    Retired: "Out of Service",
  };

  const columns = [
    {
      key: "id",
      label: "Asset ID",
      sortable: true,
      render: (item: (typeof equipmentList)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Equipment Name",
      sortable: true,
      render: (item: (typeof equipmentList)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">{item.model}</p>
        </div>
      ),
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (item: (typeof equipmentList)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          {item.department}
        </span>
      ),
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      render: (item: (typeof equipmentList)[0]) => (
        <span className="text-gray-600 text-sm">{item.location}</span>
      ),
    },
    {
      key: "purchaseDate",
      label: "Purchase Date",
      sortable: true,
      render: (item: (typeof equipmentList)[0]) => (
        <span className="text-gray-600 text-sm">{item.purchaseDate}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof equipmentList)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "danger"> = {
          Operational: "success",
          "Under Maintenance": "warning",
          "Out of Service": "danger",
          Retired: "danger",
        };
        return (
          <StatusBadge
            status={statusLabel[item.status] || item.status}
            variant={variantMap[item.status] || "default"}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipment List"
        description="Manage hospital equipment and assets"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Add Equipment
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Equipment</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{operationalCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Under Maintenance</p>
          <p className="text-2xl font-bold text-amber-600">{maintenanceCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Out of Service</p>
          <p className="text-2xl font-bold text-red-600">{outOfServiceCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
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
        data={equipmentList.filter((e) => {
          if (departmentFilter !== "all" && e.department !== departmentFilter) return false;
          if (statusFilter !== "all" && e.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search equipment..."
        searchKeys={["name", "model", "manufacturer", "department", "location"]}
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
              { label: "Maintenance History", icon: Wrench, onClick: () => {} },
              { label: "Edit", icon: Edit, onClick: () => {} },
              { label: "Delete", icon: Trash2, onClick: () => {}, variant: "danger" },
            ]}
          />
        )}
        pageSize={10}
        emptyMessage="No equipment found"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Droplets, Eye, Edit, Trash2 } from "lucide-react";
import { bloodInventory } from "@/lib/mock/blood-bank";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function BloodInventoryPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");

  const statuses = [...new Set(bloodInventory.map((b) => b.status))];
  const bloodGroups = [...new Set(bloodInventory.map((b) => b.bloodGroup))];

  const totalUnits = bloodInventory.reduce((sum, b) => sum + b.units, 0);
  const availableUnits = bloodInventory
    .filter((b) => b.status === "Available")
    .reduce((sum, b) => sum + b.units, 0);

  const groupSummary = bloodGroups.map((group) => ({
    group,
    available: bloodInventory
      .filter((b) => b.bloodGroup === group && b.status === "Available")
      .reduce((sum, b) => sum + b.units, 0),
    total: bloodInventory
      .filter((b) => b.bloodGroup === group)
      .reduce((sum, b) => sum + b.units, 0),
  }));

  const columns = [
    {
      key: "id",
      label: "Unit ID",
      sortable: true,
      render: (item: (typeof bloodInventory)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "bloodGroup",
      label: "Blood Group",
      sortable: true,
      render: (item: (typeof bloodInventory)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
          {item.bloodGroup}
        </span>
      ),
    },
    {
      key: "units",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof bloodInventory)[0]) => (
        <span className="text-gray-900 font-medium">{item.units} units</span>
      ),
    },
    {
      key: "collectionDate",
      label: "Collection Date",
      sortable: true,
      render: (item: (typeof bloodInventory)[0]) => (
        <span className="text-gray-600 text-sm">{item.collectionDate}</span>
      ),
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      sortable: true,
      render: (item: (typeof bloodInventory)[0]) => {
        const isExpired = new Date(item.expiryDate) < new Date("2026-09-13");
        return (
          <span className={`text-sm ${isExpired ? "text-red-600 font-medium" : "text-gray-600"}`}>
            {item.expiryDate}
          </span>
        );
      },
    },
    {
      key: "tested",
      label: "Tested",
      sortable: true,
      render: (item: (typeof bloodInventory)[0]) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            item.tested
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {item.tested ? "Yes" : "Pending"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof bloodInventory)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Available: "success",
          Reserved: "warning",
          Issued: "info",
          Expired: "danger",
          Discarded: "danger",
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
        title="Blood Inventory"
        description="Manage blood bank inventory and stock levels"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Add Unit
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Units</p>
          <p className="text-2xl font-bold text-gray-900">{totalUnits}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Available</p>
          <p className="text-2xl font-bold text-emerald-600">{availableUnits}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Reserved</p>
          <p className="text-2xl font-bold text-amber-600">
            {bloodInventory.filter((b) => b.status === "Reserved").reduce((sum, b) => sum + b.units, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Expired</p>
          <p className="text-2xl font-bold text-red-600">
            {bloodInventory.filter((b) => b.status === "Expired").reduce((sum, b) => sum + b.units, 0)}
          </p>
        </div>
      </div>

      {/* Blood Group Summary */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Available by Blood Group</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {groupSummary.map((g) => (
            <div key={g.group} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 border border-red-200 mb-1">
                <span className="text-sm font-bold text-red-700">{g.group}</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{g.available}</p>
              <p className="text-xs text-gray-500">of {g.total}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
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
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Blood Groups</option>
          {bloodGroups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={bloodInventory.filter((b) => {
          if (statusFilter !== "all" && b.status !== statusFilter) return false;
          if (groupFilter !== "all" && b.bloodGroup !== groupFilter) return false;
          return true;
        })}
        searchPlaceholder="Search blood inventory..."
        searchKeys={["id", "bloodGroup"]}
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
        emptyMessage="No blood units found"
      />
    </div>
  );
}

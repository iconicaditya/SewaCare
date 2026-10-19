"use client";

import { useState } from "react";
import { Pill, Eye, Edit, Trash2 } from "lucide-react";
import { medicines } from "@/lib/mock/pharmacy";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function MedicinesPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = [...new Set(medicines.map((m) => m.category))];
  const statuses = [...new Set(medicines.map((m) => m.status))];

  const totalMedicines = medicines.length;
  const activeCount = medicines.filter((m) => m.status === "Active").length;
  const inactiveCount = medicines.filter((m) => m.status === "Inactive").length;
  const discontinuedCount = medicines.filter((m) => m.status === "Discontinued").length;

  const columns = [
    {
      key: "id",
      label: "Medicine ID",
      sortable: true,
      render: (item: (typeof medicines)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item: (typeof medicines)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">{item.genericName}</p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: (typeof medicines)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          {item.category}
        </span>
      ),
    },
    {
      key: "form",
      label: "Form",
      sortable: true,
      render: (item: (typeof medicines)[0]) => (
        <span className="text-gray-600 text-sm">{item.form}</span>
      ),
    },
    {
      key: "strength",
      label: "Strength",
      sortable: true,
      render: (item: (typeof medicines)[0]) => (
        <span className="text-gray-600 text-sm">{item.strength}</span>
      ),
    },
    {
      key: "manufacturer",
      label: "Manufacturer",
      sortable: true,
      render: (item: (typeof medicines)[0]) => (
        <span className="text-gray-600 text-sm">{item.manufacturer}</span>
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (item: (typeof medicines)[0]) => (
        <span className="text-gray-900 font-medium">NPR {item.price}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof medicines)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "danger"> = {
          Active: "success",
          Inactive: "warning",
          Discontinued: "danger",
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
        title="Medicines"
        description="Manage pharmacy medicine catalog"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Add Medicine
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Medicines</p>
          <p className="text-2xl font-bold text-gray-900">{totalMedicines}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-amber-600">{inactiveCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Discontinued</p>
          <p className="text-2xl font-bold text-red-600">{discontinuedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
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
        data={medicines.filter((m) => {
          if (categoryFilter !== "all" && m.category !== categoryFilter) return false;
          if (statusFilter !== "all" && m.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search medicines..."
        searchKeys={["name", "genericName", "manufacturer"]}
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
        emptyMessage="No medicines found"
      />
    </div>
  );
}

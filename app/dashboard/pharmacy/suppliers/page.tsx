"use client";

import { Truck, Eye, Edit, Trash2 } from "lucide-react";
import { pharmacySuppliers } from "@/lib/mock/pharmacy";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function SuppliersPage() {
  const totalSuppliers = pharmacySuppliers.length;
  const activeCount = pharmacySuppliers.filter((s) => s.status === "Active").length;
  const inactiveCount = pharmacySuppliers.filter((s) => s.status === "Inactive").length;

  const columns = [
    {
      key: "id",
      label: "Supplier ID",
      sortable: true,
      render: (item: (typeof pharmacySuppliers)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item: (typeof pharmacySuppliers)[0]) => (
        <span className="text-gray-900 font-medium">{item.name}</span>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      sortable: true,
      render: (item: (typeof pharmacySuppliers)[0]) => (
        <span className="text-gray-600 text-sm">{item.contact}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      render: (item: (typeof pharmacySuppliers)[0]) => (
        <span className="text-blue-600 text-sm">{item.email}</span>
      ),
    },
    {
      key: "address",
      label: "Address",
      sortable: true,
      render: (item: (typeof pharmacySuppliers)[0]) => (
        <span className="text-gray-600 text-sm">{item.address}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof pharmacySuppliers)[0]) => {
        const variantMap: Record<string, "success" | "danger"> = {
          Active: "success",
          Inactive: "danger",
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
        title="Suppliers"
        description="Manage pharmacy suppliers and vendors"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Add Supplier
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Suppliers</p>
          <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={pharmacySuppliers}
        searchPlaceholder="Search suppliers..."
        searchKeys={["name", "email", "address"]}
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
        emptyMessage="No suppliers found"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Package, AlertTriangle, Eye, Edit, Trash2 } from "lucide-react";
import { stockItems } from "@/lib/mock/pharmacy";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function StockPage() {
  const [search, setSearch] = useState("");

  const today = new Date("2026-09-13");

  const isLowStock = (qty: number, reorder: number) => qty <= reorder;

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < today;
  };

  const totalItems = stockItems.length;
  const lowStockCount = stockItems.filter((s) => isLowStock(s.quantity, s.reorderLevel)).length;
  const expiringSoonCount = stockItems.filter((s) => isExpiringSoon(s.expiryDate)).length;
  const expiredCount = stockItems.filter((s) => isExpired(s.expiryDate)).length;

  const columns = [
    {
      key: "id",
      label: "Stock ID",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "medicineName",
      label: "Medicine",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.medicineName}</p>
          <p className="text-xs text-gray-500">{item.medicineId}</p>
        </div>
      ),
    },
    {
      key: "batchNumber",
      label: "Batch No.",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => (
        <span className="text-gray-600 text-sm font-mono">{item.batchNumber}</span>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => {
        const low = isLowStock(item.quantity, item.reorderLevel);
        return (
          <span className={`font-medium ${low ? "text-red-600" : "text-gray-900"}`}>
            {item.quantity}
          </span>
        );
      },
    },
    {
      key: "reorderLevel",
      label: "Reorder Level",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => (
        <span className="text-gray-600 text-sm">{item.reorderLevel}</span>
      ),
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => {
        const expired = isExpired(item.expiryDate);
        const expiringSoon = isExpiringSoon(item.expiryDate);
        return (
          <span className={`text-sm ${expired ? "text-red-600 font-medium" : expiringSoon ? "text-amber-600 font-medium" : "text-gray-600"}`}>
            {item.expiryDate}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      render: (item: (typeof stockItems)[0]) => {
        if (isExpired(item.expiryDate)) {
          return <StatusBadge status="Expired" variant="danger" />;
        }
        if (isLowStock(item.quantity, item.reorderLevel)) {
          return <StatusBadge status="Low Stock" variant="danger" />;
        }
        if (isExpiringSoon(item.expiryDate)) {
          return <StatusBadge status="Expiring Soon" variant="warning" />;
        }
        return <StatusBadge status="OK" variant="success" />;
      },
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => (
        <span className="text-gray-600 text-sm">{item.lastUpdated}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Management"
        description="Track medicine stock levels and inventory"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Add Stock
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <p className="text-sm text-gray-500">Low Stock</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{lowStockCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-sm text-gray-500">Expiring Soon</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{expiringSoonCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Expired</p>
          <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={stockItems}
        searchPlaceholder="Search stock items..."
        searchKeys={["medicineName", "batchNumber"]}
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
        emptyMessage="No stock items found"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Boxes, Eye, Edit, Trash2 } from "lucide-react";
import { inventoryStock } from "@/lib/mock/inventory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function InventoryStockPage() {
  const [locationFilter, setLocationFilter] = useState("all");

  const locations = [...new Set(inventoryStock.map((s) => s.location))];

  const getStockStatus = (stock: (typeof inventoryStock)[0]): "In Stock" | "Low Stock" | "Out of Stock" => {
    if (stock.quantity === 0) return "Out of Stock";
    if (stock.quantity <= stock.reorderLevel) return "Low Stock";
    return "In Stock";
  };

  const totalItems = inventoryStock.length;
  const totalQuantity = inventoryStock.reduce((sum, s) => sum + s.quantity, 0);
  const lowStockCount = inventoryStock.filter((s) => getStockStatus(s) === "Low Stock").length;
  const outOfStockCount = inventoryStock.filter((s) => getStockStatus(s) === "Out of Stock").length;

  const columns = [
    {
      key: "id",
      label: "Stock ID",
      sortable: true,
      render: (item: (typeof inventoryStock)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "itemName",
      label: "Item",
      sortable: true,
      render: (item: (typeof inventoryStock)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.itemName}</p>
          <p className="text-xs text-gray-500">{item.itemId}</p>
        </div>
      ),
    },
    {
      key: "batchNumber",
      label: "Batch Number",
      sortable: true,
      render: (item: (typeof inventoryStock)[0]) => (
        <span className="text-gray-600 text-sm font-mono">{item.batchNumber}</span>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof inventoryStock)[0]) => (
        <span className="text-gray-900 font-medium">{item.quantity}</span>
      ),
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      render: (item: (typeof inventoryStock)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {item.location}
        </span>
      ),
    },
    {
      key: "lastUpdated",
      label: "Last Updated",
      sortable: true,
      render: (item: (typeof inventoryStock)[0]) => (
        <span className="text-gray-600 text-sm">{item.lastUpdated}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof inventoryStock)[0]) => {
        const stockStatus = getStockStatus(item);
        const variantMap: Record<string, "success" | "warning" | "danger"> = {
          "In Stock": "success",
          "Low Stock": "warning",
          "Out of Stock": "danger",
        };
        return (
          <StatusBadge
            status={stockStatus}
            variant={variantMap[stockStatus] || "default"}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Management"
        description="Track and manage inventory stock levels"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Boxes className="h-4 w-4" />
            Add Stock
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Stock Entries</p>
          <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Quantity</p>
          <p className="text-2xl font-bold text-emerald-600">{totalQuantity}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={inventoryStock.filter((s) => {
          if (locationFilter !== "all" && s.location !== locationFilter) return false;
          return true;
        })}
        searchPlaceholder="Search stock..."
        searchKeys={["itemName", "batchNumber", "location"]}
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
        emptyMessage="No stock entries found"
      />
    </div>
  );
}

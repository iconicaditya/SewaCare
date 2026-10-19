"use client";

import { useState } from "react";
import { Package, Eye, Edit, Trash2 } from "lucide-react";
import { inventoryItems, inventoryStock } from "@/lib/mock/inventory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function InventoryItemsPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [...new Set(inventoryItems.map((i) => i.category))];

  const getStockInfo = (itemId: string) => {
    const stockEntries = inventoryStock.filter((s) => s.itemId === itemId);
    const totalQuantity = stockEntries.reduce((sum, s) => sum + s.quantity, 0);
    const minStock = stockEntries.length > 0 ? Math.min(...stockEntries.map((s) => s.reorderLevel)) : 0;
    return { currentStock: totalQuantity, minimumStock: minStock };
  };

  const getStockStatus = (itemId: string): "In Stock" | "Low Stock" | "Out of Stock" => {
    const { currentStock, minimumStock } = getStockInfo(itemId);
    if (currentStock === 0) return "Out of Stock";
    if (currentStock <= minimumStock) return "Low Stock";
    return "In Stock";
  };

  const totalItems = inventoryItems.length;
  const inStockCount = inventoryItems.filter((i) => getStockStatus(i.id) === "In Stock").length;
  const lowStockCount = inventoryItems.filter((i) => getStockStatus(i.id) === "Low Stock").length;
  const outOfStockCount = inventoryItems.filter((i) => getStockStatus(i.id) === "Out of Stock").length;

  const columns = [
    {
      key: "id",
      label: "Item ID",
      sortable: true,
      render: (item: (typeof inventoryItems)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Item Name",
      sortable: true,
      render: (item: (typeof inventoryItems)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: (typeof inventoryItems)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          {item.category}
        </span>
      ),
    },
    {
      key: "unit",
      label: "Unit",
      sortable: true,
      render: (item: (typeof inventoryItems)[0]) => (
        <span className="text-gray-600 text-sm">{item.unit}</span>
      ),
    },
    {
      key: "currentStock",
      label: "Current Stock",
      sortable: true,
      render: (item: (typeof inventoryItems)[0]) => {
        const { currentStock } = getStockInfo(item.id);
        return <span className="text-gray-900 font-medium">{currentStock}</span>;
      },
    },
    {
      key: "minimumStock",
      label: "Minimum Stock",
      sortable: true,
      render: (item: (typeof inventoryItems)[0]) => {
        const { minimumStock } = getStockInfo(item.id);
        return <span className="text-gray-600 text-sm">{minimumStock}</span>;
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof inventoryItems)[0]) => {
        const stockStatus = getStockStatus(item.id);
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
        title="Inventory Items"
        description="Manage hospital inventory items catalog"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Add Item
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
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold text-emerald-600">{inStockCount}</p>
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
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={inventoryItems.filter((i) => {
          if (categoryFilter !== "all" && i.category !== categoryFilter) return false;
          return true;
        })}
        searchPlaceholder="Search items..."
        searchKeys={["name", "category", "description"]}
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
        emptyMessage="No items found"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { ShoppingCart, Eye, Edit, Trash2 } from "lucide-react";
import { purchaseOrders } from "@/lib/mock/inventory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function PurchaseOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");

  const statuses = [...new Set(purchaseOrders.map((o) => o.status))];
  const suppliers = [...new Set(purchaseOrders.map((o) => o.supplierName))];

  const totalOrders = purchaseOrders.length;
  const totalValue = purchaseOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const sentCount = purchaseOrders.filter((o) => o.status === "Sent").length;
  const deliveredCount = purchaseOrders.filter((o) => o.status === "Delivered").length;

  const columns = [
    {
      key: "id",
      label: "Order ID",
      sortable: true,
      render: (item: (typeof purchaseOrders)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "supplierName",
      label: "Supplier",
      sortable: true,
      render: (item: (typeof purchaseOrders)[0]) => (
        <span className="text-gray-900 font-medium">{item.supplierName}</span>
      ),
    },
    {
      key: "items",
      label: "Items",
      sortable: false,
      render: (item: (typeof purchaseOrders)[0]) => (
        <div className="text-sm">
          {item.items.map((it, idx) => (
            <p key={idx} className="text-gray-700">
              {it.name} <span className="text-gray-400">x{it.quantity}</span>
            </p>
          ))}
        </div>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof purchaseOrders)[0]) => {
        const totalQty = item.items.reduce((sum, it) => sum + it.quantity, 0);
        return <span className="text-gray-900 font-medium">{totalQty}</span>;
      },
    },
    {
      key: "unitPrice",
      label: "Unit Price",
      sortable: true,
      render: (item: (typeof purchaseOrders)[0]) => (
        <span className="text-gray-600 text-sm">
          NPR {item.items.length > 0 ? item.items[0].unitPrice.toLocaleString() : 0}
        </span>
      ),
    },
    {
      key: "totalAmount",
      label: "Total",
      sortable: true,
      render: (item: (typeof purchaseOrders)[0]) => (
        <span className="text-gray-900 font-medium">NPR {item.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      key: "orderDate",
      label: "Order Date",
      sortable: true,
      render: (item: (typeof purchaseOrders)[0]) => (
        <span className="text-gray-600 text-sm">{item.orderDate}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof purchaseOrders)[0]) => {
        const variantMap: Record<string, "info" | "success" | "danger"> = {
          Sent: "info",
          Confirmed: "info",
          Delivered: "success",
          Cancelled: "danger",
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
        title="Purchase Orders"
        description="Track and manage inventory purchase orders"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            New Order
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold text-emerald-600">NPR {totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">In Transit</p>
          <p className="text-2xl font-bold text-blue-600">{sentCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-emerald-600">{deliveredCount}</p>
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
          value={supplierFilter}
          onChange={(e) => setSupplierFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Suppliers</option>
          {suppliers.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={purchaseOrders.filter((o) => {
          if (statusFilter !== "all" && o.status !== statusFilter) return false;
          if (supplierFilter !== "all" && o.supplierName !== supplierFilter) return false;
          return true;
        })}
        searchPlaceholder="Search orders..."
        searchKeys={["id", "supplierName"]}
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
        emptyMessage="No purchase orders found"
      />
    </div>
  );
}

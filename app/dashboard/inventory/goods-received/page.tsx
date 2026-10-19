"use client";

import { useState } from "react";
import { Truck, Eye, Edit, Trash2 } from "lucide-react";
import { goodsReceived } from "@/lib/mock/inventory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function GoodsReceivedPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(goodsReceived.map((g) => g.status))];

  const totalGRN = goodsReceived.length;
  const acceptedCount = goodsReceived.filter((g) => g.status === "Accepted").length;
  const partialCount = goodsReceived.filter((g) => g.status === "Partially Accepted").length;
  const rejectedCount = goodsReceived.filter((g) => g.status === "Rejected").length;

  const columns = [
    {
      key: "id",
      label: "GRN ID",
      sortable: true,
      render: (item: (typeof goodsReceived)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "orderId",
      label: "Purchase Order",
      sortable: true,
      render: (item: (typeof goodsReceived)[0]) => (
        <span className="text-gray-900 font-medium">{item.orderId}</span>
      ),
    },
    {
      key: "supplierName",
      label: "Supplier",
      sortable: true,
      render: (item: (typeof goodsReceived)[0]) => (
        <span className="text-gray-700">{item.supplierName}</span>
      ),
    },
    {
      key: "items",
      label: "Items",
      sortable: false,
      render: (item: (typeof goodsReceived)[0]) => (
        <div className="text-sm">
          {item.items.map((it, idx) => (
            <p key={idx} className="text-gray-700">
              {it.name}{" "}
              <span className="text-gray-400">
                {it.received}/{it.ordered}
              </span>
              {it.condition === "Damaged" && (
                <span className="ml-1 text-red-500 text-xs">(Damaged)</span>
              )}
            </p>
          ))}
        </div>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof goodsReceived)[0]) => {
        const totalReceived = item.items.reduce((sum, it) => sum + it.received, 0);
        return <span className="text-gray-900 font-medium">{totalReceived}</span>;
      },
    },
    {
      key: "receivedDate",
      label: "Received Date",
      sortable: true,
      render: (item: (typeof goodsReceived)[0]) => (
        <span className="text-gray-600 text-sm">{item.receivedDate}</span>
      ),
    },
    {
      key: "receivedBy",
      label: "Received By",
      sortable: true,
      render: (item: (typeof goodsReceived)[0]) => (
        <span className="text-gray-600 text-sm">{item.receivedBy}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof goodsReceived)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "danger"> = {
          Accepted: "success",
          "Partially Accepted": "warning",
          Rejected: "danger",
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
        title="Goods Received"
        description="Track received inventory shipments"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Record Receipt
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total GRNs</p>
          <p className="text-2xl font-bold text-gray-900">{totalGRN}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-2xl font-bold text-emerald-600">{acceptedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Partially Accepted</p>
          <p className="text-2xl font-bold text-amber-600">{partialCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
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
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={goodsReceived.filter((g) => {
          if (statusFilter !== "all" && g.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search goods received..."
        searchKeys={["id", "orderId", "supplierName", "receivedBy"]}
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
        emptyMessage="No goods received records found"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { ClipboardList, Eye, Edit, Trash2 } from "lucide-react";
import { purchaseRequests } from "@/lib/mock/inventory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function PurchaseRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const statuses = [...new Set(purchaseRequests.map((r) => r.status))];
  const urgencies = [...new Set(purchaseRequests.map((r) => r.urgency))];

  const totalRequests = purchaseRequests.length;
  const pendingCount = purchaseRequests.filter((r) => r.status === "Pending").length;
  const approvedCount = purchaseRequests.filter((r) => r.status === "Approved").length;
  const orderedCount = purchaseRequests.filter((r) => r.status === "Ordered").length;

  const columns = [
    {
      key: "requestId",
      label: "Request ID",
      sortable: true,
      render: (item: (typeof purchaseRequests)[0]) => (
        <span className="font-medium text-emerald-600">{item.requestId}</span>
      ),
    },
    {
      key: "requestedBy",
      label: "Requested By",
      sortable: true,
      render: (item: (typeof purchaseRequests)[0]) => (
        <span className="text-gray-900 font-medium">{item.requestedBy}</span>
      ),
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (item: (typeof purchaseRequests)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          {item.department}
        </span>
      ),
    },
    {
      key: "items",
      label: "Items",
      sortable: false,
      render: (item: (typeof purchaseRequests)[0]) => (
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
      key: "totalEstimatedCost",
      label: "Est. Cost",
      sortable: true,
      render: (item: (typeof purchaseRequests)[0]) => (
        <span className="text-gray-900 font-medium">NPR {item.totalEstimatedCost.toLocaleString()}</span>
      ),
    },
    {
      key: "requestDate",
      label: "Date",
      sortable: true,
      render: (item: (typeof purchaseRequests)[0]) => (
        <span className="text-gray-600 text-sm">{item.requestDate}</span>
      ),
    },
    {
      key: "urgency",
      label: "Urgency",
      sortable: true,
      render: (item: (typeof purchaseRequests)[0]) => {
        const variantMap: Record<string, "danger" | "warning" | "info"> = {
          High: "danger",
          Medium: "warning",
          Low: "info",
        };
        return (
          <StatusBadge
            status={item.urgency}
            variant={variantMap[item.urgency] || "default"}
          />
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof purchaseRequests)[0]) => {
        const variantMap: Record<string, "warning" | "success" | "danger" | "info"> = {
          Pending: "warning",
          Approved: "success",
          Rejected: "danger",
          Ordered: "info",
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
        title="Purchase Requests"
        description="Manage inventory purchase requests"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            New Request
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900">{totalRequests}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-emerald-600">{approvedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Ordered</p>
          <p className="text-2xl font-bold text-blue-600">{orderedCount}</p>
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
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Urgency</option>
          {urgencies.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={purchaseRequests.filter((r) => {
          if (statusFilter !== "all" && r.status !== statusFilter) return false;
          if (urgencyFilter !== "all" && r.urgency !== urgencyFilter) return false;
          return true;
        })}
        searchPlaceholder="Search requests..."
        searchKeys={["requestedBy", "department", "requestId"]}
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
        emptyMessage="No purchase requests found"
      />
    </div>
  );
}

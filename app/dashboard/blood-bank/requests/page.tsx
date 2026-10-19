"use client";

import { useState } from "react";
import { Droplets, Eye, Edit, Trash2 } from "lucide-react";
import { bloodRequests } from "@/lib/mock/blood-bank";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function BloodRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const statuses = [...new Set(bloodRequests.map((r) => r.status))];
  const urgencies = [...new Set(bloodRequests.map((r) => r.urgency))];

  const columns = [
    {
      key: "id",
      label: "Request ID",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-sm font-medium text-red-700 shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.patientName}</p>
            <p className="text-xs text-gray-500">{item.patientId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "bloodGroup",
      label: "Blood Group",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
          {item.bloodGroup}
        </span>
      ),
    },
    {
      key: "units",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => (
        <span className="text-gray-900 font-medium">{item.units} units</span>
      ),
    },
    {
      key: "purpose",
      label: "Purpose",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => (
        <p className="text-sm text-gray-700 max-w-[180px] truncate" title={item.purpose}>
          {item.purpose}
        </p>
      ),
    },
    {
      key: "urgency",
      label: "Priority",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Emergency: "danger",
          Urgent: "warning",
          Routine: "info",
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
      key: "requestDate",
      label: "Request Date",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => (
        <span className="text-gray-600 text-sm">{item.requestDate}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof bloodRequests)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Fulfilled: "success",
          Approved: "info",
          Pending: "warning",
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
        title="Blood Requests"
        description="Manage and track blood transfusion requests"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            New Request
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900">{bloodRequests.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Emergency</p>
          <p className="text-2xl font-bold text-red-600">
            {bloodRequests.filter((r) => r.urgency === "Emergency").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600">
            {bloodRequests.filter((r) => r.status === "Pending").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Fulfilled</p>
          <p className="text-2xl font-bold text-emerald-600">
            {bloodRequests.filter((r) => r.status === "Fulfilled").length}
          </p>
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
          <option value="all">All Priority</option>
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
        data={bloodRequests.filter((r) => {
          if (statusFilter !== "all" && r.status !== statusFilter) return false;
          if (urgencyFilter !== "all" && r.urgency !== urgencyFilter) return false;
          return true;
        })}
        searchPlaceholder="Search blood requests..."
        searchKeys={["patientName", "patientId", "doctorName", "id", "purpose"]}
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
        emptyMessage="No blood requests found"
      />
    </div>
  );
}

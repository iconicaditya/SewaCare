"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { radiologyOrders } from "@/lib/mock/radiology";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function RadiologyOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(radiologyOrders.map((o) => o.status))];

  const filteredOrders = radiologyOrders.filter((order) => {
    const matchesSearch =
      order.patientName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "id",
      label: "Order ID",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-medium shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span className="font-medium text-gray-900">{item.patientName}</span>
        </div>
      ),
    },
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <span className="text-gray-700">{item.doctorName}</span>
      ),
    },
    {
      key: "service",
      label: "Imaging Type",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <div>
          <span className="font-medium text-gray-900">{item.service}</span>
          <p className="text-xs text-gray-500">{item.bodyPart}</p>
        </div>
      ),
    },
    {
      key: "orderDate",
      label: "Order Date",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <span className="text-gray-600">
          {new Date(item.orderDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "scheduledDate",
      label: "Scheduled",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <span className="text-gray-600">
          {new Date(item.scheduledDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.priority === "Urgent"
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.priority}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof radiologyOrders)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Radiology Orders"
        description="Manage and track radiology imaging orders"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            New Order
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by patient, doctor, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 w-full"
          />
        </div>
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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredOrders}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No radiology orders found"
        />
      </div>
    </div>
  );
}

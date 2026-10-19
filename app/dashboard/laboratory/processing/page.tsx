"use client";

import { useState } from "react";
import { Beaker } from "lucide-react";
import { labOrders } from "@/lib/mock/laboratory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

const processingData = labOrders
  .filter((o) => o.status === "In Progress" || o.status === "Completed")
  .map((order) => ({
    ...order,
    sampleType: order.tests.includes("Urinalysis") ? "Urine" : "Blood",
    startDate: order.orderDate,
    technician: order.status === "Completed" ? "Lab Tech" : "Processing...",
  }));

export default function ProcessingPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = ["In Progress", "Completed"];

  const filteredData = processingData.filter((item) => {
    return statusFilter === "all" || item.status === statusFilter;
  });

  const columns = [
    {
      key: "id",
      label: "Order ID",
      sortable: true,
      render: (item: (typeof processingData)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof processingData)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-medium shrink-0">
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
      key: "tests",
      label: "Tests",
      sortable: false,
      render: (item: (typeof processingData)[0]) => (
        <div className="flex flex-wrap gap-1">
          {item.tests.map((test, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700"
            >
              {test}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "sampleType",
      label: "Sample Type",
      sortable: true,
      render: (item: (typeof processingData)[0]) => (
        <div className="flex items-center gap-2">
          <Beaker className="h-4 w-4 text-amber-500" />
          <span className="text-gray-700">{item.sampleType}</span>
        </div>
      ),
    },
    {
      key: "startDate",
      label: "Start Date",
      sortable: true,
      render: (item: (typeof processingData)[0]) => (
        <span className="text-gray-600">
          {new Date(item.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "technician",
      label: "Technician",
      sortable: true,
      render: (item: (typeof processingData)[0]) => (
        <span className="text-gray-700">{item.technician}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof processingData)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Processing"
        description="Track samples currently being processed in the lab"
      />

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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredData}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No samples being processed"
        />
      </div>
    </div>
  );
}

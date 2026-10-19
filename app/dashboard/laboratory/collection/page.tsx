"use client";

import { useState } from "react";
import { TestTube } from "lucide-react";
import { sampleCollections } from "@/lib/mock/laboratory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function SampleCollectionPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(sampleCollections.map((s) => s.status))];

  const filteredCollections = sampleCollections.filter((col) => {
    const matchesSearch =
      col.patientName.toLowerCase().includes(search.toLowerCase()) ||
      col.orderId.toLowerCase().includes(search.toLowerCase()) ||
      col.collectedBy.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || col.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "id",
      label: "Collection ID",
      sortable: true,
      render: (item: (typeof sampleCollections)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "orderId",
      label: "Order ID",
      sortable: true,
      render: (item: (typeof sampleCollections)[0]) => (
        <span className="text-gray-600">{item.orderId}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof sampleCollections)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-sm font-medium shrink-0">
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
      key: "sampleType",
      label: "Sample Type",
      sortable: true,
      render: (item: (typeof sampleCollections)[0]) => (
        <div className="flex items-center gap-2">
          <TestTube className="h-4 w-4 text-purple-500" />
          <span className="text-gray-700">{item.sampleType}</span>
        </div>
      ),
    },
    {
      key: "collectedAt",
      label: "Collection Date",
      sortable: true,
      render: (item: (typeof sampleCollections)[0]) => (
        <span className="text-gray-600">{item.collectedAt}</span>
      ),
    },
    {
      key: "collectedBy",
      label: "Collector",
      sortable: true,
      render: (item: (typeof sampleCollections)[0]) => (
        <span className="text-gray-700">{item.collectedBy}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof sampleCollections)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sample Collection"
        description="Track and manage sample collection records"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by patient, order ID, or collector..."
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
          data={filteredCollections}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No sample collections found"
        />
      </div>
    </div>
  );
}

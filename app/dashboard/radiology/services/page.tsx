"use client";

import { useState } from "react";
import { Plus, Scan } from "lucide-react";
import { imagingServices } from "@/lib/mock/radiology";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function ImagingServicesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const types = [...new Set(imagingServices.map((s) => s.category))];

  const filteredServices = imagingServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.id.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === "all" || service.category === typeFilter;
    return matchesSearch && matchesType;
  });

  const columns = [
    {
      key: "id",
      label: "Service ID",
      sortable: true,
      render: (item: (typeof imagingServices)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Service Name",
      sortable: true,
      render: (item: (typeof imagingServices)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
            <Scan className="h-4 w-4" />
          </div>
          <span className="font-medium text-gray-900">{item.name}</span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Type",
      sortable: true,
      render: (item: (typeof imagingServices)[0]) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.category === "MRI"
              ? "bg-purple-100 text-purple-800"
              : item.category === "CT Scan"
              ? "bg-red-100 text-red-800"
              : item.category === "Ultrasound"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.category}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (item: (typeof imagingServices)[0]) => (
        <span className="font-medium text-gray-900">NPR {item.price.toLocaleString()}</span>
      ),
    },
    {
      key: "turnaroundTime",
      label: "Turnaround",
      sortable: true,
      render: (item: (typeof imagingServices)[0]) => (
        <span className="text-gray-600">{item.turnaroundTime}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof imagingServices)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Imaging Services"
        description="Manage radiology imaging services and pricing"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 w-full"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredServices}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No imaging services found"
        />
      </div>
    </div>
  );
}

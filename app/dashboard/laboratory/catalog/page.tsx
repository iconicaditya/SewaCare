"use client";

import { useState } from "react";
import { Plus, FlaskConical } from "lucide-react";
import { labTests } from "@/lib/mock/laboratory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function TestCatalogPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [...new Set(labTests.map((t) => t.category))];

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(search.toLowerCase()) ||
      test.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || test.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: "id",
      label: "Test ID",
      sortable: true,
      render: (item: (typeof labTests)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Test Name",
      sortable: true,
      render: (item: (typeof labTests)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <FlaskConical className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">{item.sampleType}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (item: (typeof labTests)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {item.category}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (item: (typeof labTests)[0]) => (
        <span className="font-medium text-gray-900">NPR {item.price.toLocaleString()}</span>
      ),
    },
    {
      key: "turnaroundTime",
      label: "Turnaround",
      sortable: true,
      render: (item: (typeof labTests)[0]) => (
        <span className="text-gray-600">{item.turnaroundTime}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof labTests)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Test Catalog"
        description="Manage laboratory test catalog and pricing"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Test
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 w-full"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredTests}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No tests found"
        />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Building2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { departments } from "@/lib/mock/departments";

export default function DepartmentsPage() {
  const [deptList, setDeptList] = useState(departments);

  const toggleStatus = (id: string) => {
    setDeptList((prev) => prev.map((d) => d.id === id ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d));
  };

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Department", sortable: true, searchKey: "name" },
    { key: "type", label: "Type", sortable: true, render: (r: typeof departments[0]) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.type === "Clinical" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{r.type}</span>
    )},
    { key: "description", label: "Description", render: (r: typeof departments[0]) => <span className="text-sm text-gray-600">{r.description}</span> },
    { key: "status", label: "Status", render: (r: typeof departments[0]) => <StatusBadge status={r.status} variant={r.status === "Active" ? "success" : "danger"} /> },
    {
      key: "actions", label: "Actions", render: (r: typeof departments[0]) => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "Edit", onClick: () => {} },
          { label: r.status === "Active" ? "Deactivate" : "Activate", onClick: () => toggleStatus(r.id), variant: r.status === "Active" ? "danger" : "default" },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Departments" description="Manage hospital departments" actions={
        <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      } />
      <DataTable columns={columns as any} data={deptList as any} searchable searchPlaceholder="Search departments..." searchKeys={["name", "description"]} filters={[
        { key: "type", label: "Type", options: [{ value: "Clinical", label: "Clinical" }, { value: "Operational", label: "Operational" }] },
        { key: "status", label: "Status", options: [{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }] },
      ]} />
    </div>
  );
}

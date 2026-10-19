"use client";

import { Plus, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { roles } from "@/lib/mock/roles";

export default function RolesPage() {
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Role Name", sortable: true, searchKey: "name" },
    { key: "description", label: "Description", render: (r: typeof roles[0]) => <span className="text-sm text-gray-600">{r.description}</span> },
    { key: "userCount", label: "Staff", sortable: true, render: (r: typeof roles[0]) => <span className="font-medium">{r.userCount}</span> },
    { key: "status", label: "Status", render: (r: typeof roles[0]) => <StatusBadge status={r.status} variant={r.status === "Active" ? "success" : "danger"} /> },
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "Edit Role", onClick: () => {} },
          { label: "View Permissions", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Role Management" description="Configure system roles and permissions" actions={
        <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Role
        </button>
      } />
      <DataTable columns={columns} data={roles as any} searchable searchPlaceholder="Search roles..." searchKeys={["name", "description"]} />
    </div>
  );
}

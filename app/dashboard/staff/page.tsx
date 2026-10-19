"use client";

import { Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { staff } from "@/lib/mock/staff";

export default function StaffPage() {
  const columns = [
    { key: "employeeId", label: "Employee ID", sortable: true },
    { key: "fullName", label: "Name", sortable: true, searchKey: "fullName" },
    { key: "email", label: "Email", searchKey: "email" },
    { key: "phone", label: "Phone" },
    { key: "department", label: "Department", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "employmentStatus", label: "Status", render: (r: typeof staff[0]) => (
      <StatusBadge status={r.employmentStatus} variant={r.employmentStatus === "Full-time" ? "success" : r.employmentStatus === "Part-time" ? "info" : "warning"} />
    )},
    {
      key: "actions", label: "Actions", render: (r: typeof staff[0]) => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View Profile", onClick: () => {} },
          { label: "Edit", onClick: () => {} },
          { label: "Deactivate", onClick: () => {}, variant: "danger" },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Staff & HR" description="Manage hospital staff and human resources" actions={
        <Link href="/dashboard/staff/add" className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Staff
        </Link>
      } />
      <DataTable columns={columns} data={staff as any} searchable searchPlaceholder="Search staff..." searchKeys={["fullName", "email", "employeeId", "department"]} filters={[
        { key: "department", label: "Department", options: [...new Set(staff.map(s => s.department))].map(d => ({ value: d, label: d })) },
        { key: "role", label: "Role", options: [...new Set(staff.map(s => s.role))].map(r => ({ value: r, label: r })) },
      ]} />
    </div>
  );
}

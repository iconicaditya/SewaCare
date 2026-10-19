"use client";

import { MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { leaveRecords } from "@/lib/mock/leave";

const statusVariant = (s: string) => {
  if (s === "Approved") return "success" as const;
  if (s === "Rejected") return "danger" as const;
  return "warning" as const;
};

export default function LeavePage() {
  const columns = [
    { key: "staffName", label: "Staff", sortable: true, searchKey: "staffName" },
    { key: "department", label: "Department", sortable: true },
    { key: "leaveType", label: "Type", sortable: true },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "days", label: "Days", sortable: true },
    { key: "reason", label: "Reason", render: (r: typeof leaveRecords[0]) => <span className="text-sm text-gray-600">{r.reason}</span> },
    { key: "status", label: "Status", render: (r: typeof leaveRecords[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
    {
      key: "actions", label: "Actions", render: (r: typeof leaveRecords[0]) => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          ...(r.status === "Pending" ? [
            { label: "Approve", onClick: () => alert("Approved!"), variant: "default" as const },
            { label: "Reject", onClick: () => alert("Rejected!"), variant: "danger" as const },
          ] : [
            { label: "View Details", onClick: () => {} },
          ]),
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Management" description="Manage staff leave requests" />
      <DataTable columns={columns as any} data={leaveRecords as any} searchable searchPlaceholder="Search leave records..." searchKeys={["staffName", "department"]} filters={[
        { key: "status", label: "Status", options: [
          { value: "Pending", label: "Pending" },
          { value: "Approved", label: "Approved" },
          { value: "Rejected", label: "Rejected" },
        ]},
        { key: "leaveType", label: "Leave Type", options: [
          { value: "Annual", label: "Annual" },
          { value: "Sick", label: "Sick" },
          { value: "Maternity", label: "Maternity" },
          { value: "Emergency", label: "Emergency" },
        ]},
      ]} />
    </div>
  );
}

"use client";

import { MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { refunds } from "@/lib/mock/billing";

const statusVariant = (s: string) => {
  if (s === "Approved") return "success" as const;
  if (s === "Pending") return "warning" as const;
  return "danger" as const;
};

export default function RefundsPage() {
  const columns = [
    { key: "id", label: "Refund ID", sortable: true },
    { key: "invoiceId", label: "Invoice", sortable: true },
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "amount", label: "Amount", sortable: true, render: (r: typeof refunds[0]) => <span className="font-medium text-red-600">रु {r.amount.toLocaleString()}</span> },
    { key: "reason", label: "Reason", render: (r: typeof refunds[0]) => <span className="text-gray-600 text-sm">{r.reason}</span> },
    { key: "processedBy", label: "Processed By" },
    { key: "processedAt", label: "Date" },
    { key: "status", label: "Status", render: (r: typeof refunds[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View Details", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Refunds & Adjustments" description="Track refund requests and billing adjustments" />
      <DataTable columns={columns} data={refunds as any} searchable searchPlaceholder="Search refunds..." searchKeys={["id", "invoiceId", "patientName"]} />
    </div>
  );
}

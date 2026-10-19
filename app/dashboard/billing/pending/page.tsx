"use client";

import { AlertCircle, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { pendingPayments } from "@/lib/mock/billing";

export default function PendingPaymentsPage() {
  const totalPending = pendingPayments.reduce((a, p) => a + p.pendingAmount, 0);

  const columns = [
    { key: "invoiceId", label: "Invoice ID", sortable: true },
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "totalAmount", label: "Total", sortable: true, render: (r: typeof pendingPayments[0]) => <span className="font-medium">रु {r.totalAmount.toLocaleString()}</span> },
    { key: "paidAmount", label: "Paid", render: (r: typeof pendingPayments[0]) => <span className="text-emerald-600">रु {r.paidAmount.toLocaleString()}</span> },
    { key: "pendingAmount", label: "Pending", render: (r: typeof pendingPayments[0]) => <span className="font-semibold text-red-600">रु {r.pendingAmount.toLocaleString()}</span> },
    { key: "dueDate", label: "Due Date", sortable: true },
    { key: "daysOverdue", label: "Overdue", render: (r: typeof pendingPayments[0]) => (
      r.daysOverdue > 0
        ? <span className="text-red-600 font-medium flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {r.daysOverdue}d</span>
        : <span className="text-gray-400">—</span>
    )},
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "Send Reminder", onClick: () => {} },
          { label: "Record Payment", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Pending Payments" description="Outstanding invoices awaiting payment" />
      <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Outstanding</p>
        <p className="text-xl font-bold text-red-600 mt-1">रु {totalPending.toLocaleString()}</p>
      </div>
      <DataTable columns={columns} data={pendingPayments as any} searchable searchPlaceholder="Search pending payments..." searchKeys={["invoiceId", "patientName"]} />
    </div>
  );
}

"use client";

import { FileText, Download, Eye, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { invoices } from "@/lib/mock/billing";

const statusVariant = (s: string) => {
  if (s === "Paid") return "success" as const;
  if (s === "Partial") return "warning" as const;
  if (s === "Pending") return "info" as const;
  return "danger" as const;
};

export default function InvoicesPage() {
  const totalRevenue = invoices.reduce((a, i) => a + i.grandTotal, 0);
  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((a, i) => a + i.paidAmount, 0);
  const totalPending = invoices.filter((i) => i.status !== "Paid").reduce((a, i) => a + (i.grandTotal - i.paidAmount), 0);

  const columns = [
    { key: "id", label: "Invoice ID", sortable: true },
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "date", label: "Date", sortable: true },
    { key: "grandTotal", label: "Total", sortable: true, render: (r: typeof invoices[0]) => <span className="font-medium">रु {r.grandTotal.toLocaleString()}</span> },
    { key: "paidAmount", label: "Paid", sortable: true, render: (r: typeof invoices[0]) => <span className="text-emerald-600">रु {r.paidAmount.toLocaleString()}</span> },
    { key: "remaining", label: "Remaining", render: (r: typeof invoices[0]) => {
      const rem = r.grandTotal - r.paidAmount;
      return <span className={rem > 0 ? "text-red-600 font-medium" : "text-gray-500"}>रु {rem.toLocaleString()}</span>;
    }},
    { key: "status", label: "Status", render: (r: typeof invoices[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
    {
      key: "actions", label: "Actions", render: (r: typeof invoices[0]) => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View Invoice", icon: Eye, onClick: () => {} },
          { label: "Download PDF", icon: Download, onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="Manage patient invoices and billing" actions={
        <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <FileText className="w-4 h-4" /> Create Invoice
        </button>
      } />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Revenue", value: `रु ${totalRevenue.toLocaleString()}`, color: "text-gray-900" },
          { label: "Paid", value: `रु ${totalPaid.toLocaleString()}`, color: "text-emerald-600" },
          { label: "Pending", value: `रु ${totalPending.toLocaleString()}`, color: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <DataTable columns={columns} data={invoices as any} searchable searchPlaceholder="Search invoices..." searchKeys={["id", "patientName"]} />
    </div>
  );
}

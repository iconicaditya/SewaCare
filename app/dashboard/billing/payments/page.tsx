"use client";

import { MoreHorizontal, CreditCard, Banknote, Globe, Shield } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { payments } from "@/lib/mock/billing";

const methodIcon = (m: string) => {
  if (m === "Cash") return <Banknote className="w-3.5 h-3.5" />;
  if (m === "Card") return <CreditCard className="w-3.5 h-3.5" />;
  if (m === "Online") return <Globe className="w-3.5 h-3.5" />;
  if (m === "Insurance") return <Shield className="w-3.5 h-3.5" />;
  return null;
};

export default function PaymentsPage() {
  const totalReceived = payments.reduce((a, p) => a + p.amount, 0);

  const columns = [
    { key: "id", label: "Payment ID", sortable: true },
    { key: "invoiceId", label: "Invoice", sortable: true },
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "amount", label: "Amount", sortable: true, render: (r: typeof payments[0]) => <span className="font-medium text-emerald-600">रु {r.amount.toLocaleString()}</span> },
    { key: "method", label: "Method", render: (r: typeof payments[0]) => (
      <span className="flex items-center gap-1.5 text-sm">
        {methodIcon(r.method)} {r.method}
      </span>
    )},
    { key: "date", label: "Date", sortable: true },
    { key: "receivedBy", label: "Received By" },
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View Details", onClick: () => {} },
          { label: "Print Receipt", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Track all payment transactions" />
      <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Received</p>
        <p className="text-xl font-bold text-emerald-600 mt-1">रु {totalReceived.toLocaleString()}</p>
      </div>
      <DataTable columns={columns} data={payments as any} searchable searchPlaceholder="Search payments..." searchKeys={["id", "invoiceId", "patientName"]} />
    </div>
  );
}

"use client";

import { MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { revenueRecords, expenseRecords } from "@/lib/mock/finance";

const allRecords = [
  ...revenueRecords.map((r) => ({ ...r, type: "Revenue" as const, vendor: "", approvedBy: "" })),
  ...expenseRecords.map((r) => ({ ...r, type: "Expense" as const, source: "", paymentMethod: r.paymentMethod })),
];

const statusVariant = (s: string) => {
  if (s === "Received" || s === "Paid") return "success" as const;
  if (s === "Pending" || s === "Approved") return "warning" as const;
  return "danger" as const;
};

export default function FinancialRecordsPage() {
  const totalRevenue = revenueRecords.reduce((a, r) => a + r.amount, 0);
  const totalExpenses = expenseRecords.reduce((a, r) => a + r.amount, 0);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "type", label: "Type", sortable: true, render: (r: typeof allRecords[0]) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.type === "Revenue" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{r.type}</span>
    )},
    { key: "date", label: "Date", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "description", label: "Description", render: (r: typeof allRecords[0]) => <span className="text-sm text-gray-600">{r.description}</span> },
    { key: "amount", label: "Amount", sortable: true, render: (r: typeof allRecords[0]) => (
      <span className={`font-semibold ${r.type === "Revenue" ? "text-emerald-600" : "text-red-600"}`}>
        {r.type === "Revenue" ? "+" : "-"}रु {r.amount.toLocaleString()}
      </span>
    )},
    { key: "status", label: "Status", render: (r: typeof allRecords[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
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
      <PageHeader title="Financial Records" description="Combined view of all financial transactions" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Revenue</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">रु {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Expenses</p>
          <p className="text-xl font-bold text-red-600 mt-1">रु {totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Net</p>
          <p className={`text-xl font-bold mt-1 ${totalRevenue - totalExpenses >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            रु {(totalRevenue - totalExpenses).toLocaleString()}
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={allRecords as any} searchable searchPlaceholder="Search records..." searchKeys={["id", "category", "description"]} filters={[
        { key: "type", label: "Type", options: [
          { value: "Revenue", label: "Revenue" },
          { value: "Expense", label: "Expense" },
        ]},
      ]} />
    </div>
  );
}

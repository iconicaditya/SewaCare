"use client";

import { MoreHorizontal, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { expenseRecords } from "@/lib/mock/finance";

const statusVariant = (s: string) => {
  if (s === "Paid") return "success" as const;
  if (s === "Pending") return "warning" as const;
  return "info" as const;
};

export default function ExpensesPage() {
  const totalExpenses = expenseRecords.reduce((a, r) => a + r.amount, 0);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "category", label: "Category", sortable: true, render: (r: typeof expenseRecords[0]) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700">{r.category}</span>
    )},
    { key: "description", label: "Description", render: (r: typeof expenseRecords[0]) => <span className="text-sm text-gray-600">{r.description}</span> },
    { key: "amount", label: "Amount", sortable: true, render: (r: typeof expenseRecords[0]) => <span className="font-semibold text-red-600">रु {r.amount.toLocaleString()}</span> },
    { key: "vendor", label: "Vendor" },
    { key: "approvedBy", label: "Approved By" },
    { key: "status", label: "Status", render: (r: typeof expenseRecords[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
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
      <PageHeader title="Expenses" description="Track hospital expenses" />
      <div className="bg-white border border-gray-200 rounded-lg p-4 inline-flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
          <TrendingDown className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Expenses</p>
          <p className="text-xl font-bold text-red-600">रु {totalExpenses.toLocaleString()}</p>
        </div>
      </div>
      <DataTable columns={columns} data={expenseRecords as any} searchable searchPlaceholder="Search expenses..." searchKeys={["id", "category", "description", "vendor"]} filters={[
        { key: "category", label: "Category", options: [
          { value: "Staff Salary", label: "Staff Salary" },
          { value: "Medical Supplies", label: "Medical Supplies" },
          { value: "Equipment Maintenance", label: "Equipment Maintenance" },
          { value: "Utilities", label: "Utilities" },
          { value: "Pharmacy", label: "Pharmacy" },
          { value: "IT Support", label: "IT Support" },
        ]},
      ]} />
    </div>
  );
}

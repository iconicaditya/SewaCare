"use client";

import { MoreHorizontal, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { revenueRecords } from "@/lib/mock/finance";

const statusVariant = (s: string) => {
  if (s === "Received") return "success" as const;
  if (s === "Pending") return "warning" as const;
  return "danger" as const;
};

export default function RevenuePage() {
  const totalRevenue = revenueRecords.reduce((a, r) => a + r.amount, 0);

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "category", label: "Category", sortable: true, render: (r: typeof revenueRecords[0]) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">{r.category}</span>
    )},
    { key: "description", label: "Description", render: (r: typeof revenueRecords[0]) => <span className="text-sm text-gray-600">{r.description}</span> },
    { key: "amount", label: "Amount", sortable: true, render: (r: typeof revenueRecords[0]) => <span className="font-semibold text-emerald-600">रु {r.amount.toLocaleString()}</span> },
    { key: "source", label: "Source" },
    { key: "paymentMethod", label: "Payment" },
    { key: "status", label: "Status", render: (r: typeof revenueRecords[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
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
      <PageHeader title="Revenue" description="Track hospital revenue streams" />
      <div className="bg-white border border-gray-200 rounded-lg p-4 inline-flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Revenue</p>
          <p className="text-xl font-bold text-emerald-600">रु {totalRevenue.toLocaleString()}</p>
        </div>
      </div>
      <DataTable columns={columns} data={revenueRecords as any} searchable searchPlaceholder="Search revenue..." searchKeys={["id", "category", "description"]} filters={[
        { key: "category", label: "Category", options: [
          { value: "Consultation", label: "Consultation" },
          { value: "Laboratory", label: "Laboratory" },
          { value: "Radiology", label: "Radiology" },
          { value: "Pharmacy", label: "Pharmacy" },
          { value: "Surgery", label: "Surgery" },
          { value: "Admission", label: "Admission" },
          { value: "Ward", label: "Ward" },
          { value: "ICU", label: "ICU" },
          { value: "Emergency", label: "Emergency" },
        ]},
      ]} />
    </div>
  );
}

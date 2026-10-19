"use client";

import { Plus, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { billingServices } from "@/lib/mock/billing";

export default function BillingServicesPage() {
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Service Name", sortable: true, searchKey: "name" },
    { key: "category", label: "Category", sortable: true, render: (r: typeof billingServices[0]) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">{r.category}</span>
    )},
    { key: "price", label: "Price", sortable: true, render: (r: typeof billingServices[0]) => <span className="font-medium">रु {r.price.toLocaleString()}</span> },
    { key: "status", label: "Status", render: (r: typeof billingServices[0]) => (
      <StatusBadge status={r.status} variant={r.status === "Active" ? "success" : "danger"} />
    )},
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "Edit", onClick: () => {} },
          { label: "Deactivate", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Services & Charges" description="Manage hospital service pricing" actions={
        <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      } />
      <DataTable columns={columns} data={billingServices as any} searchable searchPlaceholder="Search services..." searchKeys={["name", "category"]} filters={[
        { key: "category", label: "Category", options: [
          { value: "Consultation", label: "Consultation" },
          { value: "Diagnostic", label: "Diagnostic" },
          { value: "Ward", label: "Ward" },
        ]},
      ]} />
    </div>
  );
}

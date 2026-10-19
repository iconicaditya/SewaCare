"use client";

import { Plus, MoreHorizontal, Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { insuranceProviders } from "@/lib/mock/insurance";

export default function InsuranceProvidersPage() {
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Provider Name", sortable: true, searchKey: "name" },
    { key: "contact", label: "Contact", render: (r: typeof insuranceProviders[0]) => (
      <span className="flex items-center gap-1.5 text-sm"><Phone className="w-3.5 h-3.5 text-gray-400" /> {r.contact}</span>
    )},
    { key: "email", label: "Email", render: (r: typeof insuranceProviders[0]) => (
      <span className="flex items-center gap-1.5 text-sm"><Mail className="w-3.5 h-3.5 text-gray-400" /> {r.email}</span>
    )},
    { key: "address", label: "Address" },
    { key: "networkHospitals", label: "Network Hospitals", sortable: true },
    { key: "status", label: "Status", render: (r: typeof insuranceProviders[0]) => (
      <StatusBadge status={r.status} variant={r.status === "Active" ? "success" : "danger"} />
    )},
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View Details", onClick: () => {} },
          { label: "Edit", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Insurance Providers" description="Manage insurance provider partnerships" actions={
        <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Provider
        </button>
      } />
      <DataTable columns={columns} data={insuranceProviders as any} searchable searchPlaceholder="Search providers..." searchKeys={["name", "contact", "email"]} />
    </div>
  );
}

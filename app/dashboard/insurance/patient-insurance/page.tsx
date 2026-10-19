"use client";

import { MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { patientInsurance } from "@/lib/mock/insurance";

const statusVariant = (s: string) => {
  if (s === "Active") return "success" as const;
  if (s === "Expired") return "danger" as const;
  return "warning" as const;
};

export default function PatientInsurancePage() {
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "providerName", label: "Provider", sortable: true, searchKey: "providerName" },
    { key: "policyNumber", label: "Policy Number" },
    { key: "coverageType", label: "Coverage", render: (r: typeof patientInsurance[0]) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">{r.coverageType}</span>
    )},
    { key: "sumInsured", label: "Sum Insured", sortable: true, render: (r: typeof patientInsurance[0]) => <span className="font-medium">रु {r.sumInsured.toLocaleString()}</span> },
    { key: "validUntil", label: "Valid Until", sortable: true },
    { key: "status", label: "Status", render: (r: typeof patientInsurance[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
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
      <PageHeader title="Patient Insurance" description="Manage patient insurance policies" />
      <DataTable columns={columns} data={patientInsurance as any} searchable searchPlaceholder="Search patient insurance..." searchKeys={["patientName", "providerName", "policyNumber"]} filters={[
        { key: "status", label: "Status", options: [
          { value: "Active", label: "Active" },
          { value: "Expired", label: "Expired" },
          { value: "Suspended", label: "Suspended" },
        ]},
        { key: "coverageType", label: "Coverage", options: [
          { value: "Basic", label: "Basic" },
          { value: "Standard", label: "Standard" },
          { value: "Premium", label: "Premium" },
        ]},
      ]} />
    </div>
  );
}

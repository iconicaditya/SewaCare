"use client";

import { MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { insuranceClaims } from "@/lib/mock/insurance";

const statusVariant = (s: string) => {
  if (s === "Approved" || s === "Partially Approved") return "success" as const;
  if (s === "Submitted" || s === "Under Review") return "info" as const;
  if (s === "Rejected") return "danger" as const;
  return "warning" as const;
};

export default function InsuranceClaimsPage() {
  const totalClaims = insuranceClaims.reduce((a, c) => a + c.claimAmount, 0);
  const totalApproved = insuranceClaims.filter((c) => c.status === "Approved" || c.status === "Partially Approved").reduce((a, c) => a + c.approvedAmount, 0);

  const columns = [
    { key: "id", label: "Claim ID", sortable: true },
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "providerName", label: "Provider", sortable: true, searchKey: "providerName" },
    { key: "invoiceId", label: "Invoice" },
    { key: "claimAmount", label: "Claim Amount", sortable: true, render: (r: typeof insuranceClaims[0]) => <span className="font-medium">रु {r.claimAmount.toLocaleString()}</span> },
    { key: "approvedAmount", label: "Approved", render: (r: typeof insuranceClaims[0]) => r.approvedAmount > 0 ? <span className="text-emerald-600 font-medium">रु {r.approvedAmount.toLocaleString()}</span> : <span className="text-gray-400">—</span> },
    { key: "submittedDate", label: "Submitted", sortable: true },
    { key: "status", label: "Status", render: (r: typeof insuranceClaims[0]) => <StatusBadge status={r.status} variant={statusVariant(r.status)} /> },
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View Details", onClick: () => {} },
          { label: "Process Claim", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Insurance Claims" description="Track and process insurance claims" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Claims</p>
          <p className="text-xl font-bold text-gray-900 mt-1">रु {totalClaims.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Approved</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">रु {totalApproved.toLocaleString()}</p>
        </div>
      </div>
      <DataTable columns={columns} data={insuranceClaims as any} searchable searchPlaceholder="Search claims..." searchKeys={["id", "patientName", "providerName", "invoiceId"]} filters={[
        { key: "status", label: "Status", options: [
          { value: "Submitted", label: "Submitted" },
          { value: "Under Review", label: "Under Review" },
          { value: "Approved", label: "Approved" },
          { value: "Partially Approved", label: "Partially Approved" },
          { value: "Rejected", label: "Rejected" },
        ]},
      ]} />
    </div>
  );
}

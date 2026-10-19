"use client";

import { MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { insuranceClaims } from "@/lib/mock/insurance";

const settledClaims = insuranceClaims.filter(
  (c) => c.status === "Approved" || c.status === "Partially Approved"
);

export default function ClaimSettlementPage() {
  const columns = [
    { key: "id", label: "Claim ID", sortable: true },
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "providerName", label: "Provider", sortable: true },
    { key: "claimAmount", label: "Claim Amount", sortable: true, render: (r: typeof settledClaims[0]) => <span className="font-medium">रु {r.claimAmount.toLocaleString()}</span> },
    { key: "approvedAmount", label: "Settlement Amount", render: (r: typeof settledClaims[0]) => <span className="text-emerald-600 font-medium">रु {r.approvedAmount.toLocaleString()}</span> },
    { key: "processedDate", label: "Settlement Date", sortable: true },
    { key: "status", label: "Status", render: (r: typeof settledClaims[0]) => <StatusBadge status={r.status} variant={r.status === "Approved" ? "success" : "warning"} /> },
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View Details", onClick: () => {} },
          { label: "Print Settlement", onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Claim Settlement" description="View processed and settled insurance claims" />
      <DataTable columns={columns} data={settledClaims as any} searchable searchPlaceholder="Search settlements..." searchKeys={["id", "patientName", "providerName"]} />
    </div>
  );
}

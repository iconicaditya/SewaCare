"use client";

import { Download, Eye, MoreHorizontal, Upload } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { documents } from "@/lib/mock/documents";

export default function DocumentsPage() {
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Document Name", sortable: true, searchKey: "name" },
    { key: "type", label: "Type", sortable: true, render: (r: typeof documents[0]) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">{r.type}</span>
    )},
    { key: "patientName", label: "Patient", sortable: true, searchKey: "patientName" },
    { key: "uploadedBy", label: "Uploaded By" },
    { key: "uploadedAt", label: "Date", sortable: true },
    { key: "fileSize", label: "Size" },
    { key: "status", label: "Status", render: (r: typeof documents[0]) => <StatusBadge status={r.status} variant={r.status === "Active" ? "success" : "warning"} /> },
    {
      key: "actions", label: "Actions", render: () => (
        <Dropdown trigger={<button className="p-1.5 hover:bg-gray-100 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>} items={[
          { label: "View", icon: Eye, onClick: () => {} },
          { label: "Download", icon: Download, onClick: () => {} },
        ]} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Documents" description="Manage hospital documents and files" actions={
        <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      } />
      <DataTable columns={columns as any} data={documents as any} searchable searchPlaceholder="Search documents..." searchKeys={["name", "type", "patientName"]} filters={[
        { key: "type", label: "Type", options: [...new Set(documents.map(d => d.type))].map(t => ({ value: t, label: t })) },
      ]} />
    </div>
  );
}

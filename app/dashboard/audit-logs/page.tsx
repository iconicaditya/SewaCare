"use client";

import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { auditLogs } from "@/lib/mock/audit-logs";

export default function AuditLogsPage() {
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "userName", label: "User", sortable: true, searchKey: "userName" },
    { key: "action", label: "Action", sortable: true, render: (r: typeof auditLogs[0]) => (
      <span className="text-sm font-medium text-gray-900">{r.action}</span>
    )},
    { key: "resource", label: "Module", sortable: true, render: (r: typeof auditLogs[0]) => (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">{r.resource}</span>
    )},
    { key: "resourceId", label: "Record" },
    { key: "details", label: "Details", render: (r: typeof auditLogs[0]) => <span className="text-sm text-gray-600">{r.details}</span> },
    { key: "timestamp", label: "Date/Time", sortable: true },
    { key: "status", label: "Status", render: (r: typeof auditLogs[0]) => (
      <StatusBadge status={r.status} variant={r.status === "Success" ? "success" : "danger"} />
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" description="Track all system activities and changes" />
      <DataTable columns={columns as any} data={auditLogs as any} searchable searchPlaceholder="Search audit logs..." searchKeys={["userName", "action", "resource", "details"]} filters={[
        { key: "resource", label: "Module", options: [...new Set(auditLogs.map(l => l.resource))].map(m => ({ value: m, label: m })) },
        { key: "action", label: "Action", options: [...new Set(auditLogs.map(l => l.action))].map(a => ({ value: a, label: a })) },
      ]} />
    </div>
  );
}

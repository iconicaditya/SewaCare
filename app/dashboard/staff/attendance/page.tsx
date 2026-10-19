"use client";

import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { attendanceRecords } from "@/lib/mock/attendance";

export default function AttendancePage() {
  const present = attendanceRecords.filter((a) => a.status === "Present").length;
  const absent = attendanceRecords.filter((a) => a.status === "Absent").length;
  const late = attendanceRecords.filter((a) => a.status === "Late").length;
  const onLeave = attendanceRecords.filter((a) => a.status === "On Leave" || a.status === "Half Day").length;

  const columns = [
    { key: "staffName", label: "Staff", sortable: true, searchKey: "staffName" },
    { key: "department", label: "Department", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "clockIn", label: "Check In" },
    { key: "clockOut", label: "Check Out", render: (r: typeof attendanceRecords[0]) => r.clockOut || <span className="text-gray-400">—</span> },
    { key: "status", label: "Status", render: (r: typeof attendanceRecords[0]) => (
      <StatusBadge status={r.status} variant={r.status === "Present" ? "success" : r.status === "Late" ? "warning" : r.status === "Absent" ? "danger" : "info"} />
    )},
    { key: "notes", label: "Notes", render: (r: typeof attendanceRecords[0]) => <span className="text-sm text-gray-500">{r.notes || "—"}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Track daily staff attendance" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Present", value: present, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Absent", value: absent, color: "text-red-600", bg: "bg-red-50" },
          { label: "Late", value: late, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "On Leave", value: onLeave, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-gray-200 rounded-lg p-4`}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <DataTable columns={columns as any} data={attendanceRecords as any} searchable searchPlaceholder="Search attendance..." searchKeys={["staffName", "department"]} filters={[
        { key: "status", label: "Status", options: [
          { value: "Present", label: "Present" },
          { value: "Absent", label: "Absent" },
          { value: "Late", label: "Late" },
          { value: "On Leave", label: "On Leave" },
        ]},
      ]} />
    </div>
  );
}

"use client";

import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

const rosterData = [
  { id: 1, staffName: "Sushila Bajracharya", department: "Nursing", shift: "Morning", date: "2026-09-13", startTime: "07:00", endTime: "15:00", status: "Active" },
  { id: 2, staffName: "Sarita Bhandari", department: "Nursing", shift: "Morning", date: "2026-09-13", startTime: "07:00", endTime: "15:00", status: "Active" },
  { id: 3, staffName: "Mina Gurung", department: "Nursing", shift: "Morning", date: "2026-09-13", startTime: "07:00", endTime: "15:00", status: "On Leave" },
  { id: 4, staffName: "Kamala Dhungana", department: "ICU", shift: "Night", date: "2026-09-13", startTime: "19:00", endTime: "07:00", status: "Active" },
  { id: 5, staffName: "Sunil Lama", department: "Operation Theatre", shift: "Morning", date: "2026-09-13", startTime: "07:00", endTime: "15:00", status: "Active" },
  { id: 6, staffName: "Binod Paudel", department: "Laboratory", shift: "Morning", date: "2026-09-13", startTime: "08:00", endTime: "16:00", status: "Active" },
  { id: 7, staffName: "Dipak Ranjitkar", department: "Laboratory", shift: "Afternoon", date: "2026-09-13", startTime: "14:00", endTime: "22:00", status: "Active" },
  { id: 8, staffName: "Prakash Tamang", department: "Pharmacy", shift: "Morning", date: "2026-09-13", startTime: "08:00", endTime: "16:00", status: "Active" },
  { id: 9, staffName: "Surendra Bista", department: "Pharmacy", shift: "Afternoon", date: "2026-09-13", startTime: "14:00", endTime: "22:00", status: "Active" },
  { id: 10, staffName: "Deepak Subedi", department: "Radiology", shift: "Morning", date: "2026-09-13", startTime: "08:00", endTime: "16:00", status: "Active" },
  { id: 11, staffName: "Rita Karki", department: "Administration", shift: "Morning", date: "2026-09-13", startTime: "09:00", endTime: "17:00", status: "Active" },
  { id: 12, staffName: "Laxmi Thapa", department: "HR", shift: "Morning", date: "2026-09-13", startTime: "09:00", endTime: "17:00", status: "Active" },
  { id: 13, staffName: "Rajan K.C.", department: "Blood Bank", shift: "Morning", date: "2026-09-13", startTime: "08:00", endTime: "16:00", status: "Active" },
  { id: 14, staffName: "Anju Shrestha", department: "Billing", shift: "Morning", date: "2026-09-13", startTime: "08:30", endTime: "16:30", status: "Active" },
  { id: 15, staffName: "Manoj Basnet", department: "Inventory", shift: "Morning", date: "2026-09-13", startTime: "08:00", endTime: "16:00", status: "Active" },
];

const columns = [
  { key: "staffName", label: "Staff", sortable: true, searchKey: "staffName" },
  { key: "department", label: "Department", sortable: true },
  { key: "shift", label: "Shift", sortable: true, render: (r: typeof rosterData[0]) => (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.shift === "Morning" ? "bg-amber-50 text-amber-700" : r.shift === "Afternoon" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>{r.shift}</span>
  )},
  { key: "date", label: "Date", sortable: true },
  { key: "startTime", label: "Start Time" },
  { key: "endTime", label: "End Time" },
  { key: "status", label: "Status", render: (r: typeof rosterData[0]) => <StatusBadge status={r.status} variant={r.status === "Active" ? "success" : "warning"} /> },
];

export default function DutyRosterPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Duty Roster" description="Manage staff shift schedules" />
      <DataTable columns={columns as any} data={rosterData as any} searchable searchPlaceholder="Search roster..." searchKeys={["staffName", "department"]} filters={[
        { key: "shift", label: "Shift", options: [
          { value: "Morning", label: "Morning" },
          { value: "Afternoon", label: "Afternoon" },
          { value: "Night", label: "Night" },
        ]},
        { key: "department", label: "Department", options: [...new Set(rosterData.map(r => r.department))].map(d => ({ value: d, label: d })) },
      ]} />
    </div>
  );
}

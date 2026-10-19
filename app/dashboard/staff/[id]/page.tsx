"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import { staff } from "@/lib/mock/staff";
import { attendanceRecords } from "@/lib/mock/attendance";
import { leaveRecords } from "@/lib/mock/leave";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "attendance", label: "Attendance" },
  { id: "leave", label: "Leave" },
  { id: "schedule", label: "Duty Schedule" },
];

export default function StaffDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const staffMember = staff.find((s) => s.id === params.id);

  if (!staffMember) {
    return (
      <div className="space-y-6">
        <PageHeader title="Staff Not Found" description="The requested staff member could not be found" actions={
          <Link href="/dashboard/staff" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Staff
          </Link>
        } />
      </div>
    );
  }

  const staffAttendance = attendanceRecords.filter((a) => a.staffId === staffMember.id);
  const staffLeaves = leaveRecords.filter((l) => l.staffId === staffMember.id);

  const attendanceColumns = [
    { key: "date", label: "Date", sortable: true },
    { key: "clockIn", label: "Check In" },
    { key: "clockOut", label: "Check Out" },
    { key: "hoursWorked", label: "Hours" },
    { key: "status", label: "Status", render: (r: typeof attendanceRecords[0]) => (
      <StatusBadge status={r.status} variant={r.status === "Present" ? "success" : r.status === "Late" ? "warning" : r.status === "Absent" ? "danger" : "info"} />
    )},
  ];

  const leaveColumns = [
    { key: "leaveType", label: "Type", sortable: true },
    { key: "startDate", label: "Start" },
    { key: "endDate", label: "End" },
    { key: "days", label: "Days" },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status", render: (r: typeof leaveRecords[0]) => (
      <StatusBadge status={r.status} variant={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : "warning"} />
    )},
  ];

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 w-40">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader title={staffMember.fullName} description={`${staffMember.jobTitle} · ${staffMember.department}`} actions={
        <Link href="/dashboard/staff" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Staff
        </Link>
      } />
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>ID: {staffMember.employeeId}</span>
        <span>·</span>
        <span>{staffMember.role}</span>
        <span>·</span>
        <StatusBadge status={staffMember.accountStatus} variant={staffMember.accountStatus === "Active" ? "success" : "danger"} />
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Personal Information</h3>
            <InfoRow label="Full Name" value={staffMember.fullName} />
            <InfoRow label="Email" value={staffMember.email} />
            <InfoRow label="Phone" value={staffMember.phone} />
            <InfoRow label="Gender" value={staffMember.gender} />
            <InfoRow label="Address" value={staffMember.address} />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Employment Information</h3>
            <InfoRow label="Employee ID" value={staffMember.employeeId} />
            <InfoRow label="Job Title" value={staffMember.jobTitle} />
            <InfoRow label="Department" value={staffMember.department} />
            <InfoRow label="Role" value={staffMember.role} />
            <InfoRow label="Joining Date" value={staffMember.joiningDate} />
            <InfoRow label="Employment" value={staffMember.employmentStatus} />
            <InfoRow label="Account Status" value={staffMember.accountStatus} />
          </div>
        </div>
      )}
      {activeTab === "attendance" && (
        <DataTable columns={attendanceColumns as any} data={staffAttendance as any} searchable={false} />
      )}
      {activeTab === "leave" && (
        <DataTable columns={leaveColumns as any} data={staffLeaves as any} searchable={false} />
      )}
      {activeTab === "schedule" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Weekly Duty Schedule</h3>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className={`text-center p-3 rounded-lg border ${day === "Sun" ? "bg-gray-50 text-gray-400 border-gray-100" : "bg-emerald-50 border-emerald-200"}`}>
                <p className="text-xs font-medium text-gray-500">{day}</p>
                <p className="text-xs font-semibold text-gray-900 mt-1">{day === "Sun" ? "Off" : "8:00-16:00"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

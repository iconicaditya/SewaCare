"use client";

import React, { useState } from "react";
import { Eye, ArrowUpDown } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

interface TodayPatient {
  token: string;
  patient: string;
  department: string;
  doctor: string;
  visitType: string;
  status: "Registered" | "Waiting" | "In Consultation" | "Completed" | "Cancelled";
  time: string;
}

const todayPatients: TodayPatient[] = [
  {
    token: "T-001",
    patient: "Ram Bahadur Thapa",
    department: "General Medicine",
    doctor: "Dr. Aarav Shrestha",
    visitType: "Follow-up",
    status: "Completed",
    time: "09:00",
  },
  {
    token: "T-002",
    patient: "Sunita Sharma",
    department: "Pediatrics",
    doctor: "Dr. Priya Bhandari",
    visitType: "New Visit",
    status: "Completed",
    time: "09:30",
  },
  {
    token: "T-003",
    patient: "Bikash Gurung",
    department: "Cardiology",
    doctor: "Dr. Suman Koirala",
    visitType: "Follow-up",
    status: "In Consultation",
    time: "10:00",
  },
  {
    token: "T-004",
    patient: "Anita Rai",
    department: "Gynecology",
    doctor: "Dr. Anjali Thapa",
    visitType: "New Visit",
    status: "Completed",
    time: "10:30",
  },
  {
    token: "T-005",
    patient: "Krishna Prasad Adhikari",
    department: "General Medicine",
    doctor: "Dr. Aarav Shrestha",
    visitType: "Follow-up",
    status: "Waiting",
    time: "11:00",
  },
  {
    token: "T-006",
    patient: "Priya Magar",
    department: "General Medicine",
    doctor: "Dr. Aarav Shrestha",
    visitType: "New Visit",
    status: "Registered",
    time: "14:00",
  },
  {
    token: "T-007",
    patient: "Laxman Basnet",
    department: "Cardiology",
    doctor: "Dr. Suman Koirala",
    visitType: "Consultation",
    status: "Completed",
    time: "14:30",
  },
  {
    token: "T-008",
    patient: "Deepa Karki",
    department: "Neurology",
    doctor: "Dr. Bikram Rai",
    visitType: "New Visit",
    status: "Cancelled",
    time: "15:00",
  },
];

export default function TodayPatientsPage() {
  const [data] = useState<TodayPatient[]>(todayPatients);

  const statusVariant = (
    status: string
  ): "success" | "warning" | "danger" | "info" | "default" => {
    switch (status) {
      case "Completed":
        return "success";
      case "Waiting":
        return "warning";
      case "In Consultation":
        return "info";
      case "Cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const columns = [
    { key: "token", label: "Token", sortable: true },
    { key: "patient", label: "Patient", sortable: true },
    { key: "department", label: "Department", sortable: true },
    { key: "doctor", label: "Doctor", sortable: true },
    { key: "visitType", label: "Visit Type", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: TodayPatient) => (
        <StatusBadge status={item.status} variant={statusVariant(item.status)} />
      ),
    },
    { key: "time", label: "Time", sortable: true },
  ];

  const handleActions = (item: TodayPatient) => (
    <div className="flex items-center gap-2">
      <button
        title="View Details"
        className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
      >
        <Eye className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Today's Patients"
        description={`Patients registered for today — ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
      />

      <DataTable
        columns={columns}
        data={data as any[]}
        searchable
        searchPlaceholder="Search by patient name..."
        searchKeys={["patient", "token"]}
        filters={[
          {
            key: "status",
            label: "All Status",
            options: [
              { value: "Registered", label: "Registered" },
              { value: "Waiting", label: "Waiting" },
              { value: "In Consultation", label: "In Consultation" },
              { value: "Completed", label: "Completed" },
              { value: "Cancelled", label: "Cancelled" },
            ],
          },
          {
            key: "department",
            label: "All Departments",
            options: [
              { value: "General Medicine", label: "General Medicine" },
              { value: "Cardiology", label: "Cardiology" },
              { value: "Pediatrics", label: "Pediatrics" },
              { value: "Gynecology", label: "Gynecology" },
              { value: "Neurology", label: "Neurology" },
            ],
          },
        ]}
        actions={handleActions}
        emptyMessage="No patients registered today"
        pageSize={10}
      />
    </div>
  );
}

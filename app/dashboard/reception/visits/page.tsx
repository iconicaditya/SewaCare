"use client";

import React, { useState } from "react";
import { Eye, ArrowUpDown } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

interface OpdVisit {
  visitId: string;
  patient: string;
  department: string;
  doctor: string;
  date: string;
  type: string;
  status: string;
}

const opdVisits: OpdVisit[] = [
  {
    visitId: "VIS-001",
    patient: "Ram Bahadur Thapa",
    department: "General Medicine",
    doctor: "Dr. Aarav Shrestha",
    date: "2026-09-13",
    type: "Follow-up",
    status: "Completed",
  },
  {
    visitId: "VIS-002",
    patient: "Sunita Sharma",
    department: "Pediatrics",
    doctor: "Dr. Priya Bhandari",
    date: "2026-09-13",
    type: "New Visit",
    status: "Completed",
  },
  {
    visitId: "VIS-003",
    patient: "Bikash Gurung",
    department: "Cardiology",
    doctor: "Dr. Suman Koirala",
    date: "2026-09-13",
    type: "Follow-up",
    status: "In Consultation",
  },
  {
    visitId: "VIS-004",
    patient: "Anita Rai",
    department: "Gynecology",
    doctor: "Dr. Anjali Thapa",
    date: "2026-09-13",
    type: "New Visit",
    status: "Completed",
  },
  {
    visitId: "VIS-005",
    patient: "Krishna Prasad Adhikari",
    department: "General Medicine",
    doctor: "Dr. Aarav Shrestha",
    date: "2026-09-12",
    type: "Follow-up",
    status: "Completed",
  },
  {
    visitId: "VIS-006",
    patient: "Priya Magar",
    department: "General Medicine",
    doctor: "Dr. Aarav Shrestha",
    date: "2026-09-12",
    type: "New Visit",
    status: "Completed",
  },
  {
    visitId: "VIS-007",
    patient: "Deepa Karki",
    department: "Neurology",
    doctor: "Dr. Bikram Rai",
    date: "2026-09-11",
    type: "New Visit",
    status: "Cancelled",
  },
  {
    visitId: "VIS-008",
    patient: "Sangita Limbu",
    department: "Dermatology",
    doctor: "Dr. Sanjay Adhikari",
    date: "2026-09-11",
    type: "Consultation",
    status: "Completed",
  },
  {
    visitId: "VIS-009",
    patient: "Gopal Bisht",
    department: "Cardiology",
    doctor: "Dr. Suman Koirala",
    date: "2026-09-10",
    type: "Follow-up",
    status: "Registered",
  },
  {
    visitId: "VIS-010",
    patient: "Nirmala Shrestha",
    department: "Orthopedics",
    doctor: "Dr. Rajesh Maharjan",
    date: "2026-09-10",
    type: "Follow-up",
    status: "Cancelled",
  },
];

export default function OpdVisitsPage() {
  const [data] = useState<OpdVisit[]>(opdVisits);

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
      case "Registered":
        return "default";
      default:
        return "default";
    }
  };

  const columns = [
    { key: "visitId", label: "Visit ID", sortable: true },
    { key: "patient", label: "Patient", sortable: true },
    { key: "department", label: "Department", sortable: true },
    { key: "doctor", label: "Doctor", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "type", label: "Type", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: OpdVisit) => (
        <StatusBadge status={item.status} variant={statusVariant(item.status)} />
      ),
    },
  ];

  const handleActions = (item: OpdVisit) => (
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
        title="OPD Visits"
        description="View and manage all outpatient department visits"
      />

      <DataTable
        columns={columns}
        data={data as any[]}
        searchable
        searchPlaceholder="Search by visit ID or patient name..."
        searchKeys={["visitId", "patient"]}
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
              { value: "Dermatology", label: "Dermatology" },
              { value: "Orthopedics", label: "Orthopedics" },
              { value: "ENT", label: "ENT" },
              { value: "Ophthalmology", label: "Ophthalmology" },
              { value: "Emergency", label: "Emergency" },
            ],
          },
        ]}
        actions={handleActions}
        emptyMessage="No OPD visits found"
        pageSize={10}
      />
    </div>
  );
}

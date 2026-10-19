"use client";

import Link from "next/link";
import { Eye, Stethoscope } from "lucide-react";
import { consultations } from "@/lib/mock/consultations";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

const consultationsWithStatus = consultations.map((c) => ({
  ...c,
  status: "Completed" as const,
}));

export default function ConsultationsPage() {
  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (item: (typeof consultationsWithStatus)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof consultationsWithStatus)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-medium shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span className="font-medium text-gray-900">{item.patientName}</span>
        </div>
      ),
    },
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof consultationsWithStatus)[0]) => (
        <span className="text-gray-700">{item.doctorName}</span>
      ),
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (item: (typeof consultationsWithStatus)[0]) => (
        <span className="text-gray-700">{item.department}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: (typeof consultationsWithStatus)[0]) => {
        const date = new Date(item.date);
        return (
          <span className="text-gray-600">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        );
      },
    },
    {
      key: "chiefComplaint",
      label: "Chief Complaint",
      sortable: false,
      render: (item: (typeof consultationsWithStatus)[0]) => (
        <span className="text-gray-700 line-clamp-1 max-w-[200px]">
          {item.chiefComplaint}
        </span>
      ),
    },
    {
      key: "diagnosis",
      label: "Diagnosis",
      sortable: false,
      render: (item: (typeof consultationsWithStatus)[0]) => (
        <span className="text-gray-900 font-medium line-clamp-1 max-w-[200px]">
          {item.diagnosis}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof consultationsWithStatus)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  const renderActions = (item: (typeof consultationsWithStatus)[0]) => (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/dashboard/consultations/${item.id}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </Link>
    </div>
  );

  const filters = [
    {
      key: "department",
      label: "All Departments",
      options: [
        { value: "General Medicine", label: "General Medicine" },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Gynecology", label: "Gynecology" },
        { value: "Orthopedics", label: "Orthopedics" },
        { value: "Dermatology", label: "Dermatology" },
      ],
    },
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "Completed", label: "Completed" },
        { value: "In Progress", label: "In Progress" },
        { value: "Scheduled", label: "Scheduled" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Consultations"
        description={`Manage patient consultations (${consultations.length} total records)`}
        actions={
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
            <Stethoscope className="h-4 w-4" />
            New Consultation
          </div>
        }
      />

      <DataTable<(typeof consultationsWithStatus)[0]>
        columns={columns}
        data={consultationsWithStatus}
        searchable
        searchPlaceholder="Search by patient or doctor name..."
        searchKeys={["patientName", "doctorName"]}
        filters={filters}
        actions={renderActions}
        emptyMessage="No consultations found matching your criteria."
        pageSize={10}
      />
    </div>
  );
}

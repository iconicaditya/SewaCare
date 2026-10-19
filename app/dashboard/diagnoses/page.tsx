"use client";

import Link from "next/link";
import { Eye, ClipboardList } from "lucide-react";
import { consultations } from "@/lib/mock/consultations";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

interface DiagnosisRecord {
  id: string;
  consultationId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  preliminaryDiagnosis: string;
  finalDiagnosis: string;
  status: string;
}

const diagnoses: DiagnosisRecord[] = consultations.map((c, index) => ({
  id: `DXN-${String(index + 1).padStart(3, "0")}`,
  consultationId: c.id,
  patientId: c.patientId,
  patientName: c.patientName,
  doctorName: c.doctorName,
  date: c.date,
  preliminaryDiagnosis: c.chiefComplaint,
  finalDiagnosis: c.diagnosis,
  status: index % 3 === 0 ? "Under Review" : "Confirmed",
}));

export default function DiagnosesPage() {
  const confirmedCount = diagnoses.filter(
    (d) => d.status === "Confirmed"
  ).length;
  const reviewCount = diagnoses.filter(
    (d) => d.status === "Under Review"
  ).length;

  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (item: DiagnosisRecord) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: DiagnosisRecord) => (
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
      render: (item: DiagnosisRecord) => (
        <span className="text-gray-700">{item.doctorName}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: DiagnosisRecord) => {
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
      key: "preliminaryDiagnosis",
      label: "Preliminary Diagnosis",
      sortable: false,
      render: (item: DiagnosisRecord) => (
        <span className="text-gray-600 line-clamp-1 max-w-[180px]">
          {item.preliminaryDiagnosis}
        </span>
      ),
    },
    {
      key: "finalDiagnosis",
      label: "Final Diagnosis",
      sortable: false,
      render: (item: DiagnosisRecord) => (
        <span className="text-gray-900 font-medium line-clamp-1 max-w-[200px]">
          {item.finalDiagnosis}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: DiagnosisRecord) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  const renderActions = (item: DiagnosisRecord) => (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/dashboard/consultations/${item.consultationId}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </Link>
    </div>
  );

  const filters = [
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "Confirmed", label: "Confirmed" },
        { value: "Under Review", label: "Under Review" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Diagnoses"
        description={`Track and manage patient diagnoses (${diagnoses.length} total, ${confirmedCount} confirmed, ${reviewCount} under review)`}
        actions={
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
            <ClipboardList className="h-4 w-4" />
            New Diagnosis
          </div>
        }
      />

      <DataTable<DiagnosisRecord>
        columns={columns}
        data={diagnoses}
        searchable
        searchPlaceholder="Search by patient or doctor name..."
        searchKeys={["patientName", "doctorName"]}
        filters={filters}
        actions={renderActions}
        emptyMessage="No diagnoses found matching your criteria."
        pageSize={10}
      />
    </div>
  );
}

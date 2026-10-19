"use client";

import { useState } from "react";
import { Stethoscope } from "lucide-react";
import { emergencyPatients } from "@/lib/mock/emergency";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

const activeCases = emergencyPatients.map((patient) => ({
  ...patient,
  caseId: `CASE-${patient.id.replace("EMR-", "")}`,
  treatmentStatus:
    patient.status === "Admitted"
      ? "In Progress"
      : patient.status === "In Treatment"
      ? "In Progress"
      : patient.status === "Discharged"
      ? "Completed"
      : patient.status,
  outcome:
    patient.status === "Admitted"
      ? "Admitted"
      : patient.status === "Discharged"
      ? "Discharged"
      : patient.status === "Transferred"
      ? "Transferred"
      : "Ongoing",
}));

export default function EmergencyCasesPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(activeCases.map((c) => c.treatmentStatus))];

  const filteredCases = activeCases.filter((item) => {
    return statusFilter === "all" || item.treatmentStatus === statusFilter;
  });

  const columns = [
    {
      key: "caseId",
      label: "Case ID",
      sortable: true,
      render: (item: (typeof activeCases)[0]) => (
        <span className="font-medium text-emerald-600">{item.caseId}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof activeCases)[0]) => (
        <div className="flex items-center gap-3">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
              item.triageLevel === "Critical"
                ? "bg-red-100 text-red-700"
                : item.triageLevel === "Emergent"
                ? "bg-orange-100 text-orange-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.patientName}</p>
            <p className="text-xs text-gray-500">
              {item.patientId} · {item.age}y {item.gender}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "assignedDoctor",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof activeCases)[0]) => (
        <span className="text-gray-700">{item.assignedDoctor}</span>
      ),
    },
    {
      key: "arrivalTime",
      label: "Arrival Time",
      sortable: true,
      render: (item: (typeof activeCases)[0]) => (
        <span className="text-gray-600 text-sm">{item.arrivalTime}</span>
      ),
    },
    {
      key: "triageLevel",
      label: "Type",
      sortable: true,
      render: (item: (typeof activeCases)[0]) => {
        const colorMap: Record<string, string> = {
          Critical: "bg-red-100 text-red-800",
          Emergent: "bg-orange-100 text-orange-800",
          Urgent: "bg-amber-100 text-amber-800",
          "Less Urgent": "bg-blue-100 text-blue-800",
          "Non-Urgent": "bg-green-100 text-green-800",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              colorMap[item.triageLevel] || "bg-gray-100 text-gray-800"
            }`}
          >
            {item.triageLevel}
          </span>
        );
      },
    },
    {
      key: "treatmentStatus",
      label: "Treatment Status",
      sortable: true,
      render: (item: (typeof activeCases)[0]) => (
        <StatusBadge status={item.treatmentStatus} />
      ),
    },
    {
      key: "outcome",
      label: "Outcome",
      sortable: true,
      render: (item: (typeof activeCases)[0]) => {
        const colorMap: Record<string, string> = {
          Discharged: "text-green-700 bg-green-50",
          Admitted: "text-blue-700 bg-blue-50",
          Transferred: "text-purple-700 bg-purple-50",
          Ongoing: "text-amber-700 bg-amber-50",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              colorMap[item.outcome] || "bg-gray-100 text-gray-800"
            }`}
          >
            {item.outcome}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View
        </button>
      ),
    },
  ];

  // Summary stats
  const ongoingCount = activeCases.filter(
    (c) => c.treatmentStatus === "In Progress"
  ).length;
  const completedCount = activeCases.filter(
    (c) => c.treatmentStatus === "Completed"
  ).length;
  const criticalCount = activeCases.filter(
    (c) => c.triageLevel === "Critical"
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emergency Cases"
        description="Active and recent emergency department cases"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Critical Cases</p>
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ongoing</p>
              <p className="text-2xl font-bold text-amber-600">{ongoingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Treatment Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredCases}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No emergency cases found"
        />
      </div>
    </div>
  );
}

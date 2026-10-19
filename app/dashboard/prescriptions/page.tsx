"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Pill } from "lucide-react";
import { prescriptions, Prescription } from "@/lib/mock/prescriptions";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function PrescriptionsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeCount = prescriptions.filter((p) => p.status === "Active").length;
  const completedCount = prescriptions.filter(
    (p) => p.status === "Completed"
  ).length;
  const cancelledCount = prescriptions.filter(
    (p) => p.status === "Cancelled"
  ).length;

  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (item: Prescription) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: Prescription) => (
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
      render: (item: Prescription) => (
        <span className="text-gray-700">{item.doctorName}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: Prescription) => {
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
      key: "medicines",
      label: "Medicines",
      sortable: false,
      render: (item: Prescription) => (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          <Pill className="h-3 w-3" />
          {item.medicines.length} medicine{item.medicines.length !== 1 ? "s" : ""}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: Prescription) => <StatusBadge status={item.status} />,
    },
  ];

  const renderActions = (item: Prescription) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={() =>
          setExpandedId(expandedId === item.id ? null : item.id)
        }
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {expandedId === item.id ? (
          <>
            <ChevronUp className="h-3.5 w-3.5" />
            Collapse
          </>
        ) : (
          <>
            <ChevronDown className="h-3.5 w-3.5" />
            Expand
          </>
        )}
      </button>
    </div>
  );

  const filters = [
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "Active", label: "Active" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
      ],
    },
  ];

  // Build expanded row data
  const expandedPrescription = expandedId
    ? prescriptions.find((p) => p.id === expandedId)
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prescriptions"
        description={`Manage patient prescriptions (${prescriptions.length} total, ${activeCount} active, ${completedCount} completed, ${cancelledCount} cancelled)`}
        actions={
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
            <Pill className="h-4 w-4" />
            New Prescription
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Total</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {prescriptions.length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Active</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">
            {activeCount}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Completed</p>
          <p className="text-xl font-bold text-gray-400 mt-1">
            {completedCount}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Cancelled</p>
          <p className="text-xl font-bold text-red-500 mt-1">
            {cancelledCount}
          </p>
        </div>
      </div>

      <DataTable<Prescription>
        columns={columns}
        data={prescriptions}
        searchable
        searchPlaceholder="Search by patient or doctor name..."
        searchKeys={["patientName", "doctorName"]}
        filters={filters}
        actions={renderActions}
        emptyMessage="No prescriptions found matching your criteria."
        pageSize={10}
      />

      {/* Expanded Prescription Detail */}
      {expandedPrescription && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Prescription {expandedPrescription.id} —{" "}
              {expandedPrescription.patientName}
            </h3>
            <StatusBadge status={expandedPrescription.status} size="md" />
          </div>

          {/* Medicines Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dosage
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expandedPrescription.medicines.map((med, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 1 ? "bg-gray-50/50" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {med.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {med.dosage}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {med.frequency}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {med.duration}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {med.instructions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {expandedPrescription.notes && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs font-medium text-gray-500 mb-1">Notes</p>
              <p className="text-sm text-gray-700">
                {expandedPrescription.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Stethoscope, Eye, Edit, Trash2 } from "lucide-react";
import { doctorRounds } from "@/lib/mock/hospitalization";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function RoundsPage() {
  const columns = [
    {
      key: "id",
      label: "Round ID",
      sortable: true,
      render: (item: (typeof doctorRounds)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof doctorRounds)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-medium text-emerald-700 shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.patientName}</p>
            <p className="text-xs text-gray-500">{item.admissionId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof doctorRounds)[0]) => (
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-emerald-600" />
          <span className="text-gray-700">{item.doctorName}</span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: (typeof doctorRounds)[0]) => (
        <span className="text-gray-600 text-sm">{item.date}</span>
      ),
    },
    {
      key: "findings",
      label: "Progress Notes",
      sortable: false,
      render: (item: (typeof doctorRounds)[0]) => (
        <p className="text-sm text-gray-600 max-w-sm truncate" title={item.findings}>
          {item.findings}
        </p>
      ),
    },
    {
      key: "plan",
      label: "Treatment Plan",
      sortable: false,
      render: (item: (typeof doctorRounds)[0]) => (
        <p className="text-sm text-gray-600 max-w-sm truncate" title={item.plan}>
          {item.plan}
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor Rounds"
        description="Doctor rounds, progress notes, and treatment plans"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            New Round
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Rounds</p>
          <p className="text-2xl font-bold text-gray-900">{doctorRounds.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Today's Rounds</p>
          <p className="text-2xl font-bold text-emerald-600">
            {doctorRounds.filter((r) => r.date === "2026-09-13").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Unique Patients</p>
          <p className="text-2xl font-bold text-blue-600">
            {new Set(doctorRounds.map((r) => r.patientName)).size}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={doctorRounds}
        searchPlaceholder="Search doctor rounds..."
        searchKeys={["patientName", "doctorName", "id", "findings", "plan"]}
        actions={(item) => (
          <Dropdown
            trigger={
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </button>
            }
            items={[
              { label: "View Details", icon: Eye, onClick: () => {} },
              { label: "Edit", icon: Edit, onClick: () => {} },
              { label: "Delete", icon: Trash2, onClick: () => {}, variant: "danger" },
            ]}
          />
        )}
        pageSize={10}
        emptyMessage="No doctor rounds found"
      />
    </div>
  );
}

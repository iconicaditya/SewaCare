"use client";

import { useState } from "react";
import { ClipboardList, Eye, Edit, Trash2 } from "lucide-react";
import { icuNursingNotes } from "@/lib/mock/icu";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function ICUNursingPage() {
  const [shiftFilter, setShiftFilter] = useState("all");

  const shifts = [...new Set(icuNursingNotes.map((n) => n.shift))];

  const columns = [
    {
      key: "id",
      label: "Note ID",
      sortable: true,
      render: (item: (typeof icuNursingNotes)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof icuNursingNotes)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-sm font-medium text-red-700 shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.patientName}</p>
            <p className="text-xs text-gray-500">{item.patientId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "nurseName",
      label: "Nurse",
      sortable: true,
      render: (item: (typeof icuNursingNotes)[0]) => (
        <span className="text-gray-700">{item.nurseName}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: (typeof icuNursingNotes)[0]) => (
        <span className="text-gray-600 text-sm">{item.date}</span>
      ),
    },
    {
      key: "shift",
      label: "Shift",
      sortable: true,
      render: (item: (typeof icuNursingNotes)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info"> = {
          Morning: "success",
          Afternoon: "warning",
          Night: "info",
        };
        return (
          <StatusBadge
            status={item.shift}
            variant={variantMap[item.shift] || "default"}
          />
        );
      },
    },
    {
      key: "generalNotes",
      label: "Notes",
      sortable: false,
      render: (item: (typeof icuNursingNotes)[0]) => (
        <p className="text-sm text-gray-700 max-w-[250px] truncate" title={item.generalNotes}>
          {item.generalNotes}
        </p>
      ),
    },
    {
      key: "neurologicalStatus",
      label: "Neuro Status",
      sortable: false,
      render: (item: (typeof icuNursingNotes)[0]) => (
        <p className="text-sm text-gray-600 max-w-[180px] truncate" title={item.neurologicalStatus}>
          {item.neurologicalStatus}
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="ICU Nursing Notes"
        description="Comprehensive nursing documentation for ICU patients"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Add Note
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Notes</p>
          <p className="text-2xl font-bold text-gray-900">{icuNursingNotes.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Today's Notes</p>
          <p className="text-2xl font-bold text-emerald-600">
            {icuNursingNotes.filter((n) => n.date === "2026-09-13").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Unique Patients</p>
          <p className="text-2xl font-bold text-blue-600">
            {new Set(icuNursingNotes.map((n) => n.patientId)).size}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={shiftFilter}
          onChange={(e) => setShiftFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Shifts</option>
          {shifts.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={icuNursingNotes.filter((n) => {
          if (shiftFilter !== "all" && n.shift !== shiftFilter) return false;
          return true;
        })}
        searchPlaceholder="Search nursing notes..."
        searchKeys={["patientName", "nurseName", "generalNotes"]}
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
        emptyMessage="No nursing notes found"
      />
    </div>
  );
}

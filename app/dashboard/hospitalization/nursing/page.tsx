"use client";

import { useState } from "react";
import { ClipboardList, Eye, Edit, Trash2 } from "lucide-react";
import { nursingRecords } from "@/lib/mock/hospitalization";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function NursingPage() {
  const [shiftFilter, setShiftFilter] = useState("all");

  const shifts = [...new Set(nursingRecords.map((r) => r.shift))];

  const columns = [
    {
      key: "id",
      label: "Record ID",
      sortable: true,
      render: (item: (typeof nursingRecords)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof nursingRecords)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700 shrink-0">
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
      key: "vitalSigns",
      label: "Vital Signs",
      sortable: true,
      render: (item: (typeof nursingRecords)[0]) => (
        <div className="text-sm text-gray-700">
          {item.vitalSigns.split(", ").map((vital, idx) => (
            <p key={idx} className="leading-relaxed">{vital}</p>
          ))}
        </div>
      ),
    },
    {
      key: "notes",
      label: "Nursing Notes",
      sortable: false,
      render: (item: (typeof nursingRecords)[0]) => (
        <p className="text-sm text-gray-600 max-w-xs truncate" title={item.notes}>
          {item.notes}
        </p>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: (typeof nursingRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.date}</span>
      ),
    },
    {
      key: "shift",
      label: "Shift",
      sortable: true,
      render: (item: (typeof nursingRecords)[0]) => {
        const shiftColors: Record<string, string> = {
          Morning: "bg-amber-50 text-amber-700",
          Afternoon: "bg-blue-50 text-blue-700",
          Night: "bg-purple-50 text-purple-700",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              shiftColors[item.shift] || "bg-gray-50 text-gray-700"
            }`}
          >
            {item.shift}
          </span>
        );
      },
    },
    {
      key: "nurseName",
      label: "Nurse",
      sortable: true,
      render: (item: (typeof nursingRecords)[0]) => (
        <span className="text-gray-700">{item.nurseName}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nursing Care"
        description="Nursing observations, vital signs, and care records"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            New Record
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-2xl font-bold text-gray-900">{nursingRecords.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Morning Shift</p>
          <p className="text-2xl font-bold text-amber-600">
            {nursingRecords.filter((r) => r.shift === "Morning").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Night Shift</p>
          <p className="text-2xl font-bold text-purple-600">
            {nursingRecords.filter((r) => r.shift === "Night").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={shiftFilter}
          onChange={(e) => setShiftFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Shifts</option>
          {shifts.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={nursingRecords.filter((r) => {
          if (shiftFilter !== "all" && r.shift !== shiftFilter) return false;
          return true;
        })}
        searchPlaceholder="Search nursing records..."
        searchKeys={["patientName", "nurseName", "admissionId"]}
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
        emptyMessage="No nursing records found"
      />
    </div>
  );
}

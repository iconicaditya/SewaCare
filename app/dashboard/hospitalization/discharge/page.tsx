"use client";

import { useState } from "react";
import { FileOutput, Eye, Edit, Trash2 } from "lucide-react";
import { dischargeRecords } from "@/lib/mock/hospitalization";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function DischargePage() {
  const [typeFilter, setTypeFilter] = useState("all");

  const dischargeTypes = [...new Set(dischargeRecords.map((r) => r.dischargeType))];

  const columns = [
    {
      key: "id",
      label: "Discharge ID",
      sortable: true,
      render: (item: (typeof dischargeRecords)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof dischargeRecords)[0]) => (
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
      key: "admissionId",
      label: "Admission ID",
      sortable: true,
      render: (item: (typeof dischargeRecords)[0]) => (
        <span className="text-gray-700 font-medium">{item.admissionId}</span>
      ),
    },
    {
      key: "dischargeSummary",
      label: "Treatment Summary",
      sortable: false,
      render: (item: (typeof dischargeRecords)[0]) => (
        <p className="text-sm text-gray-600 max-w-sm truncate" title={item.dischargeSummary}>
          {item.dischargeSummary}
        </p>
      ),
    },
    {
      key: "dischargeType",
      label: "Discharge Type",
      sortable: true,
      render: (item: (typeof dischargeRecords)[0]) => {
        const typeMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Normal: "success",
          Transfer: "info",
          "Against Medical Advice": "warning",
          Deceased: "danger",
        };
        return (
          <StatusBadge
            status={item.dischargeType}
            variant={typeMap[item.dischargeType] || "default"}
          />
        );
      },
    },
    {
      key: "dischargeDate",
      label: "Discharge Date",
      sortable: true,
      render: (item: (typeof dischargeRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.dischargeDate}</span>
      ),
    },
    {
      key: "followUpDate",
      label: "Follow-Up Date",
      sortable: true,
      render: (item: (typeof dischargeRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.followUpDate}</span>
      ),
    },
    {
      key: "followUpDoctor",
      label: "Follow-Up Doctor",
      sortable: true,
      render: (item: (typeof dischargeRecords)[0]) => (
        <span className="text-gray-700">{item.followUpDoctor}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Discharge"
        description="Patient discharges and discharge summaries"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <FileOutput className="h-4 w-4" />
            New Discharge
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Discharges</p>
          <p className="text-2xl font-bold text-gray-900">{dischargeRecords.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Normal</p>
          <p className="text-2xl font-bold text-emerald-600">
            {dischargeRecords.filter((r) => r.dischargeType === "Normal").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">AMA</p>
          <p className="text-2xl font-bold text-amber-600">
            {dischargeRecords.filter((r) => r.dischargeType === "Against Medical Advice").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Transferred</p>
          <p className="text-2xl font-bold text-blue-600">
            {dischargeRecords.filter((r) => r.dischargeType === "Transfer").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Discharge Types</option>
          {dischargeTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={dischargeRecords.filter((r) => {
          if (typeFilter !== "all" && r.dischargeType !== typeFilter) return false;
          return true;
        })}
        searchPlaceholder="Search discharge records..."
        searchKeys={["patientName", "id", "admissionId", "followUpDoctor", "dischargeSummary"]}
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
        emptyMessage="No discharge records found"
      />
    </div>
  );
}

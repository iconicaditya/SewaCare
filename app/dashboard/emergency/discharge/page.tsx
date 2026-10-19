"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { emergencyPatients } from "@/lib/mock/emergency";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

const dischargeData = emergencyPatients.map((patient) => ({
  ...patient,
  outcome:
    patient.status === "Admitted"
      ? "Admitted"
      : patient.status === "Discharged"
      ? "Discharged"
      : patient.status === "Transferred"
      ? "Referred"
      : "Ongoing",
  dischargeDate:
    patient.status === "Discharged" || patient.status === "Admitted"
      ? patient.arrivalTime.split(" ")[0]
      : null,
}));

export default function EmergencyDischargePage() {
  const [search, setSearch] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");

  const outcomes = [...new Set(dischargeData.map((d) => d.outcome))];

  const filteredData = dischargeData.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(search.toLowerCase()) ||
      item.patientId.toLowerCase().includes(search.toLowerCase());
    const matchesOutcome =
      outcomeFilter === "all" || item.outcome === outcomeFilter;
    return matchesSearch && matchesOutcome;
  });

  const columns = [
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof dischargeData)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-sm font-medium shrink-0">
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
      key: "arrivalTime",
      label: "Arrival Date",
      sortable: true,
      render: (item: (typeof dischargeData)[0]) => (
        <span className="text-gray-600">{item.arrivalTime}</span>
      ),
    },
    {
      key: "outcome",
      label: "Outcome",
      sortable: true,
      render: (item: (typeof dischargeData)[0]) => {
        const colorMap: Record<string, string> = {
          Discharged: "bg-green-100 text-green-800",
          Admitted: "bg-blue-100 text-blue-800",
          Referred: "bg-purple-100 text-purple-800",
          Ongoing: "bg-amber-100 text-amber-800",
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
      key: "triageLevel",
      label: "Triage Level",
      sortable: true,
      render: (item: (typeof dischargeData)[0]) => {
        const colorMap: Record<string, string> = {
          Critical: "bg-red-100 text-red-800",
          Emergent: "bg-orange-100 text-orange-800",
          Urgent: "bg-amber-100 text-amber-800",
          "Less Urgent": "bg-blue-100 text-blue-800",
          "Non-Urgent": "bg-green-100 text-green-800",
        };
        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              colorMap[item.triageLevel] || "bg-gray-100 text-gray-800"
            }`}
          >
            {item.triageLevel}
          </span>
        );
      },
    },
    {
      key: "assignedDoctor",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof dischargeData)[0]) => (
        <span className="text-gray-700">{item.assignedDoctor}</span>
      ),
    },
    {
      key: "dischargeDate",
      label: "Discharge Date",
      sortable: true,
      render: (item: (typeof dischargeData)[0]) => (
        <span className="text-gray-600">
          {item.dischargeDate
            ? new Date(item.dischargeDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: (typeof dischargeData)[0]) => (
        <div className="flex items-center gap-2">
          {item.outcome === "Ongoing" ? (
            <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-3 py-1.5 text-xs font-medium">
              Discharge
            </button>
          ) : (
            <button className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  // Summary stats
  const dischargedCount = dischargeData.filter(
    (d) => d.outcome === "Discharged"
  ).length;
  const admittedCount = dischargeData.filter(
    (d) => d.outcome === "Admitted"
  ).length;
  const referredCount = dischargeData.filter(
    (d) => d.outcome === "Referred"
  ).length;
  const ongoingCount = dischargeData.filter(
    (d) => d.outcome === "Ongoing"
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emergency Discharge / Admission"
        description="Track patient discharge and admission outcomes from the emergency department"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Discharged</p>
              <p className="text-2xl font-bold text-green-600">
                {dischargedCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Admitted</p>
              <p className="text-2xl font-bold text-blue-600">{admittedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Referred</p>
              <p className="text-2xl font-bold text-purple-600">
                {referredCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ongoing</p>
              <p className="text-2xl font-bold text-amber-600">{ongoingCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by patient name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 w-full"
          />
        </div>
        <select
          value={outcomeFilter}
          onChange={(e) => setOutcomeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Outcomes</option>
          {outcomes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredData}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No discharge/admission records found"
        />
      </div>
    </div>
  );
}

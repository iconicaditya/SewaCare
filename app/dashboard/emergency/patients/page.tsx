"use client";

import { useState } from "react";
import { AlertTriangle, Eye } from "lucide-react";
import { emergencyPatients } from "@/lib/mock/emergency";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function EmergencyPatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [triageFilter, setTriageFilter] = useState("all");

  const statuses = [...new Set(emergencyPatients.map((p) => p.status))];
  const triageLevels = [...new Set(emergencyPatients.map((p) => p.triageLevel))];

  const filteredPatients = emergencyPatients.filter((patient) => {
    const matchesSearch =
      patient.patientName.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter;
    const matchesTriage =
      triageFilter === "all" || patient.triageLevel === triageFilter;
    return matchesSearch && matchesStatus && matchesTriage;
  });

  const getTriageBadge = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "Emergent":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Urgent":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Less Urgent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Non-Urgent":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getArrivalModeBadge = (mode: string) => {
    switch (mode) {
      case "Ambulance":
        return "bg-red-100 text-red-700";
      case "Police":
        return "bg-blue-100 text-blue-700";
      case "Referral":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "id",
      label: "Patient ID",
      sortable: true,
      render: (item: (typeof emergencyPatients)[0]) => (
        <span className="font-medium text-emerald-600">{item.patientId}</span>
      ),
    },
    {
      key: "patientName",
      label: "Name",
      sortable: true,
      render: (item: (typeof emergencyPatients)[0]) => (
        <div className="flex items-center gap-3">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
              item.triageLevel === "Critical"
                ? "bg-red-100 text-red-700"
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
              {item.age}y {item.gender}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "arrivalTime",
      label: "Arrival Time",
      sortable: true,
      render: (item: (typeof emergencyPatients)[0]) => (
        <span className="text-gray-600">{item.arrivalTime}</span>
      ),
    },
    {
      key: "chiefComplaint",
      label: "Complaint",
      sortable: false,
      render: (item: (typeof emergencyPatients)[0]) => (
        <span className="text-gray-700 line-clamp-1 max-w-[200px]">
          {item.chiefComplaint}
        </span>
      ),
    },
    {
      key: "triageLevel",
      label: "Emergency Type",
      sortable: true,
      render: (item: (typeof emergencyPatients)[0]) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTriageBadge(
            item.triageLevel
          )}`}
        >
          {item.triageLevel === "Critical" && (
            <AlertTriangle className="h-3 w-3 mr-1" />
          )}
          {item.triageLevel}
        </span>
      ),
    },
    {
      key: "arrivalMode",
      label: "Arrival",
      sortable: true,
      render: (item: (typeof emergencyPatients)[0]) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getArrivalModeBadge(
            item.arrivalMode
          )}`}
        >
          {item.arrivalMode}
        </span>
      ),
    },
    {
      key: "assignedDoctor",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof emergencyPatients)[0]) => (
        <span className="text-gray-700">{item.assignedDoctor}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof emergencyPatients)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <button className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
          <Eye className="h-4 w-4" />
        </button>
      ),
    },
  ];

  // Summary stats
  const criticalCount = emergencyPatients.filter(
    (p) => p.triageLevel === "Critical"
  ).length;
  const emergentCount = emergencyPatients.filter(
    (p) => p.triageLevel === "Emergent"
  ).length;
  const activeCount = emergencyPatients.filter(
    (p) => p.status === "In Treatment" || p.status === "Waiting"
  ).length;
  const admittedCount = emergencyPatients.filter(
    (p) => p.status === "Admitted"
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Emergency Patients"
        description="Manage emergency department patients and tracking"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Critical</p>
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Emergent</p>
              <p className="text-2xl font-bold text-orange-600">{emergentCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Now</p>
              <p className="text-2xl font-bold text-amber-600">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Admitted</p>
              <p className="text-2xl font-bold text-blue-600">{admittedCount}</p>
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
          value={triageFilter}
          onChange={(e) => setTriageFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Triage Levels</option>
          {triageLevels.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Status</option>
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
          data={filteredPatients}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No emergency patients found"
        />
      </div>
    </div>
  );
}

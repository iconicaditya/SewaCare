"use client";

import { useState } from "react";
import { AlertTriangle, Heart } from "lucide-react";
import { triageRecords } from "@/lib/mock/emergency";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function TriagePage() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const priorities = [...new Set(triageRecords.map((t) => t.triageLevel))];

  const filteredRecords = triageRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(search.toLowerCase()) ||
      record.id.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || record.triageLevel === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getPriorityBadge = (level: string) => {
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

  const getPainColor = (pain: number) => {
    if (pain >= 8) return "text-red-600 font-bold";
    if (pain >= 5) return "text-amber-600 font-semibold";
    return "text-green-600 font-medium";
  };

  const columns = [
    {
      key: "id",
      label: "Triage ID",
      sortable: true,
      render: (item: (typeof triageRecords)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof triageRecords)[0]) => (
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
            <p className="text-xs text-gray-500">{item.emergencyId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "triageLevel",
      label: "Priority",
      sortable: true,
      render: (item: (typeof triageRecords)[0]) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(
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
      key: "vitalSigns",
      label: "Vital Signs",
      sortable: false,
      render: (item: (typeof triageRecords)[0]) => (
        <div className="space-y-0.5">
          <p className="text-xs text-gray-600">
            <span className="font-medium">BP:</span> {item.vitalSigns.bloodPressure}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-medium">HR:</span> {item.vitalSigns.heartRate}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-medium">SpO2:</span> {item.vitalSigns.spO2}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-medium">Temp:</span> {item.vitalSigns.temperature}°C
          </p>
        </div>
      ),
    },
    {
      key: "painScale",
      label: "Pain",
      sortable: true,
      render: (item: (typeof triageRecords)[0]) => (
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-gray-400" />
          <span className={getPainColor(item.painScale)}>{item.painScale}/10</span>
        </div>
      ),
    },
    {
      key: "notes",
      label: "Assessment",
      sortable: false,
      render: (item: (typeof triageRecords)[0]) => (
        <span className="text-gray-600 text-xs line-clamp-1 max-w-[180px]">
          {item.notes}
        </span>
      ),
    },
    {
      key: "assessedBy",
      label: "Assessed By",
      sortable: true,
      render: (item: (typeof triageRecords)[0]) => (
        <span className="text-gray-700 text-sm">{item.assessedBy}</span>
      ),
    },
    {
      key: "assessedAt",
      label: "Assessment Time",
      sortable: true,
      render: (item: (typeof triageRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.assessedAt}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Triage"
        description="Emergency triage assessment and priority management"
      />

      {/* Priority Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {triageRecords.filter((t) => t.triageLevel === "Critical").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-amber-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Emergent</p>
              <p className="text-2xl font-bold text-amber-600">
                {triageRecords.filter((t) => t.triageLevel === "Emergent").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-blue-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Urgent / Less Urgent</p>
              <p className="text-2xl font-bold text-blue-600">
                {triageRecords.filter(
                  (t) =>
                    t.triageLevel === "Urgent" || t.triageLevel === "Less Urgent"
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by patient name or triage ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 w-full"
          />
        </div>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Priorities</option>
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No triage records found"
        />
      </div>
    </div>
  );
}

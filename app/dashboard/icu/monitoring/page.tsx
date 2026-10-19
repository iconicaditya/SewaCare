"use client";

import { useState } from "react";
import { Activity, Eye, Edit, Trash2 } from "lucide-react";
import { monitoringRecords } from "@/lib/mock/icu";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function ICUMonitoringPage() {
  const [patientFilter, setPatientFilter] = useState("all");

  const patients = [...new Set(monitoringRecords.map((r) => r.patientName))];

  const getVitalColor = (type: string, value: number) => {
    switch (type) {
      case "heartRate":
        if (value < 60 || value > 100) return "text-red-600 font-medium";
        return "text-gray-900";
      case "spO2":
        if (value < 95) return "text-red-600 font-medium";
        if (value < 97) return "text-amber-600 font-medium";
        return "text-gray-900";
      case "temperature":
        if (value < 36.1 || value > 37.5) return "text-red-600 font-medium";
        return "text-gray-900";
      case "respiratoryRate":
        if (value < 12 || value > 20) return "text-amber-600 font-medium";
        return "text-gray-900";
      default:
        return "text-gray-900";
    }
  };

  const columns = [
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => (
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
      key: "bloodPressure",
      label: "BP",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => {
        const systolic = parseInt(item.bloodPressure.split("/")[0]);
        const isAbnormal = systolic < 90 || systolic > 140;
        return (
          <span className={isAbnormal ? "text-red-600 font-medium" : "text-gray-900"}>
            {item.bloodPressure} mmHg
          </span>
        );
      },
    },
    {
      key: "heartRate",
      label: "Heart Rate",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => (
        <span className={getVitalColor("heartRate", item.heartRate)}>
          {item.heartRate} bpm
        </span>
      ),
    },
    {
      key: "spO2",
      label: "O₂ Saturation",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => (
        <span className={getVitalColor("spO2", item.spO2)}>
          {item.spO2}%
        </span>
      ),
    },
    {
      key: "temperature",
      label: "Temperature",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => (
        <span className={getVitalColor("temperature", item.temperature)}>
          {item.temperature}°C
        </span>
      ),
    },
    {
      key: "respiratoryRate",
      label: "Resp Rate",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => (
        <span className={getVitalColor("respiratoryRate", item.respiratoryRate)}>
          {item.respiratoryRate}/min
        </span>
      ),
    },
    {
      key: "time",
      label: "Time",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => (
        <span className="text-gray-600 text-sm">{item.time}</span>
      ),
    },
    {
      key: "recordedBy",
      label: "Recorded By",
      sortable: true,
      render: (item: (typeof monitoringRecords)[0]) => (
        <span className="text-gray-700">{item.recordedBy}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="ICU Monitoring"
        description="Real-time vital signs and patient monitoring records"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Add Record
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Records</p>
          <p className="text-2xl font-bold text-gray-900">{monitoringRecords.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Patients Monitored</p>
          <p className="text-2xl font-bold text-emerald-600">{patients.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Today's Records</p>
          <p className="text-2xl font-bold text-blue-600">
            {monitoringRecords.filter((r) => r.time.startsWith("2026-09-13")).length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Patients</option>
          {patients.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={monitoringRecords.filter((r) => {
          if (patientFilter !== "all" && r.patientName !== patientFilter) return false;
          return true;
        })}
        searchPlaceholder="Search monitoring records..."
        searchKeys={["patientName", "patientId", "recordedBy"]}
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
        emptyMessage="No monitoring records found"
      />
    </div>
  );
}

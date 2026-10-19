"use client";

import { useState } from "react";
import { UserPlus, Eye, Edit, Trash2 } from "lucide-react";
import { admissions } from "@/lib/mock/hospitalization";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function AdmissionsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const departments = [...new Set(admissions.map((a) => a.department))];
  const statuses = [...new Set(admissions.map((a) => a.status))];

  const columns = [
    {
      key: "id",
      label: "Admission ID",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
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
            <p className="text-xs text-gray-500">{item.patientId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
        <span className="text-gray-700">{item.doctorName}</span>
      ),
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
        <span className="text-gray-700">{item.department}</span>
      ),
    },
    {
      key: "admissionDate",
      label: "Admission Date",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
        <span className="text-gray-600 text-sm">{item.admissionDate}</span>
      ),
    },
    {
      key: "ward",
      label: "Ward",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
        <span className="text-gray-700">{item.ward}</span>
      ),
    },
    {
      key: "room",
      label: "Room",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
        <span className="text-gray-700">{item.room}</span>
      ),
    },
    {
      key: "bed",
      label: "Bed",
      sortable: true,
      render: (item: (typeof admissions)[0]) => (
        <span className="text-gray-700">{item.bed}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof admissions)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Active: "success",
          Discharged: "info",
          Transferred: "warning",
        };
        return <StatusBadge status={item.status} variant={variantMap[item.status] || "default"} />;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admissions"
        description="Manage hospital in-patient admissions"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            New Admission
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Admissions</p>
          <p className="text-2xl font-bold text-gray-900">{admissions.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-emerald-600">
            {admissions.filter((a) => a.status === "Active").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Discharged</p>
          <p className="text-2xl font-bold text-blue-600">
            {admissions.filter((a) => a.status === "Discharged").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Transferred</p>
          <p className="text-2xl font-bold text-amber-600">
            {admissions.filter((a) => a.status === "Transferred").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={admissions.filter((a) => {
          if (statusFilter !== "all" && a.status !== statusFilter) return false;
          if (departmentFilter !== "all" && a.department !== departmentFilter) return false;
          return true;
        })}
        searchPlaceholder="Search admissions..."
        searchKeys={["patientName", "patientId", "doctorName", "id", "diagnosis"]}
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
        emptyMessage="No admissions found"
      />
    </div>
  );
}

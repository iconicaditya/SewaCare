"use client";

import { useState } from "react";
import { TestTube, Eye, Edit, Trash2 } from "lucide-react";
import { crossMatches } from "@/lib/mock/blood-bank";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function CrossMatchingPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(crossMatches.map((c) => c.status))];

  const compatibleCount = crossMatches.filter((c) => c.crossMatchResult === "Compatible").length;
  const incompatibleCount = crossMatches.filter((c) => c.crossMatchResult === "Incompatible").length;
  const completedCount = crossMatches.filter((c) => c.status === "Completed").length;

  const columns = [
    {
      key: "id",
      label: "Match ID",
      sortable: true,
      render: (item: (typeof crossMatches)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof crossMatches)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700 shrink-0">
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
      key: "bloodGroup",
      label: "Blood Group",
      sortable: true,
      render: (item: (typeof crossMatches)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
          {item.bloodGroup}
        </span>
      ),
    },
    {
      key: "unitIds",
      label: "Donor Units",
      sortable: false,
      render: (item: (typeof crossMatches)[0]) => (
        <div className="flex flex-wrap gap-1">
          {item.unitIds.map((uid) => (
            <span
              key={uid}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
            >
              {uid}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "crossMatchResult",
      label: "Result",
      sortable: true,
      render: (item: (typeof crossMatches)[0]) => {
        const variantMap: Record<string, "success" | "danger"> = {
          Compatible: "success",
          Incompatible: "danger",
        };
        return (
          <StatusBadge
            status={item.crossMatchResult}
            variant={variantMap[item.crossMatchResult] || "default"}
          />
        );
      },
    },
    {
      key: "performedBy",
      label: "Tested By",
      sortable: true,
      render: (item: (typeof crossMatches)[0]) => (
        <span className="text-gray-700">{item.performedBy}</span>
      ),
    },
    {
      key: "performedAt",
      label: "Test Date",
      sortable: true,
      render: (item: (typeof crossMatches)[0]) => (
        <span className="text-gray-600 text-sm">{item.performedAt}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof crossMatches)[0]) => {
        const variantMap: Record<string, "success" | "warning"> = {
          Completed: "success",
          Pending: "warning",
        };
        return (
          <StatusBadge
            status={item.status}
            variant={variantMap[item.status] || "default"}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cross Matching"
        description="Blood cross matching test results and records"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            New Cross Match
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Tests</p>
          <p className="text-2xl font-bold text-gray-900">{crossMatches.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Compatible</p>
          <p className="text-2xl font-bold text-emerald-600">{compatibleCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Incompatible</p>
          <p className="text-2xl font-bold text-red-600">{incompatibleCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Table */}
      <DataTable
        columns={columns}
        data={crossMatches.filter((c) => {
          if (statusFilter !== "all" && c.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search cross matching records..."
        searchKeys={["patientName", "bloodGroup", "performedBy", "id"]}
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
        emptyMessage="No cross matching records found"
      />
    </div>
  );
}

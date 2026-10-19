"use client";

import { useState } from "react";
import { Send, Eye, Edit, Trash2 } from "lucide-react";
import { bloodIssues } from "@/lib/mock/blood-bank";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function BloodIssuesPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(bloodIssues.map((i) => i.status))];

  const totalUnitsIssued = bloodIssues.reduce((sum, i) => sum + i.units, 0);

  const columns = [
    {
      key: "id",
      label: "Issue ID",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-sm font-medium text-red-700 shrink-0">
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
      key: "bloodUnit",
      label: "Blood Unit",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => (
        <div className="flex flex-wrap gap-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
            {item.bloodGroup}
          </span>
        </div>
      ),
    },
    {
      key: "unitIds",
      label: "Unit IDs",
      sortable: false,
      render: (item: (typeof bloodIssues)[0]) => (
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
      key: "units",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => (
        <span className="text-gray-900 font-medium">{item.units} units</span>
      ),
    },
    {
      key: "issuedAt",
      label: "Date",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => (
        <span className="text-gray-600 text-sm">{item.issuedAt}</span>
      ),
    },
    {
      key: "issuedBy",
      label: "Issued By",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => (
        <span className="text-gray-700">{item.issuedBy}</span>
      ),
    },
    {
      key: "issuedTo",
      label: "Issued To",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => (
        <span className="text-gray-700">{item.issuedTo}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof bloodIssues)[0]) => {
        const variantMap: Record<string, "success" | "warning"> = {
          Issued: "success",
          Returned: "warning",
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
        title="Blood Issues"
        description="Track blood unit issues to patients"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Send className="h-4 w-4" />
            Issue Blood
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Issues</p>
          <p className="text-2xl font-bold text-gray-900">{bloodIssues.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Units Issued</p>
          <p className="text-2xl font-bold text-red-600">{totalUnitsIssued}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Patients Served</p>
          <p className="text-2xl font-bold text-emerald-600">
            {new Set(bloodIssues.map((i) => i.patientName)).size}
          </p>
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
        data={bloodIssues.filter((i) => {
          if (statusFilter !== "all" && i.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search blood issues..."
        searchKeys={["patientName", "bloodGroup", "issuedBy", "issuedTo", "id"]}
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
        emptyMessage="No blood issues found"
      />
    </div>
  );
}

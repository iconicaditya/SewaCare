"use client";

import { useState } from "react";
import { BedDouble, Eye, Edit, Trash2 } from "lucide-react";
import { beds } from "@/lib/mock/hospitalization";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function BedsPage() {
  const [wardFilter, setWardFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const wards = [...new Set(beds.map((b) => b.ward))];
  const statuses = [...new Set(beds.map((b) => b.status))];

  const columns = [
    {
      key: "id",
      label: "Bed ID",
      sortable: true,
      render: (item: (typeof beds)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "number",
      label: "Bed Number",
      sortable: true,
      render: (item: (typeof beds)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <BedDouble className="h-4 w-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{item.number}</span>
        </div>
      ),
    },
    {
      key: "room",
      label: "Room",
      sortable: true,
      render: (item: (typeof beds)[0]) => (
        <span className="text-gray-700">{item.room}</span>
      ),
    },
    {
      key: "ward",
      label: "Ward",
      sortable: true,
      render: (item: (typeof beds)[0]) => (
        <span className="text-gray-700">{item.ward}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof beds)[0]) =>
        item.patientName ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
              {item.patientName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.patientName}</p>
              <p className="text-xs text-gray-500">{item.patientId}</p>
            </div>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof beds)[0]) => {
        const variantMap: Record<string, "success" | "info" | "warning" | "default"> = {
          Available: "success",
          Occupied: "info",
          Reserved: "warning",
          Maintenance: "default",
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
        title="Beds"
        description="Manage hospital beds and bed status"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <BedDouble className="h-4 w-4" />
            Add Bed
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <BedDouble className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Beds</p>
              <p className="text-2xl font-bold text-gray-900">{beds.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <BedDouble className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <p className="text-2xl font-bold text-emerald-600">
                {beds.filter((b) => b.status === "Available").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <BedDouble className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Occupied</p>
              <p className="text-2xl font-bold text-blue-600">
                {beds.filter((b) => b.status === "Occupied").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <BedDouble className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Reserved</p>
              <p className="text-2xl font-bold text-amber-600">
                {beds.filter((b) => b.status === "Reserved").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={wardFilter}
          onChange={(e) => setWardFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Wards</option>
          {wards.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
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
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={beds.filter((b) => {
          if (wardFilter !== "all" && b.ward !== wardFilter) return false;
          if (statusFilter !== "all" && b.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search beds..."
        searchKeys={["number", "room", "ward", "patientName"]}
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
        emptyMessage="No beds found"
      />
    </div>
  );
}

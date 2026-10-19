"use client";

import { useState } from "react";
import { DoorOpen, Eye, Edit, Trash2 } from "lucide-react";
import { rooms } from "@/lib/mock/hospitalization";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function RoomsPage() {
  const [wardFilter, setWardFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const wards = [...new Set(rooms.map((r) => r.ward))];
  const types = [...new Set(rooms.map((r) => r.type))];

  const columns = [
    {
      key: "id",
      label: "Room ID",
      sortable: true,
      render: (item: (typeof rooms)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "number",
      label: "Room Number",
      sortable: true,
      render: (item: (typeof rooms)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <DoorOpen className="h-4 w-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{item.number}</span>
        </div>
      ),
    },
    {
      key: "ward",
      label: "Ward",
      sortable: true,
      render: (item: (typeof rooms)[0]) => (
        <span className="text-gray-700">{item.ward}</span>
      ),
    },
    {
      key: "type",
      label: "Room Type",
      sortable: true,
      render: (item: (typeof rooms)[0]) => {
        const typeColors: Record<string, string> = {
          General: "bg-blue-50 text-blue-700",
          "Semi-Private": "bg-purple-50 text-purple-700",
          Private: "bg-emerald-50 text-emerald-700",
          ICU: "bg-red-50 text-red-700",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              typeColors[item.type] || "bg-gray-50 text-gray-700"
            }`}
          >
            {item.type}
          </span>
        );
      },
    },
    {
      key: "beds",
      label: "Bed Count",
      sortable: true,
      render: (item: (typeof rooms)[0]) => (
        <span className="text-gray-900 font-medium">{item.beds}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof rooms)[0]) => {
        const variantMap: Record<string, "success" | "info" | "warning" | "default"> = {
          Available: "success",
          Occupied: "info",
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
        title="Rooms"
        description="Manage hospital rooms and room types"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <DoorOpen className="h-4 w-4" />
            Add Room
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Rooms</p>
          <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Available</p>
          <p className="text-2xl font-bold text-emerald-600">
            {rooms.filter((r) => r.status === "Available").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Occupied</p>
          <p className="text-2xl font-bold text-blue-600">
            {rooms.filter((r) => r.status === "Occupied").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Maintenance</p>
          <p className="text-2xl font-bold text-gray-600">
            {rooms.filter((r) => r.status === "Maintenance").length}
          </p>
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
        >
          <option value="all">All Room Types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={rooms.filter((r) => {
          if (wardFilter !== "all" && r.ward !== wardFilter) return false;
          if (typeFilter !== "all" && r.type !== typeFilter) return false;
          return true;
        })}
        searchPlaceholder="Search rooms..."
        searchKeys={["number", "ward", "type"]}
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
        emptyMessage="No rooms found"
      />
    </div>
  );
}

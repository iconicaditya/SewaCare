"use client";

import { useState } from "react";
import { Building2, Eye, Edit, Trash2 } from "lucide-react";
import { wards } from "@/lib/mock/hospitalization";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function WardsPage() {
  const columns = [
    {
      key: "id",
      label: "Ward ID",
      sortable: true,
      render: (item: (typeof wards)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Ward Name",
      sortable: true,
      render: (item: (typeof wards)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">{item.type} Ward</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Department",
      sortable: true,
      render: (item: (typeof wards)[0]) => (
        <span className="text-gray-700">{item.type}</span>
      ),
    },
    {
      key: "totalBeds",
      label: "Total Beds",
      sortable: true,
      render: (item: (typeof wards)[0]) => (
        <span className="text-gray-900 font-medium">{item.totalBeds}</span>
      ),
    },
    {
      key: "occupiedBeds",
      label: "Available Beds",
      sortable: true,
      render: (item: (typeof wards)[0]) => {
        const available = item.totalBeds - item.occupiedBeds;
        const percentage = Math.round((item.occupiedBeds / item.totalBeds) * 100);
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {available} / {item.totalBeds}
              </span>
              <span className="text-xs text-gray-500">({percentage}% occupied)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  percentage >= 90
                    ? "bg-red-500"
                    : percentage >= 70
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "chargeNurse",
      label: "Charge Nurse",
      sortable: true,
      render: (item: (typeof wards)[0]) => (
        <span className="text-gray-700">{item.chargeNurse}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof wards)[0]) => (
        <StatusBadge
          status={item.status}
          variant={item.status === "Active" ? "success" : "default"}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wards"
        description="Manage hospital wards and bed allocation"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Add Ward
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Wards</p>
          <p className="text-2xl font-bold text-gray-900">{wards.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Beds</p>
          <p className="text-2xl font-bold text-gray-900">
            {wards.reduce((sum, w) => sum + w.totalBeds, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Occupied</p>
          <p className="text-2xl font-bold text-amber-600">
            {wards.reduce((sum, w) => sum + w.occupiedBeds, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Available</p>
          <p className="text-2xl font-bold text-emerald-600">
            {wards.reduce((sum, w) => sum + (w.totalBeds - w.occupiedBeds), 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={wards}
        searchPlaceholder="Search wards..."
        searchKeys={["name", "type", "chargeNurse"]}
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
        emptyMessage="No wards found"
      />
    </div>
  );
}

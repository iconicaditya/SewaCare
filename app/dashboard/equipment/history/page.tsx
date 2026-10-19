"use client";

import { useState } from "react";
import { History, Eye, Edit, Trash2, Download } from "lucide-react";
import { serviceHistory } from "@/lib/mock/equipment";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function ServiceHistoryPage() {
  const [typeFilter, setTypeFilter] = useState("all");

  const totalCount = serviceHistory.length;
  const totalCost = serviceHistory.reduce((sum, s) => sum + s.cost, 0);

  const columns = [
    {
      key: "id",
      label: "Record ID",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "equipmentName",
      label: "Equipment",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.equipmentName}</p>
          <p className="text-xs text-gray-500">{item.equipmentId}</p>
        </div>
      ),
    },
    {
      key: "serviceDate",
      label: "Service Date",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <span className="text-gray-600 text-sm">{item.serviceDate}</span>
      ),
    },
    {
      key: "issueReported",
      label: "Type",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          {item.issueReported.length > 30
            ? item.issueReported.substring(0, 30) + "..."
            : item.issueReported}
        </span>
      ),
    },
    {
      key: "technician",
      label: "Technician",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <span className="text-gray-600 text-sm">{item.technician}</span>
      ),
    },
    {
      key: "actionTaken",
      label: "Description",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <span
          className="text-gray-600 text-sm"
          title={item.actionTaken}
        >
          {item.actionTaken.length > 40
            ? item.actionTaken.substring(0, 40) + "..."
            : item.actionTaken}
        </span>
      ),
    },
    {
      key: "cost",
      label: "Cost",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <span className="text-gray-900 font-medium">NPR {item.cost.toLocaleString()}</span>
      ),
    },
    {
      key: "downtime",
      label: "Downtime",
      sortable: true,
      render: (item: (typeof serviceHistory)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
          {item.downtime}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service History"
        description="Complete history of equipment servicing and repairs"
        actions={
          <div className="flex gap-2">
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
              <History className="h-4 w-4" />
              Add Record
            </button>
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Service Records</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Service Cost</p>
          <p className="text-2xl font-bold text-gray-900">NPR {totalCost.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Equipment Serviced</p>
          <p className="text-2xl font-bold text-emerald-600">
            {new Set(serviceHistory.map((s) => s.equipmentId)).size}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={serviceHistory}
        searchPlaceholder="Search service history..."
        searchKeys={["equipmentName", "technician", "actionTaken", "issueReported"]}
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
        emptyMessage="No service history found"
      />
    </div>
  );
}

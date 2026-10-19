"use client";

import { useState } from "react";
import { Users, Eye, Edit, Trash2 } from "lucide-react";
import { surgicalTeams } from "@/lib/mock/operation-theatre";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function SurgicalTeamPage() {
  const columns = [
    {
      key: "id",
      label: "Team ID",
      sortable: true,
      render: (item: (typeof surgicalTeams)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "surgeryId",
      label: "Surgery ID",
      sortable: true,
      render: (item: (typeof surgicalTeams)[0]) => (
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
          {item.surgeryId}
        </span>
      ),
    },
    {
      key: "surgeon",
      label: "Surgeon",
      sortable: true,
      render: (item: (typeof surgicalTeams)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-medium text-emerald-700 shrink-0">
            {item.surgeon
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span className="font-medium text-gray-900">{item.surgeon}</span>
        </div>
      ),
    },
    {
      key: "assistantSurgeon",
      label: "Assistant Surgeon",
      sortable: true,
      render: (item: (typeof surgicalTeams)[0]) => (
        <span className="text-gray-700">{item.assistantSurgeon || "—"}</span>
      ),
    },
    {
      key: "anesthesiologist",
      label: "Anesthesiologist",
      sortable: true,
      render: (item: (typeof surgicalTeams)[0]) => (
        <span className="text-gray-700">{item.anesthesiologist}</span>
      ),
    },
    {
      key: "nurses",
      label: "Nurses",
      sortable: false,
      render: (item: (typeof surgicalTeams)[0]) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-gray-700">
            <span className="text-xs text-gray-500">Scrub:</span> {item.scrubNurse}
          </span>
          <span className="text-sm text-gray-700">
            <span className="text-xs text-gray-500">Circ:</span> {item.circulatingNurse}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: () => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          Assigned
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Surgical Team"
        description="Manage surgical team assignments"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Assign Team
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Teams</p>
          <p className="text-2xl font-bold text-gray-900">{surgicalTeams.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Unique Surgeons</p>
          <p className="text-2xl font-bold text-emerald-600">
            {new Set(surgicalTeams.map((t) => t.surgeon)).size}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">With Assistant</p>
          <p className="text-2xl font-bold text-blue-600">
            {surgicalTeams.filter((t) => t.assistantSurgeon).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={surgicalTeams}
        searchPlaceholder="Search surgical teams..."
        searchKeys={["surgeon", "assistantSurgeon", "anesthesiologist", "scrubNurse", "circulatingNurse"]}
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
        emptyMessage="No surgical teams found"
      />
    </div>
  );
}

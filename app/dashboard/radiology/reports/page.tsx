"use client";

import { useState } from "react";
import { Eye, Printer } from "lucide-react";
import { radiologyReports } from "@/lib/mock/radiology";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import { Modal } from "@/components/ui/modal";

export default function RadiologyReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<(typeof radiologyReports)[0] | null>(null);

  const statuses = [...new Set(radiologyReports.map((r) => r.status))];

  const filteredReports = radiologyReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(search.toLowerCase()) ||
      report.id.toLowerCase().includes(search.toLowerCase()) ||
      report.service.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "id",
      label: "Report ID",
      sortable: true,
      render: (item: (typeof radiologyReports)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof radiologyReports)[0]) => (
        <span className="font-medium text-gray-900">{item.patientName}</span>
      ),
    },
    {
      key: "service",
      label: "Imaging Type",
      sortable: true,
      render: (item: (typeof radiologyReports)[0]) => (
        <div>
          <span className="font-medium text-gray-900">{item.service}</span>
          <p className="text-xs text-gray-500">{item.bodyPart}</p>
        </div>
      ),
    },
    {
      key: "radiologist",
      label: "Radiologist",
      sortable: true,
      render: (item: (typeof radiologyReports)[0]) => (
        <span className="text-gray-700">{item.radiologist}</span>
      ),
    },
    {
      key: "reportDate",
      label: "Date",
      sortable: true,
      render: (item: (typeof radiologyReports)[0]) => (
        <span className="text-gray-600">
          {new Date(item.reportDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "findings",
      label: "Findings",
      sortable: false,
      render: (item: (typeof radiologyReports)[0]) => (
        <span className="text-gray-600 line-clamp-1 max-w-[250px]">
          {item.findings}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof radiologyReports)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: (typeof radiologyReports)[0]) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedReport(item)}
            className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            title="View Report"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Print Report"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Radiology Reports"
        description="View and manage radiology imaging reports"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by patient, report ID, or imaging type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 w-full"
          />
        </div>
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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredReports}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No radiology reports found"
        />
      </div>

      {/* Report Detail Modal */}
      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title={`Radiology Report — ${selectedReport?.id || ""}`}
        size="lg"
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Patient</p>
                <p className="font-medium">{selectedReport.patientName}</p>
              </div>
              <div>
                <p className="text-gray-500">Service</p>
                <p className="font-medium">{selectedReport.service}</p>
              </div>
              <div>
                <p className="text-gray-500">Body Part</p>
                <p className="font-medium">{selectedReport.bodyPart}</p>
              </div>
              <div>
                <p className="text-gray-500">Radiologist</p>
                <p className="font-medium">{selectedReport.radiologist}</p>
              </div>
              <div>
                <p className="text-gray-500">Report Date</p>
                <p className="font-medium">{selectedReport.reportDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <StatusBadge status={selectedReport.status} />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Findings</h4>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4">
                {selectedReport.findings}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Impression</h4>
              <p className="text-sm text-gray-700 bg-emerald-50 rounded-lg p-4 font-medium">
                {selectedReport.impression}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

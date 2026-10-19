"use client";

import { useState } from "react";
import { Eye, Printer } from "lucide-react";
import { labReports } from "@/lib/mock/laboratory";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import { Modal } from "@/components/ui/modal";

export default function LabReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<(typeof labReports)[0] | null>(null);

  const statuses = [...new Set(labReports.map((r) => r.status))];

  const filteredReports = labReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(search.toLowerCase()) ||
      report.id.toLowerCase().includes(search.toLowerCase()) ||
      report.orderId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "id",
      label: "Report ID",
      sortable: true,
      render: (item: (typeof labReports)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof labReports)[0]) => (
        <span className="font-medium text-gray-900">{item.patientName}</span>
      ),
    },
    {
      key: "orderId",
      label: "Order ID",
      sortable: true,
      render: (item: (typeof labReports)[0]) => (
        <span className="text-gray-600">{item.orderId}</span>
      ),
    },
    {
      key: "tests",
      label: "Test Results",
      sortable: false,
      render: (item: (typeof labReports)[0]) => (
        <div className="space-y-1">
          {item.tests.slice(0, 2).map((test, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{test.name}:</span>
              <span
                className={`text-xs font-medium ${
                  test.status === "Critical"
                    ? "text-red-600"
                    : test.status === "Abnormal"
                    ? "text-amber-600"
                    : "text-green-600"
                }`}
              >
                {test.value} {test.unit}
              </span>
            </div>
          ))}
          {item.tests.length > 2 && (
            <span className="text-xs text-gray-500">
              +{item.tests.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      key: "reportedBy",
      label: "Technician",
      sortable: true,
      render: (item: (typeof labReports)[0]) => (
        <span className="text-gray-700">{item.reportedBy}</span>
      ),
    },
    {
      key: "verifiedBy",
      label: "Verified By",
      sortable: true,
      render: (item: (typeof labReports)[0]) => (
        <span className="text-gray-700">{item.verifiedBy}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof labReports)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item: (typeof labReports)[0]) => (
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
        title="Lab Reports"
        description="View and manage laboratory test reports"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by patient, report ID, or order ID..."
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
          emptyMessage="No lab reports found"
        />
      </div>

      {/* Report Detail Modal */}
      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title={`Lab Report — ${selectedReport?.id || ""}`}
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
                <p className="text-gray-500">Order ID</p>
                <p className="font-medium">{selectedReport.orderId}</p>
              </div>
              <div>
                <p className="text-gray-500">Reported By</p>
                <p className="font-medium">{selectedReport.reportedBy}</p>
              </div>
              <div>
                <p className="text-gray-500">Verified By</p>
                <p className="font-medium">{selectedReport.verifiedBy}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Test Results</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Test</th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Value</th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Unit</th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Reference Range</th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedReport.tests.map((test, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 text-gray-900">{test.name}</td>
                        <td className={`px-4 py-2 font-medium ${
                          test.status === "Critical"
                            ? "text-red-600"
                            : test.status === "Abnormal"
                            ? "text-amber-600"
                            : "text-green-600"
                        }`}>
                          {test.value}
                        </td>
                        <td className="px-4 py-2 text-gray-600">{test.unit}</td>
                        <td className="px-4 py-2 text-gray-600">{test.referenceRange}</td>
                        <td className="px-4 py-2">
                          <StatusBadge status={test.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  FileText,
  Download,
  Eye,
  Calendar,
  Filter,
  Printer,
} from "lucide-react";

// Mock report data
const mockReports = [
  {
    id: 1,
    patientName: "Ram Bahadur Thapa",
    patientAge: 45,
    reportType: "Blood Pressure Report",
    date: "2025-07-20",
    status: "completed",
    findings: "BP 140/90 mmHg. Stage 1 hypertension. Continue medication.",
  },
  {
    id: 2,
    patientName: "Sita Devi Sharma",
    patientAge: 32,
    reportType: "Blood Sugar (Fasting)",
    date: "2025-07-20",
    status: "completed",
    findings: "Fasting glucose: 180 mg/dL. Higher than normal. Adjust insulin dosage.",
  },
  {
    id: 3,
    patientName: "Krishna Prasad Adhikari",
    patientAge: 58,
    reportType: "X-Ray - Lumbar Spine",
    date: "2025-07-19",
    status: "completed",
    findings: "L4-L5 disc herniation observed. Recommend physiotherapy.",
  },
  {
    id: 4,
    patientName: "Maya Poudel",
    patientAge: 38,
    reportType: "Complete Blood Count",
    date: "2025-07-18",
    status: "completed",
    findings: "Hemoglobin 11.2 g/dL. Mild anemia. Iron supplementation advised.",
  },
  {
    id: 5,
    patientName: "Deepak Rai",
    patientAge: 52,
    reportType: "Liver Function Test",
    date: "2025-07-17",
    status: "draft",
    findings: "ALT slightly elevated. Recommend follow-up test in 2 weeks.",
  },
  {
    id: 6,
    patientName: "Anita Karki",
    patientAge: 55,
    reportType: "Thyroid Panel",
    date: "2025-07-16",
    status: "completed",
    findings: "TSH: 5.8 mIU/L. Subclinical hypothyroidism. Start Levothyroxine 25mcg.",
  },
  {
    id: 7,
    patientName: "Bikash Tamang",
    patientAge: 41,
    reportType: "Allergy Assessment",
    date: "2025-07-15",
    status: "draft",
    findings: "Dust mite allergy confirmed. Cetirizine 10mg daily recommended.",
  },
];

// Report type options
const reportTypes = [
  "All Types",
  "Blood Pressure Report",
  "Blood Sugar (Fasting)",
  "Complete Blood Count",
  "X-Ray - Lumbar Spine",
  "Liver Function Test",
  "Thyroid Panel",
  "Allergy Assessment",
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "All Types" || report.reportType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">
            Write, view, and manage patient reports
          </p>
        </div>
        <button
          onClick={() => setShowWriteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Write New Report
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by patient name or report type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Total Reports</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {mockReports.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Completed</p>
          <p className="text-xl font-bold text-green-600 mt-1">
            {mockReports.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Drafts</p>
          <p className="text-xl font-bold text-orange-500 mt-1">
            {mockReports.filter((r) => r.status === "draft").length}
          </p>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`bg-white rounded-xl border p-5 transition-all cursor-pointer hover:shadow-md ${
              selectedReport === report.id
                ? "border-blue-300 ring-2 ring-blue-500/10"
                : "border-gray-200"
            }`}
            onClick={() =>
              setSelectedReport(
                selectedReport === report.id ? null : report.id
              )
            }
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Report Icon */}
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>

              {/* Report Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-gray-900">
                        {report.reportType}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          report.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {report.status === "completed"
                          ? "Completed"
                          : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Patient:{" "}
                      <span className="font-medium">
                        {report.patientName}
                      </span>{" "}
                      (Age: {report.patientAge})
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </div>
                  </div>
                </div>

                {/* Findings */}
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  {report.findings}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View Full
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Printer className="w-3.5 h-3.5" /> Print
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write New Report Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowWriteModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Write New Report
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Create a detailed patient report
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Patient Name
                    </label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                      <option value="">Select Patient</option>
                      <option>Ram Bahadur Thapa</option>
                      <option>Sita Devi Sharma</option>
                      <option>Krishna Prasad Adhikari</option>
                      <option>Maya Poudel</option>
                      <option>Deepak Rai</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Report Type
                    </label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                      <option value="">Select Type</option>
                      <option>Blood Pressure Report</option>
                      <option>Blood Sugar (Fasting)</option>
                      <option>Complete Blood Count</option>
                      <option>Liver Function Test</option>
                      <option>Thyroid Panel</option>
                      <option>X-Ray Report</option>
                      <option>General Check-up</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Clinical Findings / Observations
                  </label>
                  <textarea
                    placeholder="Describe the clinical findings, test results, observations..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Diagnosis
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Stage 1 Hypertension"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Recommendations / Notes
                  </label>
                  <textarea
                    placeholder="Treatment recommendations, follow-up instructions..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowWriteModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
                  Save as Draft
                </button>
                <button
                  onClick={() => setShowWriteModal(false)}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

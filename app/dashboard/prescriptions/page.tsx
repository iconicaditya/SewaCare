"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Pill,
  Download,
  Eye,
  Calendar,
  Filter,
  Printer,
  Trash2,
} from "lucide-react";

// Mock prescription data
const mockPrescriptions = [
  {
    id: 1,
    patientName: "Ram Bahadur Thapa",
    patientAge: 45,
    date: "2025-07-20",
    status: "active",
    medications: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "3 months" },
      { name: "Aspirin", dosage: "75mg", frequency: "Once daily", duration: "Ongoing" },
    ],
    notes: "Follow up in 3 months. Reduce salt intake. Regular exercise.",
  },
  {
    id: 2,
    patientName: "Sita Devi Sharma",
    patientAge: 32,
    date: "2025-07-20",
    status: "active",
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily (after meals)", duration: "6 months" },
      { name: "Insulin Glargine", dosage: "12 units", frequency: "Once at bedtime", duration: "1 month" },
    ],
    notes: "Monitor blood sugar daily. Diet plan attached. Review HbA1c in 3 months.",
  },
  {
    id: 3,
    patientName: "Krishna Prasad Adhikari",
    patientAge: 58,
    date: "2025-07-19",
    status: "active",
    medications: [
      { name: "Diclofenac", dosage: "50mg", frequency: "Twice daily", duration: "2 weeks" },
      { name: "Pantoprazole", dosage: "40mg", frequency: "Once daily (before breakfast)", duration: "2 weeks" },
      { name: "Tizanidine", dosage: "2mg", frequency: "At bedtime", duration: "1 month" },
    ],
    notes: "Avoid heavy lifting. Physiotherapy sessions 3x/week. Ice pack application.",
  },
  {
    id: 4,
    patientName: "Maya Poudel",
    patientAge: 38,
    date: "2025-07-18",
    status: "active",
    medications: [
      { name: "Sumatriptan", dosage: "50mg", frequency: "As needed (migraine)", duration: "PRN" },
      { name: "Iron Supplement (Ferrous Sulfate)", dosage: "325mg", frequency: "Once daily", duration: "3 months" },
      { name: "Vitamin C", dosage: "500mg", frequency: "Once daily", duration: "3 months" },
    ],
    notes: "Iron tablet on empty stomach. Avoid tea/coffee 1hr before/after.复查 CBC in 2 months.",
  },
  {
    id: 5,
    patientName: "Deepak Rai",
    patientAge: 52,
    date: "2025-07-17",
    status: "completed",
    medications: [
      { name: "Omeprazole", dosage: "20mg", frequency: "Once daily (before breakfast)", duration: "4 weeks" },
      { name: "Domperidone", dosage: "10mg", frequency: "Three times daily (before meals)", duration: "2 weeks" },
    ],
    notes: "Avoid spicy food. Small frequent meals. Follow up after 2 weeks.",
  },
  {
    id: 6,
    patientName: "Anita Karki",
    patientAge: 55,
    date: "2025-07-16",
    status: "active",
    medications: [
      { name: "Levothyroxine", dosage: "25mcg", frequency: "Once daily (empty stomach)", duration: "6 months" },
    ],
    notes: "Take medicine 30 minutes before breakfast. Recheck TSH in 6 weeks.",
  },
];

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);

  const filteredPrescriptions = mockPrescriptions.filter((rx) => {
    const matchesSearch = rx.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || rx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage patient prescriptions
          </p>
        </div>
        <button
          onClick={() => setShowWriteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Prescription
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 transition-all">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Total Prescriptions</p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {mockPrescriptions.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Active</p>
          <p className="text-xl font-bold text-purple-600 mt-1">
            {mockPrescriptions.filter((r) => r.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Completed</p>
          <p className="text-xl font-bold text-gray-400 mt-1">
            {mockPrescriptions.filter((r) => r.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-3">
        {filteredPrescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all"
          >
            {/* Header */}
            <div
              className="p-5 cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === rx.id ? null : rx.id)
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-gray-900">
                        {rx.patientName}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          rx.status === "active"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {rx.status === "active" ? "Active" : "Completed"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Age: {rx.patientAge} &bull; {rx.medications.length} medication
                      {rx.medications.length > 1 ? "s" : ""} prescribed
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {rx.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === rx.id && (
              <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
                {/* Medications Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Medication
                        </th>
                        <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Dosage
                        </th>
                        <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Frequency
                        </th>
                        <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rx.medications.map((med, idx) => (
                        <tr key={idx}>
                          <td className="py-3 font-medium text-gray-900">
                            {med.name}
                          </td>
                          <td className="py-3 text-gray-600">{med.dosage}</td>
                          <td className="py-3 text-gray-600">
                            {med.frequency}
                          </td>
                          <td className="py-3 text-gray-600">
                            {med.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Notes */}
                {rx.notes && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      {"Doctor's Notes"}
                    </p>
                    <p className="text-sm text-gray-700">{rx.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View Full
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Printer className="w-3.5 h-3.5" /> Print
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Prescription Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowWriteModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                New Prescription
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Prescribe medications for your patient
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Patient Name
                    </label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400">
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
                      Date
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Medications
                    </label>
                    <button
                      onClick={addMedication}
                      className="flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Medication
                    </button>
                  </div>
                  <div className="space-y-3">
                    {medications.map((med, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">
                            Medication #{idx + 1}
                          </span>
                          {medications.length > 1 && (
                            <button
                              onClick={() => removeMedication(idx)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Medicine name"
                            value={med.name}
                            onChange={(e) => {
                              const updated = [...medications];
                              updated[idx].name = e.target.value;
                              setMedications(updated);
                            }}
                            className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                          />
                          <input
                            type="text"
                            placeholder="Dosage (e.g., 500mg)"
                            value={med.dosage}
                            onChange={(e) => {
                              const updated = [...medications];
                              updated[idx].dosage = e.target.value;
                              setMedications(updated);
                            }}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                          />
                          <input
                            type="text"
                            placeholder="Frequency (e.g., Twice daily)"
                            value={med.frequency}
                            onChange={(e) => {
                              const updated = [...medications];
                              updated[idx].frequency = e.target.value;
                              setMedications(updated);
                            }}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                          />
                          <input
                            type="text"
                            placeholder="Duration (e.g., 2 weeks)"
                            value={med.duration}
                            onChange={(e) => {
                              const updated = [...medications];
                              updated[idx].duration = e.target.value;
                              setMedications(updated);
                            }}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {"Doctor's Notes / Instructions"}
                  </label>
                  <textarea
                    placeholder="Diet instructions, follow-up notes, warnings..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
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
                <button
                  onClick={() => setShowWriteModal(false)}
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition-colors shadow-sm"
                >
                  Issue Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

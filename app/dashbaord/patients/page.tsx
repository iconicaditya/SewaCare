"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  FileText,
} from "lucide-react";

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: "Ram Bahadur Thapa",
    age: 45,
    gender: "Male",
    phone: "+977-9841XXXXXX",
    email: "ram.t@email.com",
    lastVisit: "2025-07-20",
    totalReports: 5,
    totalPrescriptions: 8,
    diagnosis: "Hypertension",
    status: "active",
  },
  {
    id: 2,
    name: "Sita Devi Sharma",
    age: 32,
    gender: "Female",
    phone: "+977-9851XXXXXX",
    email: "sita.s@email.com",
    lastVisit: "2025-07-20",
    totalReports: 3,
    totalPrescriptions: 4,
    diagnosis: "Type 2 Diabetes",
    status: "active",
  },
  {
    id: 3,
    name: "Krishna Prasad Adhikari",
    age: 58,
    gender: "Male",
    phone: "+977-9861XXXXXX",
    email: "krishna.a@email.com",
    lastVisit: "2025-07-19",
    totalReports: 8,
    totalPrescriptions: 12,
    diagnosis: "Chronic Back Pain",
    status: "active",
  },
  {
    id: 4,
    name: "Maya Poudel",
    age: 38,
    gender: "Female",
    phone: "+977-9801XXXXXX",
    email: "maya.p@email.com",
    lastVisit: "2025-07-18",
    totalReports: 2,
    totalPrescriptions: 3,
    diagnosis: "Migraine",
    status: "active",
  },
  {
    id: 5,
    name: "Deepak Rai",
    age: 52,
    gender: "Male",
    phone: "+977-9811XXXXXX",
    email: "deepak.r@email.com",
    lastVisit: "2025-07-17",
    totalReports: 4,
    totalPrescriptions: 6,
    diagnosis: "Gastritis",
    status: "active",
  },
  {
    id: 6,
    name: "Anita Karki",
    age: 55,
    gender: "Female",
    phone: "+977-9821XXXXXX",
    email: "anita.k@email.com",
    lastVisit: "2025-07-16",
    totalReports: 6,
    totalPrescriptions: 9,
    diagnosis: "Arthritis",
    status: "follow-up",
  },
  {
    id: 7,
    name: "Bikash Tamang",
    age: 41,
    gender: "Male",
    phone: "+977-9831XXXXXX",
    email: "bikash.t@email.com",
    lastVisit: "2025-07-15",
    totalReports: 1,
    totalPrescriptions: 2,
    diagnosis: "Allergic Rhinitis",
    status: "active",
  },
  {
    id: 8,
    name: "Laxmi Gurung",
    age: 27,
    gender: "Female",
    phone: "+977-9871XXXXXX",
    email: "laxmi.g@email.com",
    lastVisit: "2025-07-14",
    totalReports: 2,
    totalPrescriptions: 2,
    diagnosis: "Anemia",
    status: "active",
  },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender =
      filterGender === "all" ||
      patient.gender.toLowerCase() === filterGender.toLowerCase();
    return matchesSearch && matchesGender;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your patient records and history
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Patient
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            <option value="all">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Patient Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Patients", value: mockPatients.length, icon: Users },
          {
            label: "Active",
            value: mockPatients.filter((p) => p.status === "active").length,
            icon: Users,
          },
          {
            label: "Follow-up Needed",
            value: mockPatients.filter((p) => p.status === "follow-up").length,
            icon: Calendar,
          },
          { label: "This Month", value: 8, icon: Users },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Details</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-2">Diagnosis</div>
          <div className="col-span-1">Reports</div>
          <div className="col-span-1">Rx</div>
          <div className="col-span-1">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer items-center"
            >
              {/* Patient Name + Avatar */}
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-700">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {patient.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {patient.gender}, {patient.age} yrs
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500">Last Visit</p>
                <p className="text-sm text-gray-700">{patient.lastVisit}</p>
              </div>

              {/* Contact */}
              <div className="md:col-span-2 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Phone className="w-3 h-3" /> {patient.phone}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Mail className="w-3 h-3" /> {patient.email}
                </div>
              </div>

              {/* Diagnosis */}
              <div className="md:col-span-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
                  {patient.diagnosis}
                </span>
              </div>

              {/* Reports Count */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-1 text-sm text-gray-700">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  {patient.totalReports}
                </div>
              </div>

              {/* Prescriptions Count */}
              <div className="md:col-span-1">
                <span className="text-sm font-medium text-gray-700">
                  {patient.totalPrescriptions}
                </span>
              </div>

              {/* Actions */}
              <div className="md:col-span-1">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 bg-gray-50/50">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">1-{filteredPatients.length}</span> of{" "}
            <span className="font-medium text-gray-700">{mockPatients.length}</span> patients
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg hover:bg-gray-200 text-gray-600 text-sm font-medium">
              2
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Add New Patient
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Enter patient details to register them
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Ram Bahadur Thapa"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 45"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Gender
                    </label>
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+977-98XXXXXXXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="patient@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Initial Diagnosis / Reason for Visit
                  </label>
                  <textarea
                    placeholder="e.g., Hypertension, routine check-up..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

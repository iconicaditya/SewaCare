"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Timer,
  XCircle,
} from "lucide-react";

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    patientName: "Ram Bahadur Thapa",
    age: 45,
    time: "09:00 AM",
    duration: "30 min",
    type: "Follow-up",
    reason: "Blood pressure review",
    status: "completed",
  },
  {
    id: 2,
    patientName: "Sita Devi Sharma",
    age: 32,
    time: "09:30 AM",
    duration: "30 min",
    type: "New Patient",
    reason: "Initial consultation - diabetes",
    status: "completed",
  },
  {
    id: 3,
    patientName: "Krishna Prasad Adhikari",
    age: 58,
    time: "10:00 AM",
    duration: "45 min",
    type: "Check-up",
    reason: "Back pain follow-up, X-ray review",
    status: "in-progress",
  },
  {
    id: 4,
    patientName: "Laxmi Gurung",
    age: 27,
    time: "10:45 AM",
    duration: "30 min",
    type: "Report Review",
    reason: "CBC results discussion",
    status: "upcoming",
  },
  {
    id: 5,
    patientName: "Bikash Tamang",
    age: 41,
    time: "11:15 AM",
    duration: "30 min",
    type: "New Patient",
    reason: "Allergy symptoms",
    status: "upcoming",
  },
  {
    id: 6,
    patientName: "Anita Karki",
    age: 55,
    time: "11:45 AM",
    duration: "30 min",
    type: "Follow-up",
    reason: "Thyroid level recheck",
    status: "upcoming",
  },
  {
    id: 7,
    patientName: "Deepak Rai",
    age: 52,
    time: "02:00 PM",
    duration: "30 min",
    type: "Follow-up",
    reason: "Gastritis follow-up",
    status: "upcoming",
  },
  {
    id: 8,
    patientName: "Maya Poudel",
    age: 38,
    time: "02:30 PM",
    duration: "30 min",
    type: "Check-up",
    reason: "Migraine treatment review",
    status: "cancelled",
  },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getStatusConfig(status: string) {
  switch (status) {
    case "completed":
      return {
        label: "Completed",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle2,
        dotColor: "bg-green-500",
      };
    case "in-progress":
      return {
        label: "In Progress",
        color: "bg-blue-100 text-blue-700",
        icon: Timer,
        dotColor: "bg-blue-500",
      };
    case "upcoming":
      return {
        label: "Upcoming",
        color: "bg-gray-100 text-gray-600",
        icon: Circle,
        dotColor: "bg-gray-400",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        color: "bg-red-100 text-red-600",
        icon: XCircle,
        dotColor: "bg-red-400",
      };
    default:
      return {
        label: status,
        color: "bg-gray-100 text-gray-600",
        icon: Circle,
        dotColor: "bg-gray-400",
      };
  }
}

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesSearch = apt.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || apt.type === filterType;
    return matchesSearch && matchesType;
  });

  // Generate current week dates
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your daily schedule and patient appointments
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Appointment
        </button>
      </div>

      {/* Week Calendar Strip */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-semibold text-gray-900">
            {today.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, i) => {
            const isToday =
              date.toDateString() === today.toDateString();
            const isSelected = date.getDate() === selectedDate;
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date.getDate())}
                className={`flex flex-col items-center py-2.5 rounded-xl transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md"
                    : isToday
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {weekDays[i]}
                </span>
                <span className="text-lg font-bold mt-0.5">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            <option value="all">All Types</option>
            <option value="New Patient">New Patient</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Check-up">Check-up</option>
            <option value="Report Review">Report Review</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Today", value: mockAppointments.length, color: "text-gray-900" },
          { label: "Completed", value: mockAppointments.filter(a => a.status === "completed").length, color: "text-green-600" },
          { label: "In Progress", value: mockAppointments.filter(a => a.status === "in-progress").length, color: "text-blue-600" },
          { label: "Upcoming", value: mockAppointments.filter(a => a.status === "upcoming").length, color: "text-gray-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            <p className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Appointments Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="w-4.5 h-4.5 text-gray-500" />
          <h2 className="text-base font-semibold text-gray-900">
            {"Today's Schedule"}
          </h2>
        </div>

        <div className="space-y-1">
          {filteredAppointments.map((apt, idx) => {
            const statusConfig = getStatusConfig(apt.status);
            const StatusIcon = statusConfig.icon;
            return (
              <div key={apt.id}>
                <div className="flex items-start gap-4 py-4">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center pt-1">
                    <div
                      className={`w-3 h-3 rounded-full ${statusConfig.dotColor} ring-4 ring-white flex-shrink-0`}
                    />
                    {idx < filteredAppointments.length - 1 && (
                      <div className="w-px h-full bg-gray-200 mt-1" />
                    )}
                  </div>

                  {/* Time */}
                  <div className="min-w-[80px] flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">{apt.time}</p>
                    <p className="text-[11px] text-gray-400">{apt.duration}</p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {apt.patientName}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusConfig.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {apt.type} &bull; Age: {apt.age}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Reason: {apt.reason}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    {apt.status === "upcoming" && (
                      <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        Start
                      </button>
                    )}
                    {apt.status === "in-progress" && (
                      <button className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                New Appointment
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Schedule a new patient appointment
              </p>
              <div className="space-y-4">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Appointment Type
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400">
                    <option value="">Select Type</option>
                    <option>New Patient</option>
                    <option>Follow-up</option>
                    <option>Check-up</option>
                    <option>Report Review</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Reason for Visit
                  </label>
                  <textarea
                    placeholder="Brief reason for the appointment..."
                    rows={2}
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
                  className="flex-1 px-4 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

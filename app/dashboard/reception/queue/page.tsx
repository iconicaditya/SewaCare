"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Stethoscope,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import DataTable from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

interface QueueEntry {
  token: string;
  patient: string;
  doctor: string;
  department: string;
  position: number;
  status: "Waiting" | "In Consultation" | "Completed";
  time: string;
}

const initialQueue: QueueEntry[] = [
  {
    token: "Q-001",
    patient: "Ram Bahadur Thapa",
    doctor: "Dr. Aarav Shrestha",
    department: "General Medicine",
    position: 1,
    status: "In Consultation",
    time: "09:00",
  },
  {
    token: "Q-002",
    patient: "Sunita Sharma",
    doctor: "Dr. Priya Bhandari",
    department: "Pediatrics",
    position: 2,
    status: "Completed",
    time: "09:15",
  },
  {
    token: "Q-003",
    patient: "Bikash Gurung",
    doctor: "Dr. Suman Koirala",
    department: "Cardiology",
    position: 3,
    status: "In Consultation",
    time: "09:30",
  },
  {
    token: "Q-004",
    patient: "Anita Rai",
    doctor: "Dr. Anjali Thapa",
    department: "Gynecology",
    position: 4,
    status: "Completed",
    time: "09:45",
  },
  {
    token: "Q-005",
    patient: "Krishna Prasad Adhikari",
    doctor: "Dr. Aarav Shrestha",
    department: "General Medicine",
    position: 5,
    status: "Waiting",
    time: "10:00",
  },
  {
    token: "Q-006",
    patient: "Priya Magar",
    doctor: "Dr. Aarav Shrestha",
    department: "General Medicine",
    position: 6,
    status: "Waiting",
    time: "10:15",
  },
  {
    token: "Q-007",
    patient: "Deepa Karki",
    doctor: "Dr. Bikram Rai",
    department: "Neurology",
    position: 7,
    status: "Waiting",
    time: "10:30",
  },
  {
    token: "Q-008",
    patient: "Sangita Limbu",
    doctor: "Dr. Sanjay Adhikari",
    department: "Dermatology",
    position: 8,
    status: "Waiting",
    time: "10:45",
  },
];

export default function QueueManagementPage() {
  const [queue, setQueue] = useState<QueueEntry[]>(initialQueue);

  const waitingCount = queue.filter((q) => q.status === "Waiting").length;
  const inConsultationCount = queue.filter(
    (q) => q.status === "In Consultation"
  ).length;
  const completedCount = queue.filter((q) => q.status === "Completed").length;

  const handleCallNext = (token: string) => {
    setQueue((prev) =>
      prev.map((entry) => {
        if (entry.status === "Waiting" && entry.token === token) {
          return { ...entry, status: "In Consultation" as const };
        }
        return entry;
      })
    );
  };

  const handleMarkConsultation = (token: string) => {
    setQueue((prev) =>
      prev.map((entry) => {
        if (entry.status === "Waiting" && entry.token === token) {
          return { ...entry, status: "In Consultation" as const };
        }
        return entry;
      })
    );
  };

  const handleMarkCompleted = (token: string) => {
    setQueue((prev) =>
      prev.map((entry) => {
        if (entry.token === token) {
          return { ...entry, status: "Completed" as const };
        }
        return entry;
      })
    );
  };

  const statusVariant = (
    status: string
  ): "success" | "warning" | "danger" | "info" | "default" => {
    switch (status) {
      case "Completed":
        return "success";
      case "Waiting":
        return "warning";
      case "In Consultation":
        return "info";
      default:
        return "default";
    }
  };

  const columns = [
    {
      key: "position",
      label: "#",
      sortable: true,
      render: (item: QueueEntry) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-700">
          {item.position}
        </span>
      ),
    },
    { key: "token", label: "Token", sortable: true },
    { key: "patient", label: "Patient", sortable: true },
    { key: "doctor", label: "Doctor", sortable: true },
    { key: "department", label: "Department", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: QueueEntry) => (
        <StatusBadge status={item.status} variant={statusVariant(item.status)} />
      ),
    },
    { key: "time", label: "Time", sortable: true },
  ];

  const handleActions = (item: QueueEntry) => (
    <div className="flex items-center gap-1">
      {item.status === "Waiting" && (
        <>
          <button
            title="Call Next"
            onClick={() => handleCallNext(item.token)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
          <button
            title="Mark In Consultation"
            onClick={() => handleMarkConsultation(item.token)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
          >
            <Stethoscope className="w-4 h-4" />
          </button>
        </>
      )}
      {item.status === "In Consultation" && (
        <button
          title="Mark Completed"
          onClick={() => handleMarkCompleted(item.token)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
      )}
      {item.status === "Completed" && (
        <span className="text-xs text-gray-400 italic">Done</span>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Queue Management"
        description="Manage patient queue and consultation flow"
      />

      {/* Queue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{waitingCount}</p>
            <p className="text-sm text-gray-500">Waiting</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
            <Stethoscope className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {inConsultationCount}
            </p>
            <p className="text-sm text-gray-500">In Consultation</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={queue as any[]}
        searchable
        searchPlaceholder="Search by patient or token..."
        searchKeys={["patient", "token"]}
        filters={[
          {
            key: "status",
            label: "All Status",
            options: [
              { value: "Waiting", label: "Waiting" },
              { value: "In Consultation", label: "In Consultation" },
              { value: "Completed", label: "Completed" },
            ],
          },
          {
            key: "department",
            label: "All Departments",
            options: [
              { value: "General Medicine", label: "General Medicine" },
              { value: "Cardiology", label: "Cardiology" },
              { value: "Pediatrics", label: "Pediatrics" },
              { value: "Gynecology", label: "Gynecology" },
              { value: "Neurology", label: "Neurology" },
              { value: "Dermatology", label: "Dermatology" },
            ],
          },
        ]}
        actions={handleActions}
        emptyMessage="Queue is empty"
        pageSize={10}
      />
    </div>
  );
}

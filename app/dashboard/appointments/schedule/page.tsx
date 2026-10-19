"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { doctors } from "@/lib/mock/doctors";

interface DoctorSchedule {
  id: string;
  doctorName: string;
  specialization: string;
  department: string;
  workingDays: string[];
  workingHours: string;
  status: "Available" | "On Leave" | "Busy";
}

const doctorSchedules: DoctorSchedule[] = doctors.map((doc) => ({
  id: doc.id,
  doctorName: doc.name,
  specialization: doc.specialization,
  department: doc.department,
  workingDays: doc.availability.workingDays,
  workingHours: doc.availability.hours,
  status: "Available" as const,
}));

export default function DoctorSchedulePage() {
  const [departmentFilter, setDepartmentFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!departmentFilter) return doctorSchedules;
    return doctorSchedules.filter((s) => s.department === departmentFilter);
  }, [departmentFilter]);

  const columns = [
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: DoctorSchedule) => (
        <span className="font-medium text-gray-900">{item.doctorName}</span>
      ),
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (item: DoctorSchedule) => (
        <span className="text-gray-700">{item.department}</span>
      ),
    },
    {
      key: "workingDays",
      label: "Working Days",
      sortable: false,
      render: (item: DoctorSchedule) => (
        <div className="flex flex-wrap gap-1">
          {item.workingDays.map((day) => (
            <span
              key={day}
              className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium"
            >
              {day}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "workingHours",
      label: "Working Hours",
      sortable: true,
      render: (item: DoctorSchedule) => (
        <span className="text-gray-700">{item.workingHours}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: DoctorSchedule) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  const filters = [
    {
      key: "department",
      label: "All Departments",
      options: [
        { value: "General Medicine", label: "General Medicine" },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Pediatrics", label: "Pediatrics" },
        { value: "Gynecology", label: "Gynecology" },
        { value: "Orthopedics", label: "Orthopedics" },
        { value: "Neurology", label: "Neurology" },
        { value: "Dermatology", label: "Dermatology" },
        { value: "ENT", label: "ENT" },
        { value: "Ophthalmology", label: "Ophthalmology" },
        { value: "Emergency", label: "Emergency" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/appointments"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageHeader
          title="Doctor Schedule"
          description="View working hours and availability for all doctors"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchable
        searchPlaceholder="Search by doctor name..."
        searchKeys={["doctorName"]}
        filters={filters}
        emptyMessage="No doctor schedules found"
        pageSize={10}
      />
    </div>
  );
}

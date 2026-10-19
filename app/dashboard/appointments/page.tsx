"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Eye,
  Pencil,
  XCircle,
  Calendar,
} from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import Dropdown from "@/components/ui/dropdown";
import { appointments, Appointment } from "@/lib/mock/appointments";

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (item: Appointment) => (
        <span className="font-medium text-gray-900">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: Appointment) => (
        <span className="text-gray-900">{item.patientName}</span>
      ),
    },
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: Appointment) => (
        <span className="text-gray-700">{item.doctorName}</span>
      ),
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (item: Appointment) => (
        <span className="text-gray-700">{item.department}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: Appointment) => (
        <span className="text-gray-700">{item.date}</span>
      ),
    },
    {
      key: "time",
      label: "Time",
      sortable: true,
      render: (item: Appointment) => (
        <span className="text-gray-700">{item.time}</span>
      ),
    },
    {
      key: "visitType",
      label: "Visit Type",
      sortable: true,
      render: (item: Appointment) => (
        <span className="text-gray-700">{item.visitType}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: Appointment) => <StatusBadge status={item.status} />,
    },
  ];

  const handleView = (item: Appointment) => {
    setSelectedAppointment(item);
    alert(
      `Appointment Details:\n\nID: ${item.id}\nPatient: ${item.patientName}\nDoctor: ${item.doctorName}\nDepartment: ${item.department}\nDate: ${item.date}\nTime: ${item.time}\nType: ${item.visitType}\nStatus: ${item.status}\nNotes: ${item.notes}`
    );
  };

  const handleEdit = (item: Appointment) => {
    window.location.href = `/dashboard/appointments/create?edit=${item.id}`;
  };

  const handleCancel = (item: Appointment) => {
    if (
      confirm(
        `Are you sure you want to cancel appointment ${item.id} for ${item.patientName}?`
      )
    ) {
      alert(`Appointment ${item.id} has been cancelled.`);
    }
  };

  const renderActions = (item: Appointment) => (
    <Dropdown
      trigger={
        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01"
            />
          </svg>
        </button>
      }
      items={[
        {
          label: "View Details",
          icon: Eye,
          onClick: () => handleView(item),
        },
        {
          label: "Edit",
          icon: Pencil,
          onClick: () => handleEdit(item),
        },
        {
          label: "Cancel Appointment",
          icon: XCircle,
          onClick: () => handleCancel(item),
          variant: "danger",
        },
      ]}
    />
  );

  const filters = [
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "Scheduled", label: "Scheduled" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "No-show", label: "No-show" },
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
        { value: "Orthopedics", label: "Orthopedics" },
        { value: "Neurology", label: "Neurology" },
        { value: "Dermatology", label: "Dermatology" },
        { value: "ENT", label: "ENT" },
        { value: "Ophthalmology", label: "Ophthalmology" },
        { value: "Emergency", label: "Emergency" },
      ],
    },
    {
      key: "visitType",
      label: "All Visit Types",
      options: [
        { value: "New Visit", label: "New Visit" },
        { value: "Follow-up", label: "Follow-up" },
        { value: "Emergency", label: "Emergency" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Manage all patient appointments"
        actions={
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/appointments/schedule"
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </Link>
            <Link
              href="/dashboard/appointments/calendar"
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </Link>
            <Link
              href="/dashboard/appointments/create"
              className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Appointment
            </Link>
          </div>
        }
      />

      <DataTable
        columns={columns}
        data={appointments}
        searchable
        searchPlaceholder="Search by patient or doctor name..."
        searchKeys={["patientName", "doctorName"]}
        filters={filters}
        actions={renderActions}
        emptyMessage="No appointments found"
        pageSize={10}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { radiologyOrders } from "@/lib/mock/radiology";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

const scheduleData = radiologyOrders.map((order) => ({
  ...order,
  scheduleId: `SCH-${order.id.replace("RAD-", "")}`,
  time: order.status === "Completed" ? "09:00" : order.status === "Scheduled" ? "10:30" : "14:00",
  room: order.service.includes("MRI") ? "Room MRI-1" : order.service.includes("CT") ? "Room CT-1" : order.service.includes("Ultrasound") ? "Room USG-2" : "Room X-Ray-1",
  technician: order.status === "Completed" ? "Tech. Hari Sharma" : "Tech. Priya Das",
}));

export default function RadiologySchedulingPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(scheduleData.map((s) => s.status))];

  const filteredSchedule = scheduleData.filter((item) => {
    return statusFilter === "all" || item.status === statusFilter;
  });

  const columns = [
    {
      key: "scheduleId",
      label: "Schedule ID",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <span className="font-medium text-emerald-600">{item.scheduleId}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <span className="font-medium text-gray-900">{item.patientName}</span>
      ),
    },
    {
      key: "service",
      label: "Imaging Type",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <span className="text-gray-700">{item.service}</span>
      ),
    },
    {
      key: "scheduledDate",
      label: "Date",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <span className="text-gray-600">
          {new Date(item.scheduledDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "time",
      label: "Time",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <span className="text-gray-600">{item.time}</span>
      ),
    },
    {
      key: "room",
      label: "Room",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {item.room}
        </span>
      ),
    },
    {
      key: "technician",
      label: "Technician",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <span className="text-gray-700">{item.technician}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof scheduleData)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Radiology Scheduling"
        description="Manage imaging appointment schedules"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Appointment
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4">
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
          data={filteredSchedule}
          searchPlaceholder=""
          pageSize={10}
          emptyMessage="No scheduled appointments found"
        />
      </div>
    </div>
  );
}

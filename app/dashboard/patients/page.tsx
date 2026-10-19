"use client";

import Link from "next/link";
import {
  Plus,
  Eye,
  Pencil,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { patients } from "@/lib/mock/patients";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function PatientsPage() {
  const columns = [
    {
      key: "id",
      label: "Patient ID",
      sortable: true,
      render: (item: (typeof patients)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "fullName",
      label: "Name",
      sortable: true,
      render: (item: (typeof patients)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-medium shrink-0">
            {item.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{item.fullName}</p>
            <p className="text-xs text-gray-500 truncate">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "gender",
      label: "Gender",
      sortable: true,
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
      render: (item: (typeof patients)[0]) => (
        <span>{item.age} yrs</span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
    },
    {
      key: "lastVisit",
      label: "Last Visit",
      sortable: true,
      render: (item: (typeof patients)[0]) => {
        const date = new Date(item.lastVisit);
        return (
          <span className="text-gray-600">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof patients)[0]) => (
        <StatusBadge status={item.status} />
      ),
    },
  ];

  const renderActions = (item: (typeof patients)[0]) => (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/dashboard/patients/${item.id}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Eye className="h-3.5 w-3.5" />
        View
      </Link>
      <Link
        href={`/dashboard/patients/add?edit=${item.id}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </Link>
      <Dropdown
        trigger={
          <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        }
        items={[
          {
            label: "View Details",
            icon: Eye,
            onClick: () => {},
          },
          {
            label: "Edit Patient",
            icon: Pencil,
            onClick: () => {},
          },
          {
            label: "Deactivate",
            icon: Users,
            onClick: () => {},
            variant: "danger" as const,
          },
        ]}
      />
    </div>
  );

  const filters = [
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
    },
    {
      key: "gender",
      label: "All Gender",
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
  ];

  const activeCount = patients.filter((p) => p.status === "Active").length;
  const inactiveCount = patients.filter((p) => p.status === "Inactive").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description={`Manage patient records and medical history (${patients.length} total, ${activeCount} active, ${inactiveCount} inactive)`}
        actions={
          <Link
            href="/dashboard/patients/add"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Patient
          </Link>
        }
      />

      <DataTable<(typeof patients)[0]>
        columns={columns}
        data={patients}
        searchable
        searchPlaceholder="Search by name, ID, or phone..."
        searchKeys={["fullName", "id", "phone", "email"]}
        filters={filters}
        actions={renderActions}
        emptyMessage="No patients found matching your criteria."
        pageSize={10}
      />
    </div>
  );
}

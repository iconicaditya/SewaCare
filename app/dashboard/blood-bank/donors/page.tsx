"use client";

import { useState } from "react";
import { Heart, Eye, Edit, Trash2 } from "lucide-react";
import { bloodDonors } from "@/lib/mock/blood-bank";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";
import Dropdown from "@/components/ui/dropdown";

export default function BloodDonorsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const statuses = [...new Set(bloodDonors.map((d) => d.status))];

  const totalDonors = bloodDonors.length;
  const eligibleCount = bloodDonors.filter((d) => d.status === "Eligible").length;
  const totalDonations = bloodDonors.reduce((sum, d) => sum + d.totalDonations, 0);

  const columns = [
    {
      key: "id",
      label: "Donor ID",
      sortable: true,
      render: (item: (typeof bloodDonors)[0]) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item: (typeof bloodDonors)[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-sm font-medium text-red-700 shrink-0">
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">
              {item.age}y, {item.gender}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "bloodGroup",
      label: "Blood Group",
      sortable: true,
      render: (item: (typeof bloodDonors)[0]) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
          {item.bloodGroup}
        </span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      render: (item: (typeof bloodDonors)[0]) => (
        <span className="text-gray-700">{item.phone}</span>
      ),
    },
    {
      key: "lastDonationDate",
      label: "Last Donation",
      sortable: true,
      render: (item: (typeof bloodDonors)[0]) => (
        <span className="text-gray-600 text-sm">{item.lastDonationDate}</span>
      ),
    },
    {
      key: "totalDonations",
      label: "Total Donations",
      sortable: true,
      render: (item: (typeof bloodDonors)[0]) => (
        <span className="text-gray-900 font-medium">{item.totalDonations}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: (typeof bloodDonors)[0]) => {
        const variantMap: Record<string, "success" | "warning" | "info" | "danger"> = {
          Eligible: "success",
          Deferred: "warning",
          Inactive: "danger",
        };
        return (
          <StatusBadge
            status={item.status}
            variant={variantMap[item.status] || "default"}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blood Donors"
        description="Manage blood donor records and eligibility"
        actions={
          <button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Add Donor
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Donors</p>
          <p className="text-2xl font-bold text-gray-900">{totalDonors}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Eligible</p>
          <p className="text-2xl font-bold text-emerald-600">{eligibleCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Donations</p>
          <p className="text-2xl font-bold text-blue-600">{totalDonations}</p>
        </div>
      </div>

      {/* Filter */}
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

      {/* Table */}
      <DataTable
        columns={columns}
        data={bloodDonors.filter((d) => {
          if (statusFilter !== "all" && d.status !== statusFilter) return false;
          return true;
        })}
        searchPlaceholder="Search donors..."
        searchKeys={["name", "bloodGroup", "phone", "id"]}
        actions={(item) => (
          <Dropdown
            trigger={
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </button>
            }
            items={[
              { label: "View Details", icon: Eye, onClick: () => {} },
              { label: "Edit", icon: Edit, onClick: () => {} },
              { label: "Delete", icon: Trash2, onClick: () => {}, variant: "danger" },
            ]}
          />
        )}
        pageSize={10}
        emptyMessage="No donors found"
      />
    </div>
  );
}

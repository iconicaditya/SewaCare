"use client";

import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { stockItems } from "@/lib/mock/pharmacy";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

export default function ExpiryAlertsPage() {
  const today = new Date("2026-09-13");

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate: string): { label: string; variant: "danger" | "warning" | "success" } => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days <= 0) return { label: "Expired", variant: "danger" };
    if (days <= 90) return { label: "Expiring Soon", variant: "warning" };
    return { label: "OK", variant: "success" };
  };

  const expiredItems = stockItems.filter((s) => getDaysUntilExpiry(s.expiryDate) <= 0);
  const expiringSoonItems = stockItems.filter((s) => {
    const days = getDaysUntilExpiry(s.expiryDate);
    return days > 0 && days <= 90;
  });
  const okItems = stockItems.filter((s) => getDaysUntilExpiry(s.expiryDate) > 90);

  // Combined view: expired first, then expiring soon, then OK
  const allItemsSorted = [...expiredItems, ...expiringSoonItems, ...okItems];

  const columns = [
    {
      key: "medicineName",
      label: "Medicine",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => (
        <div>
          <p className="font-medium text-gray-900">{item.medicineName}</p>
          <p className="text-xs text-gray-500">{item.batchNumber}</p>
        </div>
      ),
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => (
        <span className="text-gray-900 font-medium">{item.quantity}</span>
      ),
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => {
        const status = getExpiryStatus(item.expiryDate);
        return (
          <span className={`text-sm font-medium ${
            status.variant === "danger" ? "text-red-600" :
            status.variant === "warning" ? "text-amber-600" : "text-gray-600"
          }`}>
            {item.expiryDate}
          </span>
        );
      },
    },
    {
      key: "daysUntilExpiry",
      label: "Days Until Expiry",
      sortable: true,
      render: (item: (typeof stockItems)[0]) => {
        const days = getDaysUntilExpiry(item.expiryDate);
        return (
          <span className={`font-medium ${
            days <= 0 ? "text-red-600" : days <= 90 ? "text-amber-600" : "text-gray-900"
          }`}>
            {days <= 0 ? "Expired" : `${days} days`}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      render: (item: (typeof stockItems)[0]) => {
        const status = getExpiryStatus(item.expiryDate);
        return (
          <StatusBadge
            status={status.label}
            variant={status.variant}
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expiry Alerts"
        description="Monitor medicine expiry dates and manage alerts"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <p className="text-sm text-gray-500">Expired</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{expiredItems.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <p className="text-sm text-gray-500">Expiring Soon (90 days)</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{expiringSoonItems.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <p className="text-sm text-gray-500">OK</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{okItems.length}</p>
        </div>
      </div>

      {/* Expired Items Section */}
      {expiredItems.length > 0 && (
        <div className="bg-white rounded-lg border border-red-200 p-4">
          <h3 className="text-sm font-medium text-red-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Expired Items — Requires Immediate Attention
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {expiredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.medicineName}</p>
                  <p className="text-xs text-gray-500">Batch: {item.batchNumber} | Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-medium text-red-600">{item.expiryDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expiring Soon Section */}
      {expiringSoonItems.length > 0 && (
        <div className="bg-white rounded-lg border border-amber-200 p-4">
          <h3 className="text-sm font-medium text-amber-700 mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Expiring Soon — Within 90 Days
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {expiringSoonItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.medicineName}</p>
                  <p className="text-xs text-gray-500">Batch: {item.batchNumber} | Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-medium text-amber-600">{getDaysUntilExpiry(item.expiryDate)}d left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Table */}
      <DataTable
        columns={columns}
        data={allItemsSorted}
        searchPlaceholder="Search expiry records..."
        searchKeys={["medicineName", "batchNumber"]}
        pageSize={10}
        emptyMessage="No expiry records found"
      />
    </div>
  );
}

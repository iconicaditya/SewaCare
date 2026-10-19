"use client";

import { Bell, CheckCircle, AlertTriangle, AlertCircle, Info, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { notifications } from "@/lib/mock/notifications";

const typeStyles = (category: string) => {
  if (category === "appointment") return "bg-blue-50 text-blue-600";
  if (category === "lab") return "bg-purple-50 text-purple-600";
  if (category === "pharmacy") return "bg-amber-50 text-amber-600";
  if (category === "emergency") return "bg-red-50 text-red-600";
  if (category === "billing") return "bg-emerald-50 text-emerald-600";
  if (category === "staff") return "bg-teal-50 text-teal-600";
  return "bg-gray-50 text-gray-600";
};

const typeIcon = (type: string) => {
  if (type === "error") return <AlertCircle className="w-4 h-4" />;
  if (type === "warning") return <AlertTriangle className="w-4 h-4" />;
  if (type === "success") return <CheckCircle className="w-4 h-4" />;
  return <Info className="w-4 h-4" />;
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="System alerts and notifications" actions={
        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Check className="w-4 h-4" /> Mark All Read
        </button>
      } />
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className={`bg-white border rounded-lg p-4 flex items-start gap-4 ${n.read ? "border-gray-100" : "border-gray-200"}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeStyles(n.category)}`}>
              {typeIcon(n.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${n.read ? "text-gray-600" : "text-gray-900 font-medium"}`}>{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

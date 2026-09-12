"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: "blue" | "green" | "purple" | "orange";
}

const colorMap = {
  blue: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-100",
    trend: "text-emerald-600",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    iconBg: "bg-green-100",
    trend: "text-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    iconBg: "bg-purple-100",
    trend: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    iconBg: "bg-orange-100",
    trend: "text-orange-600",
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  color,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs font-semibold ${
                  trendUp ? "text-green-600" : "text-red-500"
                }`}
              >
                {trendUp ? "↑" : "↓"} {trend}
              </span>
              <span className="text-xs text-gray-400">vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}

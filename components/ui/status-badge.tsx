"use client";

import React from "react";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

const variantStyles: Record<string, { bg: string; text: string; dot: string }> = {
  success: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  danger: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
  info: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  default: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    dot: "bg-gray-500",
  },
};

const statusToVariant = (status: string): keyof typeof variantStyles => {
  const s = status.toLowerCase();
  if (["active", "completed", "paid", "approved"].includes(s)) return "success";
  if (["pending", "waiting"].includes(s)) return "warning";
  if (["cancelled", "rejected", "expired"].includes(s)) return "danger";
  if (["scheduled", "in-progress"].includes(s)) return "info";
  return "default";
};

export function StatusBadge({ status, variant, size = "sm" }: StatusBadgeProps) {
  const resolvedVariant = variant || statusToVariant(status);
  const styles = variantStyles[resolvedVariant] || variantStyles.default;

  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-medium ${styles.bg} ${styles.text} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
}

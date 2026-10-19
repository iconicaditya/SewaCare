"use client";

import React from "react";
import { X } from "lucide-react";

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  filters: FilterOption[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function FilterBar({
  filters,
  values,
  onChange,
}: FilterBarProps) {
  const activeFilterCount = Object.values(values).filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-1.5">
          <label className="text-sm text-gray-500 font-medium">
            {filter.label}
          </label>
          <select
            value={values[filter.key] || ""}
            onChange={(e) => onChange(filter.key, e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value="">All</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      {activeFilterCount > 0 && (
        <button
          onClick={() => {
            filters.forEach((f) => onChange(f.key, ""));
          }}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear filters
        </button>
      )}
    </div>
  );
}

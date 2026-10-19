"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { appointments, Appointment } from "@/lib/mock/appointments";

const WEEK_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AppointmentCalendarPage() {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(
    formatDateKey(now.getFullYear(), now.getMonth(), now.getDate())
  );

  const appointmentMap = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    appointments.forEach((apt) => {
      if (!map[apt.date]) map[apt.date] = [];
      map[apt.date].push(apt);
    });
    return map;
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarCells = useMemo(() => {
    const cells: { day: number | null; dateKey: string | null }[] = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push({ day: null, dateKey: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        dateKey: formatDateKey(currentYear, currentMonth, d),
      });
    }
    return cells;
  }, [currentYear, currentMonth, daysInMonth, firstDay]);

  const selectedAppointments = selectedDate
    ? appointmentMap[selectedDate] || []
    : [];

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const todayKey = formatDateKey(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

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
          title="Appointment Calendar"
          description="View appointments in a monthly calendar view"
        />
      </div>

      {/* Calendar Card */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Month Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button
            onClick={goToPrevMonth}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={goToNextMonth}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Week Headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {WEEK_HEADERS.map((day) => (
            <div
              key={day}
              className="px-2 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calendarCells.map((cell, idx) => {
            if (cell.day === null) {
              return <div key={`empty-${idx}`} className="min-h-[80px] border-b border-r border-gray-100 bg-gray-50/50" />;
            }

            const count = appointmentMap[cell.dateKey!]?.length || 0;
            const isSelected = selectedDate === cell.dateKey;
            const isToday = todayKey === cell.dateKey;

            return (
              <button
                key={cell.dateKey}
                onClick={() => setSelectedDate(cell.dateKey)}
                className={`min-h-[80px] p-2 border-b border-r border-gray-100 text-left transition-colors hover:bg-gray-50 ${
                  isSelected
                    ? "bg-emerald-50 ring-2 ring-inset ring-emerald-400"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${
                      isToday
                        ? "bg-emerald-600 text-white"
                        : isSelected
                          ? "bg-emerald-100 text-emerald-800"
                          : "text-gray-700"
                    }`}
                  >
                    {cell.day}
                  </span>
                  {count > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                      {count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Appointments */}
      {selectedDate && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Appointments for {selectedDate}
          </h3>

          {selectedAppointments.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500">
              No appointments scheduled for this day.
            </div>
          ) : (
            <div className="space-y-3">
              {selectedAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium text-gray-900">
                        {apt.time}
                      </span>
                    </div>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {apt.patientName}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      with {apt.doctorName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">
                      {apt.visitType}
                    </span>
                    <StatusBadge status={apt.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

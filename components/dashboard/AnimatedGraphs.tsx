"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, BedDouble, Star } from "lucide-react";

const admissions = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 18 },
  { day: "Wed", value: 25 },
  { day: "Thu", value: 15 },
  { day: "Fri", value: 30 },
  { day: "Sat", value: 8 },
  { day: "Sun", value: 15 },
];

const departments = [
  { label: "Cardiology", value: 45 },
  { label: "Orthopedics", value: 55 },
  { label: "Pediatrics", value: 40 },
  { label: "Neurology", value: 30 },
  { label: "Oncology", value: 25 },
];

const satisfaction = [
  { label: "Excellent", value: 42, color: "bg-emerald-500" },
  { label: "Good", value: 28, color: "bg-blue-500" },
  { label: "Average", value: 15, color: "bg-yellow-500" },
  { label: "Poor", value: 8, color: "bg-orange-500" },
  { label: "Terrible", value: 5, color: "bg-red-500" },
];
const maxSatisfaction = Math.max(...satisfaction.map((d) => d.value));

const bedTotal = 100;
const bedOccupied = 78;
const maxAdmissions = Math.max(...admissions.map((d) => d.value));
const maxDept = Math.max(...departments.map((d) => d.value));

function AdmissionsLineChart() {
  const width = 600;
  const height = 200;
  const padLeft = 40;
  const padBottom = 28;
  const chartHeight = height - padBottom;

  const points = admissions.map((item, i) => ({
    x: padLeft + (i * (width - padLeft - 16)) / (admissions.length - 1),
    y: chartHeight - (item.value / maxAdmissions) * (chartHeight - 30),
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
        <Activity className="w-4 h-4 text-red-500" />
        Daily Admissions
      </h3>
      <p className="text-xs text-gray-500 mt-1">Patient inflow over 7 days</p>
      <svg className="w-full h-auto" viewBox={`0 0 ${width} ${height}`} role="img">
        <motion.path
          d={line}
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {points.map((p, i) => (
          <motion.circle
            key={admissions[i].day}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#fff"
            stroke="#ef4444"
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
            style={{ transformOrigin: "center" }}
          />
        ))}
        {admissions.map((item, i) => (
          <text
            key={item.day}
            x={points[i].x}
            y={height - 8}
            textAnchor="middle"
            className="fill-gray-500 text-[11px]"
          >
            {item.day}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DepartmentBarChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-blue-500" />
        Department Load
      </h3>
      <p className="text-xs text-gray-500 mt-1">Patients by department</p>
      <div className="h-48 flex items-end justify-between gap-3 mt-6 px-2">
        {departments.map((item, i) => (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-blue-700">{item.value}</span>
            <motion.div
              className="w-full rounded-t-md bg-blue-500"
              style={{ transformOrigin: "bottom" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: item.value / maxDept, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 120 }}
            />
            <span className="text-[10px] text-gray-500 text-center leading-tight">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BedOccupancyDonut() {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
        <BedDouble className="w-4 h-4 text-green-500" />
        Bed Occupancy
      </h3>
      <p className="text-xs text-gray-500 mt-1">Real-time ward usage</p>
      <div className="flex items-center justify-center mt-4">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="16" />
            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#22c55e"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - bedOccupied / bedTotal) }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-3xl font-bold text-gray-900">{bedOccupied}%</span>
            <span className="text-[11px] text-gray-500">occupied</span>
          </motion.div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="text-xs text-gray-600">Occupied</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
          <span className="text-xs text-gray-600">Available</span>
        </div>
      </div>
    </div>
  );
}

function PatientSatisfactionChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
        <Star className="w-4 h-4 text-yellow-500" />
        Patient Satisfaction
      </h3>
      <p className="text-xs text-gray-500 mt-1">Feedback ratings this month</p>
      <div className="mt-5 space-y-3.5">
        {satisfaction.map((item, i) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-16 text-right">{item.label}</span>
            <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${item.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxSatisfaction) * 100}%` }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 w-8">{item.value}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">Total Responses</span>
        <span className="text-sm font-bold text-gray-900">1,284</span>
      </div>
    </div>
  );
}

export default function AnimatedGraphs() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <AdmissionsLineChart />
      <DepartmentBarChart />
      <BedOccupancyDonut />
      <PatientSatisfactionChart />
    </div>
  );
}
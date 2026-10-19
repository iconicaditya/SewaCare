"use client";

import {
  Eye,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import DataTable from "@/components/ui/data-table";

interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  reason: string;
  status: "Scheduled" | "Completed" | "Missed";
  notes: string;
}

const followUps: FollowUp[] = [
  {
    id: "FU-001",
    patientId: "PAT-001",
    patientName: "Ram Bahadur Thapa",
    doctorName: "Dr. Aarav Shrestha",
    department: "General Medicine",
    date: "2026-09-24",
    reason: "Diabetes medication review and HbA1c results",
    status: "Scheduled",
    notes: "Review HbA1c results and adjust Metformin dosage if needed.",
  },
  {
    id: "FU-002",
    patientId: "PAT-003",
    patientName: "Bikash Gurung",
    doctorName: "Dr. Suman Koirala",
    department: "Cardiology",
    date: "2026-09-19",
    reason: "Post echocardiography review",
    status: "Scheduled",
    notes: "Review echo results and discuss stress test findings.",
  },
  {
    id: "FU-003",
    patientId: "PAT-004",
    patientName: "Anita Rai",
    doctorName: "Dr. Anjali Thapa",
    department: "Gynecology",
    date: "2026-09-27",
    reason: "Pelvic ultrasound results and PCOS evaluation",
    status: "Scheduled",
    notes: "Review ultrasound and thyroid profile results.",
  },
  {
    id: "FU-004",
    patientId: "PAT-005",
    patientName: "Krishna Prasad Adhikari",
    doctorName: "Dr. Aarav Shrestha",
    department: "General Medicine",
    date: "2026-09-15",
    reason: "Diabetic neuropathy follow-up and nerve conduction study",
    status: "Scheduled",
    notes: "Review nerve conduction study results. Check blood sugar logs.",
  },
  {
    id: "FU-005",
    patientId: "PAT-009",
    patientName: "Rajendra Prasad Poudel",
    doctorName: "Dr. Aarav Shrestha",
    department: "General Medicine",
    date: "2026-09-20",
    reason: "Renal colic follow-up and repeat ultrasound",
    status: "Scheduled",
    notes: "Check if stone has passed. Repeat KUB ultrasound.",
  },
  {
    id: "FU-006",
    patientId: "PAT-012",
    patientName: "Nirmala Shrestha",
    doctorName: "Dr. Rajesh Maharjan",
    department: "Orthopedics",
    date: "2026-09-03",
    reason: "Knee osteoarthritis physiotherapy progress",
    status: "Completed",
    notes: "Patient reported improvement in mobility. Continue physiotherapy.",
  },
  {
    id: "FU-007",
    patientId: "PAT-006",
    patientName: "Priya Magar",
    doctorName: "Dr. Aarav Shrestha",
    department: "General Medicine",
    date: "2026-09-07",
    reason: "Thyroid function recheck after Levothyroxine initiation",
    status: "Completed",
    notes: "TSH improved from 12.5 to 4.2. Continue current dose.",
  },
  {
    id: "FU-008",
    patientId: "PAT-010",
    patientName: "Sangita Limbu",
    doctorName: "Dr. Sanjay Adhikari",
    department: "Dermatology",
    date: "2026-09-26",
    reason: "Psoriasis treatment response evaluation",
    status: "Scheduled",
    notes: "Evaluate response to Clobetasol. Consider stepping down therapy.",
  },
  {
    id: "FU-009",
    patientId: "PAT-011",
    patientName: "Gopal Bisht",
    doctorName: "Dr. Suman Koirala",
    department: "Cardiology",
    date: "2026-09-01",
    reason: "Post CABG cardiac rehabilitation progress",
    status: "Completed",
    notes: "Good recovery. Ejection fraction 55%. Continue rehab program.",
  },
  {
    id: "FU-010",
    patientId: "PAT-015",
    patientName: "Laxman Basnet",
    doctorName: "Dr. Suman Koirala",
    department: "Cardiology",
    date: "2026-09-08",
    reason: "Acute heart failure post-discharge follow-up",
    status: "Missed",
    notes: "Patient did not attend. Phone follow-up needed.",
  },
  {
    id: "FU-011",
    patientId: "PAT-002",
    patientName: "Sunita Sharma",
    doctorName: "Dr. Priya Bhandari",
    department: "Pulmonology",
    date: "2026-09-05",
    reason: "Asthma control assessment and spirometry",
    status: "Completed",
    notes: "Asthma well controlled. Continue Salbutamol PRN.",
  },
  {
    id: "FU-012",
    patientId: "PAT-008",
    patientName: "Deepa Karki",
    doctorName: "Dr. Bikram Rai",
    department: "Neurology",
    date: "2026-09-23",
    reason: "Migraine prophylaxis response and headache diary review",
    status: "Scheduled",
    notes: "Review headache diary. Evaluate Propranolol efficacy.",
  },
];

export default function FollowUpsPage() {
  const scheduledCount = followUps.filter(
    (f) => f.status === "Scheduled"
  ).length;
  const completedCount = followUps.filter(
    (f) => f.status === "Completed"
  ).length;
  const missedCount = followUps.filter((f) => f.status === "Missed").length;

  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (item: FollowUp) => (
        <span className="font-medium text-emerald-600">{item.id}</span>
      ),
    },
    {
      key: "patientName",
      label: "Patient",
      sortable: true,
      render: (item: FollowUp) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-medium shrink-0">
            {item.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <span className="font-medium text-gray-900">{item.patientName}</span>
        </div>
      ),
    },
    {
      key: "doctorName",
      label: "Doctor",
      sortable: true,
      render: (item: FollowUp) => (
        <span className="text-gray-700">{item.doctorName}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (item: FollowUp) => {
        const date = new Date(item.date);
        const isPast = date < new Date();
        return (
          <span
            className={`${
              isPast && item.status === "Missed"
                ? "text-red-600 font-medium"
                : "text-gray-600"
            }`}
          >
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
      key: "reason",
      label: "Reason",
      sortable: false,
      render: (item: FollowUp) => (
        <span className="text-gray-700 line-clamp-1 max-w-[220px]">
          {item.reason}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item: FollowUp) => <StatusBadge status={item.status} />,
    },
  ];

  const renderActions = (item: FollowUp) => (
    <div className="flex items-center justify-end gap-2">
      <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        <Eye className="h-3.5 w-3.5" />
        View
      </button>
      {item.status === "Scheduled" && (
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Complete
        </button>
      )}
    </div>
  );

  const filters = [
    {
      key: "status",
      label: "All Status",
      options: [
        { value: "Scheduled", label: "Scheduled" },
        { value: "Completed", label: "Completed" },
        { value: "Missed", label: "Missed" },
      ],
    },
    {
      key: "department",
      label: "All Departments",
      options: [
        { value: "General Medicine", label: "General Medicine" },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Gynecology", label: "Gynecology" },
        { value: "Orthopedics", label: "Orthopedics" },
        { value: "Dermatology", label: "Dermatology" },
        { value: "Pulmonology", label: "Pulmonology" },
        { value: "Neurology", label: "Neurology" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Follow-ups"
        description={`Track patient follow-up appointments (${followUps.length} total, ${scheduledCount} scheduled, ${completedCount} completed, ${missedCount} missed)`}
        actions={
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
            <CalendarClock className="h-4 w-4" />
            Schedule Follow-up
          </div>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <p className="text-xs text-gray-500 font-medium">Scheduled</p>
          </div>
          <p className="text-xl font-bold text-blue-600 mt-1">
            {scheduledCount}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <p className="text-xs text-gray-500 font-medium">Completed</p>
          </div>
          <p className="text-xl font-bold text-emerald-600 mt-1">
            {completedCount}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <p className="text-xs text-gray-500 font-medium">Missed</p>
          </div>
          <p className="text-xl font-bold text-red-600 mt-1">{missedCount}</p>
        </div>
      </div>

      <DataTable<FollowUp>
        columns={columns}
        data={followUps}
        searchable
        searchPlaceholder="Search by patient or doctor name..."
        searchKeys={["patientName", "doctorName"]}
        filters={filters}
        actions={renderActions}
        emptyMessage="No follow-ups found matching your criteria."
        pageSize={10}
      />
    </div>
  );
}

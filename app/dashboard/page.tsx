"use client";

import {
  Users,
  FileText,
  Pill,
  Calendar,
  Plus,
  Clock,
  ArrowRight,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import StatCard from "@/components/dashboard/StatCard";
import AnimatedGraphs from "@/components/dashboard/AnimatedGraphs";

// ─── Greeting helper ──────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

// Mock data for today's appointments
const todayAppointments = [
  {
    id: 1,
    time: "09:00 AM",
    patient: "Ram Bahadur Thapa",
    age: 45,
    type: "Follow-up",
    status: "completed",
  },
  {
    id: 2,
    time: "09:30 AM",
    patient: "Sita Devi Sharma",
    age: 32,
    type: "New Patient",
    status: "completed",
  },
  {
    id: 3,
    time: "10:00 AM",
    patient: "Krishna Prasad Adhikari",
    age: 58,
    type: "Check-up",
    status: "in-progress",
  },
  {
    id: 4,
    time: "10:30 AM",
    patient: "Laxmi Gurung",
    age: 27,
    type: "Report Review",
    status: "upcoming",
  },
  {
    id: 5,
    time: "11:00 AM",
    patient: "Bikash Tamang",
    age: 41,
    type: "New Patient",
    status: "upcoming",
  },
  {
    id: 6,
    time: "11:30 AM",
    patient: "Anita Karki",
    age: 55,
    type: "Follow-up",
    status: "upcoming",
  },
];

// Mock data for recent patients
const recentPatients = [
  {
    id: 1,
    name: "Ram Bahadur Thapa",
    age: 45,
    gender: "Male",
    lastVisit: "Today",
    diagnosis: "Hypertension",
  },
  {
    id: 2,
    name: "Sita Devi Sharma",
    age: 32,
    gender: "Female",
    lastVisit: "Today",
    diagnosis: "Type 2 Diabetes",
  },
  {
    id: 3,
    name: "Krishna Prasad Adhikari",
    age: 58,
    gender: "Male",
    lastVisit: "Yesterday",
    diagnosis: "Chronic Back Pain",
  },
  {
    id: 4,
    name: "Maya Poudel",
    age: 38,
    gender: "Female",
    lastVisit: "2 days ago",
    diagnosis: "Migraine",
  },
  {
    id: 5,
    name: "Deepak Rai",
    age: 52,
    gender: "Male",
    lastVisit: "3 days ago",
    diagnosis: "Gastritis",
  },
];

// Quick actions
const quickActions = [
  {
    label: "New Patient",
    href: "/dashboard/patients",
    icon: Users,
    color: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    label: "Write Report",
    href: "/dashboard/reports",
    icon: FileText,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    label: "New Prescription",
    href: "/dashboard/prescriptions",
    icon: Pill,
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    label: "Schedule",
    href: "/dashboard/appointments",
    icon: Calendar,
    color: "bg-orange-500 hover:bg-orange-600",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Completed
        </span>
      );
    case "in-progress":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          In Progress
        </span>
      );
    case "upcoming":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          Upcoming
        </span>
      );
    default:
      return null;
  }
}

export default function DashboardPage() {
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userName = (session?.user as any)?.fullName || session?.user?.name || "Doctor";
  const firstName = userName.split(" ")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {`${getGreeting()}, ${firstName} 👋`}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {"Here's your practice overview for today"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Activity className="w-4 h-4 text-green-500" />
            System Online
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Patients"
          value={12}
          subtitle="3 remaining"
          icon={Users}
          trend="+15%"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Reports Written"
          value={8}
          subtitle="Today"
          icon={FileText}
          trend="+8%"
          trendUp={true}
          color="green"
        />
        <StatCard
          title="Prescriptions"
          value={10}
          subtitle="Today"
          icon={Pill}
          trend="+12%"
          trendUp={true}
          color="purple"
        />
        <StatCard
          title="Total Patients"
          value={247}
          subtitle="All time"
          icon={TrendingUp}
          trend="+5%"
          trendUp={true}
          color="orange"
        />
      </div>

      {/* Animated Charts Section */}
      <AnimatedGraphs />

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-white text-sm font-medium ${action.color} transition-colors shadow-sm`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
              <Plus className="w-3.5 h-3.5 ml-auto" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Appointments + Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between p-5 pb-0">
            <div className="flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-gray-500" />
              <h2 className="text-base font-semibold text-gray-900">
                {"Today's Appointments"}
              </h2>
            </div>
            <Link
              href="/dashboard/appointments"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${
                    apt.status === "in-progress"
                      ? "border-emerald-200 bg-emerald-50/50"
                      : apt.status === "completed"
                      ? "border-gray-100 bg-gray-50/50"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/30"
                  }`}
                >
                  {/* Time */}
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-bold text-gray-900">{apt.time}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-8 bg-gray-200" />

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {apt.patient}
                    </p>
                    <p className="text-xs text-gray-400">
                      Age: {apt.age} &bull; {apt.type}
                    </p>
                  </div>

                  {/* Status */}
                  {getStatusBadge(apt.status)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between p-5 pb-0">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Patients
            </h2>
            <Link
              href="/dashboard/patients"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-emerald-700">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {patient.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {patient.diagnosis}
                    </p>
                  </div>
                  {/* Meta */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500">{patient.lastVisit}</p>
                    <p className="text-[11px] text-gray-400">
                      {patient.gender}, {patient.age}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Alerts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reports / Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4.5 h-4.5 text-orange-500" />
            <h2 className="text-base font-semibold text-gray-900">Pending Actions</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                msg: "2 reports pending for review",
                type: "warning",
              },
              {
                msg: "1 prescription awaiting approval",
                type: "info",
              },
              {
                msg: "3 patients need follow-up scheduling",
                type: "info",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  item.type === "warning"
                    ? "border-orange-200 bg-orange-50/50"
                    : "border-gray-100 bg-gray-50/30"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.type === "warning" ? "bg-orange-500" : "bg-emerald-500"
                  }`}
                />
                <p className="text-sm text-gray-700">{item.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4.5 h-4.5 text-emerald-500" />
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                action: "Report written for Ram Bahadur Thapa",
                time: "2 hours ago",
                icon: FileText,
                color: "text-green-500",
              },
              {
                action: "Prescription issued to Sita Devi Sharma",
                time: "3 hours ago",
                icon: Pill,
                color: "text-purple-500",
              },
              {
                action: "New patient registered: Bikash Tamang",
                time: "4 hours ago",
                icon: Users,
                color: "text-emerald-500",
              },
              {
                action: "Follow-up scheduled for Krishna Prasad",
                time: "5 hours ago",
                icon: Calendar,
                color: "text-orange-500",
              },
              {
                action: "Report reviewed for Maya Poudel",
                time: "Yesterday",
                icon: FileText,
                color: "text-green-500",
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

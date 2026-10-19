"use client";

import { FileText, Users, Calendar, TestTube, Pill, Building, CreditCard, Activity, Stethoscope } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

const reportCategories = [
  {
    title: "Patient Reports",
    icon: Users,
    reports: [
      { name: "Patient Registration Report", href: "/dashboard/patients" },
      { name: "Patient Visits Report", href: "/dashboard/reception/visits" },
    ],
  },
  {
    title: "Appointment Reports",
    icon: Calendar,
    reports: [
      { name: "Appointments Overview", href: "/dashboard/appointments" },
      { name: "Doctor Schedule Report", href: "/dashboard/appointments/schedule" },
    ],
  },
  {
    title: "Clinical Reports",
    icon: Stethoscope,
    reports: [
      { name: "Consultations Report", href: "/dashboard/consultations" },
      { name: "Diagnoses Report", href: "/dashboard/diagnoses" },
    ],
  },
  {
    title: "Laboratory Reports",
    icon: TestTube,
    reports: [
      { name: "Lab Test Reports", href: "/dashboard/laboratory/reports" },
      { name: "Sample Collection Report", href: "/dashboard/laboratory/collection" },
    ],
  },
  {
    title: "Pharmacy Reports",
    icon: Pill,
    reports: [
      { name: "Medicine Dispensing Report", href: "/dashboard/pharmacy/dispensing" },
      { name: "Stock Report", href: "/dashboard/pharmacy/stock" },
    ],
  },
  {
    title: "Hospitalization Reports",
    icon: Building,
    reports: [
      { name: "Admissions Report", href: "/dashboard/hospitalization/admissions" },
      { name: "Discharges Report", href: "/dashboard/hospitalization/discharge" },
      { name: "Bed Occupancy Report", href: "/dashboard/hospitalization/beds" },
    ],
  },
  {
    title: "Billing Reports",
    icon: CreditCard,
    reports: [
      { name: "Revenue Report", href: "/dashboard/finance/revenue" },
      { name: "Payments Report", href: "/dashboard/billing/payments" },
      { name: "Pending Payments", href: "/dashboard/billing/pending" },
    ],
  },
  {
    title: "Staff Reports",
    icon: Activity,
    reports: [
      { name: "Attendance Report", href: "/dashboard/staff/attendance" },
      { name: "Leave Report", href: "/dashboard/staff/leave" },
    ],
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Access all hospital reports" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reportCategories.map((cat) => (
          <div key={cat.title} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <cat.icon className="w-4.5 h-4.5 text-emerald-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{cat.title}</h3>
            </div>
            <div className="space-y-1">
              {cat.reports.map((report) => (
                <Link key={report.name} href={report.href} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                  <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  {report.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

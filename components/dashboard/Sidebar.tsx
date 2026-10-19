"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  MessageSquare,
  FlaskConical,
  Scan,
  Ambulance,
  Building2,
  HeartPulse,
  Scissors,
  Droplets,
  Pill,
  Package,
  Wrench,
  CreditCard,
  Shield,
  TrendingUp,
  UserCog,
  Building,
  BarChart3,
  Bell,
  FileText,
  ScrollText,
  Settings,
  X,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    label: "Clinical",
    items: [
      { name: "Patients", href: "/dashboard/patients", icon: Users },
      { name: "Reception & OPD", href: "/dashboard/reception", icon: Stethoscope },
      { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
      { name: "Consultations", href: "/dashboard/consultations", icon: MessageSquare },
      { name: "Laboratory", href: "/dashboard/laboratory/catalog", icon: FlaskConical },
      { name: "Radiology", href: "/dashboard/radiology/services", icon: Scan },
      { name: "Emergency", href: "/dashboard/emergency/patients", icon: Ambulance },
      { name: "Hospitalization", href: "/dashboard/hospitalization/admissions", icon: Building2 },
      { name: "ICU", href: "/dashboard/icu/patients", icon: HeartPulse },
      { name: "Operation Theatre", href: "/dashboard/ot/requests", icon: Scissors },
      { name: "Blood Bank", href: "/dashboard/blood-bank/inventory", icon: Droplets },
    ],
  },
  {
    label: "Pharmacy & Inventory",
    items: [
      { name: "Pharmacy", href: "/dashboard/pharmacy/medicines", icon: Pill },
      { name: "Inventory", href: "/dashboard/inventory/items", icon: Package },
      { name: "Equipment", href: "/dashboard/equipment/list", icon: Wrench },
    ],
  },
  {
    label: "Finance",
    items: [
      { name: "Billing & Payments", href: "/dashboard/billing/invoices", icon: CreditCard },
      { name: "Insurance", href: "/dashboard/insurance/providers", icon: Shield },
      { name: "Finance", href: "/dashboard/finance/revenue", icon: TrendingUp },
    ],
  },
  {
    label: "Staff",
    items: [
      { name: "Staff & HR", href: "/dashboard/staff", icon: UserCog },
      { name: "Departments", href: "/dashboard/departments", icon: Building },
    ],
  },
  {
    label: "Reports",
    items: [
      { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
      { name: "Documents", href: "/dashboard/documents", icon: FileText },
      { name: "Audit Logs", href: "/dashboard/audit-logs", icon: ScrollText },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SC</span>
          </div>
          <span className="text-lg font-bold text-gray-900">SewaCare</span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex flex-col h-[calc(100%-4rem)]">
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-150
              ${
                pathname === "/dashboard"
                  ? "bg-emerald-50 text-emerald-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <LayoutDashboard
              className={`w-[18px] h-[18px] flex-shrink-0 ${
                pathname === "/dashboard" ? "text-emerald-600" : "text-gray-400"
              }`}
            />
            Dashboard
          </Link>

          {/* Grouped Navigation */}
          {navigation.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                        transition-all duration-150
                        ${
                          active
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <item.icon
                        className={`w-[18px] h-[18px] flex-shrink-0 ${
                          active ? "text-emerald-600" : "text-gray-400"
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom - Settings */}
        <div className="px-3 py-3 border-t border-gray-100">
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-150
              ${
                pathname === "/dashboard/settings"
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }
            `}
          >
            <Settings className="w-[18px] h-[18px] flex-shrink-0" />
            Settings
          </Link>
        </div>
      </nav>
    </aside>
  );
}

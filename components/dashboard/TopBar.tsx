"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Bell,
  Menu,
  LogOut,
  User,
  Settings,
  ChevronDown,
  X,
} from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isLoading = status === "loading";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userName = (session?.user as any)?.fullName || session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userImage = (session?.user as any)?.profileImage || session?.user?.image;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRole = (session?.user as any)?.role || "";
  const initials = userName
    ? userName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  // Mock notification count
  const unreadCount = 5;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/dashboard/patients?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-80 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 transition-all">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search patients, doctors, reports..."
            className="ml-2 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => setSearchValue("")}
              className="p-0.5 hover:bg-gray-200 rounded text-gray-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Right: Date + Notifications + User */}
      <div className="flex items-center gap-2">
        {/* Date */}
        <div className="hidden lg:block mr-2">
          <p className="text-sm text-gray-500">{today}</p>
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 bg-red-500 rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Emergency Patient Arrived</p>
                      <p className="text-xs text-gray-500 mt-0.5">Laxman Basnet admitted through emergency</p>
                      <p className="text-[11px] text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lab Report Ready</p>
                      <p className="text-xs text-gray-500 mt-0.5">HbA1c report for Ram Bahadur Thapa</p>
                      <p className="text-[11px] text-gray-400 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                      <p className="text-xs text-gray-500 mt-0.5">IV Cannula 18G below reorder level</p>
                      <p className="text-[11px] text-gray-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    router.push("/dashboard/notifications");
                  }}
                  className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isLoading ? (
              <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
            ) : userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : initials ? (
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                {initials}
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
            )}
            <div className="hidden md:block text-left">
              {isLoading ? (
                <>
                  <div className="h-3.5 w-16 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-2.5 w-12 bg-gray-100 rounded animate-pulse" />
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {userName || "User"}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-tight">
                    {userRole || "Member"}
                  </p>
                </>
              )}
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 hidden md:block transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* User Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : initials ? (
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                      {initials}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {userName || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {userEmail || "No email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User className="w-4 h-4 text-gray-400" />
                  My Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Settings
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={async () => {
                    setDropdownOpen(false);
                    await signOut({ redirect: false });
                    router.push("/login");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

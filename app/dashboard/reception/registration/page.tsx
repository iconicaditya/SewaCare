"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  UserPlus,
  User,
  Phone,
  Calendar,
  FileText,
  ClipboardList,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import FormField from "@/components/ui/form-field";
import { patients, Patient } from "@/lib/mock/patients";
import { departments } from "@/lib/mock/departments";
import { doctors } from "@/lib/mock/doctors";

export default function PatientRegistrationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundPatient, setFoundPatient] = useState<Patient | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [visitType, setVisitType] = useState("New Visit");
  const [notes, setNotes] = useState("");
  const [assignToQueue, setAssignToQueue] = useState(true);

  const filteredDoctors = department
    ? doctors.filter((d) => d.department === department)
    : doctors;

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSearchPerformed(true);
    const query = searchQuery.toLowerCase();
    const match = patients.find(
      (p) =>
        p.fullName.toLowerCase().includes(query) ||
        p.phone.includes(query) ||
        p.id.toLowerCase().includes(query)
    );
    setFoundPatient(match || null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundPatient || !department || !doctor) return;
    alert(
      `Visit registered successfully!\n\nPatient: ${foundPatient.fullName}\nDepartment: ${department}\nDoctor: ${doctor}\nVisit Type: ${visitType}\n${assignToQueue ? "Added to queue." : ""}`
    );
    // Reset form
    setFoundPatient(null);
    setSearchQuery("");
    setSearchPerformed(false);
    setDepartment("");
    setDoctor("");
    setVisitType("New Visit");
    setNotes("");
    setAssignToQueue(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Registration"
        description="Register a new patient visit or search for an existing patient"
      />

      {/* Patient Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Search Patient
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by name, phone, or patient ID..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchPerformed && (
        <>
          {foundPatient ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Patient Found
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-md font-medium px-2.5 py-0.5 text-xs bg-emerald-50 text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {foundPatient.fullName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Patient ID</p>
                    <p className="text-sm font-medium text-gray-900">
                      {foundPatient.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-sm font-medium text-gray-900">
                      {foundPatient.age} years ({foundPatient.gender})
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {foundPatient.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex flex-col items-center text-center py-4">
                <AlertCircle className="w-10 h-10 text-gray-300 mb-3" />
                <h3 className="text-base font-semibold text-gray-900">
                  No Patient Found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No patient matches your search. You can register a new patient.
                </p>
                <Link
                  href="/dashboard/patients/add"
                  className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  Add New Patient
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* Visit Form */}
      {foundPatient && (
        <form
          onSubmit={handleSave}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Create Visit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Department" required>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctor("");
                }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              >
                <option value="">Select department</option>
                {departments
                  .filter((d) => d.type === "Clinical")
                  .map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
              </select>
            </FormField>

            <FormField label="Doctor" required>
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              >
                <option value="">Select doctor</option>
                {filteredDoctors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.specialization})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Visit Type" required>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              >
                <option value="New Visit">New Visit</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Consultation">Consultation</option>
              </select>
            </FormField>

            <FormField label="Notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Additional notes (optional)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none"
              />
            </FormField>
          </div>

          {/* Queue Checkbox */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="assignQueue"
              checked={assignToQueue}
              onChange={(e) => setAssignToQueue(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label
              htmlFor="assignQueue"
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <ClipboardList className="w-4 h-4 text-gray-400" />
              Assign to queue
            </label>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={!department || !doctor}
              className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Register Visit
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFoundPatient(null);
                setSearchQuery("");
                setSearchPerformed(false);
                setDepartment("");
                setDoctor("");
                setVisitType("New Visit");
                setNotes("");
                setAssignToQueue(true);
              }}
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

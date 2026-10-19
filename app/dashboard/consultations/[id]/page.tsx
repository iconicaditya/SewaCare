"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Stethoscope,
  Calendar,
  Building2,
  Thermometer,
  Heart,
  Activity,
  Weight,
  Wind,
  TestTube,
  Pill,
  StickyNote,
  CalendarClock,
} from "lucide-react";
import { consultations } from "@/lib/mock/consultations";
import SectionHeader from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";

export default function ConsultationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const consultation = consultations.find((c) => c.id === id);

  if (!consultation) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/consultations"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Consultations
        </Link>
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <Stethoscope className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Consultation Not Found
          </h3>
          <p className="text-sm text-gray-500">
            The consultation with ID <span className="font-medium">{id}</span> could not be found.
          </p>
        </div>
      </div>
    );
  }

  const vitals = consultation.vitalSigns;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/consultations"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Consultations
      </Link>

      {/* Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Consultation {consultation.id}
              </h1>
              <StatusBadge status="Completed" size="md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {consultation.patientName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Stethoscope className="h-4 w-4 text-gray-400" />
                <span>{consultation.doctorName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(consultation.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span>{consultation.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chief Complaint */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader
              title="Chief Complaint"
              description="Primary reason for consultation"
            />
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              {consultation.chiefComplaint}
            </p>
          </div>

          {/* Symptoms */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader
              title="Symptoms"
              description="Reported symptoms during consultation"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {consultation.symptoms.map((symptom, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 border border-amber-200"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Clinical Examination */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader
              title="Clinical Examination"
              description="Physical examination findings"
            />
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              {consultation.examination}
            </p>
          </div>

          {/* Diagnosis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader
              title="Diagnosis"
              description="Clinical diagnosis"
            />
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm font-semibold text-emerald-800">
                {consultation.diagnosis}
              </p>
            </div>
          </div>

          {/* Tests Ordered */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader
              title="Tests Ordered"
              description="Laboratory and diagnostic tests"
            />
            <div className="mt-4 space-y-2">
              {consultation.testsOrdered.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <TestTube className="h-4 w-4 text-blue-500 shrink-0" />
                  <span className="text-sm text-gray-700">{test}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prescription */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader
              title="Prescription"
              description="Medications prescribed"
            />
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Pill className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-800 leading-relaxed">
                  {consultation.prescription}
                </p>
              </div>
            </div>
          </div>

          {/* Doctor Notes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader
              title="Doctor Notes"
              description="Additional clinical notes"
            />
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-3">
                <StickyNote className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {consultation.notes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Vitals & Quick Info */}
        <div className="space-y-6">
          {/* Vital Signs */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader title="Vital Signs" />
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-600">Temperature</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {vitals.temperature}°F
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Blood Pressure</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {vitals.bloodPressure} mmHg
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span className="text-sm text-gray-600">Heart Rate</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {vitals.heartRate} bpm
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Weight</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {vitals.weight} kg
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-teal-500" />
                  <span className="text-sm text-gray-600">Respiratory Rate</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {vitals.respiratoryRate}/min
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SectionHeader title="Consultation Info" />
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Consultation ID</span>
                <span className="font-medium text-gray-900">
                  {consultation.id}
                </span>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Patient ID</span>
                <span className="font-medium text-gray-900">
                  {consultation.patientId}
                </span>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Doctor ID</span>
                <span className="font-medium text-gray-900">
                  {consultation.doctorId}
                </span>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Tests Ordered</span>
                <span className="font-medium text-gray-900">
                  {consultation.testsOrdered.length}
                </span>
              </div>
              <div className="border-t border-gray-100" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Symptoms</span>
                <span className="font-medium text-gray-900">
                  {consultation.symptoms.length}
                </span>
              </div>
            </div>
          </div>

          {/* Follow-up Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock className="h-5 w-5 text-emerald-600" />
              <h3 className="text-sm font-semibold text-gray-900">Follow-up</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {consultation.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

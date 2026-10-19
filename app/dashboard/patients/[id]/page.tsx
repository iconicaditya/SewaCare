"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Stethoscope,
  FlaskConical,
  User,
  Heart,
  Phone,
  AlertTriangle,
  FileText,
  Pill,
  Activity,
  Bed,
  ShoppingCart,
  Receipt,
  Shield,
  FolderOpen,
  Mail,
  MapPin,
  Droplets,
  Clock,
} from "lucide-react";
import { patients } from "@/lib/mock/patients";
import { appointments } from "@/lib/mock/appointments";
import { consultations } from "@/lib/mock/consultations";
import { prescriptions } from "@/lib/mock/prescriptions";
import { labOrders } from "@/lib/mock/laboratory";
import { radiologyOrders } from "@/lib/mock/radiology";
import { invoices } from "@/lib/mock/billing";
import { patientInsurance } from "@/lib/mock/insurance";
import { documents } from "@/lib/mock/documents";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");

  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <Link
            href="/dashboard/patients"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Link>
        </div>
        <EmptyState
          icon={User}
          title="Patient Not Found"
          description={`No patient found with ID "${patientId}". Please check the ID and try again.`}
          action={{
            label: "Go to Patients",
            onClick: () => {},
          }}
        />
      </div>
    );
  }

  // Filter related data
  const patientAppointments = appointments.filter(
    (a) => a.patientId === patientId
  );
  const patientConsultations = consultations.filter(
    (c) => c.patientId === patientId
  );
  const patientPrescriptions = prescriptions.filter(
    (p) => p.patientId === patientId
  );
  const patientLabOrders = labOrders.filter((l) => l.patientId === patientId);
  const patientRadiologyOrders = radiologyOrders.filter(
    (r) => r.patientId === patientId
  );
  const patientInvoices = invoices.filter((i) => i.patientId === patientId);
  const patientInsuranceData = patientInsurance.filter(
    (i) => i.patientId === patientId
  );
  const patientDocuments = documents.filter((d) => d.patientId === patientId);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "medical-history", label: "Medical History", icon: Heart, count: patient.medicalHistory.length },
    { id: "visits", label: "Visits", icon: Clock, count: 0 },
    { id: "appointments", label: "Appointments", icon: Calendar, count: patientAppointments.length },
    { id: "consultations", label: "Consultations", icon: Stethoscope, count: patientConsultations.length },
    { id: "prescriptions", label: "Prescriptions", icon: Pill, count: patientPrescriptions.length },
    { id: "laboratory", label: "Laboratory", icon: FlaskConical, count: patientLabOrders.length },
    { id: "radiology", label: "Radiology", icon: Activity, count: patientRadiologyOrders.length },
    { id: "admissions", label: "Admissions", icon: Bed, count: 0 },
    { id: "pharmacy", label: "Pharmacy", icon: ShoppingCart, count: 0 },
    { id: "billing", label: "Billing", icon: Receipt, count: patientInvoices.length },
    { id: "insurance", label: "Insurance", icon: Shield, count: patientInsuranceData.length },
    { id: "documents", label: "Documents", icon: FolderOpen, count: patientDocuments.length },
  ];

  // ========== TAB CONTENT RENDERERS ==========

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Personal Information
            </h3>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm font-medium text-gray-900">
                {patient.fullName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Patient ID</p>
              <p className="text-sm font-medium text-emerald-600">
                {patient.id}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm font-medium text-gray-900">
                {patient.gender}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="text-sm font-medium text-gray-900">
                {patient.age} years
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date of Birth</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(patient.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <StatusBadge status={patient.status} />
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-sm text-gray-900">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-sm text-gray-900">{patient.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-gray-400 mt-0.5" />
              <span className="text-sm text-gray-900">{patient.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Medical Information
            </h3>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Blood Group</p>
              <div className="flex items-center gap-2 mt-1">
                <Droplets className="h-4 w-4 text-red-500" />
                <p className="text-sm font-medium text-gray-900">
                  {patient.bloodGroup}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Visit</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(patient.lastVisit).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Known Allergies</p>
            {patient.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="inline-flex items-center gap-1 rounded-md bg-red-50 text-red-700 px-2.5 py-0.5 text-xs font-medium"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {allergy}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No known allergies</p>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Medical History</p>
            {patient.medicalHistory.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patient.medicalHistory.map((condition) => (
                  <span
                    key={condition}
                    className="inline-flex items-center rounded-md bg-amber-50 text-amber-700 px-2.5 py-0.5 text-xs font-medium"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No medical history</p>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Emergency Contact
            </h3>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Contact Name</p>
              <p className="text-sm font-medium text-gray-900">
                {patient.emergencyContact.name}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Relationship</p>
              <p className="text-sm font-medium text-gray-900">
                {patient.emergencyContact.relationship}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm font-medium text-gray-900">
              {patient.emergencyContact.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Quick Summary
            </h3>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">
                {patientAppointments.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Appointments</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">
                {patientConsultations.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Consultations</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">
                {patientPrescriptions.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Prescriptions</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">
                {patientLabOrders.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Lab Tests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">
            Known Conditions
          </h3>
        </div>
        <div className="p-5">
          {patient.medicalHistory.length > 0 ? (
            <div className="space-y-3">
              {patient.medicalHistory.map((condition, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                  <span className="text-sm text-gray-900">{condition}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Heart}
              title="No Medical History"
              description="No conditions recorded for this patient."
            />
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">
            Known Allergies
          </h3>
        </div>
        <div className="p-5">
          {patient.allergies.length > 0 ? (
            <div className="space-y-3">
              {patient.allergies.map((allergy, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
                >
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                  <span className="text-sm text-red-700">{allergy}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Shield}
              title="No Known Allergies"
              description="No allergies recorded for this patient."
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderVisits = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Visit History</h3>
      </div>
      <div className="p-5">
        <EmptyState
          icon={Clock}
          title="No Visit Records"
          description="Visit records will appear here once visits are tracked."
        />
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Appointments</h3>
      </div>
      {patientAppointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patientAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                    {apt.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {apt.doctorName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {apt.department}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(apt.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at {apt.time}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {apt.visitType}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={apt.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={Calendar}
            title="No Appointments"
            description="No appointments found for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderConsultations = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Consultations</h3>
      </div>
      {patientConsultations.length > 0 ? (
        <div className="p-5 space-y-4">
          {patientConsultations.map((con) => (
            <div
              key={con.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-emerald-600 text-sm">
                    {con.id}
                  </span>
                  <span className="text-sm text-gray-900 font-medium">
                    {con.doctorName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {con.department}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(con.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-500">Chief Complaint</p>
                <p className="text-sm text-gray-900">{con.chiefComplaint}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-500">Diagnosis</p>
                <p className="text-sm font-medium text-gray-900">
                  {con.diagnosis}
                </p>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-3 p-2 bg-gray-50 rounded-lg text-center">
                <div>
                  <p className="text-xs text-gray-500">BP</p>
                  <p className="text-xs font-medium text-gray-900">
                    {con.vitalSigns.bloodPressure}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">HR</p>
                  <p className="text-xs font-medium text-gray-900">
                    {con.vitalSigns.heartRate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Temp</p>
                  <p className="text-xs font-medium text-gray-900">
                    {con.vitalSigns.temperature}°F
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Weight</p>
                  <p className="text-xs font-medium text-gray-900">
                    {con.vitalSigns.weight}kg
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">RR</p>
                  <p className="text-xs font-medium text-gray-900">
                    {con.vitalSigns.respiratoryRate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={Stethoscope}
            title="No Consultations"
            description="No consultations found for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderPrescriptions = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Prescriptions</h3>
      </div>
      {patientPrescriptions.length > 0 ? (
        <div className="p-5 space-y-4">
          {patientPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-emerald-600 text-sm">
                    {rx.id}
                  </span>
                  <span className="text-sm text-gray-900">{rx.doctorName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {new Date(rx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <StatusBadge status={rx.status} />
                </div>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">
                        Medicine
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">
                        Dosage
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">
                        Frequency
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rx.medicines.map((med, idx) => (
                      <tr key={idx}>
                        <td className="py-2 text-sm text-gray-900 font-medium">
                          {med.name}
                        </td>
                        <td className="py-2 text-sm text-gray-600">
                          {med.dosage}
                        </td>
                        <td className="py-2 text-sm text-gray-600">
                          {med.frequency}
                        </td>
                        <td className="py-2 text-sm text-gray-600">
                          {med.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rx.notes && (
                  <p className="mt-3 text-xs text-gray-500 italic">
                    Note: {rx.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={Pill}
            title="No Prescriptions"
            description="No prescriptions found for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderLaboratory = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">
          Laboratory Reports
        </h3>
      </div>
      {patientLabOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tests
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patientLabOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {order.tests.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.doctorName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge
                      status={order.priority}
                      variant={
                        order.priority === "STAT"
                          ? "danger"
                          : order.priority === "Urgent"
                          ? "warning"
                          : "default"
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={FlaskConical}
            title="No Lab Orders"
            description="No laboratory orders found for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderRadiology = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">
          Radiology Orders & Reports
        </h3>
      </div>
      {patientRadiologyOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Body Part
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patientRadiologyOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {order.service}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.bodyPart}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.doctorName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(order.scheduledDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={Activity}
            title="No Radiology Orders"
            description="No radiology orders found for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderAdmissions = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">
          Admissions
        </h3>
      </div>
      <div className="p-5">
        <EmptyState
          icon={Bed}
          title="No Admissions"
          description="No admission records found for this patient."
        />
      </div>
    </div>
  );

  const renderPharmacy = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">
          Pharmacy Dispensing
        </h3>
      </div>
      <div className="p-5">
        <EmptyState
          icon={ShoppingCart}
          title="No Pharmacy Records"
          description="No pharmacy dispensing records found for this patient."
        />
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Billing</h3>
      </div>
      {patientInvoices.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Invoice ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Items
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Grand Total
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Paid
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patientInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                    {inv.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(inv.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {inv.items.map((i) => i.description).join(", ")}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    Rs. {inv.grandTotal.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-right">
                    Rs. {inv.paidAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inv.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={Receipt}
            title="No Invoices"
            description="No billing records found for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderInsurance = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">
          Insurance Information
        </h3>
      </div>
      {patientInsuranceData.length > 0 ? (
        <div className="p-5 space-y-4">
          {patientInsuranceData.map((ins) => (
            <div
              key={ins.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  {ins.providerName}
                </h4>
                <StatusBadge status={ins.status} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Policy Number</p>
                  <p className="text-sm font-medium text-gray-900">
                    {ins.policyNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Coverage Type</p>
                  <p className="text-sm font-medium text-gray-900">
                    {ins.coverageType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sum Insured</p>
                  <p className="text-sm font-medium text-gray-900">
                    Rs. {ins.sumInsured.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Valid From</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(ins.validFrom).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Valid Until</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(ins.validUntil).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={Shield}
            title="No Insurance"
            description="No insurance records found for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderDocuments = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Documents</h3>
      </div>
      {patientDocuments.length > 0 ? (
        <div className="p-5 space-y-3">
          {patientDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500">
                    {doc.type} &bull; {doc.fileSize} &bull;{" "}
                    {new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <StatusBadge status={doc.status} />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5">
          <EmptyState
            icon={FolderOpen}
            title="No Documents"
            description="No documents uploaded for this patient."
          />
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "medical-history":
        return renderMedicalHistory();
      case "visits":
        return renderVisits();
      case "appointments":
        return renderAppointments();
      case "consultations":
        return renderConsultations();
      case "prescriptions":
        return renderPrescriptions();
      case "laboratory":
        return renderLaboratory();
      case "radiology":
        return renderRadiology();
      case "admissions":
        return renderAdmissions();
      case "pharmacy":
        return renderPharmacy();
      case "billing":
        return renderBilling();
      case "insurance":
        return renderInsurance();
      case "documents":
        return renderDocuments();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/dashboard/patients"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-4 flex-1">
            <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-lg font-bold shrink-0">
              {patient.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {patient.fullName}
                </h1>
                <StatusBadge status={patient.status} size="md" />
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="font-mono text-emerald-600 font-medium">
                  {patient.id}
                </span>
                <span>
                  {patient.age} yrs &bull; {patient.gender}
                </span>
                <span>{patient.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 ml-13 flex-wrap">
          <Link
            href={`/dashboard/appointments?patient=${patientId}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            Create Appointment
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Stethoscope className="h-4 w-4" />
            Start Consultation
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FlaskConical className="h-4 w-4" />
            Order Lab Test
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Activity className="h-4 w-4" />
            Order Radiology
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Pill className="h-4 w-4" />
            Prescribe
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      <div className="pt-2">{renderTabContent()}</div>
    </div>
  );
}

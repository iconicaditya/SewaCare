"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  FileText,
  Save,
  X,
} from "lucide-react";
import FormField from "@/components/ui/form-field";
import { patients } from "@/lib/mock/patients";
import { departments } from "@/lib/mock/departments";
import { doctors } from "@/lib/mock/doctors";

export default function CreateAppointmentPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    patientId: "",
    department: "",
    doctorId: "",
    date: "",
    time: "",
    visitType: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [patientSearch, setPatientSearch] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  const filteredPatients = useMemo(() => {
    if (!patientSearch.trim()) return patients;
    return patients.filter((p) =>
      p.fullName.toLowerCase().includes(patientSearch.toLowerCase())
    );
  }, [patientSearch]);

  const selectedPatient = patients.find((p) => p.id === form.patientId);

  const filteredDoctors = useMemo(() => {
    if (!form.department) return [];
    return doctors.filter((d) => d.department === form.department);
  }, [form.department]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "department" && prev.department !== value) {
        next.doctorId = "";
      }
      return next;
    });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.patientId) newErrors.patientId = "Patient is required";
    if (!form.department) newErrors.department = "Department is required";
    if (!form.doctorId) newErrors.doctorId = "Doctor is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    if (!form.visitType) newErrors.visitType = "Visit type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const patient = patients.find((p) => p.id === form.patientId);
    const doctor = doctors.find((d) => d.id === form.doctorId);

    alert(
      `Appointment created successfully!\n\nPatient: ${patient?.fullName}\nDoctor: ${doctor?.name}\nDepartment: ${form.department}\nDate: ${form.date}\nTime: ${form.time}\nType: ${form.visitType}`
    );
    router.push("/dashboard/appointments");
  };

  const inputClasses =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/appointments"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create Appointment
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Schedule a new patient appointment
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient & Department Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <User className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-gray-900">
              Patient & Department
            </h2>
          </div>

          <div className="space-y-1.5">
            <FormField label="Patient" required error={errors.patientId}>
              <div className="relative">
                <input
                  type="text"
                  value={selectedPatient ? selectedPatient.fullName : patientSearch}
                  onChange={(e) => {
                    setPatientSearch(e.target.value);
                    setShowPatientDropdown(true);
                    if (selectedPatient) {
                      handleChange("patientId", "");
                    }
                  }}
                  onFocus={() => setShowPatientDropdown(true)}
                  placeholder="Search patient by name..."
                  className={inputClasses}
                />
                {showPatientDropdown && patientSearch && !selectedPatient && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-sm max-h-60 overflow-y-auto">
                    {filteredPatients.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No patients found
                      </div>
                    ) : (
                      filteredPatients.map((patient) => (
                        <button
                          key={patient.id}
                          type="button"
                          onClick={() => {
                            handleChange("patientId", patient.id);
                            setPatientSearch("");
                            setShowPatientDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-medium text-gray-900">
                              {patient.fullName}
                            </span>
                            <span className="ml-2 text-gray-500">
                              {patient.id}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {patient.phone}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
                {selectedPatient && (
                  <button
                    type="button"
                    onClick={() => {
                      handleChange("patientId", "");
                      setPatientSearch("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </FormField>
          </div>

          <div className="space-y-1.5">
            <FormField label="Department" required error={errors.department}>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={form.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  className={`${inputClasses} pl-9 appearance-none`}
                >
                  <option value="">Select department</option>
                  {departments
                    .filter((d) => d.status === "Active" && d.type === "Clinical")
                    .map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                </select>
              </div>
            </FormField>
          </div>

          <div className="space-y-1.5">
            <FormField label="Doctor" required error={errors.doctorId}>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={form.doctorId}
                  onChange={(e) => handleChange("doctorId", e.target.value)}
                  disabled={!form.department}
                  className={`${inputClasses} pl-9 appearance-none disabled:bg-gray-50 disabled:text-gray-400`}
                >
                  <option value="">
                    {form.department
                      ? "Select doctor"
                      : "Select department first"}
                  </option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialization}
                    </option>
                  ))}
                </select>
              </div>
            </FormField>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-gray-900">
              Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Date" required error={errors.date}>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={`${inputClasses} pl-9`}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </FormField>

            <FormField label="Time" required error={errors.time}>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </FormField>
          </div>

          <FormField label="Visit Type" required error={errors.visitType}>
            <div className="flex gap-3">
              {["New Visit", "Follow-up", "Consultation"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange("visitType", type)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    form.visitType === type
                      ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        {/* Notes Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <FileText className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-gray-900">
              Additional Notes
            </h2>
          </div>

          <textarea
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={4}
            placeholder="Enter any notes about this appointment..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-6">
          <Link
            href="/dashboard/appointments"
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

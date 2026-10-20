"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Building2, Camera, Eye, FileText, LockKeyhole, Plus, Save, SlidersHorizontal, UserRound, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";

type SettingsState = {
  profile: { fullName: string; email: string; role: string; department: string; profileImage: string };
  templates: { id: string; name: string; category: string; enabled: boolean; fieldIds: string[] }[];
  reportInfo: { hospitalName: string; logo: string; license: string; tagline: string; phone: string; email: string; website: string; address: string; followUpInstructions: string; followUpDate: string; emergencyRedFlags: string; hospitalStamp: string; doctorName: string; doctorEducations: string; doctorRole: string; doctorSignature: string; disclaimer: string; fields: { id: string; label: string; value: string }[] };
  security: { sessionTimeout: string; loginAlerts: boolean; requireReauthentication: boolean };
  preferences: { language: string; dateFormat: string; emailNotifications: boolean; inAppNotifications: boolean };
};

const patientFieldIds = ["patientName", "patientMrn", "patientAgeGender", "patientDob", "patientContact"];
const encounterFieldIds = ["referringDoctor"];
const clinicalFieldIds = ["chiefComplaints", "vitalSigns", "clinicalFindings", "diagnosis", "prescriptions", "labRadiologyFindings", "advice"];
const signOffFieldIds = ["followUpInstructions", "followUpDate", "emergencyRedFlags"];
const allReportFieldIds = [...patientFieldIds, ...encounterFieldIds, ...clinicalFieldIds, ...signOffFieldIds];

const defaultTemplates: SettingsState["templates"] = [
  { id: "consultation", name: "Clinical Consultation", category: "Clinical", enabled: true, fieldIds: allReportFieldIds },
  { id: "discharge", name: "Discharge Summary", category: "Clinical", enabled: true, fieldIds: allReportFieldIds },
  { id: "lab", name: "Laboratory Results", category: "Laboratory", enabled: true, fieldIds: allReportFieldIds },
  { id: "radiology", name: "Radiology Report", category: "Imaging", enabled: true, fieldIds: allReportFieldIds },
  { id: "prescription", name: "Prescription & Medication Summary", category: "Clinical", enabled: true, fieldIds: allReportFieldIds },
];

const defaultSettings: SettingsState = {
  profile: { fullName: "", email: "", role: "", department: "", profileImage: "" },
  templates: defaultTemplates,
  reportInfo: {
    hospitalName: "SewaCare Hospital",
    logo: "",
    license: "",
    tagline: "",
    phone: "01-4221000",
    email: "info@sewacare.com",
    website: "",
    address: "New Baneshwor, Kathmandu, Nepal",
    followUpInstructions: "",
    followUpDate: "",
    emergencyRedFlags: "",
    hospitalStamp: "",
    doctorName: "",
    doctorEducations: "",
    doctorRole: "",
    doctorSignature: "",
    disclaimer: "This report is confidential and intended only for the named patient and authorized healthcare professionals.",
    fields: [
      { id: "patientName", label: "Patient full name", value: "" },
      { id: "patientMrn", label: "Patient ID / Medical record number (MRN)", value: "" },
      { id: "patientAgeGender", label: "Age and gender", value: "" },
      { id: "patientDob", label: "Date of birth (DOB)", value: "" },
      { id: "patientContact", label: "Phone Number", value: "" },
      { id: "referringDoctor", label: "Referring doctor / physician", value: "" },
      { id: "chiefComplaints", label: "Chief complaints", value: "" },
      { id: "vitalSigns", label: "Vital signs", value: "" },
      { id: "clinicalFindings", label: "Clinical examination / findings", value: "" },
      { id: "diagnosis", label: "Diagnosis", value: "" },
      { id: "prescriptions", label: "Prescriptions / medications", value: "" },
      { id: "labRadiologyFindings", label: "Laboratory or radiology findings", value: "" },
      { id: "advice", label: "Advice and lifestyle recommendations", value: "" },
      { id: "followUpInstructions", label: "Follow-up instructions", value: "" },
      { id: "followUpDate", label: "Follow-up date", value: "" },
      { id: "emergencyRedFlags", label: "Emergency red flag symptoms", value: "" },
    ],
  },
  security: { sessionTimeout: "30", loginAlerts: true, requireReauthentication: false },
  preferences: { language: "English", dateFormat: "YYYY-MM-DD", emailNotifications: true, inAppNotifications: true },
};

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "templates", label: "Report Templates", icon: FileText },
  { id: "report", label: "Report Information and Fields", icon: Building2 },
  { id: "security", label: "Security", icon: LockKeyhole },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
];

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
  const sessionUser = session?.user as (typeof session.user & { fullName?: string; role?: string; department?: string | null; profileImage?: string | null }) | null;

  useEffect(() => {
    if (status === "loading") return;
    const profileDefaults = {
      ...defaultSettings.profile,
      fullName: sessionUser?.fullName ?? sessionUser?.name ?? "",
      email: sessionUser?.email ?? "",
      role: sessionUser?.role ?? "",
      department: sessionUser?.department ?? "",
      profileImage: sessionUser?.profileImage ?? sessionUser?.image ?? "",
    };
    try {
      const storedSettings = window.localStorage.getItem("sewacare-admin-settings");
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings) as Partial<SettingsState>;
        const savedReportInfo = parsed.reportInfo as (Partial<SettingsState["reportInfo"]> & { signature?: string }) | undefined;
        const { signature: legacySignature, ...savedReportFields } = savedReportInfo ?? {};
        const storedTemplates = Array.isArray(parsed.templates) ? parsed.templates as { id: string; name: string; category: string; enabled: boolean; fieldIds?: string[] }[] : [];
        const storedReportFields = Array.isArray(savedReportInfo?.fields) ? savedReportInfo.fields.map((field) => field.id === "signature" ? { ...field, id: "hospitalStamp", label: "Hospital stamp/signature" } : field) : [];
        const legacyFieldValues: Record<string, string> = {
          followUpInstructions: savedReportFields.followUpInstructions || "",
          followUpDate: savedReportFields.followUpDate || "",
          emergencyRedFlags: savedReportFields.emergencyRedFlags || "",
        };
        const reportFields = defaultSettings.reportInfo.fields.map((field) => {
          const storedField = storedReportFields.find((item) => item.id === field.id);
          return { ...field, value: typeof storedField?.value === "string" ? storedField.value : legacyFieldValues[field.id] ?? "" };
        });
        const templates = defaultTemplates.map((template) => {
          const storedTemplate = storedTemplates.find((item) => item.id === template.id);
          return storedTemplate
            ? { ...template, ...storedTemplate, fieldIds: allReportFieldIds }
            : template;
        });
        const defaultTemplateIds = new Set(defaultTemplates.map((template) => template.id));
        templates.push(...storedTemplates.filter((template) => !defaultTemplateIds.has(template.id)).map((template) => ({ ...template, fieldIds: allReportFieldIds })));
        setSettings({
          ...defaultSettings,
          ...parsed,
          templates,
          profile: { ...profileDefaults, ...parsed.profile },
          reportInfo: {
            ...defaultSettings.reportInfo,
            ...savedReportFields,
            hospitalStamp: savedReportFields.hospitalStamp ?? legacySignature ?? "",
            doctorEducations: Array.isArray(savedReportFields.doctorEducations) ? savedReportFields.doctorEducations.join(", ") : typeof savedReportFields.doctorEducations === "string" ? savedReportFields.doctorEducations : "",
            fields: reportFields,
          },
          security: { ...defaultSettings.security, ...parsed.security },
          preferences: { ...defaultSettings.preferences, ...parsed.preferences },
        });
      }
    } catch {
      setSettings({ ...defaultSettings, profile: profileDefaults });
    }
    setIsLoaded(true);
  }, [status, sessionUser?.fullName, sessionUser?.name, sessionUser?.email, sessionUser?.role, sessionUser?.department, sessionUser?.profileImage, sessionUser?.image]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem("sewacare-admin-settings", JSON.stringify(settings));
    } catch {
      setSaveMessage("Browser storage is unavailable; changes will not persist after closing this tab.");
    }
  }, [isLoaded, settings]);

  const updateField = (section: "profile" | "reportInfo" | "security" | "preferences", field: string, value: string | boolean) => {
    setSaveMessage("");
    setSettings((current) => ({ ...current, [section]: { ...current[section], [field]: value } } as SettingsState));
  };

  const updateReportField = (id: string, value: string) => {
    setSaveMessage("");
    setSettings((current) => ({
      ...current,
      reportInfo: {
        ...current.reportInfo,
        fields: current.reportInfo.fields.map((field) => field.id === id ? { ...field, value } : field),
      },
    }));
  };

  const handleReportImageChange = (event: React.ChangeEvent<HTMLInputElement>, field: "logo" | "hospitalStamp" | "doctorSignature", imageLabel: string) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setSaveMessage(`Choose an image file for the ${imageLabel.toLowerCase()}.`);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage(`${imageLabel} files must be smaller than 5 MB.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, 900 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(previewUrl);
        setSaveMessage(`This ${imageLabel.toLowerCase()} could not be processed. Try another file.`);
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      updateField("reportInfo", field, canvas.toDataURL("image/webp", 0.85));
      URL.revokeObjectURL(previewUrl);
    };
    image.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      setSaveMessage(`This ${imageLabel.toLowerCase()} could not be opened. Try another file.`);
    };
    image.src = previewUrl;
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setSaveMessage("Choose an image file for your profile photo.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage("Profile photos must be smaller than 5 MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const side = Math.min(image.naturalWidth, image.naturalHeight);
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(previewUrl);
        setSaveMessage("This image could not be processed. Try another file.");
        return;
      }
      context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, 400, 400);
      updateField("profile", "profileImage", canvas.toDataURL("image/jpeg", 0.82));
      URL.revokeObjectURL(previewUrl);
    };
    image.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      setSaveMessage("This image could not be opened. Try another file.");
    };
    image.src = previewUrl;
  };

  const saveSettings = () => {
    try {
      window.localStorage.setItem("sewacare-admin-settings", JSON.stringify(settings));
      setSaveMessage("Settings saved in this browser.");
    } catch {
      setSaveMessage("Browser storage is unavailable; changes will not persist after closing this tab.");
    }
  };

  const addTemplate = () => {
    setSettings((current) => ({
      ...current,
      templates: [...current.templates, { id: `template-${Date.now()}`, name: "New report template", category: "General", enabled: true, fieldIds: allReportFieldIds }],
    }));
    setSaveMessage("");
  };

  const updateTemplate = (id: string, field: "name" | "category" | "enabled", value: string | boolean) => {
    setSettings((current) => ({
      ...current,
      templates: current.templates.map((template) => template.id === id ? { ...template, [field]: value } : template),
    }));
    setSaveMessage("");
  };

  const previewTemplate = settings.templates.find((template) => template.id === previewTemplateId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, report setup, and account preferences."
        actions={<button onClick={saveSettings} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"><Save className="h-4 w-4" /> Save changes</button>}
      />
      <div className="overflow-x-auto">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
      {saveMessage && <p role="status" className="text-sm text-emerald-700">{saveMessage}</p>}

      {activeTab === "profile" && <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-5 md:p-6">
        <SectionHeader title="Profile" description="Your account details used across the hospital workspace." />
        <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
          {settings.profile.profileImage ? <img src={settings.profile.profileImage} alt="Profile" className="h-16 w-16 rounded-full border border-gray-200 object-cover" /> : <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-emerald-50 text-lg font-semibold text-emerald-800">{settings.profile.fullName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || <UserRound size={22} />}</div>}
          <div>
            <p className="text-sm font-medium text-gray-800">Profile photo</p>
            <p className="mt-0.5 text-xs text-gray-500">JPG, PNG, or WebP up to 5 MB</p>
            <div className="mt-2 flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"><Camera className="h-4 w-4" /> Upload photo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleProfileImageChange} className="sr-only" /></label>
              {settings.profile.profileImage && <button type="button" onClick={() => updateField("profile", "profileImage", "")} className="text-sm text-gray-500 hover:text-rose-600">Remove</button>}
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass} htmlFor="profile-name">Full name</label><input id="profile-name" className={inputClass} value={settings.profile.fullName} onChange={(event) => updateField("profile", "fullName", event.target.value)} placeholder="Your name" /></div>
          <div><label className={labelClass} htmlFor="profile-email">Email</label><input id="profile-email" type="email" className={inputClass} value={settings.profile.email} onChange={(event) => updateField("profile", "email", event.target.value)} placeholder="name@hospital.org" /></div>
          <div><label className={labelClass} htmlFor="profile-role">Role</label><select id="profile-role" className={inputClass} value={settings.profile.role} onChange={(event) => updateField("profile", "role", event.target.value)}><option value="">Select role</option>{settings.profile.role && !["doctor", "nurse", "admin", "lab_technician", "pharmacist"].includes(settings.profile.role) && <option value={settings.profile.role}>{settings.profile.role}</option>}<option value="doctor">Doctor</option><option value="nurse">Nurse</option><option value="admin">Administrator</option><option value="lab_technician">Lab Technician</option><option value="pharmacist">Pharmacist</option></select></div>
          <div><label className={labelClass} htmlFor="profile-department">Department</label><select id="profile-department" className={inputClass} value={settings.profile.department} onChange={(event) => updateField("profile", "department", event.target.value)}><option value="">Select department</option>{settings.profile.department && !["emergency", "cardiology", "neurology", "orthopedics", "pediatrics", "oncology", "radiology", "general"].includes(settings.profile.department) && <option value={settings.profile.department}>{settings.profile.department}</option>}<option value="emergency">Emergency</option><option value="cardiology">Cardiology</option><option value="neurology">Neurology</option><option value="orthopedics">Orthopedics</option><option value="pediatrics">Pediatrics</option><option value="oncology">Oncology</option><option value="radiology">Radiology</option><option value="general">General Medicine</option></select></div>
        </div>
      </section>}

      {activeTab === "templates" && <section className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 md:p-6">
        <SectionHeader title="Report Templates" description="Manage five report formats. Every format includes the complete report field set." actions={<button onClick={addTemplate} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Plus className="h-4 w-4" /> Add template</button>} />
        <div className="divide-y divide-gray-100">
          {settings.templates.map((template) => <div key={template.id} className="grid items-center gap-3 py-3 md:grid-cols-[minmax(0,1fr)_150px_auto]">
            <input aria-label="Template name" className={inputClass} value={template.name} onChange={(event) => updateTemplate(template.id, "name", event.target.value)} />
            <select aria-label="Template category" className={inputClass} value={template.category} onChange={(event) => updateTemplate(template.id, "category", event.target.value)}><option>Clinical</option><option>Laboratory</option><option>Imaging</option><option>General</option></select>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={template.enabled} onChange={(event) => updateTemplate(template.id, "enabled", event.target.checked)} className="h-4 w-4 accent-emerald-700" /> Enabled</label>
              <button onClick={() => setPreviewTemplateId(template.id)} className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-emerald-700"><Eye className="h-4 w-4" /> Preview</button>
            </div>
          </div>)}
        </div>
      </section>}

      {previewTemplate && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-3 sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewTemplateId(null); }}>
        <section role="dialog" aria-modal="true" aria-label={`${previewTemplate.name} preview`} className="flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6">
            <div><p className="text-sm font-semibold text-gray-900">{previewTemplate.name}</p><p className="text-xs text-gray-500">Sample report preview · {settings.reportInfo.fields.length} fields</p></div>
            <button onClick={() => setPreviewTemplateId(null)} aria-label="Close preview" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"><X className="h-5 w-5" /></button>
          </header>
          <div className="overflow-y-auto bg-gray-100 p-3 sm:p-6">
            <article className="mx-auto min-h-[700px] w-full max-w-3xl bg-white p-5 text-gray-900 shadow-sm sm:p-10">
              <div className="flex items-center gap-4 border-b-2 border-emerald-800 pb-4">
                {settings.reportInfo.logo && <img src={settings.reportInfo.logo} alt="Hospital logo" className="max-h-16 max-w-28 object-contain" />}
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-emerald-900">{settings.reportInfo.hospitalName || "Hospital name"}</h2>
                  {settings.reportInfo.tagline && <p className="mt-0.5 text-sm text-gray-600">{settings.reportInfo.tagline}</p>}
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{[settings.reportInfo.license && `License ${settings.reportInfo.license}`, settings.reportInfo.phone, settings.reportInfo.email, settings.reportInfo.website, settings.reportInfo.address].filter(Boolean).join(" · ")}</p>
                </div>
              </div>
              <h3 className="py-5 text-center text-lg font-semibold">{previewTemplate.name}</h3>
              <dl className="grid gap-x-6 sm:grid-cols-2">
                {settings.reportInfo.fields.map((field) => <div key={field.id} className={`border-b border-gray-100 py-2 ${["chiefComplaints", "vitalSigns", "clinicalFindings", "diagnosis", "prescriptions", "labRadiologyFindings", "advice", "followUpInstructions", "emergencyRedFlags"].includes(field.id) ? "sm:col-span-2" : ""}`}>
                  <dt className="text-[11px] font-semibold text-gray-600">{field.label}</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{field.value || `Enter ${field.label.toLowerCase()}`}</dd>
                </div>)}
                <div className="border-b border-gray-100 py-2"><dt className="text-[11px] font-semibold text-gray-600">Doctor name</dt><dd className="mt-1 text-sm text-gray-800">{settings.reportInfo.doctorName || "Doctor name"}</dd></div>
                <div className="border-b border-gray-100 py-2"><dt className="text-[11px] font-semibold text-gray-600">Education & qualifications</dt><dd className="mt-1 text-sm text-gray-800">{settings.reportInfo.doctorEducations || "Doctor qualifications"}</dd></div>
                <div className="border-b border-gray-100 py-2"><dt className="text-[11px] font-semibold text-gray-600">Role / designation</dt><dd className="mt-1 text-sm text-gray-800">{settings.reportInfo.doctorRole || "Doctor role"}</dd></div>
                <div className="border-b border-gray-100 py-2"><dt className="text-[11px] font-semibold text-gray-600">Hospital stamp/signature</dt><dd className="mt-1">{settings.reportInfo.hospitalStamp ? <img src={settings.reportInfo.hospitalStamp} alt="Hospital stamp/signature" className="max-h-16 max-w-48 object-contain" /> : "Hospital stamp/signature"}</dd></div>
                <div className="border-b border-gray-100 py-2"><dt className="text-[11px] font-semibold text-gray-600">Doctor signature</dt><dd className="mt-1">{settings.reportInfo.doctorSignature ? <img src={settings.reportInfo.doctorSignature} alt="Doctor signature" className="max-h-16 max-w-48 object-contain" /> : "Doctor signature"}</dd></div>
                <div className="border-b border-gray-100 py-2 sm:col-span-2"><dt className="text-[11px] font-semibold text-gray-600">Disclaimer</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{settings.reportInfo.disclaimer}</dd></div>
              </dl>
              <p className="mt-8 border-t border-gray-200 pt-3 text-center text-[10px] text-gray-500">Sample layout only. Patient-specific values are entered when preparing a report.</p>
            </article>
          </div>
        </section>
      </div>}

      {activeTab === "report" && <div className="space-y-6">
        <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-5 md:p-6">
          <SectionHeader title="Informations" description="Hospital letterhead, disclaimer, and doctor authorization details included in every report." />
          <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-5">
            {settings.reportInfo.logo ? <img src={settings.reportInfo.logo} alt="Hospital logo preview" className="h-16 max-w-48 rounded border border-gray-200 bg-white p-2 object-contain" /> : <div className="grid h-16 w-24 place-items-center rounded border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">No logo</div>}
            <div>
              <p className="text-sm font-medium text-gray-800">Hospital logo</p>
              <p className="mt-0.5 text-xs text-gray-500">PNG, JPG, or WebP up to 5 MB</p>
              <div className="mt-2 flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"><Building2 className="h-4 w-4" /> Upload logo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleReportImageChange(event, "logo", "Hospital logo")} className="sr-only" /></label>
                {settings.reportInfo.logo && <button type="button" onClick={() => updateField("reportInfo", "logo", "")} className="text-sm text-gray-500 hover:text-rose-600">Remove</button>}
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass} htmlFor="report-hospital">Hospital name</label><input id="report-hospital" className={inputClass} value={settings.reportInfo.hospitalName} onChange={(event) => updateField("reportInfo", "hospitalName", event.target.value)} /></div>
            <div><label className={labelClass} htmlFor="report-license">Registration or license number</label><input id="report-license" className={inputClass} value={settings.reportInfo.license} onChange={(event) => updateField("reportInfo", "license", event.target.value)} placeholder="Registration number" /></div>
            <div><label className={labelClass} htmlFor="report-tagline">Tagline / department</label><input id="report-tagline" className={inputClass} value={settings.reportInfo.tagline} onChange={(event) => updateField("reportInfo", "tagline", event.target.value)} placeholder="e.g. Department of Radiology" /></div>
            <div><label className={labelClass} htmlFor="report-phone">Contact phone number</label><input id="report-phone" type="tel" className={inputClass} value={settings.reportInfo.phone} onChange={(event) => updateField("reportInfo", "phone", event.target.value)} /></div>
            <div><label className={labelClass} htmlFor="report-email">Contact email</label><input id="report-email" type="email" className={inputClass} value={settings.reportInfo.email} onChange={(event) => updateField("reportInfo", "email", event.target.value)} /></div>
            <div><label className={labelClass} htmlFor="report-website">Website URL</label><input id="report-website" type="url" className={inputClass} value={settings.reportInfo.website} onChange={(event) => updateField("reportInfo", "website", event.target.value)} placeholder="https://hospital.org" /></div>
            <div className="md:col-span-2"><label className={labelClass} htmlFor="report-address">Physical address</label><input id="report-address" className={inputClass} value={settings.reportInfo.address} onChange={(event) => updateField("reportInfo", "address", event.target.value)} /></div>
          </div>
          <div className="grid gap-6 border-t border-gray-100 pt-5 md:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="report-disclaimer">Disclaimer text · included in every report</label>
              <textarea id="report-disclaimer" rows={4} className={`${inputClass} resize-y`} value={settings.reportInfo.disclaimer} onChange={(event) => updateField("reportInfo", "disclaimer", event.target.value)} placeholder="Confidentiality, intended use, or clinical disclaimer" />
            </div>
            <div>
              <label className={labelClass}>Hospital stamp/signature · included in every report</label>
              <div className="flex min-h-28 flex-wrap items-center gap-4 rounded-lg border border-dashed border-gray-300 p-4">
                {settings.reportInfo.hospitalStamp ? <img src={settings.reportInfo.hospitalStamp} alt="Hospital stamp or signature preview" className="max-h-20 max-w-48 object-contain" /> : <div className="grid h-16 w-32 place-items-center rounded border border-gray-200 bg-gray-50 text-xs text-gray-400">No hospital stamp</div>}
                <div>
                  <p className="text-xs text-gray-500">PNG, JPG, or WebP up to 5 MB</p>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"><Camera className="h-4 w-4" /> Upload stamp/signature<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleReportImageChange(event, "hospitalStamp", "Hospital stamp/signature")} className="sr-only" /></label>
                    {settings.reportInfo.hospitalStamp && <button type="button" onClick={() => updateField("reportInfo", "hospitalStamp", "")} className="text-sm text-gray-500 hover:text-rose-600">Remove</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 md:p-6">
          <SectionHeader title="Doctor Details" description="These credentials and the doctor's signature are included in every report format." />
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={labelClass} htmlFor="report-doctor-name">Doctor name</label><input id="report-doctor-name" className={inputClass} value={settings.reportInfo.doctorName} onChange={(event) => updateField("reportInfo", "doctorName", event.target.value)} placeholder="e.g. Dr. A. Sharma" /></div>
            <div><label className={labelClass} htmlFor="report-doctor-role">Role / designation</label><input id="report-doctor-role" className={inputClass} value={settings.reportInfo.doctorRole} onChange={(event) => updateField("reportInfo", "doctorRole", event.target.value)} placeholder="e.g. Consultant Physician" /></div>
            <div className="md:col-span-2">
              <label className={`${labelClass} sr-only`} htmlFor="doctor-educations">Education & qualifications</label>
              <input id="doctor-educations" className={inputClass} value={settings.reportInfo.doctorEducations} onChange={(event) => updateField("reportInfo", "doctorEducations", event.target.value)} placeholder="e.g. MBBS, MD, PhD" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Doctor&apos;s signature · included in every report</label>
              <div className="flex min-h-28 flex-wrap items-center gap-4 rounded-lg border border-dashed border-gray-300 p-4">
                {settings.reportInfo.doctorSignature ? <img src={settings.reportInfo.doctorSignature} alt="Doctor signature preview" className="max-h-20 max-w-48 object-contain" /> : <div className="grid h-16 w-32 place-items-center rounded border border-gray-200 bg-gray-50 text-xs text-gray-400">No doctor signature</div>}
                <div>
                  <p className="text-xs text-gray-500">Transparent PNG recommended · up to 5 MB</p>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"><Camera className="h-4 w-4" /> Upload signature<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleReportImageChange(event, "doctorSignature", "Doctor signature")} className="sr-only" /></label>
                    {settings.reportInfo.doctorSignature && <button type="button" onClick={() => updateField("reportInfo", "doctorSignature", "")} className="text-sm text-gray-500 hover:text-rose-600">Remove</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 md:p-6">
          <SectionHeader title="Report fields" description="Enter patient, visit, and clinical information. These values appear in the selected report preview." />
          <div className="grid gap-4 md:grid-cols-2">
            {settings.reportInfo.fields.map((field) => {
              const isMultiline = ["chiefComplaints", "vitalSigns", "clinicalFindings", "prescriptions", "labRadiologyFindings", "advice", "followUpInstructions", "emergencyRedFlags"].includes(field.id);
              const inputId = `report-field-${field.id}`;
              return <div key={field.id} className={isMultiline ? "md:col-span-2" : ""}>
                <label className={labelClass} htmlFor={inputId}>{field.label}</label>
                {isMultiline
                  ? <textarea id={inputId} rows={3} className={`${inputClass} resize-y`} value={field.value} onChange={(event) => updateReportField(field.id, event.target.value)} />
                  : <input id={inputId} type={field.id === "patientDob" || field.id === "followUpDate" ? "date" : field.id === "encounterDate" ? "datetime-local" : "text"} className={inputClass} value={field.value} onChange={(event) => updateReportField(field.id, event.target.value)} />}
              </div>;
            })}
          </div>
        </section>
      </div>}

      {activeTab === "security" && <section className="space-y-5 rounded-lg border border-gray-200 bg-white p-5 md:p-6">
        <SectionHeader title="Security" description="Basic safeguards for this browser session." />
        <div className="max-w-xl"><label className={labelClass} htmlFor="session-timeout">Sign out after inactivity</label><select id="session-timeout" className={inputClass} value={settings.security.sessionTimeout} onChange={(event) => updateField("security", "sessionTimeout", event.target.value)}><option value="15">15 minutes</option><option value="30">30 minutes</option><option value="60">1 hour</option><option value="120">2 hours</option></select></div>
        <label className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4"><span><span className="block text-sm font-medium text-gray-800">Login alerts</span><span className="mt-1 block text-xs text-gray-500">Receive a notice when your account is used to sign in.</span></span><input type="checkbox" checked={settings.security.loginAlerts} onChange={(event) => updateField("security", "loginAlerts", event.target.checked)} className="h-4 w-4 accent-emerald-700" /></label>
        <label className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4"><span><span className="block text-sm font-medium text-gray-800">Confirm before sensitive changes</span><span className="mt-1 block text-xs text-gray-500">Require re-authentication for profile and report configuration changes.</span></span><input type="checkbox" checked={settings.security.requireReauthentication} onChange={(event) => updateField("security", "requireReauthentication", event.target.checked)} className="h-4 w-4 accent-emerald-700" /></label>
      </section>}

      {activeTab === "preferences" && <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-5 md:p-6">
        <SectionHeader title="Preferences" description="Set defaults for your workspace and notifications." />
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={labelClass} htmlFor="pref-language">Language</label><select id="pref-language" className={inputClass} value={settings.preferences.language} onChange={(event) => updateField("preferences", "language", event.target.value)}><option>English</option><option>Nepali</option></select></div>
          <div><label className={labelClass} htmlFor="pref-date">Date format</label><select id="pref-date" className={inputClass} value={settings.preferences.dateFormat} onChange={(event) => updateField("preferences", "dateFormat", event.target.value)}><option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select></div>
        </div>
        <label className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4"><span className="text-sm font-medium text-gray-800">Email notifications</span><input type="checkbox" checked={settings.preferences.emailNotifications} onChange={(event) => updateField("preferences", "emailNotifications", event.target.checked)} className="h-4 w-4 accent-emerald-700" /></label>
        <label className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4"><span className="text-sm font-medium text-gray-800">In-app notifications</span><input type="checkbox" checked={settings.preferences.inAppNotifications} onChange={(event) => updateField("preferences", "inAppNotifications", event.target.checked)} className="h-4 w-4 accent-emerald-700" /></label>
      </section>}
    </div>
  );
}

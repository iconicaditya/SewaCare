"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  FileText,
  Download,
  Eye,
  Calendar,
  Filter,
  Printer,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";
import ReportContent, { ReportData } from "@/components/dashboard/ReportContent";
import ReportPrintView from "@/components/dashboard/ReportPrintView";

// Mock report data
const mockReports: (ReportData & { reportType: string })[] = [
  {
    id: 1,
    invoiceNo: "V2309963594",
    patientId: "H1299377182",
    patientName: "MOHAMMED CHOWDHURY",
    ageGender: "52Y / M",
    refDoctor: "Prof. Dr. M. S. Arfin MBBS, FCPS (MED), Consultant",
    invoiceDate: "23/09/2023 03:15 PM",
    reportNo: "12309936546",
    reportStatus: "FINALIZED",
    patientStatus: "OPD",
    sample: "TISSUE",
    testName: "Colonoscopic biopsy",
    labNo: "1230990063",
    collectionTime: "23/09/2023 02:41 PM",
    resultEntryTime: "23/09/2023 06:11 PM",
    labReportNo: "H-3963/23",
    clinicalHistory: "DID - IPSID, Lymphoma.",
    specimen: "Tissue from terminal ileum.",
    grossFindings:
      "Specimen received in formalin, labeled with name, number and is designated as \u2018Tissue from terminal ileum\u2019 consists of three pieces of soft tan-colored tissue measuring 1.5 x 1.2 x 0.5 cm in aggregate.\n\nAll are embedded in one block (ax. A1).",
    microscopicFeatures:
      "Sections show small pieces of ileal mucosa. The lamina propria has been infiltrated by many chronic inflammatory cells including plasma cells, lymphocytes and a few eosinophils.\n\nProminent lymphoid follicles are noted. Villi are normal in architecture.\n\nNo granuloma or malignancy is seen in the sections examined.",
    diagnosis:
      "Tissue from terminal ileum; Colonoscopic biopsy:\n\n- Chronic Ileitis with lymphoid hyperplasia.",
    additionalNote: "Clinicalpathological correlation is recommended.",
    doctorName: "Prof. Dr. Mahmud Parvez",
    doctorQualification: "MBBS, FCPS (Pathology)\nFellowship in GI Pathology (India)",
    doctorDepartment: "Department of Laboratory Medicine",
    doctorHospital: "Bangladesh Specialized Hospital Ltd.",
    reportType: "Histopathology Report",
    date: "2023-09-23",
    deliveryDate: "23/09/2023",
  },
  {
    id: 2,
    invoiceNo: "V2309971234",
    patientId: "H1299380456",
    patientName: "SITA DEVI SHARMA",
    ageGender: "32Y / F",
    refDoctor: "Dr. Rajesh Shah MBBS, MD (Medicine)",
    invoiceDate: "20/07/2025 09:30 AM",
    reportNo: "20250720001",
    reportStatus: "FINALIZED",
    patientStatus: "OPD",
    sample: "BLOOD",
    testName: "Blood Sugar (Fasting)",
    labNo: "BS-2025-0720-001",
    collectionTime: "20/07/2025 08:00 AM",
    resultEntryTime: "20/07/2025 10:15 AM",
    labReportNo: "BS-1045/25",
    clinicalHistory: "Type 2 Diabetes Mellitus. Follow-up for glucose monitoring.",
    specimen: "Fasting venous blood sample.",
    grossFindings: "Clear serum sample received. No hemolysis or lipemia noted.",
    microscopicFeatures:
      "Fasting blood glucose: 180 mg/dL (Normal: 70-100 mg/dL)\nHbA1c: 8.2% (Normal: <5.7%)\n\nElevated levels consistent with uncontrolled diabetes mellitus.",
    diagnosis:
      "Fasting Blood Sugar:\n\n- Elevated fasting glucose (180 mg/dL)\n- HbA1c: 8.2% indicating poor glycemic control\n\nClinical correlation recommended. Adjust medication dosage.",
    additionalNote: "Patient advised to follow diabetic diet and regular exercise.",
    doctorName: "Dr. Rajesh Shah",
    doctorQualification: "MBBS, MD (Medicine)",
    doctorDepartment: "Department of Internal Medicine",
    doctorHospital: "Shah Medical Clinic",
    reportType: "Blood Sugar (Fasting)",
    date: "2025-07-20",
    deliveryDate: "20/07/2025",
  },
  {
    id: 3,
    invoiceNo: "V2309980123",
    patientId: "H1299385678",
    patientName: "KRISHNA PRASAD ADHIKARI",
    ageGender: "58Y / M",
    refDoctor: "Dr. Rajesh Shah MBBS, MD (Medicine)",
    invoiceDate: "19/07/2025 10:00 AM",
    reportNo: "20250719003",
    reportStatus: "FINALIZED",
    patientStatus: "OPD",
    sample: "TISSUE",
    testName: "X-Ray - Lumbar Spine",
    labNo: "XR-2025-0719-003",
    collectionTime: "19/07/2025 09:15 AM",
    resultEntryTime: "19/07/2025 11:30 AM",
    labReportNo: "XR-2234/25",
    clinicalHistory: "Chronic lower back pain radiating to left leg for 6 months.",
    specimen: "Radiograph of lumbar spine (AP and lateral views).",
    grossFindings: "AP and lateral views of lumbar spine obtained. Adequate penetration and positioning.",
    microscopicFeatures:
      "L4-L5 intervertebral disc space narrowing noted.\nOsteophyte formation at vertebral margins.\nMild facet joint hypertrophy at L4-L5 and L5-S1 levels.\n\nNo fracture or lytic lesion identified.",
    diagnosis:
      "X-Ray Lumbar Spine:\n\n- L4-L5 disc space narrowing with osteophyte formation\n- Degenerative changes consistent with lumbar spondylosis\n\nRecommend MRI for further evaluation if symptoms persist.",
    additionalNote: "Physiotherapy sessions recommended. Avoid heavy lifting.",
    doctorName: "Dr. Rajesh Shah",
    doctorQualification: "MBBS, MD (Medicine)",
    doctorDepartment: "Department of Internal Medicine",
    doctorHospital: "Shah Medical Clinic",
    reportType: "X-Ray - Lumbar Spine",
    date: "2025-07-19",
    deliveryDate: "19/07/2025",
  },
  {
    id: 4,
    invoiceNo: "V2309991234",
    patientId: "H1299390123",
    patientName: "MAYA POUDEL",
    ageGender: "38Y / F",
    refDoctor: "Dr. Rajesh Shah MBBS, MD (Medicine)",
    invoiceDate: "18/07/2025 11:00 AM",
    reportNo: "20250718004",
    reportStatus: "FINALIZED",
    patientStatus: "OPD",
    sample: "BLOOD",
    testName: "Complete Blood Count",
    labNo: "CBC-2025-0718-004",
    collectionTime: "18/07/2025 09:30 AM",
    resultEntryTime: "18/07/2025 01:00 PM",
    labReportNo: "CBC-3456/25",
    clinicalHistory: "Fatigue, pallor. Rule out anemia.",
    specimen: "EDTA blood sample.",
    grossFindings: "Adequate volume of EDTA blood received. No clot noted.",
    microscopicFeatures:
      "Hemoglobin: 11.2 g/dL (Normal: 12-16 g/dL)\nRBC Count: 3.8 million/cumm\nPCV: 33%\nMCV: 86.8 fL\nMCH: 29.5 pg\nMCHC: 33.9 g/dL\nRDW: 14.2%\n\nWBC Count: 7,200/cumm (Normal differential)\nPlatelet Count: 2,50,000/cumm\n\nRBC morphology: Mild hypochromia noted.",
    diagnosis:
      "Complete Blood Count:\n\n- Hemoglobin: 11.2 g/dL (mildly low)\n- Mild hypochromia\n\nDiagnosis: Mild Iron Deficiency Anemia\n\nIron supplementation and dietary advice recommended.",
    additionalNote: "Recheck CBC after 2 months of iron therapy.",
    doctorName: "Dr. Rajesh Shah",
    doctorQualification: "MBBS, MD (Medicine)",
    doctorDepartment: "Department of Internal Medicine",
    doctorHospital: "Shah Medical Clinic",
    reportType: "Complete Blood Count",
    date: "2025-07-18",
    deliveryDate: "18/07/2025",
  },
  {
    id: 5,
    invoiceNo: "V2300005678",
    patientId: "H1299395678",
    patientName: "DEEPAK RAI",
    ageGender: "52Y / M",
    refDoctor: "Dr. Rajesh Shah MBBS, MD (Medicine)",
    invoiceDate: "17/07/2025 02:00 PM",
    reportNo: "20250717005",
    reportStatus: "DRAFT",
    patientStatus: "OPD",
    sample: "BLOOD",
    testName: "Liver Function Test",
    labNo: "LFT-2025-0717-005",
    collectionTime: "17/07/2025 08:30 AM",
    resultEntryTime: "17/07/2025 03:00 PM",
    labReportNo: "LFT-4567/25",
    clinicalHistory: "Epigastric pain, bloating. Rule out hepatic dysfunction.",
    specimen: "Fasting venous blood sample.",
    grossFindings: "Clear serum separated. No lipemia or icterus.",
    microscopicFeatures:
      "SGOT (AST): 45 U/L (Normal: 5-40 U/L) - Slightly elevated\nSGPT (ALT): 52 U/L (Normal: 7-56 U/L) - Within normal\nAlkaline Phosphatase: 95 U/L (Normal: 44-147 U/L)\nTotal Bilirubin: 0.8 mg/dL\nDirect Bilirubin: 0.2 mg/dL\nTotal Protein: 7.0 g/dL\nAlbumin: 4.2 g/dL\nGGT: 38 U/L",
    diagnosis:
      "Liver Function Test:\n\n- SGOT mildly elevated (45 U/L)\n- All other parameters within normal limits\n\nMild hepatic enzyme elevation. Correlate clinically. Follow-up LFT in 2 weeks recommended.",
    additionalNote: "Avoid alcohol. Small frequent meals advised.",
    doctorName: "Dr. Rajesh Shah",
    doctorQualification: "MBBS, MD (Medicine)",
    doctorDepartment: "Department of Internal Medicine",
    doctorHospital: "Shah Medical Clinic",
    reportType: "Liver Function Test",
    date: "2025-07-17",
    deliveryDate: "17/07/2025",
  },
  {
    id: 6,
    invoiceNo: "V2300016789",
    patientId: "H1299400123",
    patientName: "ANITA KARKI",
    ageGender: "55Y / F",
    refDoctor: "Dr. Rajesh Shah MBBS, MD (Medicine)",
    invoiceDate: "16/07/2025 11:30 AM",
    reportNo: "20250716006",
    reportStatus: "FINALIZED",
    patientStatus: "OPD",
    sample: "BLOOD",
    testName: "Thyroid Panel",
    labNo: "THY-2025-0716-006",
    collectionTime: "16/07/2025 08:15 AM",
    resultEntryTime: "16/07/2025 02:00 PM",
    labReportNo: "THY-5678/25",
    clinicalHistory: "Fatigue, weight gain, cold intolerance. Rule out hypothyroidism.",
    specimen: "Fasting venous blood sample.",
    grossFindings: "Clear serum sample. No hemolysis.",
    microscopicFeatures:
      "TSH: 5.8 mIU/L (Normal: 0.4-4.0 mIU/L) - Elevated\nFree T4: 0.9 ng/dL (Normal: 0.8-1.8 ng/dL) - Low normal\nFree T3: 2.8 pg/mL (Normal: 2.3-4.2 pg/mL) - Normal\n\nPattern consistent with subclinical hypothyroidism.",
    diagnosis:
      "Thyroid Panel:\n\n- TSH: 5.8 mIU/L (elevated)\n- Free T4: Low normal\n\nDiagnosis: Subclinical Hypothyroidism\n\nStart Levothyroxine 25mcg daily. Recheck TSH in 6 weeks.",
    additionalNote: "Take medicine on empty stomach, 30 minutes before breakfast.",
    doctorName: "Dr. Rajesh Shah",
    doctorQualification: "MBBS, MD (Medicine)",
    doctorDepartment: "Department of Internal Medicine",
    doctorHospital: "Shah Medical Clinic",
    reportType: "Thyroid Panel",
    date: "2025-07-16",
    deliveryDate: "16/07/2025",
  },
];

const reportTypes = [
  "All Types",
  "Histopathology Report",
  "Blood Sugar (Fasting)",
  "X-Ray - Lumbar Spine",
  "Complete Blood Count",
  "Liver Function Test",
  "Thyroid Panel",
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [viewingReport, setViewingReport] = useState<(ReportData & { reportType: string }) | null>(null);

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All Types" || report.reportType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">View, write, and manage patient lab reports</p>
        </div>
        <button
          onClick={() => setShowWriteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Report
        </button>
      </div>

      {/* Search, Filter & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 transition-all">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by patient name, report type, or invoice no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-3 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            {filterType}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setFilterType(type); setShowFilterDropdown(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    filterType === type ? "text-emerald-600 font-medium bg-emerald-50" : "text-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors ${
              viewMode === "grid" ? "bg-emerald-50 text-emerald-700" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <div className="w-px h-6 bg-gray-200" />
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition-colors ${
              viewMode === "list" ? "bg-emerald-50 text-emerald-700" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Total Reports</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{mockReports.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Finalized</p>
          <p className="text-xl font-bold text-green-600 mt-1">{mockReports.filter((r) => r.reportStatus === "FINALIZED").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">Drafts</p>
          <p className="text-xl font-bold text-orange-500 mt-1">{mockReports.filter((r) => r.reportStatus === "DRAFT").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium">This Month</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">{mockReports.length}</p>
        </div>
      </div>

      {/* GRID VIEW - Uses shared ReportContent */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setViewingReport(report)}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                    <FileText className="w-4.5 h-4.5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{report.reportType}</h3>
                    <p className="text-xs text-gray-400">Invoice: {report.invoiceNo}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    report.reportStatus === "FINALIZED"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {report.reportStatus}
                </span>
              </div>

              {/* Shared Report Content */}
              <div className="px-5 pb-3">
                <ReportContent report={report} />
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {report.date}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setViewingReport(report); }}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Full View
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="hidden md:flex items-center gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="w-10" />
            <div className="flex-1 grid grid-cols-4 gap-2">
              <div>Patient</div>
              <div>Report Type</div>
              <div>Invoice / Lab No</div>
              <div>Date</div>
            </div>
            <div className="w-16 text-center">Status</div>
            <div className="w-32 text-right">Actions</div>
          </div>
          <div>
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
                onClick={() => setViewingReport(report)}
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 truncate">{report.patientName}</p>
                    <p className="text-xs text-gray-400">{report.ageGender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 truncate">{report.reportType}</p>
                    <p className="text-xs text-gray-400">{report.testName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono">{report.invoiceNo}</p>
                    <p className="text-xs text-gray-400">Lab: {report.labReportNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase flex-shrink-0 ${
                    report.reportStatus === "FINALIZED"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {report.reportStatus === "FINALIZED" ? "Final" : "Draft"}
                </span>
                <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setViewingReport(report)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <Printer className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500">No reports found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Full Report Modal (shared ReportContent) */}
      {viewingReport && (
        <ReportPrintView report={viewingReport} onClose={() => setViewingReport(null)} />
      )}

      {/* Create New Report Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-black/50">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl my-4">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Create New Report</h2>
                <p className="text-sm text-gray-500">Fill in all details for the patient report</p>
              </div>
              <button onClick={() => setShowWriteModal(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Section 1: Invoice & Patient Details */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">1</div>
                  <h3 className="text-sm font-semibold text-gray-900">Invoice & Patient Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Invoice No *</label>
                    <input type="text" placeholder="e.g., V2309963594" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Invoice Date & Time *</label>
                    <input type="datetime-local" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Delivery Date</label>
                    <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Patient ID *</label>
                    <input type="text" placeholder="e.g., H1299377182" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Report No *</label>
                    <input type="text" placeholder="e.g., 12309936546" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Report Status *</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400">
                      <option>FINALIZED</option>
                      <option>DRAFT</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Patient Name *</label>
                    <input type="text" placeholder="e.g., MOHAMMED CHOWDHURY" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Age *</label>
                      <input type="text" placeholder="e.g., 52Y" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Gender *</label>
                      <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400">
                        <option value="">Select</option>
                        <option>M</option>
                        <option>F</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Patient Status</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400">
                      <option>OPD</option>
                      <option>IPD</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Ref. Doctor *</label>
                    <input type="text" placeholder="e.g., Prof. Dr. M. S. Arfin MBBS, FCPS (MED)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Section 2: Sample & Lab Info */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">2</div>
                  <h3 className="text-sm font-semibold text-gray-900">Sample & Lab Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Sample Type *</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400">
                      <option value="">Select</option>
                      <option>TISSUE</option>
                      <option>BLOOD</option>
                      <option>URINE</option>
                      <option>CSF</option>
                      <option>BONE MARROW</option>
                      <option>SPUTUM</option>
                      <option>STOOL</option>
                      <option>OTHER</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Report Type *</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400">
                      <option value="">Select Type</option>
                      <option>Histopathology Report</option>
                      <option>Blood Sugar (Fasting)</option>
                      <option>Complete Blood Count</option>
                      <option>Liver Function Test</option>
                      <option>Thyroid Panel</option>
                      <option>X-Ray Report</option>
                      <option>Urine Analysis</option>
                      <option>ECG Report</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Lab No *</label>
                    <input type="text" placeholder="e.g., 1230990063" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Collection Date & Time *</label>
                    <input type="datetime-local" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Result Entry Date & Time</label>
                    <input type="datetime-local" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Section 3: Clinical Information */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">3</div>
                  <h3 className="text-sm font-semibold text-gray-900">Clinical Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Clinical History *</label>
                    <textarea placeholder="e.g., DID - IPSID, Lymphoma." rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Specimen *</label>
                    <textarea placeholder="e.g., Tissue from terminal ileum." rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none" />
                  </div>
                </div>
              </div>

              {/* Section 4: Findings */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-700">4</div>
                  <h3 className="text-sm font-semibold text-gray-900">Examination Findings</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gross Findings *</label>
                    <textarea placeholder="Describe specimen gross examination observations..." rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Microscopic Features *</label>
                    <textarea placeholder="Describe microscopic examination findings in detail..." rows={5} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none" />
                  </div>
                </div>
              </div>

              {/* Section 5: Diagnosis & Notes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-700">5</div>
                  <h3 className="text-sm font-semibold text-gray-900">Diagnosis & Notes</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">DIAGNOSIS *</label>
                    <textarea placeholder="Final diagnosis with details..." rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Additional Notes</label>
                    <textarea placeholder="e.g., Clinicalpathological correlation is recommended." rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 resize-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-200 px-6 py-4 flex items-center gap-3">
              <button onClick={() => setShowWriteModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">Save as Draft</button>
              <button onClick={() => setShowWriteModal(false)} className="flex-1 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm">Submit Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

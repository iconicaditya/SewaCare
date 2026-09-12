"use client";

import Image from "next/image";

export interface ReportData {
  id: number;
  invoiceNo: string;
  patientId: string;
  patientName: string;
  ageGender: string;
  refDoctor: string;
  invoiceDate: string;
  reportNo: string;
  reportStatus: string;
  patientStatus: string;
  sample: string;
  testName: string;
  labNo: string;
  collectionTime: string;
  resultEntryTime: string;
  labReportNo: string;
  clinicalHistory: string;
  specimen: string;
  grossFindings: string;
  microscopicFeatures: string;
  diagnosis: string;
  additionalNote: string;
  doctorName: string;
  doctorQualification: string;
  doctorDepartment: string;
  doctorHospital: string;
  date: string;
  deliveryDate?: string;
}

export default function ReportContent({ report }: { report: ReportData }) {
  return (
    <div className="report-print-content">
      {/* Top: Barcode + Logo */}
      <div className="flex items-start justify-between mb-1">
        {/* Barcode */}
        <div className="flex flex-col gap-0.5 mt-1">
          <div className="flex gap-[1px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="bg-black"
                style={{
                  width: i % 7 === 0 ? "2px" : i % 3 === 0 ? "1px" : "1.5px",
                  height: `${18 + (i % 5) * 2}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* BSH Logo */}
        <div className="flex-shrink-0">
          <Image
            src="https://www.bsh.com.bd/images/logo.png"
            alt="BSH Bangladesh Specialized Hospital"
            width={130}
            height={52}
            className="object-contain"
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent && !parent.querySelector(".fallback-logo")) {
                const fallback = document.createElement("div");
                fallback.className = "text-right fallback-logo";
                fallback.innerHTML =
                  '<div style="font-size:26px;font-weight:900;color:#0d6e5e;letter-spacing:3px;line-height:1">BSH</div>' +
                  '<div style="font-size:6.5px;color:#444;letter-spacing:0.5px;font-weight:600;margin-top:2px">BANGLADESH SPECIALIZED</div>' +
                  '<div style="font-size:6.5px;color:#444;letter-spacing:0.5px;font-weight:600">HOSPITAL</div>';
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-3 mt-0">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-[3px]">
          Histopathology Report
        </h2>
      </div>

      {/* Single Combined Info Table */}
      <div className="border border-black mb-3 text-[10px] leading-tight">
        <div className="grid grid-cols-2 gap-x-6 px-2 py-1.5">
          <div>
            <span className="font-bold text-gray-700">Invoice No</span> : {report.invoiceNo}
          </div>
          <div>
            <span className="font-bold text-gray-700">Invoice Date</span> : {report.invoiceDate}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 px-2 py-1.5">
          <div>
            <span className="font-bold text-gray-700">Delivery Date</span> : {report.deliveryDate || report.date}
          </div>
          <div>
            <span className="font-bold text-gray-700">Patient ID</span> : {report.patientId}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 px-2 py-1.5">
          <div>
            <span className="font-bold text-gray-700">Report No</span> : {report.reportNo}
          </div>
          <div>
            <span className="font-bold text-gray-700">Report Status</span> : <span className="font-bold text-green-700 uppercase">{report.reportStatus}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 px-2 py-1.5">
          <div>
            <span className="font-bold text-gray-700">Patient Name</span> : {report.patientName}
          </div>
          <div>
            <span className="font-bold text-gray-700">Age / Gender</span> : {report.ageGender}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 px-2 py-1.5">
          <div>
            <span className="font-bold text-gray-700">Patient Status</span> : {report.patientStatus}
          </div>
          <div>
            <span className="font-bold text-gray-700">Ref. Doctor</span> : {report.refDoctor}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 px-2 py-1.5">
          <div>
            <span className="font-bold text-gray-700">Sample</span> : {report.sample}
          </div>
          <div>
            <span className="font-bold text-gray-700">Lab No</span> : {report.labNo}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 px-2 py-1.5">
          <div>
            <span className="font-bold text-gray-700">Collection Time</span> : {report.collectionTime}
          </div>
          <div>
            <span className="font-bold text-gray-700">Result Entry Time</span> : {report.resultEntryTime}
          </div>
        </div>
      </div>

      {/* Lab No */}
      <p className="text-[11px] font-bold text-gray-900 mb-2">Lab No: {report.labReportNo}</p>

      {/* Thank you */}
      <p className="text-[10px] italic text-gray-500 text-center mb-4">Thank you very much for this kind referral</p>

      {/* Clinical History */}
      <div className="mb-1 text-[11px]">
        <span className="font-bold text-gray-900">Clinical history : </span>
        <span className="text-gray-800">{report.clinicalHistory}</span>
      </div>
      <div className="mb-4 text-[11px]">
        <span className="font-bold text-gray-900">Specimen : </span>
        <span className="text-gray-800">{report.specimen}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-4" />

      {/* Gross Findings */}
      <div className="mb-3">
        <h3 className="text-[11px] font-bold text-gray-900 mb-1">Gross Findings:</h3>
        <p className="text-[11px] text-gray-800 leading-relaxed whitespace-pre-line">{report.grossFindings}</p>
      </div>

      {/* Microscopic Features */}
      <div className="mb-3">
        <h3 className="text-[11px] font-bold text-gray-900 mb-1">Microscopic Features:</h3>
        <p className="text-[11px] text-gray-800 leading-relaxed whitespace-pre-line">{report.microscopicFeatures}</p>
      </div>

      {/* Diagnosis */}
      <div className="mb-3">
        <h3 className="text-[11px] font-bold text-gray-900 mb-1">DIAGNOSIS:</h3>
        <p className="text-[11px] text-gray-800 leading-relaxed whitespace-pre-line">{report.diagnosis}</p>
      </div>

      {/* Additional Note */}
      {report.additionalNote && (
        <p className="text-[10px] italic text-gray-500 mb-4">{report.additionalNote}</p>
      )}

      {/* Doctor Signature */}
      <div className="flex justify-end mt-4 mb-4">
        <div className="text-right">
          <div className="w-36 h-[1px] bg-gray-500 ml-auto mb-2" />
          <p className="text-[11px] font-bold text-gray-900">{report.doctorName}</p>
          <p className="text-[9px] text-gray-600 whitespace-pre-line">{report.doctorQualification}</p>
          <p className="text-[9px] text-gray-600">{report.doctorDepartment}</p>
          <p className="text-[9px] text-gray-600">{report.doctorHospital}</p>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="flex justify-between items-center text-[8px] text-gray-400 border-t border-gray-200 pt-2 mb-2">
        <span>Printed by: MAMS001</span>
        <span>Page 1 of 1</span>
        <span>Software by: Mylab Limited</span>
      </div>

      {/* Hospital Footer Bar */}
      <div className="bg-[#0d6e5e] text-white text-center py-2 rounded-sm">
        <p className="text-[10px] font-bold tracking-[2px] uppercase">
          {report.doctorHospital || "BANGLADESH SPECIALIZED HOSPITAL LTD."}
        </p>
      </div>
    </div>
  );
}

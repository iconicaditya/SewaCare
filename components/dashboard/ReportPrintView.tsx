"use client";

import { X, Printer, Download } from "lucide-react";
import ReportContent, { ReportData } from "./ReportContent";

interface ReportPrintViewProps {
  report: ReportData;
  onClose: () => void;
}

export default function ReportPrintView({ report, onClose }: ReportPrintViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60">
      {/* Action Bar (hidden on print) */}
      <div className="no-print sticky top-0 z-10 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[850px] mx-auto flex items-center justify-between px-6 py-3">
          <p className="text-sm font-medium text-gray-600">Report Preview</p>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              <Download className="w-4 h-4" /> PDF
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors ml-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[850px] mx-auto bg-white p-8 md:p-12 pb-6 my-4 shadow-2xl print:shadow-none print:my-0 print:p-6 print:max-w-none">
          <ReportContent report={report} />
        </div>
      </div>
    </div>
  );
}

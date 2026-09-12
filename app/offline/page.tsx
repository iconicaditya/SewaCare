"use client";

import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700/50">
              <WifiOff className="w-12 h-12 text-cyan-500" />
            </div>
            <div className="absolute -inset-1 rounded-full bg-cyan-500/10 blur-xl" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {"You're Offline"}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            {"It looks like you've lost your internet connection."}
            <br />
            Please check your network and try again.
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>

        {/* Status Info */}
        <div className="pt-4 border-t border-slate-800/50">
          <p className="text-xs text-slate-500">
            SewaCare &mdash; Hospital Management System
          </p>
        </div>
      </div>
    </div>
  );
}

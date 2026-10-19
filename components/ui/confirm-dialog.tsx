"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "warning";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  variant = "danger",
}: ConfirmDialogProps) {
  const confirmStyles =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-amber-600 text-white hover:bg-amber-700";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
            variant === "danger" ? "bg-red-100" : "bg-amber-100"
          }`}
        >
          <AlertTriangle
            className={`h-6 w-6 ${
              variant === "danger" ? "text-red-600" : "text-amber-600"
            }`}
          />
        </div>

        <p className="text-sm text-gray-500">{message}</p>

        <div className="mt-6 flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium ${confirmStyles}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

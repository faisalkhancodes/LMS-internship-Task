import React from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function NotificationToast() {
  const { toasts, dismissToast } = useLearning();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        return (
          <div key={toast.id} className={`toast-card toast-${toast.type || "info"}`}>
            <div className="toast-icon">
              {isSuccess ? (
                <CheckCircle2 size={18} />
              ) : isWarning ? (
                <AlertTriangle size={18} />
              ) : (
                <Info size={18} />
              )}
            </div>
            <div className="toast-content">
              <strong>{toast.title}</strong>
              <p>{toast.message}</p>
            </div>
            <button
              className="toast-close"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════
   SnitchToast — Global Top-Right Notification System
   Usage:
     const { toasts, showToast } = useToast();
     showToast("success", "Email sent!")
     showToast("error", "Something went wrong")
     <ToastContainer toasts={toasts} onRemove={removeToast} />
══════════════════════════════════════════════════════ */

const DURATION = 4000; // ms before auto-dismiss

/* ── Single Toast Card ── */
export const ToastCard = ({ toast, onRemove }) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef(null);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => onRemove(toast.id), 350);
  };

  // Mount: slide in
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    timerRef.current = setTimeout(dismiss, DURATION);
    return () => clearTimeout(timerRef.current);
  }, []);

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";
  const isInfo = toast.type === "info";

  const config = isSuccess
    ? {
        bg: "bg-[#0f1f14] border-emerald-500/30",
        iconBg: "bg-emerald-500/15",
        iconColor: "text-emerald-400",
        bar: "bg-emerald-500",
        titleColor: "text-emerald-300",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ),
        label: "Success",
      }
    : isError
    ? {
        bg: "bg-[#1f0f0f] border-red-500/30",
        iconBg: "bg-red-500/15",
        iconColor: "text-red-400",
        bar: "bg-red-500",
        titleColor: "text-red-300",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
        label: "Error",
      }
    : {
        bg: "bg-[#111820] border-blue-500/30",
        iconBg: "bg-blue-500/15",
        iconColor: "text-blue-400",
        bar: "bg-blue-500",
        titleColor: "text-blue-300",
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        ),
        label: "Info",
      };

  return (
    <div
      style={{
        transition: "all 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: visible && !leaving ? "translateX(0) scale(1)" : "translateX(110%) scale(0.95)",
        opacity: visible && !leaving ? 1 : 0,
      }}
      className={`
        relative w-[340px] max-w-[calc(100vw-2rem)]
        rounded-xl border backdrop-blur-sm shadow-2xl shadow-black/60
        overflow-hidden pointer-events-auto
        ${config.bg}
      `}
    >
      {/* Top auto-dismiss progress bar */}
      <div
        className={`absolute top-0 left-0 h-[2px] ${config.bar} opacity-60`}
        style={{
          animation: `shrink ${DURATION}ms linear forwards`,
        }}
      />

      <div className="flex items-start gap-3.5 p-4 pr-3">
        {/* Icon */}
        <div className={`shrink-0 w-8 h-8 rounded-lg ${config.iconBg} ${config.iconColor} flex items-center justify-center mt-0.5`}>
          {config.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={`text-[11px] font-bold uppercase tracking-[0.18em] mb-0.5 ${config.titleColor}`}>
            {config.label}
          </p>
          <p className="text-sm text-[#F5F5F0] leading-snug">
            {toast.message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-zinc-600 hover:text-white hover:bg-zinc-800 transition-colors duration-150 mt-0.5"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Inline style for the shrink animation */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
};

/* ── Container: fixed top-right stack ── */
export const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;
  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
};

/* ── Hook ── */
let _id = 0;
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const id = ++_id;
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
};

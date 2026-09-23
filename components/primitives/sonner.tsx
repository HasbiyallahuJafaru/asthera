"use client";

import {
  CheckCircle,
  CircleNotch,
  Info,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Sonner toasts, from the shadcn registry, reskinned. The site is light only,
 * so the theme hop through next-themes is gone: the surface, text, border and
 * radius all read from the ASTHERA tokens, and the status icons carry their
 * brand colour directly.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CheckCircle size={16} weight="fill" className="text-accent" />,
        info: <Info size={16} weight="fill" className="text-navy" />,
        warning: <WarningCircle size={16} weight="fill" className="text-gold-deep" />,
        error: <XCircle size={16} weight="fill" className="text-danger" />,
        loading: <CircleNotch size={16} weight="bold" className="animate-spin text-text-dim" />,
      }}
      style={
        {
          "--normal-bg": "var(--page)",
          "--normal-text": "var(--text)",
          "--normal-border": "var(--line)",
          "--border-radius": "14px",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          boxShadow: "0 12px 36px rgba(13, 36, 64, 0.16)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

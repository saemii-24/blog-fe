"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      expand={false}
      richColors={false}
      closeButton={false}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-2xl border border-stone-200 bg-white/95 text-stone-900 shadow-[0_12px_40px_rgba(28,25,23,0.08)] backdrop-blur-md px-4 py-3",
          title:
            "font-serif text-[15px] leading-snug tracking-tight text-stone-900",
          description: "text-sm leading-relaxed text-stone-500 mt-1",
          actionButton:
            "bg-stone-900 text-stone-50 hover:bg-stone-800 rounded-full px-4 py-2 text-xs font-medium transition-colors",
          cancelButton:
            "bg-stone-100 text-stone-700 hover:bg-stone-200 rounded-full px-4 py-2 text-xs font-medium transition-colors",
          success: "border-emerald-200/80 bg-emerald-50/80 text-emerald-900",
          error: "border-rose-200/80 bg-rose-50/80 text-rose-900",
          warning: "border-amber-200/80 bg-amber-50/80 text-amber-900",
          info: "border-sky-200/80 bg-sky-50/80 text-sky-900",
        },
      }}
      style={
        {
          "--normal-bg": "rgba(255,255,255,0.95)",
          "--normal-text": "#1c1917",
          "--normal-border": "#e7e5e4",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };

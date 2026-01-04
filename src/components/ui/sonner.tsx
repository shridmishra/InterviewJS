"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-nunito"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#3c3c3c] group-[.toaster]:border-2 group-[.toaster]:border-[#e5e5e5] group-[.toaster]:shadow-[0_4px_0_#e5e5e5] group-[.toaster]:rounded-xl font-bold dark:group-[.toaster]:bg-[#1a2c35] dark:group-[.toaster]:text-white dark:group-[.toaster]:border-[#37464f] dark:group-[.toaster]:shadow-[0_4px_0_#37464f]",
          description: "group-[.toast]:text-[#777777] dark:group-[.toast]:text-[#afafaf] font-medium",
          actionButton:
            "group-[.toast]:bg-[#1cb0f6] group-[.toast]:text-white group-[.toast]:font-bold group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-[#e5e5e5] group-[.toast]:text-[#3c3c3c] group-[.toast]:font-bold group-[.toast]:rounded-lg",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-5 text-[#58cc02]" />,
        info: <InfoIcon className="size-5 text-[#1cb0f6]" />,
        warning: <TriangleAlertIcon className="size-5 text-[#ff9600]" />,
        error: <OctagonXIcon className="size-5 text-[#ff4b4b]" />,
        loading: <Loader2Icon className="size-5 animate-spin text-[#afafaf]" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

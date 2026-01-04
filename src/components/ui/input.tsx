import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-[#e5e5e5] bg-white px-4 py-3 text-base font-medium text-[#3c3c3c] placeholder:text-[#afafaf] transition-all duration-200 outline-none",
        "focus:border-[#1cb0f6] focus:ring-4 focus:ring-[#1cb0f6]/20",
        "hover:border-[#afafaf]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f7f7f7]",
        "aria-invalid:border-[#ff4b4b] aria-invalid:ring-[#ff4b4b]/20",
        "dark:bg-[#1a2c35] dark:border-[#37464f] dark:text-white dark:placeholder:text-[#777777] dark:hover:border-[#4a5b65] dark:focus:border-[#1cb0f6]",
        className
      )}
      {...props}
    />
  )
}

export { Input }

"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-6 shrink-0 rounded-lg border-2 border-[#e5e5e5] bg-white shadow-[0_2px_0_#e5e5e5] transition-all duration-200 outline-none",
        "hover:border-[#afafaf]",
        "focus-visible:ring-4 focus-visible:ring-[#1cb0f6]/20",
        "data-[state=checked]:bg-[#58cc02] data-[state=checked]:border-[#58cc02] data-[state=checked]:shadow-[0_2px_0_#58a700] data-[state=checked]:text-white",
        "dark:bg-[#1a2c35] dark:border-[#37464f] dark:shadow-[0_2px_0_#131f24]",
        "dark:data-[state=checked]:bg-[#58cc02] dark:data-[state=checked]:border-[#58cc02] dark:data-[state=checked]:shadow-[0_2px_0_#58a700]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-[#ff4b4b] aria-invalid:ring-[#ff4b4b]/20",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-4 stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

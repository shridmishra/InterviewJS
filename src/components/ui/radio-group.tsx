"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-4", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-6 shrink-0 rounded-full border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] text-white outline-none transition-all duration-200",
        "hover:border-[#afafaf]",
        "focus-visible:ring-4 focus-visible:ring-[#1cb0f6]/20",
        "data-[state=checked]:bg-[#1cb0f6] data-[state=checked]:border-[#1cb0f6] data-[state=checked]:shadow-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-[#37464f] dark:shadow-[0_2px_0_#131f24] dark:data-[state=checked]:bg-[#1cb0f6] dark:data-[state=checked]:border-[#1cb0f6]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-white size-2.5" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

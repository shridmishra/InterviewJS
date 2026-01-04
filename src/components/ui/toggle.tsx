"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-[color,box-shadow,transform] hover:bg-[#e5e5e5] dark:hover:bg-[#37464f] hover:text-[#3c3c3c] dark:hover:text-white disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[#58cc02] data-[state=on]:text-white dark:data-[state=on]:bg-[#58cc02] dark:data-[state=on]:text-white [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-[#1cb0f6] focus-visible:ring-[#1cb0f6]/50 focus-visible:ring-[3px] outline-none active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border-2 border-[#e5e5e5] dark:border-[#37464f] bg-transparent shadow-[0_2px_0_#e5e5e5] dark:shadow-[0_2px_0_#37464f] hover:bg-[#e5e5e5] dark:hover:bg-[#37464f]",
      },
      size: {
        default: "h-11 px-4 min-w-11",
        sm: "h-9 px-2.5 min-w-9 text-xs",
        lg: "h-12 px-6 min-w-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

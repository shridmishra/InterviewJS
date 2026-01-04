import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        // Default Duolingo green
        default:
          "bg-[#58cc02] text-white shadow-[0_4px_0_#58a700] hover:shadow-[0_6px_0_#58a700] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#58a700]",
        // Duolingo blue
        blue:
          "bg-[#1cb0f6] text-white shadow-[0_4px_0_#1899d6] hover:shadow-[0_6px_0_#1899d6] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#1899d6]",
        // Duolingo orange/streak
        orange:
          "bg-[#ff9600] text-white shadow-[0_4px_0_#cd7900] hover:shadow-[0_6px_0_#cd7900] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#cd7900]",
        // Duolingo purple/premium
        purple:
          "bg-[#ce82ff] text-white shadow-[0_4px_0_#9b4dca] hover:shadow-[0_6px_0_#9b4dca] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#9b4dca]",
        // Duolingo red/destructive
        destructive:
          "bg-[#ff4b4b] text-white shadow-[0_4px_0_#ea2b2b] hover:shadow-[0_6px_0_#ea2b2b] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#ea2b2b]",
        // Outline style
        outline:
          "border-2 border-[#e5e5e5] bg-white text-[#3c3c3c] shadow-[0_4px_0_#e5e5e5] hover:shadow-[0_6px_0_#e5e5e5] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#e5e5e5] dark:bg-transparent dark:text-white dark:border-[#4a5b65]",
        // Secondary/muted
        secondary:
          "bg-[#e5e5e5] text-[#3c3c3c] shadow-[0_4px_0_#afafaf] hover:shadow-[0_6px_0_#afafaf] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#afafaf] dark:bg-[#37464f] dark:text-white",
        // Ghost (no 3D effect)
        ghost:
          "hover:bg-[#e5e5e5] hover:text-[#3c3c3c] dark:hover:bg-[#37464f] dark:hover:text-white",
        // Link style
        link: "text-[#1cb0f6] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-14 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

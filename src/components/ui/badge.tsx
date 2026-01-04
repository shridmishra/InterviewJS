import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 px-3 py-1 text-xs font-bold whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden",
  {
    variants: {
      variant: {
        // Success/Easy - Duolingo Green
        default:
          "border-[#58cc02] bg-[#58cc02]/10 text-[#58cc02] dark:bg-[#58cc02]/20",
        // Warning/Medium - Duolingo Orange
        secondary:
          "border-[#ff9600] bg-[#ff9600]/10 text-[#ff9600] dark:bg-[#ff9600]/20",
        // Error/Hard - Duolingo Red
        destructive:
          "border-[#ff4b4b] bg-[#ff4b4b]/10 text-[#ff4b4b] dark:bg-[#ff4b4b]/20",
        // Completed - Duolingo Blue
        completed:
          "border-[#1cb0f6] bg-[#1cb0f6]/10 text-[#1cb0f6] dark:bg-[#1cb0f6]/20",
        // XP Badge - Duolingo Gold
        xp:
          "border-[#ffc800] bg-[#ffc800]/10 text-[#cd9e00] dark:text-[#ffc800] dark:bg-[#ffc800]/20",
        // Streak Badge - Duolingo Orange (solid)
        streak:
          "border-transparent bg-[#ff9600] text-white",
        // Gem Badge - Duolingo Blue (solid)
        gem:
          "border-transparent bg-[#1cb0f6] text-white",
        // Heart Badge - Duolingo Red (solid)
        heart:
          "border-transparent bg-[#ff4b4b] text-white",
        // Crown Badge - Duolingo Gold (solid)
        crown:
          "border-transparent bg-[#ffc800] text-[#3c3c3c]",
        // Outline
        outline:
          "border-[#e5e5e5] text-foreground dark:border-[#4a5b65]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
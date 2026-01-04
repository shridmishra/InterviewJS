import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border-2 px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-5 [&>svg]:translate-y-[-2px] [&>svg]:text-current shadow-[0_4px_0_rgba(0,0,0,0.1)]",
  {
    variants: {
      variant: {
        default: "bg-white text-[#3c3c3c] border-[#e5e5e5] dark:bg-[#1a2c35] dark:text-white dark:border-[#37464f]",
        destructive:
          "border-[#ff4b4b] bg-[#ff4b4b]/10 text-[#ff4b4b] dark:bg-[#ff4b4b]/20 [&>svg]:text-[#ff4b4b]",
        success:
          "border-[#58cc02] bg-[#58cc02]/10 text-[#58cc02] dark:bg-[#58cc02]/20 [&>svg]:text-[#58cc02]",
        warning:
          "border-[#ff9600] bg-[#ff9600]/10 text-[#ff9600] dark:bg-[#ff9600]/20 [&>svg]:text-[#ff9600]",
        info:
          "border-[#1cb0f6] bg-[#1cb0f6]/10 text-[#1cb0f6] dark:bg-[#1cb0f6]/20 [&>svg]:text-[#1cb0f6]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-bold tracking-tight text-base",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed font-medium opacity-90",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

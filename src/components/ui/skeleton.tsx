import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#e5e5e5] dark:bg-[#37464f] animate-pulse rounded-xl", className)}
      {...props}
    />
  )
}

export { Skeleton }

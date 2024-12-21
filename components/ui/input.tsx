import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
    return (

        <input
        type={type}
        className={cn(
            "flex h-8 w-full bg-transparent transition-colors focus:outline-none focus:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        ref={ref}
        {...props}
        />
    )
    }
    )
Input.displayName = "Input"

export { Input }

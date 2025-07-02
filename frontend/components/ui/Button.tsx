import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "py-2 px-4 rounded-md text-white bg-black font-semibold cursor-pointer hover:bg-neutral-800",
        className
      )}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;

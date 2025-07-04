import React, { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface Input extends React.ComponentProps<"input"> {
  label?: string;
  Icon?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, Input>(
  ({ className, Icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-start font-semibold font-poppins">
          {props.label}
        </label>
        <div className="group flex items-center border border-gray-500 px-2 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500 transition-all">
          {Icon}
          <input
            {...props}
            ref={ref}
            className={cn(
              "p-2 w-full focus:outline-none rounded-lg ",
              className
            )}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

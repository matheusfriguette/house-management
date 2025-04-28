"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

const toggleClasseNames =
  "inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-full border-2 bg-transparent px-4 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-gray-200 hover:text-gray-900 focus-visible:border-gray-950 focus-visible:ring-[3px] focus-visible:ring-gray-950/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 data-[state=on]:bg-blue-500 data-[state=on]:border-blue-500  data-[state=on]:text-white dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:border-gray-300 dark:focus-visible:ring-gray-300/50 dark:aria-invalid:border-red-900 dark:aria-invalid:ring-red-900/20 dark:data-[state=on]:bg-gray-800 dark:data-[state=on]:text-gray-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={toggleClasseNames}
      {...props}
    />
  );
}

export { Toggle, toggleClasseNames };

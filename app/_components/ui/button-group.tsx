import clsx from "clsx";

import { Button, ButtonProps } from "@/components/ui/button";

export function ButtonGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "isolate inline-flex divide-x divide-zinc-950/10 rounded-lg border border-zinc-950/10 shadow-sm dark:divide-white/15 dark:border-white/15",
        className,
      )}
    ></div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ButtonGroupItem({ className, color, outline, ...props }: ButtonProps) {
  return (
    <Button {...props} plain className={clsx("rounded-none first:rounded-l-md last:rounded-r-md", className)}></Button>
  );
}

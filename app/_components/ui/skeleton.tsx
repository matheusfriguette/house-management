import clsx from "clsx";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={clsx("bg-zinc-300 dark:bg-zinc-700 animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };


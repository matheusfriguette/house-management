/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";

export function Avatar({
  src,
  square = false,
  initials,
  alt = "",
  className,
  ...props
}: {
  src?: string;
  square?: boolean;
  initials?: string;
  alt?: string;
} & React.ComponentProps<"div">) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        "inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1",
        "outline -outline-offset-1 outline-black/10 dark:outline-white/10",
        square ? "rounded-(--avatar-radius) *:rounded-(--avatar-radius)" : "rounded-full *:rounded-full",
      )}
    >
      {initials && (
        <svg
          className="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : "true"}
        >
          {alt && <title>{alt}</title>}
          <text x="50%" y="50%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" dy=".125em">
            {initials}
          </text>
        </svg>
      )}
      {src && <img className="size-full aspect-square object-cover" src={src} alt={alt} />}
    </span>
  );
}

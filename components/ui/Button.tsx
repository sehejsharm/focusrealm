import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-all duration-500 ease-out-expo will-change-transform";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-13 px-7 text-[0.98rem]",
};

/**
 * Primary is the product's gold on the product's deepest teal — 8.9:1, and
 * the only gold surface on the page, so the CTA is never ambiguous.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-[#0e2322] shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-gold)_70%,transparent),0_14px_40px_-14px_color-mix(in_oklab,var(--color-gold)_65%,transparent)] hover:bg-[#e7cd7c] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-gold)_90%,transparent),0_18px_54px_-12px_color-mix(in_oklab,var(--color-gold)_80%,transparent)] hover:-translate-y-0.5",
  outline:
    "border border-line-strong bg-white/[0.03] text-paper backdrop-blur-md hover:border-brand-bright/70 hover:bg-brand/12 hover:-translate-y-0.5",
  ghost: "text-muted hover:text-white",
};

type ButtonContentProps = { children: ReactNode; variant: Variant };

function Inner({ children, variant }: ButtonContentProps) {
  return (
    <>
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/55 to-transparent transition-transform duration-[900ms] ease-out-expo group-hover:translate-x-full"
        />
      ) : null}
      <span className="relative flex items-center gap-2">{children}</span>
    </>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href">) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        <Inner variant={variant}>{children}</Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: { variant?: Variant; size?: Size } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}

export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`${className} transition-transform duration-500 ease-out-expo group-hover:translate-x-1`}
      aria-hidden
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

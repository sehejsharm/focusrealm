import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/**
 * Phone shell for the staff interface. The screenshot is 812×1364, so the
 * aperture holds a 9:19.5-ish ratio without cropping the product chrome.
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 78vw, 300px",
  glow = true,
  /**
   * Fraction of the screenshot to clip off the top. The staff captures carry
   * their own app header; clipping it lets the device frame supply the chrome
   * instead of stacking two headers on top of each other.
   */
  cropTop = 0.092,
  children,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  glow?: boolean;
  cropTop?: number;
  children?: ReactNode;
}) {
  const aspect = `${src.width} / ${src.height * (1 - cropTop)}`;

  return (
    <div className={`relative ${className}`}>
      {glow ? (
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 rounded-[60px] bg-brand/22 blur-[70px]"
        />
      ) : null}

      <div className="relative rounded-[2.6rem] border border-white/12 bg-linear-to-b from-white/16 via-white/5 to-white/10 p-[3px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]">
        <div className="relative overflow-hidden rounded-[2.45rem] bg-ink ring-1 ring-black/60">
          {/* Status bar stands in for the clipped app header */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-2.5 pb-1.5">
            <span className="font-mono text-[0.5rem] tracking-[0.08em] text-white/55">09:41</span>
            <span className="h-4 w-16 rounded-full bg-black/80" />
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
              <span className="h-2 w-3.5 rounded-[2px] border border-white/40" />
            </span>
          </div>

          <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
            <Image
              src={src}
              alt={alt}
              priority={priority}
              placeholder="blur"
              sizes={sizes}
              className="screen-tint absolute inset-x-0 top-0 block h-auto w-full"
              style={{ transform: `translateY(-${cropTop * 100}%)` }}
            />
          </div>

          {/* Screen glass */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/6 to-transparent"
          />
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Browser shell for the manager and author interfaces — desktop-primary and
 * desktop-only respectively, so they get a real chrome bar with the route.
 */
export function BrowserFrame({
  src,
  alt,
  route,
  priority = false,
  className = "",
  sizes = "(max-width: 1024px) 92vw, 760px",
  glow = true,
}: {
  src: StaticImageData;
  alt: string;
  route: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {glow ? (
        <div aria-hidden className="absolute -inset-12 -z-10 rounded-[48px] bg-brand/18 blur-[80px]" />
      ) : null}

      <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-linear-to-b from-white/12 to-white/[0.04] p-[3px] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]">
        <div className="overflow-hidden rounded-[0.85rem] bg-ink ring-1 ring-black/50">
          <div className="flex items-center gap-3 border-b border-white/8 bg-black/50 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/18" />
              <span className="size-2.5 rounded-full bg-white/18" />
              <span className="size-2.5 rounded-full bg-white/18" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/8 bg-white/[0.04] px-3 py-1">
              <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-brand-cyan" fill="none" aria-hidden>
                <rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
                <path d="M4.2 5V3.6a1.8 1.8 0 0 1 3.6 0V5" stroke="currentColor" strokeWidth="1.1" />
              </svg>
              <span className="truncate font-mono text-[0.62rem] tracking-[0.04em] text-faint">{route}</span>
            </div>
          </div>
          <Image
            src={src}
            alt={alt}
            priority={priority}
            placeholder="blur"
            sizes={sizes}
            className="screen-tint block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

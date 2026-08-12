"use client";

import { useEffect, useRef, useState } from "react";

import Aurora from "@/components/fx/Aurora";
import Reveal from "@/components/fx/Reveal";
import { useInView } from "@/components/fx/useInView";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrame";
import { Container, Eyebrow } from "@/components/ui/Section";
import { roles } from "@/lib/content";

const routeFor = { staff: "/staff/today", manager: "/manager/overview", author: "/author/create" } as const;

export default function RoleShowcase({
  withHeading = true,
  /**
   * When the section renders its own <h2>, the role headline sits below it as
   * an <h3>. Without that <h2> (as on /platform, where the page <h1> is the
   * nearest ancestor heading) the role headline has to be the <h2> or the
   * document skips a level.
   */
  headingLevel = withHeading ? 3 : 2,
}: {
  withHeading?: boolean;
  headingLevel?: 2 | 3;
}) {
  const RoleHeading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";
  const CapabilityHeading = (headingLevel === 2 ? "h3" : "h4") as "h3" | "h4";
  const [roleIndex, setRoleIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25, once: false });
  const role = roles[roleIndex];
  const total = role.screens.length;
  const interacted = useRef(false);

  // Auto-advance the screen rail while the section is on screen and idle.
  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => setScreenIndex((i) => (i + 1) % total), 4200);
    return () => clearInterval(id);
  }, [inView, paused, total]);

  function selectRole(index: number) {
    interacted.current = true;
    setRoleIndex(index);
    setScreenIndex(0);
  }

  return (
    <section id="platform" className="relative overflow-hidden py-24 sm:py-32">
      <Aurora variant="section" />

      <Container>
        {withHeading ? (
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Three role interfaces</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] font-semibold text-white">
                Three people. Three jobs.
                <span className="text-gradient"> Three interfaces built for them.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-muted sm:text-[1.08rem]">
                Not one responsive compromise. A room attendant on a 340px screen, a manager on a desk, and an
                author writing the standard have nothing in common except the record they share.
              </p>
            </Reveal>
          </div>
        ) : null}

        {/* Role switch */}
        <Reveal delay={200} className={withHeading ? "mt-12" : ""}>
          <div
            role="tablist"
            aria-label="Role interfaces"
            className="grid w-full grid-cols-3 gap-1 rounded-2xl border border-line bg-white/[0.03] p-1.5 backdrop-blur-md"
          >
            {roles.map((entry, index) => {
              const active = index === roleIndex;
              return (
                <button
                  key={entry.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`role-panel-${entry.id}`}
                  id={`role-tab-${entry.id}`}
                  type="button"
                  onClick={() => selectRole(index)}
                  className={`relative rounded-xl px-3 py-3.5 text-left transition-colors duration-500 sm:px-5 ${
                    active ? "text-white" : "text-muted hover:text-paper"
                  }`}
                >
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl border border-brand-bright/35 bg-brand/16 shadow-[0_0_40px_-12px_color-mix(in_oklab,var(--color-brand)_80%,transparent)]"
                    />
                  ) : null}
                  <span className="relative flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[0.58rem] tracking-[0.16em] uppercase opacity-70">
                        0{index + 1}
                      </span>
                      <span className="text-[0.95rem] font-medium tracking-[-0.01em]">{entry.name}</span>
                    </span>
                    <span className="hidden text-[0.7rem] leading-tight text-faint sm:block">
                      {entry.device === "phone" ? "Mobile-first" : entry.id === "manager" ? "Desktop-primary" : "Desktop-only"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <div
          ref={ref}
          id={`role-panel-${role.id}`}
          role="tabpanel"
          aria-labelledby={`role-tab-${role.id}`}
          className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Copy */}
          <div key={role.id} style={{ animation: "rise-in 0.75s var(--ease-out-expo) both" }}>
            <p className="font-mono text-[0.62rem] tracking-[0.16em] text-brand-ice uppercase">
              {role.deviceLabel}
            </p>
            <RoleHeading className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.06] font-semibold text-white">
              {role.headline}
              <span className="text-gradient"> {role.headlineAccent}</span>
            </RoleHeading>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">{role.summary}</p>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand/20 font-mono text-[0.68rem] text-brand-ice">
                {role.persona
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.85rem] font-medium text-white">{role.persona}</span>
                <span className="text-[0.74rem] text-faint">{role.personaRole}</span>
              </span>
            </div>

            <ul className="mt-8 space-y-5">
              {role.capabilities.map((capability, index) => (
                <li
                  key={capability.title}
                  className="border-l border-line pl-5"
                  style={{ animation: `rise-in 0.7s var(--ease-out-expo) ${140 + index * 90}ms both` }}
                >
                  <CapabilityHeading className="text-[0.92rem] font-medium text-white">{capability.title}</CapabilityHeading>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-faint">{capability.body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Device stage */}
          <div>
            <div
              className={`relative flex items-center justify-center overflow-hidden rounded-3xl border border-line bg-linear-to-b from-white/[0.045] to-transparent px-6 py-10 sm:px-10 ${
                role.device === "phone" ? "min-h-[560px] sm:min-h-[660px]" : "min-h-[340px] sm:min-h-[460px] lg:min-h-[520px]"
              }`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,color-mix(in_oklab,#94d4c1_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,#94d4c1_7%,transparent)_1px,transparent_1px)] [background-size:44px_44px]"
              />
              <span className="absolute top-4 left-5 z-10 font-mono text-[0.55rem] tracking-[0.16em] text-faint uppercase">
                {role.name} · {role.device === "phone" ? "mobile" : "desktop"}
              </span>
              <span
                aria-hidden
                className="absolute top-4 right-5 z-10 flex items-center gap-1.5 font-mono text-[0.55rem] tracking-[0.14em] text-brand-cyan/70 uppercase"
              >
                <span className="size-1 rounded-full bg-brand-cyan animate-tick" />
                live
              </span>
              {role.screens.map((screen, index) => {
                const active = index === screenIndex;
                return (
                  <div
                    key={screen.title}
                    aria-hidden={!active}
                    className="absolute inset-6 flex items-center justify-center transition-all duration-[900ms] ease-out-expo sm:inset-10"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "scale(1) translateY(0)" : "scale(0.96) translateY(14px)",
                      filter: active ? "none" : "blur(10px)",
                      pointerEvents: active ? "auto" : "none",
                    }}
                  >
                    {role.device === "phone" ? (
                      <PhoneFrame
                        src={screen.src}
                        alt={screen.alt}
                        className="w-[78%] max-w-[290px] min-w-[210px]"
                        sizes="(max-width: 640px) 62vw, 290px"
                      />
                    ) : (
                      <BrowserFrame
                        src={screen.src}
                        alt={screen.alt}
                        route={`focusrealm.app${routeFor[role.id]}`}
                        className="w-full"
                        sizes="(max-width: 1024px) 92vw, 700px"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Screen rail */}
            <div className="mt-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.9rem] font-medium text-white">{role.screens[screenIndex].title}</p>
                <p className="font-mono text-[0.62rem] tracking-[0.12em] text-faint uppercase">
                  {String(screenIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
              </div>
              <p className="mt-1 text-[0.82rem] text-faint">{role.screens[screenIndex].caption}</p>

              {/* The button itself is 44px tall so the tap target is real;
                  the visible indicator is a 4px bar centred inside it. */}
              <div className="-my-3 flex gap-2" role="group" aria-label={`${role.name} screens`}>
                {role.screens.map((screen, index) => (
                  <button
                    key={screen.title}
                    type="button"
                    onClick={() => setScreenIndex(index)}
                    aria-label={`Show ${screen.title}`}
                    aria-current={index === screenIndex}
                    className="group flex h-11 flex-1 items-center"
                  >
                    <span
                      aria-hidden
                      className="relative h-1 w-full overflow-hidden rounded-full bg-white/12 transition-colors group-hover:bg-white/25"
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-brand to-brand-cyan transition-all duration-500"
                        style={{ width: index <= screenIndex ? "100%" : "0%" }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

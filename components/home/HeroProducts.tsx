import Image from "next/image";

import EducationShowcase from "@/components/home/EducationShowcase";
import staffToday from "@/assets/platform/staff-today.jpg";

/**
 * Hero visual: the two products themselves. The education board (a live
 * lesson) sits behind, the real Mise staff app on a phone in front, with a
 * single status chip. Product, not illustration. Decorative.
 */
export default function HeroProducts() {
  return (
    <div aria-hidden className="relative pb-10 select-none sm:pr-6 sm:pb-16">
      <div className="anim-float-slow sm:ml-[24%]">
        <EducationShowcase />
      </div>

      <div className="anim-float-slower absolute bottom-0 left-0 hidden w-[27%] max-w-[190px] sm:block">
        <div className="rounded-[1.7rem] border border-white/15 bg-[#0d1117] p-[5%] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]">
          <div className="relative aspect-[812/1364] overflow-hidden rounded-[1.3rem]">
            <Image src={staffToday} alt="" sizes="210px" priority className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-[6%] hidden items-center gap-3 rounded-xl border border-white/12 bg-[#101b3d]/95 px-4 py-3 text-white shadow-2xl backdrop-blur sm:flex">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#2a5bd7]">
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3.5 8.5l3 3 6-6.5" />
          </svg>
        </span>
        <span>
          <span className="block text-[13px] font-semibold">Room 214 ready</span>
          <span className="block text-[11px] text-white/70">Mise · photo verified</span>
        </span>
      </div>
    </div>
  );
}

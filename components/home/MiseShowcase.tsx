import Image from "next/image";

import { Parallax } from "@/components/fx/Kinetics";
import managerOverview from "@/assets/platform/manager-overview.jpg";
import staffToday from "@/assets/platform/staff-today.jpg";

/**
 * Mise as it actually ships: the manager console on a laptop and the staff
 * app on a phone, from real product screens. A live countdown chip floats
 * between them. Decorative; the copy beside it carries the meaning.
 */
export default function MiseShowcase() {
  return (
    <div aria-hidden className="relative select-none pb-10 sm:pb-16">
      {/* Laptop */}
      <Parallax distance={-30} className="relative ml-auto w-[92%]">
        <div className="rounded-t-[1.1rem] border border-white/10 bg-[#1b2333] p-[1.4%] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]">
          <div className="overflow-hidden rounded-[0.5rem]">
            <Image
              src={managerOverview}
              alt=""
              sizes="(min-width: 1024px) 640px, 92vw"
              className="block h-auto w-full"
              placeholder="blur"
            />
          </div>
        </div>
        <div className="relative mx-[-4%] h-3 rounded-b-[1rem] bg-linear-to-b from-[#c9cdd8] to-[#8d93a3] sm:h-4">
          <span className="absolute top-0 left-1/2 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#7b8191]" />
        </div>
      </Parallax>

      {/* Phone */}
      <Parallax distance={40} className="absolute bottom-0 left-0 w-[34%] max-w-[230px]">
        <div className="rounded-[1.8rem] border border-white/15 bg-[#0d1117] p-[5%] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]">
          <div className="relative aspect-[812/1364] overflow-hidden rounded-[1.35rem]">
            <Image src={staffToday} alt="" sizes="230px" className="h-full w-full object-cover object-top" placeholder="blur" />
          </div>
        </div>
      </Parallax>

      {/* Live countdown chip */}
      <div className="absolute right-[-2%] bottom-[30%] hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl sm:flex">
        <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#e6e9f3" strokeWidth="4" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="#2a5bd7" strokeWidth="4" strokeLinecap="round" pathLength="100" className="anim-countdown" />
        </svg>
        <span>
          <span className="block text-[12px] font-semibold text-paper">Room 208 · reset</span>
          <span className="block text-[11px] text-faint">Timed task · photo required</span>
        </span>
      </div>
    </div>
  );
}

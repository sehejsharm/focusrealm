"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import StaffHeader from "@/components/StaffHeader";
import { BottomNav } from "@/components/ResponsiveNav";
import { getStaff } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { ready, staffId } = useStore();
  const staff = getStaff(staffId);

  useEffect(() => {
    if (ready && !staff) router.replace("/login");
  }, [ready, staff, router]);

  if (!ready || !staff) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-slate-400" aria-label="Loading" />
      </main>
    );
  }

  return (
    <>
      <StaffHeader staff={staff} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-5 pb-28 lg:pb-10">
        {children}
      </main>

      <BottomNav />
    </>
  );
}

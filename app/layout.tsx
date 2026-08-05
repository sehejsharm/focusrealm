import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focus Realm",
  description:
    "Standardized SOP execution for the deskless hospitality workforce.",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full justify-center bg-stone-300">
        <div className="flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-stone-50 sm:my-4 sm:min-h-[calc(100dvh-2rem)] sm:rounded-[2.5rem] sm:border-8 sm:border-stone-900 sm:shadow-2xl">
          <main className="flex-1 overflow-y-auto">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}

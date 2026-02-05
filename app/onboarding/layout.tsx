// app/layout.tsx
import "../globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Onboarding",
  description: "Glusco Login and Signup Forms",
};

// ❌ Don't add "use client" here! Layout must be a Server Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Static Background (SSR-safe) */}
      <div className="absolute inset-0 bg-white -z-10">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* ✅ Client-only code inside Providers */}
      <Providers>{children}</Providers>
    </>
  );
}

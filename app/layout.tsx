// app/layout.tsx
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "Onboarding",
  description: "Glusco Login and Signup Forms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        {/* Background — server-safe markup */}
        <div className="absolute inset-0 bg-white -z-10">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        {/* Client-only providers live here */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

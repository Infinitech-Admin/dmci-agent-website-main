// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import Footer from "@/components/footer";
import FloatingIcons from "@/components/socmed";
import Chatbot from "@/components/chatbot";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/scrollToTop";

// Navbar uses @heroui/react components that crash during SSR prerendering
// (TypeError: Cannot destructure property 'auth' of 'e' as it is undefined).
// Rendering it client-only side-steps the prerender crash.
const Navbar = dynamic(
  () => import("@/components/navbar").then((mod) => ({ default: mod.Navbar })),
  { ssr: false },
);

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json", // ✅ Added for PWA
  themeColor: "#004aad", // ✅ DMCI brand color
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const poppins = Poppins({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-background antialiased ${poppins.className}`}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Toaster position="top-right" reverseOrder={false} />
              <ScrollToTop />
              {children}
              <FloatingIcons />
            </main>
            <Footer />
          </div>
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}

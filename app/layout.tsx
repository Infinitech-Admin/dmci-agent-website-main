import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingIcons from "@/components/socmed";
import Chatbot from "@/components/chatbot";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/scrollToTop";
import RegisterSW from "./register-sw";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: "/manifest.json",
  icons: {
    icon: "https://www.dmcihomes.com/frontend/images/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DMCI Homes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e40af" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={`bg-background ${poppins.className}`}>
        <RegisterSW />
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex flex-col">
            <Navbar />
            <main>
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

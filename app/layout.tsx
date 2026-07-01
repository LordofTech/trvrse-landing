import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import CursorGlow from "@/components/CursorGlow";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Trvrse — The Last Wallet You'll Ever Need | Nexogen Holdings Limited",
  description:
    "Convert any currency. Pay any bank. Anywhere on earth. Instantly. Join the Trvrse waitlist.",
  keywords: ["fintech", "cross-border payments", "Nigeria", "wallet", "Nexogen Holdings Limited", "Trvrse"],
  authors: [{ name: "Nexogen Holdings Limited" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Trvrse — The Last Wallet You'll Ever Need",
    description: "Cross-border fintech wallet by Nexogen Holdings Limited. Convert, pay, and transfer globally.",
    type: "website",
    url: SITE_URL,
    siteName: "Trvrse",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A1628",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}

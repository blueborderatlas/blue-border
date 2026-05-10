import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blue-border.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Blue Border | Hidden European Coastal Travel Journal",
    template: "%s | Blue Border",
  },
  description:
    "Hidden islands, quiet coasts and low-cost sea escapes across Europe, with notes on wind, water, routes, ports, beaches and shoreline fishing.",
  openGraph: {
    title: "Blue Border",
    description:
      "Hidden islands, quiet coasts and low-cost sea escapes across Europe.",
    url: siteUrl,
    siteName: "Blue Border",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "A quiet blue shoreline at dusk",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Border",
    description:
      "Hidden islands, quiet coasts and low-cost sea escapes across Europe.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

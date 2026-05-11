import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blue-border.vercel.app";
const googleAnalyticsId = "G-R3M0Y00K37";

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
      <head>
        <meta
          name="google-site-verification"
          content="r-dRQKV_i8vXPPGwgJ7STs2mPYkyFAo9Qf-w7vgIDlM"
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

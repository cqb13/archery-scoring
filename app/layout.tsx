import { ScoreContextProvider } from "@/lib/context/scoreContext";
import { AuthContextProvider } from "@/lib/context/authContext";
import { NavigationEvents } from "@/lib/nav-events";
import NavBar from "@/components/layout/nav";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://archery.cqb13.dev"),
  title: "Archery Scoring",
  description: "Keep track of your archery scores.",
  keywords: [
    "archery",
    "scoring",
    "target",
    "bow",
    "arrow",
    "score",
    "archery scoring",
    "arrow counter",
    "cqb13"
  ],
  generator: "Next.js",
  applicationName: "Archery Scoring",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "cqb13", url: "https://cqb13.dev" }],
  colorScheme: "dark",
  creator: "cqb13",
  publisher: "cqb13",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  themeColor: "black",
  manifest: "https://archery.cqb13.dev/manifest.json",
  openGraph: {
    title: "Archery Scoring",
    description: "Keep track of your archery scores..",
    url: "https://archery.cqb13.dev/",
    siteName: "Archery Scoring",
    images: [
      {
        url: "https://archery.cqb13.dev/icon.png",
        width: 600,
        height: 600,
        alt: "Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/icon.png"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": "auto",
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-lightest min-h-screen`}>
        <AuthContextProvider>
          <ScoreContextProvider>
            <NavBar />
            {children}
          </ScoreContextProvider>
        </AuthContextProvider>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}

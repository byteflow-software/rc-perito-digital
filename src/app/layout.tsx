import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | RC Perito Digital",
    default: "RC Perito Digital - Romullo Carvalho | Perito Digital, OSINT e CTI",
  },
  description:
    "Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI. Blog, cursos, investigação digital e inteligência cibernética.",
  keywords: [
    "perito digital",
    "OSINT",
    "forense digital",
    "CTI",
    "investigação digital",
    "Romullo Carvalho",
    "cibersegurança",
    "inteligência cibernética",
  ],
  authors: [{ name: "Romullo Carvalho" }],
  creator: "Romullo Carvalho",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rc-perito-digital.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "RC Perito Digital",
    images: [
      {
        url: "/images/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "RC Perito Digital - Romullo Carvalho",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@romullo_c",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://yy7vynyrezpvfapo.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://globoplay.globo.com" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary font-sans">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#161b22",
              color: "#e6edf3",
              border: "1px solid #30363d",
            },
          }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

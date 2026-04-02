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
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.rcperitodigital.com.br"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "RC Perito Digital",
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

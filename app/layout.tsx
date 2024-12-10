import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryClientProvider } from "./components/query-client-provider";
import { Toaster } from "./components/ui/toaster";
import { RedirectToaster } from "./components/ui/redirect-toaster";
import { ThemeProvider } from "./dashboard/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Faceless AI Studio",
  description: "Generate Faceless Content With AI Magic. Transform your content creation journey with our AI-powered platform. Create unique, faceless videos and earn up to $10,000 monthly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`antialiased ${geistSans.variable} ${geistSans.className}`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
            <RedirectToaster />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}

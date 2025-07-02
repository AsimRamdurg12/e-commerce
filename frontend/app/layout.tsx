import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/QueryClient";

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Frontend Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

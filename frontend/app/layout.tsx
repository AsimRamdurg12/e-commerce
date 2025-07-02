import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/QueryClient";
import Navbar from "@/components/Navbar";

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
      <body className="antialiased bg-gray-100">
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

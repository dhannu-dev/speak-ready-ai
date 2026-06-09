import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/query.provider";

export const metadata: Metadata = {
  title: "English Internship App",
  description: "Connected Next.js and Express application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

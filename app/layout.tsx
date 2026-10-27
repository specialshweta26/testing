import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chitchat — AI Chat",
  description: "A simple, thoughtful AI chat experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
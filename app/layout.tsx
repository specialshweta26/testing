import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "goodday — Fresh groceries, good days",
  description: "Everyday goodness, picked with care and brought right to your doorstep.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

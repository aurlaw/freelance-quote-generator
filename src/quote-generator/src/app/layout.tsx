import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Freelance Quote Generator',
  description: 'Generate cost and time estimates for freelance projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

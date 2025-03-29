import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Freelance Quote Generator - NextJS',
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
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
          <header className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Freelance Quote Generator</h1>
            <Image src="/logo.png" alt="Logo" width={96} height={96} className="mb-4" />
            <p className="text-lg mb-4 text-center">Generate cost and time estimates for freelance projects</p>
          </header>
          {children}
          <footer className="mt-auto text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Freelance Quote Generator - NextJS version</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

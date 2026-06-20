import type { Metadata } from 'next';
import { inter } from '@/lib/fonts';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ali Haider Noorani — Software Developer',
    template: '%s | Ali Haider Noorani',
  },
  description:
    'Personal portfolio of Ali Haider Noorani — software developer specialising in full-stack web and mobile applications.',
  metadataBase: new URL('https://alihaider.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ali Haider Noorani',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

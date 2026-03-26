import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UniLink-App',
  description: 'Connecting Students with Employers Seamlessly.',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/icon1.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/icon0.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicons/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicons/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-50 text-neutral-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Barlow_Condensed } from 'next/font/google';
import './globals.css';
import ResponsiveNav from './(navbar)/Navigation/ResponsiveNav';
import { ReduxProvider } from './redux/provider';

import Loading from './loading';
const Barlow = Barlow_Condensed({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shop More | Best Shopping Site',
  description: 'this is the website to buy best burger ',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/icon-light.png',
        href: '/images/icon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/icon.png',
        href: '/images/icon-dark.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Barlow.className}>
        {/*  redux wrapper start */}
        <ReduxProvider>
          <div className="fixed z-[2000] w-full top-0 ">
            <ResponsiveNav />
          </div>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ReduxProvider>
        {/*  redux wrapper end */}
      </body>
    </html>
  );
}

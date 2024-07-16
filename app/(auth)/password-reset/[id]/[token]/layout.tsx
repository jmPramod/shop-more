import type { Metadata } from 'next';
import { Barlow_Condensed } from 'next/font/google';

import { FaBattleNet } from 'react-icons/fa';

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
    <div>
      <div className="w-full bg-black h-[70px] flex items-center px-4 ">
        <div className="flex items-center space-x-2 cursor-pointer border border-white w-[160px] rounded-[5px]">
          <FaBattleNet className="w-5 h-5 sm:w-10 sm:h-10 text-orange-300 " />
          <h1 className="text-sm sm:text-2xl font-bold text-white">
            Shop More
          </h1>
        </div>
      </div>
      {children}
    </div>
  );
}

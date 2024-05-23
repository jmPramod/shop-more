import type { Metadata } from 'next';
import { FaBattleNet } from 'react-icons/fa';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full h-14 bg-black flex items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer sm:w-[40%]"
          // onClick={() => router.push('/')}
        >
          <FaBattleNet className="w-5 h-5 sm:w-10 sm:h-12 text-orange-300 ml-2" />
          <h1 className="text-sm sm:text-2xl p-1 font-bold text-white">
            Shop More
          </h1>
        </div>
      </div>
      {children}
    </div>
  );
}

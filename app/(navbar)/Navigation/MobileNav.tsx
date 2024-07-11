/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

import { AiOutlineClose } from 'react-icons/ai';
interface PropType {
  mobileView: boolean;
  closeMobView: () => void;
}
const MobileNav = (props: PropType) => {
  const { mobileView, closeMobView } = props;
  const navStyle = mobileView ? 'translate-x-0' : 'translate-x-[-100%]';
  return (
    <div
      className={`fixed ${navStyle} bg-[#000000e0] h-screen top-0 w-[80%] z-10 transition-all duration-500 delay-200`}
    >
      <AiOutlineClose
        className="text-white absolute right-4 top-3 text-2xl"
        onClick={closeMobView}
      />
      {/* nav links */}
      <ul className="space-y-20 bg-orange-500 text-center h-full flex items-center justify-center flex-col">
        <li className="text-sm sm:text-xl font-medium text-white  ">
          <Link href={'/login'}>login/logout</Link>
        </li>

        <li className="text-sm sm:text-xl font-medium text-white  ">
          <Link href={'/contact'}>contact</Link>
        </li>

        <li className="text-sm sm:text-xl font-medium text-white  ">
          <Link href={'/'}>cart</Link>
        </li>
        <li>
          <img
            src="https://res.cloudinary.com/dtvq8ysaj/image/upload/v1711554275/profileImage_l8dleh.png"
            alt=""
          />
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { useAppSelector } from '../../../app/redux/store';
import { userAction } from '../../../app/redux/slice/loginSlice';
import { useRouter } from 'next/navigation';

import { BsCart4 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
interface PropType {
  mobileView: boolean;
  closeMobView: () => void;
}
const MobileNav = (props: PropType) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showProfile, setShowProfile] = useState(false);
  const { mobileView, closeMobView } = props;
  const products = useAppSelector((state) => state.userList);
  const handleLogout = () => {
    if (
      products.user != null &&
      products.user != undefined &&
      typeof products.user === 'object' &&
      Object.keys(products.user).length > 0
    ) {
      dispatch(userAction.logout());
      localStorage.removeItem('User');

      localStorage.removeItem('token');
    } else {
      router.push('/login');
    }
  };
  const navStyle = mobileView ? 'translate-x-0' : 'translate-x-[-100%]';
  return (
    <div
      id="one"
      onClick={closeMobView}
      className={`fixed ${navStyle} bg-black bg-opacity-50 h-screen top-0 w-full z-10 `}
    >
      <div
        className={`fixed ${navStyle}  h-screen top-0 w-[80%] z-10 transition-all duration-500 delay-200`}
      >
        <AiOutlineClose
          className="text-white absolute right-4 top-3 text-2xl"
          onClick={closeMobView}
        />
        {/* nav links */}
        <ul className="space-y-20 bg-[#656463] text-center h-full flex items-center justify-center flex-col">
          {products.user != null &&
            products.user != undefined &&
            typeof products.user === 'object' &&
            Object.keys(products.user).length > 0 && (
              <li className="flex items-center justify-center gap-2">
                <img
                  width={'50px'}
                  height={'50px'}
                  className="  rounded-full"
                  // src="https://res.cloudinary.com/dtvq8ysaj/image/upload/v1711554275/profileImage_l8dleh.png"
                  src={
                    products?.user
                      ? products?.user?.images?.imageUrl
                      : 'https://res.cloudinary.com/dtvq8ysaj/image/upload/v1711554275/profileImage_l8dleh.png'
                  }
                  alt="Rounded avatar"
                />
                <Link className="text-3xl  text-white" href={'/profile'}>
                  Profile
                </Link>
              </li>
            )}

          <li className="text-sm sm:text-xl font-medium text-white  ">
            <Link
              href={'/order'}
              className="flex gap-1  items-center text-3xl "
            >
              <BsCart4 /> Cart{' '}
              <sup className="text-yellow-400  p-1 font-bold">
                {products.cartList}
              </sup>
            </Link>
          </li>
          <li className="text-sm sm:text-xl font-medium text-white  ">
            <Link className="text-3xl" href={'/contact'}>
              Contact
            </Link>
          </li>
          <li className="text-sm sm:text-xl font-medium text-white  ">
            <div onClick={() => handleLogout()} className="text-3xl">
              {products.user != null &&
              products.user != undefined &&
              typeof products.user === 'object' &&
              Object.keys(products.user).length > 0
                ? 'Logout'
                : 'Login'}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;

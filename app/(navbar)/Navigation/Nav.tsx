/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { FaBattleNet } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/redux/store';
import { userAction } from '../../../app/redux/slice/loginSlice';
interface PropsType {
  openMobView: () => void;
}
const Nav = (props: PropsType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const products = useAppSelector((state) => state.userList);
  const { openMobView } = props;
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    console.log('products', products);
  }, [products]);
  const handleProfile = () => {
    setShowProfile(!showProfile);
  };
  const handleLogout = () => {
    dispatch(userAction.logout());
    localStorage.removeItem('User');
  };
  return (
    <div className="h-[80px] bg-[#212121] text-white z-40 w-full">
      <div className="sm:w-[90%] w-[95%] mx-auto flex h-[100%] items-center justify-between">
        {/* logo div */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <FaBattleNet className="w-5 h-5 sm:w-10 sm:h-10 text-orange-300 " />
          <h1 className="text-sm sm:text-2xl font-bold">Shop More</h1>
        </div>
        {/* search menu here */}
        <div className="flex items-center justify-center space-x-2 border w-[40%] rounded-[4px] ">
          <input
            type="text"
            placeholder="Search Items..."
            className="outline-none flex p-1 w-full   px-1  border-none  text-black"
          />
          <button className="w-[25px]">
            <FaSearch />
          </button>
        </div>
        {/* nav link */}
        <ul className="hidden md:flex items-center  justify-center space-x-2">
          <li className="flex text-sm sm:text-xl font-medium flex-wrap p-1 m-1 hover:text-red-600 border px-2 hover:border-red-600">
            <Link href={'/'} className="flex gap-1  items-center ">
              <BsCart4 /> cart{' '}
              <sup className="text-yellow-400  p-1 font-bold">1</sup>
            </Link>
          </li>

          {products.user != null &&
          products.user != undefined &&
          typeof products.user === 'object' &&
          Object.keys(products.user).length > 0 ? (
            <div className="flex flex-col items-center relative">
              <li onClick={handleProfile}>
                <img
                  src="https://res.cloudinary.com/dtvq8ysaj/image/upload/v1711554275/profileImage_l8dleh.png"
                  alt=""
                  width={'50px'}
                  height={'50px'}
                />
              </li>
              {showProfile && (
                <div className="w-[100px] top-[57px] absolute bg-white flex flex-col items-center justify-center gap-1">
                  <Link className="text-black p-3 hover:underline " href={'/ '}>
                    Profile
                  </Link>

                  <Link
                    className="text-black p-3 hover:underline"
                    href={'/'}
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <li className="text-sm sm:text-xl font-medium hover:text-red-600 border px-2 hover:border-red-600">
              <Link href={'/login'}>login</Link>
            </li>
          )}
        </ul>
        {/* mobile icon */}
        <FaBars className="text-xl md:hidden" onClick={openMobView} />
      </div>
    </div>
  );
};

export default Nav;

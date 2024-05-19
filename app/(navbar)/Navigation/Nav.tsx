/* eslint-disable jsx-a11y/alt-text */
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
import { SearchProducts } from '../../../services/Api.Servicer';
interface PropsType {
  openMobView: () => void;
}
const Nav = (props: PropsType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const products = useAppSelector((state) => state.userList);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

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
  const onSearchClick = async () => {
    setSearchLoading(true);
    let response = await SearchProducts(searchText);
    if (response) {
      console.log('mpm', response);
      setSearchResult(response);
    }
    setSearchLoading(false);
  };
  return (
    <div className="h-[80px] bg-[#212121] text-white z-40 w-full">
      <div className="sm:w-[90%] w-[95%] mx-auto flex h-[100%] items-center justify-between">
        {/* logo div */}
        <div
          className="flex items-center space-x-2 cursor-pointer sm:w-[40%]"
          onClick={() => router.push('/')}
        >
          <FaBattleNet className="w-5 h-5 sm:w-10 sm:h-10 text-orange-300 " />
          <h1 className="text-sm sm:text-2xl font-bold">Shop More</h1>
        </div>
        {/* search menu here */}
        <div className="flex flex-col items-center justify-center space-x-2 w-[50%] sm:w-[100%] relative ">
          <div className="flex items-start justify-center   border w-[70%] rounded-[4px] ">
            <input
              type="text"
              placeholder="Search Items..."
              className="outline-none flex p-1 w-full   px-1  border-none  text-black"
              onChange={(e) => {
                onSearchClick();

                setSearchText(e.target.value);
              }}
              value={searchText}
            />
            <button
              style={{ marginTop: '0px', marginBottom: '0px' }}
              className="w-[25px] mt-0 mb-0 p-1"
              onClick={() => onSearchClick()}
            >
              {searchLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className=" text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <FaSearch />
              )}
            </button>
          </div>
          {searchResult && (
            <div
              style={{ margin: '0px' }}
              className="w-[70%] bg-white min-h-10 absolute top-[40px] ml-0 mr-0 text-black"
            >
              {(searchResult && searchResult?.statusCode === 500) ||
              searchResult?.data === null ? (
                <h5 className="text-ceter">{searchResult?.message}</h5>
              ) : (
                searchResult?.data.map((val: any, i: any) => (
                  <div
                    className="flex items-center  justify-between p-2  my-2"
                    key={i}
                    onClick={() => {
                      setSearchText('');
                      setSearchResult(null);
                      router.push(`/product/${val._id}`);
                    }}
                  >
                    <img src={val?.thumbnail} height="70px" width="70px" />
                    <h1 className="text-bold text-xl">{val?.title}</h1>
                  </div>
                ))
              )}
            </div>
          )}
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
                  width={'100px'}
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

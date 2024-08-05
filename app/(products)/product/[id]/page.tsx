'use client';

import React, { useEffect, useState } from 'react';
import ProductImageSlider from './ProductImageSlider';
import {
  AddToCart,
  filterProducts,
  getSingleProducts,
  profileUpdate,
} from './../../../../services/Api.Servicer';
// import Footer from './../../../components/Footer/Footer';
import Footer from './../../../(navbar)/Footer/Footer';
import { BiSolidStar } from 'react-icons/bi';
import { BiSolidStarHalf } from 'react-icons/bi';
import { BiStar } from 'react-icons/bi';
import { useAppSelector } from '../../../../app/redux/store';
import {
  checkLocalStorageUser,
  userAction,
} from '../../../../app/redux/slice/loginSlice';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';
import Login from '../../../../app/(auth)/login/page';
import LoginModel from './../../../components/loginModel/LoginModel';
import ProductCard from '../../PopularProduct/PopularCard';
const SingleProduct = ({ params }: { params: { id: string } }) => {
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [productByCategory, setProductByCategory] = useState<any>(null);
  const router = useRouter();
  const [goToCart, setGoToCart] = useState(false);
  const user = useAppSelector((state) => state.userList.user);
  const dispatch = useDispatch();
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BiSolidStar key={i} className="text-red-600" />);
    }

    if (hasHalfStar) {
      stars.push(
        <BiSolidStarHalf key={stars.length} className="text-red-600" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BiStar key={stars.length + i} className="text-red-600" />);
    }

    return stars;
  };

  const handleCart = async (_id: any) => {
    setButtonLoading('cart');
    if (goToCart) {
      router.push('/cart');
    } else if (user?._id) {
      const payload = {
        userId: user?._id,
        productId: _id,
      };
      let response = await AddToCart(payload);
      dispatch(userAction.AddCartProduct(response?.data?.cartAdded?.length));

      let response2 = await profileUpdate({}, user._id);
      if (response2 && response2.statusCode === 200) {
        dispatch(userAction.setUser(response2?.data));
        localStorage.setItem('User', JSON.stringify(response2?.data));
      }
      // localStorage.setItem('User', JSON.stringify(response?.data));
      setGoToCart(true);
    } else {
      setShowLogin(true);
    }
    setButtonLoading('');
  };
 
  useEffect(() => {
    if (user?.cartAdded && user?.cartAdded.length > 0) {
      let pk = user?.cartAdded.includes(params?.id);
      setGoToCart(pk);
    }

    const fetchSingleProduct = async () => {
      if (params?.id) {
        let responce = await getSingleProducts(params?.id);
        if (responce?.statusCode === 200) {
          setProductData(responce?.data);

          let response2 = await filterProducts(
            '',
            '',
            `${responce?.data?.category}`,
            '',
            '',
            ''
          );
          if (response2?.statusCode === 200) {
            setProductByCategory(response2?.data);
          }
        }
      }
      setLoading(false);
    };
    fetchSingleProduct();
  }, [params?.id, user]);

  return (
    <div className="relative">
      <div className=" w-full flex   gap-5  mt-[80px] items-center justify-center flex-col md:flex-row">
        {/* for photo slide */}
        <div className=" md:w-[40%] w-full">
          <ProductImageSlider
            images={productData?.images && productData?.images}
            loading={loading}
          />
        </div>
        {loading ? (
          <>
            {/* information */}
            <div className="p-5 w-full md:w-[50%] flex flex-col  justify-center  md:items-start gap-[10px] md:gap-[7vh]  ">
              <div className="h-[30px] md:h-[40px] font-semibold w-[30%] bg-gray-200 "></div>
              <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[200px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>

              <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5"></div>
              <div className="flex w-full gap-3 ">
                <div className="h-[40px] bg-gray-200 w-[50%]  dark:bg-gray-700  mb-2.5"></div>
                <div className="h-[40px] bg-gray-200 w-[50%]  dark:bg-gray-700  mb-2.5"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="md:w-[60%] w-full  flex flex-col  gap-5 p-5   justify-center">
            <h1 className="text-4xl text-left font-bold">
              {productData?.title}
            </h1>
            <div className="text-left flex gap-1 items-center justify-start">
              <div className="text-2xl">{productData?.price} ₹</div>
              <sub className="text-lg">
                {'('}
                {productData?.discountPercentage}% off{')'}
              </sub>
            </div>

            <div className="text-left flex text-2xl gap-1 items-center justify-start">
              {productData?.rating}

              {renderStars(productData?.rating)}
            </div>

            <div className="text-2xl">
              <b>Brand:</b> {productData?.brand}{' '}
            </div>
            <div className="text-2xl">
              <b>Description: </b>
              {productData?.description}{' '}
            </div>
            <div className="text-2xl">
              <b>Number of Product left: </b>
              {productData?.stock} items left{' '}
            </div>
            <div className="flex gap-5 ">
              <button
                className="w-[50%]  p-2 border bg-[#ff9f00] text-white text-2xl flex items-center justify-evenly"
                onClick={() => handleCart(productData?._id)}
              >
                {goToCart ? 'Go To Cart' : 'Add To Cart'}
                {buttonLoading === 'cart' ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  ''
                )}
              </button>

              <button className="w-[50%] p-2  border bg-[#fb641b] text-white text-2xl">
                {' '}
                Buy now
              </button>
            </div>
          </div>
        )}
      </div>
      <ProductCard
        data={productByCategory}
        title="Related Product"
        loading={loading}
      />
      <>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <Footer />
      </>
      {showLogin && (
        <LoginModel
          setShowLogin={setShowLogin}
          title={'Add this Product to Cart'}
        />
      )}{' '}
    </div>
  );
};

export default SingleProduct;

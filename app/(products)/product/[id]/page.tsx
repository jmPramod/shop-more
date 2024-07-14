'use client';

import React, { useEffect, useState } from 'react';
import ProductImageSlider from './ProductImageSlider';
import {
  AddToCart,
  getSingleProducts,
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
const SingleProduct = ({ params }: { params: { id: string } }) => {
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    if (goToCart) {
      router.push('/order');
    } else if (user?._id) {
      const payload = {
        userId: user?._id,
        productId: _id,
      };
      let response = await AddToCart(payload);
      dispatch(userAction.AddCartProduct(response?.data?.cartAdded?.length));
      setGoToCart(true);
    }
  };
  useEffect(() => {
    if (user?.cartAdded && user?.cartAdded.length > 0) {
      let pk = user?.cartAdded.includes(params?.id);
      setGoToCart(pk);
    }

    const fetchSingleProduct = async () => {
      if (params?.id) {
        let responce = await getSingleProducts(params?.id);

        setProductData(responce?.data);
      }
      setLoading(false);
    };
    fetchSingleProduct();
  }, [params?.id, user]);
  useEffect(() => {
    dispatch(checkLocalStorageUser());
  }, [dispatch]); // Make sure to include dispatch in the dependency array

  return (
    <>
      <div className="w-full flex   gap-5 mt-[100px] md:mt-[80px] items-center justify-center flex-col md:flex-row">
        {/* for photo slide */}
        <div className="md:w-[40%] w-full">
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
                className="w-[50%]  p-2 border bg-[#ff9f00] text-white text-2xl "
                onClick={() => handleCart(productData?._id)}
              >
                {' '}
                {goToCart ? 'Go To Cart' : 'Add To Cart'}
              </button>

              <button className="w-[50%] p-2  border bg-[#fb641b] text-white text-2xl">
                {' '}
                Buy now
              </button>
            </div>
          </div>
        )}
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

      <Footer />
    </>
  );
};

export default SingleProduct;

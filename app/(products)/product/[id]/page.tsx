'use client';

import React, { useEffect, useState } from 'react';
import ProductImageSlider from './ProductImageSlider';
import { getSingleProducts } from './../../../../services/Api.Servicer';
// import Footer from './../../../components/Footer/Footer';
import Footer from './../../../(navbar)/Footer/Footer';

const SingleProduct = ({ params }: { params: { id: string } }) => {
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSingleProduct = async () => {
      if (params?.id) {
        let responce = await getSingleProducts(params?.id);
        setProductData(responce?.data);
      }
      setLoading(false);
    };
    fetchSingleProduct();
  }, [params?.id]);
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
            <h1 className="text-2xl text-left">{productData?.title}</h1>
            <div className="text-left flex gap-5">
              <div>{productData?.price} RS</div>
              <div>{productData?.rating}star</div>

              <div>{productData?.discountPercentage}% off </div>
            </div>

            <div>{productData?.brand} </div>
            <div>{productData?.description} </div>
            <div>{productData?.stock}items left </div>
            <div className="flex gap-5 ">
              <button className="w-[50%]  p-2 border bg-[#ff9f00] text-white text-2xl">
                {' '}
                Add to cart
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

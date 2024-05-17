'use client';

import React, { useEffect, useState } from 'react';
import ProductImageSlider from './ProductImageSlider';
import { getSingleProducts } from './../../../../services/Api.Servicer';
// import Footer from './../../../components/Footer/Footer';
import Footer from './../../../(navbar)/Footer/Footer';

const SingleProduct = ({ params }: { params: { id: string } }) => {
  const [productData, setProductData] = useState<any>(null);
  useEffect(() => {
    const fetchSingleProduct = async () => {
      if (params?.id) {
        let responce = await getSingleProducts(params?.id);
        setProductData(responce?.data);
      }
    };
    fetchSingleProduct();
  }, [params?.id]);
  return (
    <>
      <div className="w-full flex items-center  gap-5  mt-[80px] ">
        {/* for photo slide */}
        <div className="w-[40%] ">
          <ProductImageSlider
            images={productData?.images && productData?.images}
          />
        </div>
        <div className="w-[60%]  flex flex-col  gap-5 p-5   justify-between">
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
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

      <Footer />
    </>
  );
};

export default SingleProduct;

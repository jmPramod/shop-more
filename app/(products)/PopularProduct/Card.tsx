/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element
import React, { useEffect, useState } from 'react';
import { BiSolidStar } from 'react-icons/bi';
import { BiSolidStarHalf } from 'react-icons/bi';
import { BiStar } from 'react-icons/bi';
import { ProductType } from './../../utils/types';
import { getProductsCategory } from './../../../services/Api.Servicer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
const Card = (props: any) => {
  const router = useRouter();
  const { product } = props;
  const [highRatedProduct, setHighRatingProduct] = useState(
    [] as ProductType[]
  );

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

  return (
    <motion.div
      className=" p-6 rounded-lg m-3  border border-gray-300 cursor-pointer bg-white"
      onClick={() => router.push(`/product/${product._id}`)}
      whileHover={{ scale: 1.1 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      whileTap={{ scale: 0.8 }}
    >
      {/* image div*/}
      <div className="w-[100%] h-[200px] mx-auto">
        <motion.img
          src={product.thumbnail}
          alt=""
          className="w-full h-full  object-cover "
        />
      </div>
      {/* title div*/}
      <div>
        <h1>{product?.title}</h1>
        <div className="flex items-center gap-1">
          <div className="flex">
            {/* <BiSolidStar className="text-red-600" />
            <BiSolidStarHalf className="text-red-600" />
            <BiStar className="text-red-600" />
            <BiStar className="text-red-600" /> */}
            {renderStars(product.rating)}
          </div>
          <div className="">{`(${product.rating})`}</div>
        </div>
      </div>

      <div>
        <button>{product?.price}$</button>
      </div>
    </motion.div>
  );
};

export default Card;

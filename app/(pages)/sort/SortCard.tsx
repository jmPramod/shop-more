/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useScroll, motion } from 'framer-motion';

import { BiSolidStar } from 'react-icons/bi';
import { BiSolidStarHalf } from 'react-icons/bi';
import { BiStar } from 'react-icons/bi';
import { RemoveFromCart } from '../../../services/Api.Servicer';
import { useRouter } from 'next/navigation';
const SortCard = (props: any) => {
  
  const router = useRouter();
  const { val} = props;

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
  const removeCart = async (id: any) => {
    let User: any = localStorage.getItem('User');
    if (User) {
      User = JSON.parse(User);

      let payload = {
        userId: User?._id,
        productId: id,
      };
      const res = await RemoveFromCart(payload);
if(res&&res.statusCode===200){
  // setAfterDelete(!afterDelete)
}
    }
  };
  return (
    <motion.div className="p-2 border flex  gap-2    "
    onClick={() => router.push(`/product/${val._id}`)}
    whileHover={{ scale: 1.04 }}
    onHoverStart={(e) => {}}
    onHoverEnd={(e) => {}}
    whileTap={{ scale: 0.8 }}

    >
      <img
        src={val && val?.thumbnail.imageUrl}
        alt={val && val?.title}
        className="w-1/2 min-w-[10%]"
      />
      <div className="info flex flex-col w-1/2 justify-center gap-3">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl capitalize">{val && val?.title}</h1>
          <h2 className=" text-1xl capitalize">{val && val?.description}</h2>

          <h2 className=" text-1xl capitalize">{val && val?.category}</h2>
        </div>
        <div className="flex gap-5">
          <h2 className="font-medium text-1xl">{val && val?.price} RS </h2>

          <h2 className="font-medium text-1xl flex items-end gap-2">
            {val && val?.discountPercentage} % <p className="text-sm">off</p>
          </h2>
        </div>
        <div className="text-left flex text-2xl gap-1 items-center justify-start">
              {val?.rating}

              {renderStars(val?.rating)}
            </div>
      </div>
    </motion.div>
  );
};

export default SortCard;

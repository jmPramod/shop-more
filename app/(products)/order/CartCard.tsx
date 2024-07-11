/* eslint-disable @next/next/no-img-element */
import React from 'react';

const CartCard = () => {
  return (
    <div className="p-2 border flex gap-2 ">
      <img
        src="https://res.cloudinary.com/dtvq8ysaj/image/upload/v1720538754/t4l2lblqllhhwdasx5g5.jpg"
        alt=""
        className="w-1/3"
      />
      <div className="info flex flex-col w-full">
        <div className="flex flex-col">
          <h1>Title</h1>
          <h2>Describtion </h2>

          <h2>category </h2>
        </div>
        <div className="flex">
          <h2>cost </h2>

          <h2>Discount </h2>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

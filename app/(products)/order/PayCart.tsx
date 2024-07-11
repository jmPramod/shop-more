import React from 'react';
import CartCard from './CartCard';

const CartList = () => {
  const data = ['', '', ''];
  return (
    <div className="w-[66.66%] h-full  overflow-auto p-5 ">
      <CartCard />
    </div>
  );
};

export default CartList;

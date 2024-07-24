import React, { useEffect } from 'react';
import CartCard from './CartCard';

const CartList = (props: any) => {
  const { cartList, afterDelete, setAfterDelete } = props;

  return (
    <div className="w-full md:w-[66.66%] h-full  overflow-auto p-5 ">
      <h1 className="text-3xl font-bold">CART</h1>

      {cartList && cartList.length > 0 ? (
        cartList &&
        cartList.map((val: any, index: number) => (
          <div key={index}>
            <CartCard
              val={val}
              afterDelete={afterDelete}
              setAfterDelete={setAfterDelete}
            />
          </div>
        ))
      ) : (
        <div className=" text-2xl">No Items in cart.</div>
      )}
    </div>
  );
};

export default CartList;

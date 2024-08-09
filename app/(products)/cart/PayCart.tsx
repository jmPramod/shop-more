import React, { useEffect } from 'react';
import CartCard from './CartCard';

const CartList = (props: any) => {
  const { cartList, cartLoading, setCartList } = props;

  return (
    <div className="w-full md:w-[66.66%] h-full  overflow-auto p-5 ">
      <h1 className="text-3xl font-bold">CART</h1>
      {cartLoading ? (
        'Loading...'
      ) : (
        <>
          {' '}
          {cartList && cartList.length > 0 ? (
            cartList &&
            cartList.map((val: any, index: number) => (
              <div key={index}>
                <CartCard setCartList={setCartList} val={val} />
              </div>
            ))
          ) : (
            <div className="text-2xl">No product in Cart.</div>
          )}
        </>
      )}
    </div>
  );
};

export default CartList;

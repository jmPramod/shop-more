import React, { useState, useEffect } from 'react';

const Summary = (props: any) => {
  const { cartList } = props;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (cartList) {
      let tot = 0;
      cartList.map((val: any, ind: number) => {
        tot = tot + val.price;
      });
      setTotal(tot);
  
    }
  }, [cartList]);
  return (
    <div className=" w-full md:w-1/3 h-full border static md:fixed  right-1 p-1">
      <div className=" bg-white p-3 h-full">
        <h1 className="text-xl font-semibold">Price Details</h1>
        <div className="flex flex-col  border gap-4 p-3">
          <div className="flex items-center justify-between ">
            <h1 className="text-lg font-medium">
              Price({cartList&&cartList.length} items)
            </h1>
            <h2>₹ 1909</h2>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Discount</h1>
            <h2>-₹ 500</h2>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Delivery Charges</h1>
            <h2>
              ₹ 40 <p>Free</p>
            </h2>
          </div>
          <div>
            <div className="flex items-center justify-between ">
              <h1 className="text-lg font-medium">Total</h1>
              <h2>₹ {total}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

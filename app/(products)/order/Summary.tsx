import React from 'react';

const Summary = () => {
  return (
    <div className="w-1/3 h-full border fixed  right-1 p-1">
      <div className=" bg-white p-3 h-full">
        <h1 className="text-xl font-semibold">Price Details</h1>
        <div className="flex flex-col  border gap-4 p-3">
          <div className="flex items-center justify-between ">
            <h1 className="text-lg font-medium">Price(1 items)</h1>
            <h2>RS 1909</h2>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Discount</h1>
            <h2>-RS 500</h2>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Delivery Charges</h1>
            <h2>
              RS 40 <p>Free</p>
            </h2>
          </div>
          <div>
            <div className="flex items-center justify-between ">
              <h1 className="text-lg font-medium">Total</h1>
              <h2>RS 1909</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

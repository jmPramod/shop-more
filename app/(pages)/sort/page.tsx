/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useState, useEffect } from 'react';

import MultiRangeSlider from 'multi-range-slider-react';
import { filterProducts } from '../../../services/Api.Servicer';
const page = () => {
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e: any) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      await filterProducts('', '', 'smartphones', '', '', '');
    };
  });

  return (
    <div
      style={{ height: 'calc(100vh - 81px)' }}
      className="flex gap-3 w-full  mt-[81px] p-4"
    >
      {/* left Menu */}
      <div className="border w-[20%]  h-full p-2">
        <div className="w-full">
          <h1>Category is :abc</h1>
          <select name="" id="" className="w-full">
            <option value="">a</option>
            <option value="">b</option>

            <option value="">c</option>
          </select>
        </div>
        <div className="w-full">
          <h1>Price Range:</h1>
          <div className="flex items-center justify-between gap-2 p-1">
            <input placeholder="min" className="border w-1/2 p-1" />
            <input placeholder="max" className="border w-1/2 p-1" />
          </div>

          <MultiRangeSlider
            min={0}
            max={100000}
            canMinMaxValueSame={true}
            onInput={(e: any) => {
              handleInput(e);
            }}
            onChange={(e: any) => {
              handleInput(e);
            }}
            label={false}
            ruler={false}
            style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
            // barLeftColor="red"
            // barInnerColor="blue"
            // barRightColor="green"
            // thumbLeftColor="lime"
            // thumbRightColor="lime"
          />
        </div>
        <div>
          <h1>Customer Rating </h1>
        </div>
      </div>
      {/* Right Filter */}
      <div className="border  w-[80%] h-full"></div>
    </div>
  );
};

export default page;

/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useState, useEffect } from 'react';

import MultiRangeSlider from 'multi-range-slider-react';
import {
  filterProducts,
  getProductsCategory,
} from '../../../services/Api.Servicer';
import { ProductType } from './../../utils/types';
const page = () => {
  const [initVal, setInitVal] = useState({
    category: 'towel',
    max: 10,
    min: 0,
    rating: 3,
  });
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);

  const [category, setCategory] = useState([] as ProductType[]);
  const handleInput = (e: any) => {
    setInitVal({...initVal,min:parseInt(e.minValue)})
         
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  let data = { categoty: 'abc' };

  useEffect(() => {
    // const fetchProduct = async () => {
    //   await filterProducts('', '', 'smartphones', '', '', '');
    // };
    const fetchData = async () => {
      const response = await getProductsCategory();
      if (response) {
        setCategory(response.data);
      }
      // setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{ height: 'calc(100vh - 81px)' }}
      className="flex gap-3 w-full  mt-[81px] p-4"
    >
      {/* left Menu */}
      <div className="border w-[20%]  h-full p-2">
        <div className="w-full">
          <h1 className="w-full text-[20px]">
            Category is :{initVal.category}
          </h1>
          <select name="" id="" className="w-full">
            {category &&
              category.map((val: any, ind: number) => (
                <option value={val.category} key={ind}>
                  {val.category}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full">
          <h1>Price Range:</h1>
          <div className="flex items-center justify-between gap-2 p-1">
            <input
              type="tel"
              placeholder="min"
              value={initVal.min}
              onChange={(e) => {
                e.preventDefault();
                console.log('val', e.target.value);
                setInitVal({...initVal,min:parseInt(e.target.value)})
              }}
              className="border w-1/2 p-1"
            />
            <input
              type="tel"
              placeholder="max"
              value={initVal.max}
              className="border w-1/2 p-1"
              onChange={(e) => set_maxValue(parseInt(e.target.value))}
            />
          </div>

          <MultiRangeSlider
            min={0}
            // minValue={minValue < maxValue ? minValue : 0}
            // maxValue={minValue < maxValue ? maxValue : 100000}
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
          />
        </div>
        <div className="flex flex-col items-start justify-center ">
          <h1 className="w-full text-[20px]">Customer Rating </h1>
          <div>
            <input
              type="radio"
              checked={
                initVal && initVal.rating > 4 && initVal && initVal.rating <= 5
              }
              name="rating"
              value="fourStar"
            ></input>
            <label htmlFor="fourStar">5 star</label>
          </div>
          <div>
            <input
              type="radio"
              checked={
                initVal && initVal.rating > 3 && initVal && initVal.rating <= 4
              }
              name="rating"
              value="fourStar"
            ></input>
            <label htmlFor="fourStar">4 star</label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              value="threeStar"
              checked={
                initVal && initVal.rating > 2 && initVal && initVal.rating <= 3
              }
            ></input>
            <label htmlFor="threeStar">3 star</label>
          </div>
          <div>
            <input
              type="radio"
              name="rating"
              value="twoStar"
              checked={
                initVal && initVal.rating > 1 && initVal && initVal.rating <= 2
              }
            ></input>
            <label htmlFor="twoStar">2 star</label>
          </div>

          <div>
            <input
              type="radio"
              name="rating"
              value="oneStar"
              checked={
                initVal && initVal.rating > 0 && initVal && initVal.rating <= 1
              }
            ></input>
            <label htmlFor="oneStar">1 star</label>
          </div>
        </div>
        <div>
          <button className="w-full border">Reset</button>
        </div>
      </div>
      {/* Right Filter */}
      <div className="border  w-[80%] h-full"></div>
    </div>
  );
};

export default page;

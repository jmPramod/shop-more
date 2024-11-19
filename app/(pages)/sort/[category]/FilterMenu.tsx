/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BiStar } from 'react-icons/bi';
import MultiRangeSlider from "multi-range-slider-react";
import { BsCart4 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
interface PropType {
  mobileView: boolean;
  closeMobView: () => void;
  initVal:any
  setInitVal:any
  categoryList:any
  handleInput:any

}
const FilterMenu = (props: PropType) => {


   const { mobileView, closeMobView ,initVal,setInitVal,categoryList} = props;
  const handleLogout = () => {}
  const navStyle = mobileView ? 'translate-y-0' : 'translate-y-[100%]';
  
  const handleInput = (e: any) => {
    setInitVal({ ...initVal, min: parseInt(e.minValue) });
    
    setInitVal({ ...initVal, max: parseInt(e.maxValue) });

    // set_minValue(e.minValue);
    // set_maxValue(e.maxValue);
  };
  return (
    <div
      id="one"
      // onClick={closeMobView}
      className={`fixed ${navStyle} bg-black bg-opacity-50 h-screen top-0 left-0 w-full z-10 md:hidden block`}
    >
      <div
        className={`fixed ${navStyle}  inset-0 bg-black bg-opacity-50 backdrop-blur-sm  h-screen top-0 left-0 w-[100%] z-10 transition-all duration-500 delay-200`}
      >
        
        {/* nav links */}
        <div className="border w-[80%] right-[10%]  fixed z-10 top-52 p-5 bg-white" >
        <AiOutlineClose
        color='black'
          className="text-white absolute right-4 top-3 text-2xl"
          onClick={closeMobView}
        />
          <h1  className="w-full text-[20px] font-semibold flex flex-wrap">Filter </h1>
        <div className="w-full">
          <h1>
            Category is :{" "}
            <select
              name=""
              id=""
              className=" border w-auto"
              value={initVal.category}
              onChange={(e) =>{
                setInitVal({ ...initVal, category:e.target.value })

              }}
            >
              {categoryList &&
                categoryList.map((val: any, ind: number) => (
                  <option value={val.category} key={ind}>
                    {val.category}
                  </option>
                ))}
            </select>
          </h1>
        </div>
        <div className="w-full">
          <h1>Price Range:</h1>
          <div className="flex items-center justify-between gap-2 p-1">
            <div>
              Min price:
              {initVal.min}
            </div>

            <div>Max Price: {initVal.max == 1000000 ? "1000000+" : initVal.max}</div>
          </div>

          <MultiRangeSlider
            min={0}
            max={1000000}
            minValue={initVal.min}
            maxValue={initVal.max}
            canMinMaxValueSame={true}
            onInput={(e: any) => {
              handleInput(e);
            }}
            onChange={(e: any) => {
              handleInput(e);
            }}
            label={false}
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
  <h1 className="w-full text-[20px]">Customer Rating </h1>
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="fiveStar"
      name="rating"
      value="5"
      checked={initVal.rating === 5}
      onChange={(e) => setInitVal({ ...initVal, rating: parseInt(e.target.value) })}
    />
    <label htmlFor="fiveStar" className="flex items-center gap-1">5 <BiStar /> </label>
  </div>
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="fourStar"
      name="rating"
      value="4"
      checked={initVal.rating === 4}
      onChange={(e) => setInitVal({ ...initVal, rating: parseInt(e.target.value) })}
    />
    <label htmlFor="fourStar" className="flex items-center gap-1">4 <BiStar /> & above</label>
  </div>
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="threeStar"
      name="rating"
      value="3"
      checked={initVal.rating === 3}
      onChange={(e) => setInitVal({ ...initVal, rating: parseInt(e.target.value) })}
    />
    <label htmlFor="threeStar" className="flex items-center gap-1">3 <BiStar /> & above</label>
  </div>
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="twoStar"
      name="rating"
      value="2"
      checked={initVal.rating === 2}
      onChange={(e) => setInitVal({ ...initVal, rating: parseInt(e.target.value) })}
    />
    <label htmlFor="twoStar" className="flex items-center gap-1">2 <BiStar /> & above</label>
  </div>
  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="oneStar"
      name="rating"
      value="1"
      checked={initVal.rating === 1}
      onChange={(e) => setInitVal({ ...initVal, rating: parseInt(e.target.value) })}
    />
    <label htmlFor="oneStar" className="flex items-center gap-1">1 <BiStar /> & above</label>
  </div>

  <div className="flex items-center gap-2">
    <input
      type="radio"
      id="oneStar"
      name="rating"
      value="1"
      checked={initVal.rating === 0}
      onChange={(e) => setInitVal({ ...initVal, rating: parseInt(e.target.value) })}
    />
    <label htmlFor="oneStar" className="flex items-center gap-1">0 <BiStar />& above</label>
  </div>
</div>
      </div>
      </div>
    </div>
  );
};

export default FilterMenu;

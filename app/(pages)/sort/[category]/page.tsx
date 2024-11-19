/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";

import { BiStar } from 'react-icons/bi';
import MultiRangeSlider from "multi-range-slider-react";
import {
  filterProducts,
  getProductsCategory,
} from "../../../../services/Api.Servicer";
import { ProductType } from "../../../utils/types";
import SortCard from "../SortCard";
import LoadingSkeliton from "../LoadingSkeliton";
import { useRouter } from "next/navigation";
const page = ({ params }: { params: { category: string } }) => {
  console.log("params?.category",params?.category);
  
  const [initVal, setInitVal] = useState({
    category: params?.category,
    max: 1000000,
    min: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [maxValue, set_maxValue] = useState(100000);

  const router = useRouter();
  const [ProductList, setProductList] = useState([] as ProductType[]);

const [rate,setRating]=useState(5)
  const [categoryList, setCategoryList] = useState([] as ProductType[]);
  const handleInput = (e: any) => {
    setInitVal({ ...initVal, min: parseInt(e.minValue) });
    
    setInitVal({ ...initVal, max: parseInt(e.maxValue) });

    // set_minValue(e.minValue);
    // set_maxValue(e.maxValue);
  };
  let data = { categoty: "abc" };

  useEffect(() => {
    setLoading(true)
    // const fetchProduct = async () => {
    //   await filterProducts('', '', 'smartphones', '', '', '');
    // };
    const fetchData = async () => {
      const response = await getProductsCategory();
      if (response) {
        setCategoryList(response.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    
    setLoading(true)
    const fetchData = async () => {
      const res = await filterProducts(initVal.min, initVal.max, initVal.category, initVal.rating, "", "");
      console.log(res);
      if (res?.statusCode == 200) {
        setProductList(res.data);
      }
      
      setLoading(false);
    };
    if (initVal.category != "") {
      fetchData();
    }
  }, [initVal.min, initVal.max, initVal.category, initVal.rating,params?.category]);
useEffect(()=>{

  if(initVal.category!==""){
    router.push(`/sort/${initVal.category}`)
  }
},[
  initVal.category
])
  return (
    <div
      style={{ height: "calc(100vh - 81px)" }}
      className="flex gap-3 w-full  mt-[81px] p-4 relative"
    >
      {/* left Menu */}
      <div className="border w-[20%]  h-full p-2 fixed z-10 md:block hidden" >
        <div className="w-full">
          <h1 className="w-full text-[20px] font-semibold flex flex-wrap">
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
      {/* Right Filter */}
      <div className="border w-full md:w-[78%] h-full absolute right-0 grid grid-cols-1 md:grid-cols-2  gap-6  p-5">
        {!loading?ProductList.map((val, i) => (
          <div key={i}>
            <SortCard val={val} />
          </div>
        )): Array.from({ length: 5 }).map((_, index) => (
          <LoadingSkeliton key={index} />
        ))}
        {
          ProductList.length==0&&!loading
          &&" No Product Found"
        }
      </div>
    </div>
  );
};

export default page;

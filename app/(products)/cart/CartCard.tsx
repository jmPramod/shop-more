/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { AppDispatch, useAppSelector } from '../../redux/store';

import { useDispatch } from 'react-redux';
import { GetCartList, RemoveFromCart } from '../../../services/Api.Servicer';
import { userAction } from '@/app/redux/slice/loginSlice';
const CartCard = (props: any) => {
  const { val, setCartList } = props;
  
  const dispatch = useDispatch<AppDispatch>();
  const removeCart = async (id: any) => {
    let User: any = localStorage.getItem('User');
    if (User) {
      User = JSON.parse(User);

      let payload = {
        userId: User?._id,
        productId: id,
      };
      const res = await RemoveFromCart(payload);
      if (res && res.statusCode === 200) {
        const response = await GetCartList(User._id);
        setCartList(response?.data?.cartAdded);
        dispatch(userAction.AddCartProduct(response?.data?.cartAdded?.length));
      }
    
    }
  };
  return (
    <div className="p-2 border flex gap-2 my-5 flex-col md:flex-row">
      <img
        src={val && val?.thumbnail.imageUrl}
        alt={val && val?.title}
        className="w-full md:w-1/3 min-w-[40%]"
      />
      <div className="info flex flex-col w-full justify-center gap-3">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl capitalize">{val && val?.title}</h1>
          <h2 className=" text-2xl capitalize">{val && val?.description}</h2>

          <h2 className=" text-2xl capitalize">{val && val?.category}</h2>
        </div>
        <div className="flex gap-5">
          <h2 className="font-medium text-2xl">{val && val?.price} RS </h2>

          <h2 className="font-medium text-2xl flex items-end gap-2">
            {val && val?.discountPercentage} % <p className="text-sm">off</p>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            className="border p-3 text-xl w-1/2"
            onClick={() => removeCart(val._id)}
          >
            Remove
          </button>
          <button className="border p-3 text-xl w-1/2">Save for later</button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState } from 'react';
import Summary from './Summary';
import CartList from './PayCart';
import { GetCartList } from '../../../services/Api.Servicer';
import { AppDispatch, useAppSelector } from '../../../app/redux/store';

import {
  checkLocalStorageUser,
  userAction,
} from '../../../app/redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
export default function page() {
  const [cartList, setCartList] = useState<any>();
  const [afterDelete, setAfterDelete] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    checkLocalStorageUser();
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      console.log('storedUser', storedUser);
      dispatch(userAction.setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]); // Make sure to include dispatch in the dependency array

  useEffect(() => {
    const fetchCart = async () => {
      const response = await GetCartList(User._id);
      setCartList(response?.data?.cartAdded);
      dispatch(userAction.setUser(response?.data));

      localStorage.setItem('User', JSON.stringify(response?.data));
    };
    let User: any = localStorage.getItem('User');

    if (User) {
      User = JSON.parse(User);
      fetchCart();
    }
  }, [afterDelete, dispatch]);

  return (
    <div className="flex mt-20 ">
      <CartList
        cartList={cartList && cartList}
        setAfterDelete={setAfterDelete}
        afterDelete={afterDelete}
      />
      <Summary cartList={cartList && cartList} />
    </div>
  );
}

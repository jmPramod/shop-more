/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Suspense, useEffect, useState } from 'react';
import Summary from './Summary';
import CartList from './PayCart';
import { GetCartList, profileUpdate } from '../../../services/Api.Servicer';
import { AppDispatch, useAppSelector } from '../../redux/store';

import {
  fetchInitialUser,
  userAction,
} from '../../redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
import LoginModel from './../../components/loginModel/LoginModel';
import Loading from './loading';
import { fetchCartProduct } from '../../redux/slice/productSlice';
export default function page() {
  // const [cartList, setCartList] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();
  const [loginModel, setLoginModel] = useState(false);
  const user = useAppSelector((state) => state.persistedReducer.userList.user);

  const cartList = useAppSelector(
    (state) => state.persistedReducer.productList.Product
  );
  const [cartLoading, setLoading] = useState(true);
  // const [loding];

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      let id = JSON.parse(storedUser);
      dispatch(fetchInitialUser(id._id));

      ////dispatch(userAction.setUser(JSON.parse(storedUser)));
    }
  }, []); // Make sure to include dispatch in the dependency array

  useEffect(() => {
    const fetchCart = async () => {
      if (User && User._id) {
        dispatch(fetchCartProduct(User._id));
        // const response = await GetCartList(User._id);

        // setCartList(response?.data?.cartAdded);
      }
    };

    let User: any = localStorage.getItem('User');
    if (User) {
      User = JSON.parse(User);
    }

    if (User && User?._id) {
      fetchCart();
    }
    setLoading(false);
  }, [loginModel]);
  useEffect(() => {
    if (user === null || (user && Object?.keys(user).length <= 0)) {
      setLoginModel(true);
    } else {
      setLoginModel(false);
    }
  }, [user, loginModel]);
  useEffect(() => {}, [loginModel]);
  return (
    <>
      <Suspense fallback={'loading.....'}>
        {loginModel ? (
          <>
            <LoginModel setShowLogin={setLoginModel} title={'Cart'} />
          </>
        ) : (
          <div className="flex mt-20  flex-col md:flex-row">
            <CartList
              cartList={cartList && cartList}
              cartLoading={cartLoading}
              // setCartList={setCartList}
            />
            <Summary cartList={cartList && cartList} />
          </div>
        )}
      </Suspense>
    </>
  );
}

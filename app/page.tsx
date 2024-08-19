'use client';

import { useDispatch } from 'react-redux';
import {
  fetchInitialUser,
  userAction,
} from './redux/slice/loginSlice';
import { useEffect } from 'react';
import { AppDispatch, useAppSelector } from './redux/store';
import Home from './(pages)/Home';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const products = useAppSelector((state) => state.persistedReducer.userList);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    console.log('storedUser', storedUser);
    if (storedUser) {
      let id = JSON.parse(storedUser);
      dispatch(fetchInitialUser(id._id));

      ////dispatch(userAction.setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]); // Make sure to include dispatch in the dependency array

  return (
    <div className="bg-[#f4f1ea]">
      <Home />
    </div>
  );
}

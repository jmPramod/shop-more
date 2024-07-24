'use client';

import { useDispatch } from 'react-redux';
import { checkLocalStorageUser, userAction } from './redux/slice/loginSlice';
import { useEffect } from 'react';
import { AppDispatch, useAppSelector } from './redux/store';
import Home from './(pages)/Home';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const products = useAppSelector((state) => state.userList);

  useEffect(() => {
    checkLocalStorageUser();
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      console.log('storedUser', storedUser);
      dispatch(userAction.setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]); // Make sure to include dispatch in the dependency array

  return (
    <div className="bg-[#f4f1ea]">
      <Home />
    </div>
  );
}

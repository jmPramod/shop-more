'use client';

import { useEffect } from 'react';
import Summary from './Summary';
import CartList from './PayCart';
export default function page() {
  return (
    <div className="flex mt-20 ">
      <CartList />
      <Summary />
    </div>
  );
}

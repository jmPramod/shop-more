'use client';

import { useEffect } from 'react';
import Summary from './Summary';
import PayCart from './PayCart';
export default function page() {
  return (
    <div className="flex">
      <Summary />
      <PayCart />
    </div>
  );
}

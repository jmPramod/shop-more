'use client';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import MobileNav from './MobileNav';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
const ResponsiveNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  const openMobView = () => setMobileView(!mobileView);
  const closeMobView = () => setMobileView(!mobileView);
  const renderNavbar = () => {
    if (
      pathname === '/login' ||
      pathname === '/register' ||
      pathname.includes('password-reset') ||
      pathname.includes('forgot-password')
    ) {
      return <></>;
    } else {
      return (
        <div>
          <Nav openMobView={openMobView} />
          <MobileNav mobileView={mobileView} closeMobView={closeMobView} />
        </div>
      );
    }
  };

  return <>{renderNavbar()}</>;
};

export default ResponsiveNav;

'use client';
import React, { useEffect, useState } from 'react';
// import SlideMenu from './slider/SlideMenu';
// import Footer from './Footer/Footer';
// import ProductCard from './PopularProduct/PopularCard';
import { sortProducts } from '@/services/Api.Servicer';
import { filterProducts } from './../../services/Api.Servicer';
import Footer from '../(navbar)/Footer/Footer';
import ProductCard from '../(products)/PopularProduct/PopularCard';
import SlideMenu from '../(navbar)/slider/SlideMenu';

const Home = () => {
  const [popularProduct, setPopularProduct] = useState();
  const [smartPhone, setSmartPhone] = useState();
  const [topDeal, setTopDeal] = useState(); //most discounted product

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [response1, response2] = await Promise.all([
        sortProducts('rating', -1),
        filterProducts('', '', 'smartphones', '', '', ''),
      ]);
      if (response1) {
        setPopularProduct(response1.data);
      }
      if (response2) {
        setSmartPhone(response2.data);
      }
      setLoading(false);
    };

    fetch();
  }, []);
  return (
    <div className="overflow-hidden ">
      <SlideMenu />
      <ProductCard
        data={popularProduct}
        title="Most Popular Product"
        loading={loading}
      />
      <Footer />
    </div>
  );
};

export default Home;

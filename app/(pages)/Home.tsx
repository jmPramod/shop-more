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
  const [homeDecorativeProduct, setHomeDecorativeProduct] = useState();
  const [laptopProduct, setLaptopProduct] = useState();
  const [topDeal, setTopDeal] = useState(); //most discounted product

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('pramod', process.env.NEXT_PUBLIC_BASE_URL);
    const fetch = async () => {
      const [
        response1,
        smartphoneResponse,
        laptopResponse,
        homeDecorativeResponse,
      ] = await Promise.all([
        sortProducts('rating', -1),
        filterProducts('', '', 'smartphones', '', '', ''),

        filterProducts('', '', 'laptops', '', '', ''),

        filterProducts('', '', 'home-decoration', '', '', ''),
      ]);
      if (response1) {
        setPopularProduct(response1.data);
      }
      if (smartphoneResponse) {
        setSmartPhone(smartphoneResponse.data);
      }
      if (laptopResponse) {
        setLaptopProduct(laptopResponse.data);
      }
      if (homeDecorativeResponse) {
        setHomeDecorativeProduct(homeDecorativeResponse.data);
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
      <ProductCard data={smartPhone} title="SmartPhones" loading={loading} />
      <ProductCard data={laptopProduct} title="Laptops" loading={loading} />
      <ProductCard
        data={homeDecorativeProduct}
        title="Home Decoration"
        loading={loading}
      />
      <Footer />
    </div>
  );
};

export default Home;

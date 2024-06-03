'use client';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';
import CardSkeliton from './CardSkeliton';
import { ProductType } from './../../utils/types';

const ProductCard = (props: any) => {
  const { data, title, loading } = props;
  // State to hold the number of items to display in the skeleton
  const [skeletonItems, setSkeletonItems] = useState<number>(5);
  useEffect(() => {
    // Update the number of skeleton items based on screen size
    const updateSkeletonItems = () => {
      if (window.innerWidth < 1024) {
        setSkeletonItems(2); // Change to 2 for medium screens
      } else {
        setSkeletonItems(5); // Default to 5 for other screen sizes
      }
    };

    // Initial update
    updateSkeletonItems();

    // Event listener to update on screen resize
    window.addEventListener('resize', updateSkeletonItems);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSkeletonItems);
    };
  }, []);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    console.log('props:', data);
  }, [data]);

  return (
    <div className="w-[97%] px-5 mx-auto bg-[#f1f4f9]">
      <h1 className="my-5 text-3xl font-bold">{title}</h1>
      {loading ? (
        <>
          <div className="md:flex gap-[10px] hidden mx-[10px] items-center justify-between w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <CardSkeliton key={index} />
            ))}
          </div>
          <div className="flex gap-[10px] md:hidden mx-[10px] items-center justify-between w-full">
            {Array.from({ length: 2 }).map((_, index) => (
              <CardSkeliton key={index} />
            ))}
          </div>
        </>
      ) : !Array.isArray(data) || data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          ssr={true}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="ease-in-out .5"
          transitionDuration={500}
          centerMode={false}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {data.map((val: ProductType, index: number) => (
            <Card product={val} key={index} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCard;

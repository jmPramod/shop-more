/* eslint-disable @next/next/no-img-element */
'use client';
import { ProductType } from '../../../../app/utils/types';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProductsCategory } from './../../../../services/Api.Servicer';
// import { getProductsCategory } from './../../../services/Api.Servicer';
// import { ProductType } from './../../utils/types';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductImageSlider = (props: any) => {
  return (
    <div>
      {props.loading ? (
        <div
          role="status"
          className="h-full md:h-[78vh] w-full space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center ml-0    md:ml-[20px] "
        >
          <div className="h-[40vh] md:h-[70vh]  md:flex items-center justify-center w-[90%] m-auto md:w-full bg-gray-300 rounded  dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
      ) : (
        props?.images && (
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={false}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false} //
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            centerMode={false}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={[
            //   'tablet',
            //   'mobile',
            //   'desktop',
            //   'superLargeDesktop',
            // ]}
            //   deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {props?.images &&
              props?.images.map((val: any, index: any) => (
                <div
                  key={index}
                  className="w-full  flex items-center justify-center gap-5   mt-2 p-5"
                >
                  {/* image */}
                  <img src={val} alt="" className=" md:block w-[90%]" />
                </div>
              ))}
          </Carousel>
        )
      )}
    </div>
  );
};

export default ProductImageSlider;

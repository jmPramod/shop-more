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
  const [category, setCategory] = useState([] as ProductType[]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductsCategory();
      if (response) {
        setCategory(response.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <div
          role="status"
          className="h-[62vh] md:h-[78vh] w-full space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center  bg-blue-950  mt-[70px] "
        >
          <div className="h-[80vh] md:h-[70vh] hidden md:flex items-center justify-center w-[50%]  bg-gray-300 rounded  dark:bg-gray-700">
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

          {/* information */}
          <div className="p-5 w-full md:w-[50%] flex flex-col  justify-center  md:items-start gap-[2%] md:gap-[10%]  h-full">
            <div className="h-[30px] md:h-[40px] font-semibold w-[30%] bg-gray-200 "></div>
            <div className="w-full">
              <div className="h-[40px] bg-gray-200 w-[20%]  dark:bg-gray-700  mb-2.5"></div>
              <div className="h-[40px] bg-gray-200 w-[50%]  dark:bg-gray-700 mb-2.5"></div>
            </div>
            <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-[40px] bg-gray-200 w-[20%]  dark:bg-gray-700  mb-2.5"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : props?.images ? (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          showDots={false}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={true} //
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
                <img src={val} alt="" className="hidden md:block w-[90%]" />
              </div>
            ))}
        </Carousel>
      ) : (
        'no image found '
      )}
    </div>
  );
};

export default ProductImageSlider;

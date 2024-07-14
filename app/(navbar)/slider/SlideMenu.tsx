/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProductsCategory } from './../../../services/Api.Servicer';
import { ProductType } from './../../utils/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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

const SlideMenu = () => {
  const [category, setCategory] = useState([] as ProductType[]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
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
      {loading || true ? (
        <div
          role="status"
          className="w-full h-[71vh] flex items-center justify-center gap-5  bg-blue-950 mt-[80px] p-7 flex-col md:flex-row"
        >
          <div className="h-[80vh] md:h-full  flex items-center justify-center w-full md:w-[50%]  bg-gray-300 rounded  dark:bg-gray-700 ml-0 md:ml-7">
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
          <div className="p-0 md:p-5 w-full  md:w-[50%] flex flex-col  justify-center  md:items-start gap-[5px] md:gap-[10%]  h-full">
            <div className="h-[24px] md:h-[40px] font-semibold w-[30%] bg-gray-200 "></div>
            <div className="w-full">
              <div className="h-[30px] md:h-[40px] bg-gray-200 w-[20%]  dark:bg-gray-700  mb-2.5"></div>
              <div className="h-[30px] md:h-[40px] bg-gray-200 w-[50%]  dark:bg-gray-700 mb-2.5"></div>
            </div>
            <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 w-full rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-[30px] md:h-[40px] bg-gray-200 w-[20%]  dark:bg-gray-700  mb-2.5"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          showDots={true}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true} //
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          centerMode={false}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[
            'tablet',
            'mobile',
            'desktop',
            'superLargeDesktop',
          ]}
          //   deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {category?.length > 0 &&
            category.map((val: any, index: any) => (
              <motion.div
                // animate={{ scale: 1 }}
                // initial={{ scale: 0.9 }}
                // transition={{ delay: 1 }}
                key={index}
                className="w-full h-[71vh] flex items-center justify-center gap-5  bg-blue-950 mt-[80px] p-7 flex-col md:flex-row"
              >
                {/* image */}
                <motion.div
                  animate={{ scale: 1 }}
                  initial={{ scale: 0.8 }}
                  transition={{ delay: 1 }}
                  className=" flex w-full  md:w-[50%] h-auto   md:h-full items-center justify-center bg-white "
                >
                  <motion.img
                    src={val.thumbnail?.imageUrl}
                    animate={{ scale: 1 }}
                    initial={{ scale: 0.8 }}
                    transition={{ delay: 1 }}
                    alt=""
                    className=" md:block  h-full md:w-1/2 max-w-[90%] md:max-w-[100%] "
                  />
                </motion.div>

                {/* information */}
                <motion.div
                  animate={{ scale: 1 }}
                  initial={{ scale: 0.8 }}
                  transition={{ delay: 1 }}
                  className="w-full h-auto md:w-[50%] md:h-full flex flex-col  items-start justify-start md:justify-between"
                >
                  <h1 className="text-[20px] md:text-[40px] font-semibold text-yellow-400 capitalize">
                    {val.title}
                  </h1>
                  <h1 className=" text-[30px]  capitalize md:text-[60px] leading-[40px]  md:leading-[70px] text-white font-bold  md:text-left text-justify">
                    Best
                    <br className="hidden md:block" /> {val.category}{' '}
                  </h1>
                  <p className="text-[20px] md:text-[20px] font-semibold text-opacity-70 py-3 text-white md:text-left text-justify">
                    {val.description}{' '}
                  </p>
                  <button
                    className="mt-3 px-8 py-3 text-xl bg-green-500 transition-all duration-200 space-x-2 text-white rounded-lg"
                    onClick={() => {
                      router.push(`/product/${val._id}`);
                      setButtonLoading(true);
                    }}
                  >
                    {buttonLoading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      'Take me there'
                    )}
                  </button>
                </motion.div>
              </motion.div>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default SlideMenu;

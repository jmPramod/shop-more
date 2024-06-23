/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { LoginModel } from './../../components/loginModel/LoginModel';
import { AppDispatch } from '../../../app/redux/store';
import { checkLocalStorageUser } from '../../../app/redux/slice/loginSlice';
const page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [checkLogin, setCheckLogin] = useState(false);
  const products = useSelector((state: any) => state.userList.user);
  useEffect(() => {
    if (Object?.keys(products)?.length === 0) {
      setCheckLogin(true);
    } else {
      setCheckLogin(false);
    }
  }, [products]);
  useEffect(() => {
    dispatch(checkLocalStorageUser());
  }, [dispatch]); // Make sure to include dispatch in the dependency array

  const initialValuesForRegister = {
    name: '',
    secondName: '',
    address: '',
    phone: '',
    pinCode: '',
    reEnterPassword: '',
  };
  const validationSchemaForRegister = Yup.object({
    name: Yup.string().required('Name is required'),
    secondName: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone is required'),
    pinCode: Yup.string().required('Pin code is required'),
  });
  const handleSubmitForRegiter = (values: any) => {
    const payload = {
      name: 'string',
      secondName: 'string',
      email: 'string',
      phone: 'string',
      password: 'string',
    };
  };
  return (
    <>
      {checkLogin ? (
        <LoginModel />
      ) : (
        <div className="w-full h-full mt-[77px] items-center flex justify-center flex-col gap-4">
          <div className="flex md:w-full justify-center py-10 items-center bg-white gap-3">
            <div className="relative flex  items-end">
              <Image
                width={200}
                height={200}
                className="  rounded-full"
                src="https://res.cloudinary.com/dtvq8ysaj/image/upload/v1711554275/profileImage_l8dleh.png"
                alt="Rounded avatar"
              />
              <FaEdit size={25} />
            </div>
            <Formik
              initialValues={initialValuesForRegister}
              validationSchema={validationSchemaForRegister}
              onSubmit={handleSubmitForRegiter}
            >
              <Form className="bg-white w-[60%]">
                <h1 className="text-gray-800 font-bold text-2xl mb-1 w-full">
                  Profile
                </h1>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <Field
                    type="text"
                    id="first_name"
                    className="pl-2  w-full outline-none border-none "
                    placeholder="First Name"
                    name="name"
                  />
                </div>
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="name"
                  component="div"
                />
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                  <Field
                    type="text"
                    id="first_name"
                    className="pl-2  w-full outline-none border-none  "
                    placeholder="Last Name"
                    name="secondName"
                  />
                </div>
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="secondName"
                  component="div"
                />
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <Field
                    type="text"
                    id="first_name"
                    className="pl-2  w-full outline-none border-none  "
                    placeholder="Phone Number"
                    name="phone"
                  />
                </div>
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="phone"
                  component="div"
                />
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2">
                  {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
              >
                <path d="M14.707 4.293a1 1 0 0 1 1.414 1.414L10 11.414l-5.121-5.121a1 1 0 1 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 0 1 1.414 0z" />
                <path
                  fill-rule="evenodd"
                  d="M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5zm1 2.586l6.293 6.293a1 1 0 0 0 1.414 0L17 7.586V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.586z"
                  clip-rule="evenodd"
                />
              </svg> */}
                  <FaHome className="h-5 w-5 text-gray-400" />
                  <Field
                    type="text"
                    id="first_name"
                    className="pl-2  w-full outline-none border-none  "
                    placeholder="Address"
                    name="address"
                  />
                </div>
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="address"
                  component="div"
                />
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2">
                  <FaMapMarkedAlt />
                  <Field
                    type="text"
                    id="Pin_code"
                    className="pl-2  w-full outline-none border-none  "
                    placeholder="Enter PinCode"
                    name="pinCode"
                  />
                </div>
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="pinCode"
                  component="div"
                />

                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                  Register
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}{' '}
    </>
  );
};

export default page;

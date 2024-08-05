/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

import { FaBattleNet } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from './../../../services/Api.Servicer';
import { useSelector } from 'react-redux';
import { loginSlice, userAction } from '../../../app/redux/slice/loginSlice';
import { useAppSelector, AppDispatch } from '../../../app/redux/store';

const baseUrl = process.env.NEXT_PUBLIC_Base_url;
const LoginModel = (props: any) => {
  const { setShowLogin } = props;
  const [erroMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const products = useAppSelector((state) => state.userList);
  const [loadingButton, setLoadingButton] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const initialValuesForForgetPassword = {
    email: '',
  };
  const initialValuesForLogin = {
    email: '',
    password: '',
  };
  const validationSchemaForForgetPassword = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });
  const validationSchemaForLogin = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const handleSubmitForForgotPassword = async (values: any) => {
    setLoadingButton(true);

    setLoadingButton(false);
  };
  const handleSubmitForLogin = async (values: any) => {
    setLoadingButton(true);
    let user = await login(values);

    if (user && Object.keys(user?.data).length !== 0) {
      dispatch(userAction.setUser(user?.data));
      localStorage.setItem('User', JSON.stringify(user?.data));
      setShowLogin(false);
    } else {
      setErrorMsg(user?.message?.response?.data?.message);
    }
    setLoadingButton(false);
  };
  return (
    <>
      <div className=" h-[100%] flex items-center justify-center bg-black bg-opacity-50  absolute w-[100%]  top-0 z-[1500] pointer">
        <div className=" relative w-[90%] md:w-[40%] md:max-h-[100%] max-h-[30%] bg-white px-4 py-6">
          <div
            className="absolute top-2 right-4 text-right  text-2xl cursor-pointer font-bold "
            onClick={() => {
              setShowLogin(false);
            }}
          >
            X
          </div>

          <div className="flex w-[100%]  justify-center  items-center  flex-col m-auto">
            <Formik
              initialValues={initialValuesForLogin}
              validationSchema={validationSchemaForLogin}
              onSubmit={handleSubmitForLogin}
            >
              <Form className="bg-white w-full">
                <h1 className="text-gray-800 font-bold text-2xl mb-1 ">
                  Please login to {props.title}
                </h1>
                <p className="text-lg font-normal text-gray-600 mb-7">
                  Don't have an account yet?
                  <b
                    onClick={() => router.push('/register')}
                    className="cursor-pointer"
                  >
                    {' '}
                    <u>Sign up</u>{' '}
                  </b>{' '}
                </p>

                <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                  >
                    <path d="M14.707 4.293a1 1 0 0 1 1.414 1.414L10 11.414l-5.121-5.121a1 1 0 1 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 0 1 1.414 0z" />
                    <path
                      fillRule="evenodd"
                      d="M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5zm1 2.586l6.293 6.293a1 1 0 0 0 1.414 0L17 7.586V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7.586z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <Field
                    type="text"
                    id="first_name"
                    className="pl-2  w-full outline-none border-none"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="email"
                  component="div"
                />
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <Field
                    type="password"
                    id="password"
                    className="pl-2  w-full outline-none border-none"
                    placeholder="Enter password"
                    name="password"
                  />
                </div>
                <ErrorMessage
                  className="text-red-500 text-sm"
                  name="password"
                  component="div"
                />
                {!loadingButton ? (
                  <button
                    type="submit"
                    className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    disabled
                    type="button"
                    className=" w-full mt-3 py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-gray-300 rounded-lg border border-gray-200  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                )}
                <div className="border opacity-50 flex items-center justify-between">
                  <div> Demo email:test@test.com </div>
                  <div> Demo password:test@123</div>
                </div>
                {/* 
                <span
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                  onClick={() => {
                    router.push('forgot-password');
                  }}
                >
                  Forgot Password ?
                </span> */}
              </Form>
            </Formik>

            <h1 className="text-red-500">{erroMsg}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModel;

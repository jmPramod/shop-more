/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginSlice, userAction } from '../../../app/redux/slice/loginSlice';

import { registerUser } from './../../../services/Api.Servicer';
import { FaBattleNet } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const Register = () => {
  const dispatch = useDispatch();

  const [erroMsg, setErrorMsg] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const products = useSelector((state: any) => state.userList);
  const router = useRouter();
  const initialValuesForRegister = {
    name: '',
    secondName: '',
    email: '',
    phone: '',
    password: '',
    reEnterPassword: '',
    pinCode: '',
    address: '',
  };

  const validationSchemaForRegister = Yup.object({
    name: Yup.string().required('Name is required'),
    secondName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match') // Validate if re-entered password matches the password field
      .required('Please confirm your password'),
  });

  const handleSubmitForRegiter = async (values: any) => {
    let { reEnterPassword, ...a } = values;
   
    const payload = {
      name: 'string',
      secondName: 'string',
      email: 'string',
      phone: 'string',
      password: 'string',
    };

    setLoadingButton(true);
    let user = await registerUser(values);
   
    if (user && Object.keys(user?.data).length !== 0) {
    
      dispatch(userAction.setUser(user?.data));
      localStorage.setItem('User', JSON.stringify(user?.data));
      router.push('/');
    } else {
      setErrorMsg(user?.message?.response?.data?.message);
       }
    setLoadingButton(false);
  };

  return (
    <>
      <div className="h-screen md:flex  ">
        <div className="flex md:w-1/2 justify-center py-10 items-center flex-col bg-white relative">
          <div
            className="absolute flex items-center space-x-2 cursor-pointer top-2 left-4 border rounded-xl p-1"
            onClick={() => router.push('/')}
          >
            <FaBattleNet className="w-5 h-5 sm:w-10 sm:h-10 text-orange-300 " />
            <h1 className="text-sm sm:text-2xl font-bold">Shop More</h1>
          </div>
          <Formik
            initialValues={initialValuesForRegister}
            validationSchema={validationSchemaForRegister}
            onSubmit={handleSubmitForRegiter}
          >
            <Form className="bg-white w-[70%]">
              <h1 className="text-gray-800 font-bold text-2xl mb-1 w-full">
                Looks like you're new here!
              </h1>
              <p className="text-lg font-normal text-gray-600 mb-7 w-full">
                Already have an account?
                <b
                  onClick={() => router.push('/login')}
                  className="cursor-pointer"
                >
                  <u>Login</u>
                </b>
              </p>

              <div className="flex gap-2 w-full">
                <div className="w-[50%]">
                  <>
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
                  </>
                  <>
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
                  </>
                  <>
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
                  </>
                  <>
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
                        id="Address"
                        className="pl-2  w-full outline-none border-none  "
                        placeholder="Address"
                        name="address"
                      />
                    </div>
                  </>
                </div>

                <div className="w-[50%]">
                  <>
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
                        id="PinCode"
                        className="pl-2  w-full outline-none border-none  "
                        placeholder="Pin Code"
                        name="pinCode"
                      />
                    </div>
                  </>
                  <>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2">
                      <svg
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
                      </svg>

                      <Field
                        type="text"
                        id="first_name"
                        className="pl-2  w-full outline-none border-none  "
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name="email"
                      component="div"
                    />
                  </>
                  <>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <Field
                        type="text"
                        id="first_name"
                        className="pl-2  w-full outline-none border-none  "
                        placeholder="Enter password"
                        name="password"
                      />
                    </div>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name="password"
                      component="div"
                    />
                  </>
                  <>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <Field
                        type="text"
                        id="first_name"
                        className="pl-2  w-full outline-none border-none  "
                        placeholder="Re-enter password"
                        name="reEnterPassword"
                      />
                    </div>
                    <ErrorMessage
                      className="text-red-500 text-sm"
                      name="reEnterPassword"
                      component="div"
                    />
                  </>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div className="absolute z-100 text-white border rounded-md p-1 top-[6%] left-[7%]">
            {' '}
          </div>
          <div>
            <Image
              src="/images/login1.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
      </div>
    </>
  );
};

export default Register;

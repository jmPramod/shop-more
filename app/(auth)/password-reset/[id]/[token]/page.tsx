/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGSAP } from '@gsap/react';
import { EnterResetPasssword } from './../../../../../services/Api.Servicer';
const page = (props: any) => {
  const initialValuesForForgot = {
    reEnterPassword: '',
    password: '',
  };

  const validationSchemaForforgot = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Please confirm your password'),
  });
  const box: any = useRef();

  const handleSubmitForgot = async (values: any) => {


    const payload = {
      password: values.password,
    };
    const id = props.params.id;
    const token = props.params.token;
    await EnterResetPasssword(payload, id, token);

    // setLoadingButton(true);
    // let user = await registerUser(values);

    // if (user && Object.keys(user?.data).length !== 0) {
    //   dispatch(userAction.setUser(user?.data));
    //   localStorage.setItem('User', JSON.stringify(user?.data));
    //   router.push('/');
    // } else {
    //   setErrorMsg(user?.message?.response?.data?.message);
    // }
    // setLoadingButton(false);
  };
  //   useGSAP(
  //     () => {
  //       gsap.from('.circle1', {
  //         y: -100,
  //         duration: 3,
  //         stagger: 0.4,
  //         opacity: 0,
  //       });
  //     }
  //     // ,{ scope: box }
  //   );
  useGSAP(() => {
    gsap.from('.circle1', {
      y: -100,
      duration: 3,
      stagger: 0.4,
      opacity: 0,
    });
    gsap.from('.circle4', {
      y: 100,
      duration: 3,
      stagger: 0.4,
      opacity: 0,
    });
    gsap.from('.circle3', {
      x: 100,
      duration: 3,
      stagger: 0.1,
      opacity: 0,
    });

    gsap.from('.circle2', {
      x: -100,
      duration: 3,
      stagger: 0.2,
      opacity: 0,
    });
  });

    return (
    <div
      className="w-full  flex items-center justify-center bg-gray-300"
      style={{ height: ' calc(100vh - 70px)' }}
    >
      <Formik
        initialValues={initialValuesForForgot}
        validationSchema={validationSchemaForforgot}
        onSubmit={handleSubmitForgot}
        className="w-full h-full"
      >
        <Form
          //   useRef={box}
          className="bg-white w-[100%] flex items-center justify-center flex-col max-w-[40%] border p-4 min-h-[70%] rounded-md"
        >
          <h1 className="circle1 text-3xl font-bold py-4 ">
            Resetting Your Password
          </h1>
          <div className="circle2 w-full  ">
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl w-full  bg-white mt-2">
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
                className="pl-2  w-full outline-none border-none "
                placeholder="Enter password"
                name="password"
              />
            </div>
            <ErrorMessage
              className="text-red-500 text-sm"
              name="password"
              component="div"
            />
          </div>
          <div className="circle3 w-full  ">
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl w-full bg-white  mt-2">
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
          </div>

          <button
            type="submit"
            className="circle4 block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Update
          </button>
        </Form>
      </Formik>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default page;

'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Page = ({ params }: { params: { slug: string[] } }) => {
  console.log(params.slug);
  const initialValuesForRegister = {
    password: '',
    reEnterPassword: '',
  };
  const validationSchemaForRegister = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match') // Validate if re-entered password matches the password field
      .required('Please confirm your password'),
  });
  const handleSubmitForRegister = (values: any) => {
    const payload = {
      reEnterPassword: 'string',
      password: 'string',
    };
    console.log('values', values);
  };

  return (
    <div className="w-full h-[90.5vh] flex items-center justify-center bg-slate-300 absolute">
      <div className="border-2 w-[80%] sm:w-[30%] h-[50%]  sm:min-h-[400px] bg-white ">
        <h1 className="text-center text-2xl mx-2 pt-4  bold">
          Reset your Password{' '}
        </h1>
        <Formik
          initialValues={initialValuesForRegister}
          validationSchema={validationSchemaForRegister}
          onSubmit={handleSubmitForRegister}
        >
          <Form className="bg-white w-full h-[85%]   flex items-center gap-2 justify-center flex-col ">
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2 w-[80%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd" // Changed attribute name to camelCase
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Field
                type="text"
                id="password"
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
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl  mt-2 w-[80%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd" // Changed attribute name to camelCase
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd" // Changed attribute name to camelCase
                />
              </svg>
              <Field
                type="text"
                id="reEnterPassword" // Adjusted ID
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

            <button
              type="submit"
              className="  w-[80%] bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Reset
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Page;

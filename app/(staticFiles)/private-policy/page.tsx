'use client';
import React from 'react';
import Footer from '../../../app/(navbar)/Footer/Footer';
const page = () => {
  let privacy = [
    {
      title: 'Objective',
      description:
        'Welcome to Shop More We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our or make a purchase.',
    },
    {
      title: 'Information We Collect',

      description: `Personal Information: Name, email address, phone number, and payment details when you make a purchase or sign up for our newsletter#
      Non-Personal Information: IP address, browser type, operating system, and browsing behavior through cookies and other tracking technologies.`,
    },
    {
      title: 'How We Use Your Information',

      description:
        'To Process Transactions: We use your personal information to process and fulfill your orders.#To Improve Our Services: Non-personal data helps us understand how users interact with our site and enhance their experience.#To Communicate with You: We may send you updates, promotional materials, or respond to your inquiries.',
    },
    {
      title: 'Sharing Your Information',

      description:
        'Third-Party Service Providers: We may share your information with third-party vendors who assist with payment processing, shipping, and marketing.#Legal Requirements: We may disclose information if required by law or to protect our rights, privacy, safety, or property.',
    },
    {
      title: 'Data Security',

      description:
        'We implement various security measures to protect your personal information from unauthorized access, alteration, or disclosure.',
    },
    {
      title: 'Your Rights',

      description:
        'Access and Correction: You can access and update your personal information by logging into your account.#Opt-Out: You can opt out of receiving marketing communications at any time by following the unsubscribe instructions in those emails.',
    },
    {
      title: 'Cookies',

      description:
        'Our site uses cookies to enhance your browsing experience. You can manage cookie preferences through your browser settings.',
    },
    {
      title: 'Changes to This Policy',

      description:
        'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
    },
    {
      title: 'Contact Us',

      description:
        'If you have any questions or concerns about this Privacy Policy, please contact us at helpcustomer94@gmail.com.',
    },
  ];
  function TextDecorator(str: string) {
    let text = str.split('#');

    let d = text.map((v: string, i: number) => {
      let str1 = v.split(':');

      if (str1.length > 1) {
        return (
          <li className="" key={i}>
            {str1[0]} {':'}
            {str1[1]}
          </li>
        );
      } else {
        return <li key={i}>{v}</li>;
      }
    });

    return d;
  }
  return (
    <>
      <div className="p-5">
        <h1 className="my-2 font-bold text-4xl mt-[90px]">Private Policy</h1>
        <div className=" flex flex-col items-center justify-center ">
          {privacy.map(
            (val: { title: string; description: string }, index: number) => (
              <div key={index} className="w-full my-2">
                <u className="text-2xl  ">{val.title}</u>
                <ul className="">{TextDecorator(val.description)}</ul>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;

import React from 'react';
import Footer from '../../(navbar)/Footer/Footer';
const page = () => {
  const data = [
    {
      title: 'Introduction',
      description:
        'Welcome to Shop More! By using our website https://shop-more-fe.netlify.app, you agree to comply with and be bound by the following Terms of Service.',
    },
    {
      title: 'Use of the Site',
      description:
        'Eligibility: You must be at least 18 years old to make a purchase. By using our site, you represent that you meet this requirement.#Account Responsibilities: You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
    },

    {
      title: 'Product Information and Pricing',
      description:
        'Accuracy: We strive to ensure that product descriptions and pricing are accurate. However, errors may occur, and we reserve the right to correct them.#Availability: All products are subject to availability. We may limit the quantity of products you can purchase.',
    },
    {
      title: 'Orders and Payments',
      description:
        'Order Acceptance: We reserve the right to accept or reject any order for any reason.#Payment: Payments are processed through secure payment gateways. You agree to provide accurate payment information.',
    },
    {
      title: 'Shipping and Delivery',
      description:
        'Shipping Times: We provide estimated shipping times but are not responsible for delays caused by carriers.#Risk of Loss: Risk of loss or damage to products passes to you upon delivery.',
    },
    {
      title: 'Returns and Refunds',
      description:
        'Return Policy: Please refer to our Return Policy for information on how to return items and obtain refunds.',
    },
    {
      title: 'Intellectual Property',
      description:
        'All content on our website, including text, images, and logos, is the property of Shop More or its licensors and is protected by intellectual property laws.',
    },
    {
      title: 'Limitation of Liability',
      description:
        'We are not liable for any indirect, incidental, or consequential damages arising from your use of our site or products.',
    },
    {
      title: 'Governing Law',
      description:
        'These Terms of Service are governed by the laws of India. Any disputes will be resolved in the courts .',
    },
    {
      title: 'Changes to Terms',
      description:
        'We may update these Terms of Service at any time. Changes will be effective immediately upon posting.',
    },
    {
      title: 'Contact Us',
      description:
        'For questions about these Terms of Service, please contact us at helpcustomer94@gmail.com or +91 9902400054',
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
        <h1 className="my-2 font-bold text-4xl mt-[90px]">
          Terms and Conditions
        </h1>
        <div className=" flex flex-col items-center justify-center ">
          {data.map(
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

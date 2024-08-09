import React from 'react';

import Footer from '../../../app/(navbar)/Footer/Footer';
const page = () => {
  const data = [
    {
      title: 'We’d Love to Hear From You!',
      description:
        'At Shop More, we are committed to providing excellent customer service. If you have any questions, concerns, or feedback, please feel free to reach out to us using the contact methods below.',
    },
    {
      title: 'Contact Information',
      description:
        'Customer Service Email:helpcustomer94@gmail.com #Phone Number: +919902400054#Business Hours: Monday - Friday, 9AM - 6PM ',
    },
    {
      title: 'Mailing Address',
      description:
        'If you need to send us a letter or return an item via mail, please use the following address:#Shop#Nanjappa Layout#Shimoga, Karnataka, 577202 #India',
    },
    {
      title: 'Contact Form',
      description:
        'Please fill out the Information below, and send it to helpcustomer94@gmail.com, we will get back to you as soon as possible.#Name: [Your Name]#Email Address: [Your Email]#Phone Number: [Your Phone Number]#Order Number: [Your Order Number]#Subject: [Subject]#Message: [Your Query]',
    },
    // {
    //   title: 'Social Media',
    //   description:
    //     'Connect with us on social media for updates, promotions, and more:#Facebook: [Facebook URL]#Twitter: [Twitter URL]#Instagram: [Instagram URL]#LinkedIn: [LinkedIn URL]',
    // },
    {
      title: 'Support Hours',
      description:
        'Our support team is available during the following hours:#Monday - Friday: 9 AM - 6 PM #Saturday - Sunday: Closed',
    },
    {
      title: 'Feedback',
      description:
        'We value your feedback and are always looking to improve our services. Please share your thoughts with us through the contact form or by sending an email to helpcustomer94@gmail.com.',
    },
    {
      title: 'Response Time',
      description:
        'We strive to respond to all inquiries within 1 to 2 business days. If you need immediate assistance, please call us at +91 9902400054',
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
        <h1 className="my-2 font-bold text-4xl mt-[90px]">Contact Information</h1>
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

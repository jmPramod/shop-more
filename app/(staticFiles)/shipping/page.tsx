import React from 'react';
import Footer from '../../../app/(navbar)/Footer/Footer';
const page = () => {
  let data = [
    {
      title: 'Overview',
      description:
        'At Shop More, we strive to provide prompt and reliable shipping services. This Shipping & Delivery Policy outlines the details of our shipping practices, including shipping methods, delivery times, costs, and handling of shipping issues.  ',
    },
    {
      title: 'Shipping Methods',
      description:
        'Available Shipping Options: We offer various shipping methods including Standard Shipping, Expedited Shipping, and Overnight Shipping. Shipping options may vary based on your location and the items you purchase.#Shipping Carriers: We use reputable carriers such as [Carrier Names, e.g., UPS, FedEx, USPS, DHL] to ensure timely and secure delivery of your orders.',
    },
    {
      title: 'Shipping Costs',
      description:
        'Domestic Shipping: Shipping costs are calculated based on the weight and dimensions of your order, as well as your shipping location. The cost will be displayed at checkout.#International Shipping: For international orders, shipping costs will be calculated at checkout based on the destination and weight of the package. Duties and taxes may apply and are the responsibility of the recipient.',
    },
    {
      title: 'Delivery Times',
      description:
        'Processing Time: Orders are typically processed within 15 business days. Please note that processing times may vary during peak seasons or due to high order volumes.#Estimated Delivery Times:-#Standard Shipping: 2 to 7 business days.#Expedited Shipping: 1 to 2 business days.#Overnight Shipping: 1 business day (if ordered before 12 Am).#Delivery Delays: Delivery times are estimates and may be affected by factors such as weather conditions, carrier delays, or issues with customs for international shipments.    ',
    },
    {
      title: 'Order Tracking',
      description:
        'Tracking Information: Once your order has shipped, you will receive an email with tracking information and a link to track your package. You can also track your order by logging into your account on our website.',
    },
    {
      title: 'Shipping Restrictions',
      description:
        'Delivery Areas: We currently ship to India. If your location is not listed, please contact us to inquire about shipping options.#Restricted Items: Certain items may be subject to shipping restrictions or may not be available for delivery to certain locations.',
    },
    {
      title: 'Shipping Issues',
      description:
        'Lost or Stolen Packages: If your package is lost or stolen, please contact us at helpcustomer94@gmail.com or +91 9902400054 as soon as possible. We will assist you in resolving the issue with the carrier.#Damaged Packages: If you receive a damaged package, please contact us immediately at helpcustomer94@gmail.com or +91 9902400054 with your order number and details of the damage. We will work with you to resolve the issue.',
    },
    {
      title: 'Address Accuracy',
      description:
        'Correct Information: Please ensure that your shipping address is accurate and complete before placing your order. We are not responsible for delays or issues resulting from incorrect or incomplete address information.',
    },
    {
      title: 'Changes to Shipping Policy',
      description:
        'We may update this Shipping & Delivery Policy from time to time. Any changes will be posted on this page with an updated effective date.',
    },
    {
      title: 'Contact Us',
      description:
        'If you have any questions about our Shipping & Delivery Policy or need assistance with your order, please contact us at helpcustomer94@gmail.com or +91 9902400054.',
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

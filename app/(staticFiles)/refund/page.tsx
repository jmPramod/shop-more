import Footer from '../../../app/(navbar)/Footer/Footer';
import React from 'react';

const page = () => {
  const data = [
    {
      title: 'Overview',
      description:
        'At Shop More, we want you to be fully satisfied with your purchase. This Refund & Cancellation Policy outlines the terms and conditions under which refunds and cancellations are processed.',
    },
    {
      title: 'Order Cancellation',
      description:
        'Eligibility for Cancellation: Orders can be canceled within 6 to 12 hours of placement. After this period, we may not be able to cancel your order, as it might already be in processing or shipping.#How to Cancel: To cancel an order, please contact our customer service team at helpcustomer94@gmail.com with your order number and request for cancellation.#Refunds for Canceled Orders: If your cancellation request is approved, you will receive a full refund to your original payment method.',
    },
    {
      title: ' Refunds',
      description:
        'Eligibility for Refunds: Refunds are available for items returned within 7 days of receipt, provided the items are unused, in their original packaging, and meet our return criteria.#Non-Refundable Items: Certain items are non-refundable (mentioned below the product), including but not limited to, perishable goods, personalized items, and items marked as final sale.#How to Request a Refund: To request a refund, please initiate a return by contacting our customer service team at helpcustomer94@gmail.com or +919902400054 and provide your order number, reason for the return, and details of the item(s) being returned.#Refund Process: Once we receive and inspect your returned item(s), we will process your refund. The refund will be issued to the original payment method within 7 to 10 days. Please note that it may take additional time for your bank or credit card company to process the refund',
    },
    {
      title: 'Exchanges',
      description:
        'Eligibility for Exchanges: Exchanges are accepted within 7 days of receipt for items of equal or lesser value, provided the items are unused, in their original packaging, and meet our return criteria.#How to Request an Exchange: To request an exchange, please contact our customer service team at helpcustomer94@gmail.com or +91 9902400054 with your order number, details of the item(s) you wish to exchange, and the reason for the exchange.#Shipping Costs: You will be responsible for the shipping costs associated with returning the item(s) and receiving the exchanged item(s), unless the exchange is due to an error on our part or a defective product.',
    },
    {
      title: 'Damaged or Defective Items',
      description:
        'Reporting Issues: If you receive a damaged or defective item, please contact us immediately at helpcustomer94@gmail.com or +91 9902400054 with your order number and details of the issue.#Resolution: We will work with you to resolve the issue by offering a replacement, repair, or refund based on the nature of the problem and your preference.',
    },
    {
      title: 'Changes to the Policy',
      description:
        'We may update this Refund & Cancellation Policy from time to time. Any changes will be posted on this page with an updated effective date.',
    },
    {
      title: 'Contact Us',
      description:
        'If you have any questions about our Refund & Cancellation Policy, please contact us at helpcustomer94@gmail.com or +91 9902400054.',
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
        <h1 className="my-2 font-bold text-4xl mt-[90px]">Refund Policy</h1>
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

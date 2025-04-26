'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Script from "next/script";
import Topbar from '../component/Topbar';
import Footer from '../component/Footer';

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.addtocart.cart);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let totalPrice = 0;
    product.forEach((p: any) => {
      totalPrice += p.quantity * p.proPrice;
    });
    setTotal(totalPrice);
  }, [product]);

  const createOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: total * 100 }), // Convert to paise
    });
    const data = await res.json();

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: total * 100,
      currency: "INR",
      order_id: data.id,
      handler: async function (response: any) {
        const verifyRes = await fetch("/api/verifyOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });

        const result = await verifyRes.json();
        if (result.isOk) {
          alert("✅ Payment successful");
        } else {
          alert("❌ Payment verification failed");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (typeof window !== "undefined" && (window as any).Razorpay) {
      const paymentObject = new (window as any).Razorpay(paymentData);
      paymentObject.open();
    } else {
      alert("Razorpay SDK not loaded.");
    }
  };

  return (
    <>
    <Topbar/>
    <div className="container mx-auto p-4">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:mr-4">
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <Image src={item.proImage} alt='product' width={50} height={50} />
                  </td>
                  <td className="px-4 py-2">{item.proName}</td>
                  <td className="px-4 py-2">Rs. {item.proPrice}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">Rs. {item.quantity * item.proPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-2xl font-bold mt-4">Total Price: Rs. {total}</h3>
        </div>

        <div className="w-full md:w-1/2 md:ml-4">
          <form className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">Address:</label>
              <input type="text" id="address" name="address" required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="pincode" className="block mb-2">Pincode:</label>
              <input type="text" id="pincode" name="pincode" required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2">Phone Number:</label>
              <input type="text" id="phoneNumber" name="phoneNumber" required className="w-full px-4 py-2 border rounded-md" />
            </div>
            <button
              onClick={createOrder}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Page;

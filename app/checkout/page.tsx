'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Script from 'next/script';
import Topbar from '../component/Topbar';
import Footer from '../component/Footer';
import { createOrder } from '../actions/CreateOrder';
import { verifyOrder } from '../actions/VerifyOrder';
import { Orderdatabase } from '../actions/Orderdatabase';
import { removeallProduct } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const product = useSelector((state: any) => state.addtocart.cart);
  const [total, setTotal] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [address, setAddress] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false); 

  useEffect(() => {
    setIsMounted(true); 

    const name =   typeof window !== 'undefined' ? localStorage.getItem('name') : null;
    const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
    setUserInfo({ name, email });
  }, []);

  useEffect(() => {
    const totalPrice = product.reduce((acc: number, item: any) => acc + item.quantity * item.proPrice, 0);
    setTotal(totalPrice);
  }, [product]);

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    

    const orderData = {
      user: {
        name: userInfo.name,
        email: userInfo.email,
        address,
        pincode,
        phoneNumber,
      },
      amount: total * 100, 
      products: product.map((item: any) => ({
        productId: item.id,
        productName: item.proName,
        quantity: item.quantity,
        price: item.proPrice,
        image: item.proImage,
      })),
    };

    try {
      const order = await createOrder(orderData.amount, orderData.user, orderData.products);

      const paymentData = {
        key: 'rzp_test_jzFpAn1XFch491',
        amount: order.amount,
        currency: 'INR',
        order_id: order.id,
        handler: async (response: any) => {
          const verifyRes = await verifyOrder(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,      
          );
          if (verifyRes.isOk) {
            const orderResponse = await Orderdatabase({response,orderData});
            if (orderResponse) {
              dispatch(removeallProduct({}));
              router.push('/pages/thankyou');
            } else {
              console.error('Order database error');
              alert(' Order database error');
            }
            alert(' Payment successful');
          } else {
            console.error('Payment verification failed');
            alert(' Payment verification failed');
          }
        },
        theme: { color: '#3399cc' },
      };

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const paymentObject = new (window as any).Razorpay(paymentData);
        paymentObject.open();
      } else {
        alert(' Razorpay SDK not loaded.');
      }
    } catch (err) {
      console.error('Error during payment handling:', err);
      alert(' Something went wrong. Please try again.');
    }
  };

  if (!isMounted) {
    return null; 
  }


  return (
    <>
      <Topbar />
      <div className="container mx-auto p-4">
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
                      <Image src={item.proImage} alt={item.proName} width={50} height={50} />
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

          {/* Shipping Details */}
          <div className="w-full md:w-1/2 md:ml-4">
            <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={userInfo.name}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={userInfo.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pincode" className="block mb-2">Pincode:</label>
                <input
                  type="text"
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block mb-2">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Proceed to Payment
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};

export default CheckoutPage;


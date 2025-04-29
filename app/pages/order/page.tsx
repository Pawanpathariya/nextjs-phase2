'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Orderdetails } from '../../actions/oderManage';

const Page: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await Orderdetails();
      if (response.orders) {
        setOrders(response.orders);
      }
    };
    loadData();

    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Orders</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders && orders
          .filter((order: any) => order.userEmail === email)
          .map((order: any, index: number) => (
            <div key={`order-${index}`} className="bg-white p-4 rounded-lg shadow-xl hover:shadow-3xl transition duration-150 ease-in-out">
              <p className="font-bold text-lg">Order Id: {order.id}</p>
              <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-gray-600">Total: ₹ {order.amount}</p>
              <div className="mt-4">
                <p className="font-bold text-lg">Products:</p>
                <ul className="list-disc pl-4">
                  {order.products && order.products.map((item: any, index: number) => (
                    <li key={`product-${index}`} className="flex items-center mb-2">
                      <Image src={item.image} alt={item.productName} className="w-12 h-12 mr-2 rounded-md" width={48} height={48} />
                      <div>
                        <p className="font-bold">{item.productName}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹ {item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600 capitalize">Payment Status: {order.paymentStatus}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;


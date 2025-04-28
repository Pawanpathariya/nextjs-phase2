'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Orderdetails } from '../../../actions/oderManage'; // Make sure spelling of 'orderManage' is correct!

const Page: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await Orderdetails();
      if (response.orders) {
        console.log(response.orders);
        setOrders(response.orders);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order Id</th>
            <th className="border p-2">User Name</th>
            <th className="border p-2">User Email</th>
            <th className="border p-2">Mobile number</th>
            <th className="border p-2">Order Date</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Products</th>
            <th className="border p-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order: any) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.userName}</td>
              <td className="border p-2">{order.userEmail}</td>
              <td className="border p-2">{order.phoneNumber}</td>
              <td className="border p-2">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="border p-2">₹ {order.amount}</td>
              <td className="border p-2">
                {order.products && order.products.map((item: any) => (
                  <div key={item.id} className="flex items-center mb-2">
                    <Image src={item.image} alt={item.productName} className="w-12 h-12 mr-2 rounded-md" width={48} height={48} />
                    <div>
                      <p className="font-bold">{item.productName}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹ {item.price}</p>
                    </div>
                  </div>
                ))}
              </td>
              <td className="border p-2 capitalize">{order.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;


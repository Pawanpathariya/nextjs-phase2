'use client'
import { getProductAdmin } from '../../../actions/getProductAdmin';
import { useEffect, useState } from 'react';
import { Editproduct } from '../../../actions/editaction';
import Image from 'next/image';
import { ChangeStatus } from '../../../actions/acceptReject';

const initialState = {
  success: false,
  error: '',
  product: null,
};

const Page: React.FC = () => {
  const [product, setProduct] = useState<any>([]);
  const [editdata, setEditData] = useState<any>({});
  const [edit, setEdit] = useState(true);

  const loadData = async () => {
    const response = await getProductAdmin();
    console.log(response?.products);
    setProduct(response?.products);
  };
  


  const handleChangeStatus = async (id, stat) => {
    await ChangeStatus({ id, stat });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className='w-full'>
        <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>
        <div className="w-310 overflow-x-scroll h-150 ">
            <table className="table w-full m-auto ">
              <thead>
                <tr className="bg-gray-200" key={product.id}>
                  <th className="px-6 py-3 text-center">Name</th>
                  <th className="px-6 py-3 text-center">Price</th>
                  <th className="px-6 py-3 text-center">Description</th>
                  <th className="px-6 py-3 text-center">Category</th>
                  <th className="px-6 py-3 text-center">Same Day Delivery</th>
                  <th className="px-6 py-3 text-center">Type</th>
                  <th className="px-6 py-3 text-center">Vendor  name </th>
                  <th className="px-6 py-3">Image</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item: any) => (
                  item.status === 'pending' && (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-center">{item.proName}</td>
                      <td className="px-6 py-4 text-center">{item.proPrice}</td>
                      <td className="px-6 py-4 text-center">{item.proDescription}</td>
                      <td className="px-6 py-4 text-center">{item.proCategory}</td>
                      <td className="px-6 py-4 text-center">{item.sameDay ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4 text-center">{item.type}</td>
                      <td className="px-6 py-4 text-center" >{item.vendor.name}</td>
                      <td className="px-6 py-4 text-center">
                        <Image
                          src={item.proImage}
                          alt={item.proName}
                          width={100}
                          height={100}
                          className="rounded"
                        />
                      </td>
                      <td>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" onClick={() => handleChangeStatus(item.id, "Accepted")}>Accept</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md" onClick={() => handleChangeStatus(item.id, "Rejected")}>Reject</button>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          
        </div>
      </div>
    </>
  );
}

export default Page;


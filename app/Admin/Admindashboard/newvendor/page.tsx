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
  
  const handleSub = async (e) => {
    e.preventDefault();
    Editproduct({ ...editdata, id: editdata.id });
    setEdit(true);
    loadData();
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
        <div className="w-310">
          {!edit ? (
            <form>
              <div className='flex flex-col'>
                <div className="flex bg-white rounded-md shadow-md p-4 h-16 gap-2">
                  <label htmlFor="category" className="text-gray-600 w-50 font-semibold block mb-2">Select Category:</label>
                  <select name="category" value={editdata.proCategory} onChange={(e) => setEditData({ ...editdata, proCategory: e.target.value })}>
                    <option value="" className='w-full'>----Select-----</option>
                    <option value="electric" className='w-full'>Electric</option>
                    <option value="jwellery" className='w-full'>Jwellery</option>
                    <option value="gift" className='w-full'>Gift</option>
                  </select>
                </div>
    
                <div className="flex bg-white rounded-md shadow-md p-4 h-16 gap-2">
                  <label htmlFor="name" className="text-gray-600 w-43 font-semibold block mb-2">Product Name:</label>
                  <input type="text" id="name" name="name" className="border-2 border-gray-500 p-2 rounded-md w-full" value={editdata.proName} onChange={(e) => setEditData({ ...editdata, proName: e.target.value })} />
                </div>
    
                <div className="flex bg-white rounded-md shadow-md p-4 h-16 gap-2">
                  <label htmlFor="price" className="text-gray-600 w-43 font-semibold block mb-2">Price:</label>
                  <input type="number" id="price" name="price" className="border-2 border-gray-500 p-2 rounded-md w-full" value={editdata.proPrice} onChange={(e) => setEditData({ ...editdata, proPrice: e.target.value })} />
                </div>
    
                <div className="flex bg-white rounded-md shadow-md p-4 h-16 gap-2">
                  <label htmlFor="description" className="text-gray-600 w-43 font-semibold block mb-2">Description:</label>
                  <textarea id="description" name="description" className="border-2 border-gray-500 p-2 rounded-md w-full" value={editdata.proDescription} onChange={(e) => setEditData({ ...editdata, proDescription: e.target.value })} />
                </div>
    
                <div className="flex bg-white rounded-md shadow-md p-4 h-16 gap-2">
                  <label htmlFor="type" className="text-gray-600 w-50 font-semibold block mb-2">Type of Gift:</label>
                  <select name="type" value={editdata.type} onChange={(e) => setEditData({ ...editdata, type: e.target.value })}>
                    <option value="" className='w-full'>----Select-----</option>
                    <option value="birthday" className='w-full'>birthday</option>
                    <option value="anniversary" className='w-full'>anniversary</option>
                    <option value="marriage" className='w-full'>marriage</option>
                    <option value="other" className='w-full'>other</option>
                  </select>
                </div>
    
                <div className="flex justify-center mt-4">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleSub}>Save changes</button>
                </div>
              </div>
            </form>
          ) : (
            <table className="table w-full m-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 text-center">Name</th>
                  <th className="px-6 py-3 text-center">Price</th>
                  <th className="px-6 py-3 text-center">Description</th>
                  <th className="px-6 py-3 text-center">Category</th>
                  <th className="px-6 py-3 text-center">Same Day Delivery</th>
                  <th className="px-6 py-3 text-center">Type</th>
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
          )}
        </div>
      </div>
    </>
  );
}

export default Page;


'use client'
import React from 'react'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { Orderdetails } from '../../actions/oderManage'
import { getProductAdmin } from '../../actions/getProductAdmin'
import { getVendorAdmin } from '../../actions/getVendorAct'
import SalesChart from '../../component/chart'
const page:React.FC = () => {
  const router=useRouter()
  const name = typeof window !== 'undefined' ? localStorage.getItem('name') : null;
  const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const [totalorders,settotalorders]=useState<Number>(0)
  const [totalproducts,settotalproducts]=useState<Number>(0)
  const [totalvendors,settotalvendors]=useState<Number>(0)
  useEffect(()=>{
if(!user || user!='admin'){
router.push('/Admin')
}
getOrders(),
getProducts(),
getVendors()
  },[])

  const getOrders=async()=>{  
    const response=await Orderdetails();
     console.log(response.orders);
     console.log(response.orders.length);
     settotalorders(response.orders.length)
  }

  const getProducts=async()=>{  
    const response=await getProductAdmin();
     console.log(response.products);
     console.log(response.products.length);
     settotalproducts(response.products.length)
  }

const getVendors=async()=>{
    const response=await getVendorAdmin();
     console.log(response.vendors);
      console.log(response.vendors.length);
      settotalvendors(response.vendors.length)
}


  return (
    <div className="container mx-auto p-4 overflow-y-auto h-150 w-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-4xl font-bold">{totalorders}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-4xl font-bold">{totalproducts}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Total Vendors</h2>
          <p className="text-4xl font-bold">{totalvendors}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-8">Sales Chart</h2>
        <SalesChart />
      </div>
    </div>
  )
}

export default page


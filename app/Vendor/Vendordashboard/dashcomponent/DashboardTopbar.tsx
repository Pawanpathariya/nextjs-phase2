"use client"
import { useRouter } from 'next/navigation';
const DashboardTopbar: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-700 p-4 fixed w-full">
      <div className="flex justify-between">
        <h1 className="text-white text-2xl font-semibold ml-10">Vendor Dashboard</h1>
        <p className="text-white  ml-190">User : {localStorage.getItem('name')}  </p>
        <p className="text-white "> {localStorage.getItem('email')}    </p>
<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
 onClick={() => {localStorage.clear(), router.push('/Vendor') }  }>
  Logout
</button>
      </div>
    </div>
  );
}

export default DashboardTopbar;   


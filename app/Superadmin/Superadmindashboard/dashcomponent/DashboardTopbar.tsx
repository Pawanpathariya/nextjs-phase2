"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const DashboardTopbar : React.FC = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push('/Superadmin');
  };

  return (
    <div className="bg-gray-700 p-4 fixed top-0 left-0 w-full h-16 flex justify-between items-center md:h-auto md:flex-row md:items-start">
      <h1 className="text-white text-sm md:text-2xl font-semibold ml-4 md:ml-10 md:flex-1 md:text-center md:mr-10">
        <Link href="/Superadmin/Superadmindashboard" legacyBehavior>
          Super Admin Dashboard
        </Link>
      </h1>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardTopbar;


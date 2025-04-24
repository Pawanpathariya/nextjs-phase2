import DashboardTopbar from './dashcomponent/DashboardTopbar';
import Sidebar from './dashcomponent/Sidebar';

const Layout: React.FC = ({ children }: { children}) => (
  <>
    <div className="bg-white min-h-screen fixed">
      <DashboardTopbar />
      <div className="flex text-black">
        <div className="sticky -mt-2">
          <Sidebar />
        </div>
        <div className="text-black w-full mt-20 p-2">{children}</div>
      </div>
    </div>
  </>
);

export default Layout;


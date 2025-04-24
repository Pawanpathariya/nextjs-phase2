'use client'
import Topbar from '../component/Topbar';
import Footer from '../component/Footer';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <div>
        <Topbar />
        {children}
        <Footer />
    </div>
  </>
);

export default Layout;


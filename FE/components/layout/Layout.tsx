import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hide?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hide = false }) => {
  return (
    <>
    <div className="wrapper">
      {!hide && <Navbar />}
      <div className="container-mobile">{children}</div>
    </div>
    {hide && <Footer />}
    </>
  );
};

export default Layout;

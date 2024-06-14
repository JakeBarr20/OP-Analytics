import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  hide?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hide = false }) => {
  return (
    <div className="wrapper">
      {!hide && <Navbar />}
      <div className="container-mobile">{children}</div>
    </div>
  );
};

export default Layout;

import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const excludeRoutes = ["/authorization", "/registration", "/error"];

  const shouldShowHeaderAndFooter = !excludeRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowHeaderAndFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {shouldShowHeaderAndFooter && <Footer />}
    </div>
  );
};

export default Layout;

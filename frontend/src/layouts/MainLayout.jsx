import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavbarComponent from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;

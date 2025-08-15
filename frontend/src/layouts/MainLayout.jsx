/* Main Layout
 * Main layout of the web app
 * The shell includes the navbar, toasts, and container
 */
// Import React Router Outlet
import { Outlet } from "react-router";

// Import React Hot Toast
import { Toaster } from "react-hot-toast";

// Import Navbar
import NavbarComponent from "../components/Navbar";

// Return component
const MainLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default MainLayout;

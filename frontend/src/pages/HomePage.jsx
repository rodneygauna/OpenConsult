// Import Components
import NavbarComponent from "../components/Navbar.jsx";

// HomePage Component
const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>Welcome to OpenConsult</h1>
        <p>This is the home page.</p>
      </div>
    </div>
  );
};

// Export HomePage Component
export default HomePage;

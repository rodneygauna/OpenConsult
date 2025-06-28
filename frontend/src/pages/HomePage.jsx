// Import Components
import NavbarComponent from "../components/Navbar.jsx";

// HomePage Component
const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>Welcome to MyApp</h1>
        <p>This is the home page of your application.</p>
      </div>
    </div>
  );
};

// Export HomePage Component
export default HomePage;

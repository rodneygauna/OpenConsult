// Import Components
import NavbarComponent from "../components/Navbar.jsx";
import InputComponent from "../components/Input.jsx";

// HomePage Component
const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>Welcome to MyApp</h1>
        <p>This is the home page of your application.</p>
        <InputComponent
          label="Search"
          inputType="text"
          placeholder="Type to search..."
          subLabel="Enter keywords to find results"
        />
        <InputComponent
          label="Email"
          inputType="email"
          placeholder="Enter your email"
          subLabel="We'll never share your email with anyone else."
        />
        <InputComponent
          label="Password"
          inputType="password"
          placeholder="Enter your password"
          subLabel="Make sure it's at least 8 characters long."
        />
        <InputComponent
          label="Date of Birth"
          inputType="date"
          placeholder="Select your date of birth"
          subLabel="We use this to personalize your experience."
        />
        <InputComponent
          label="Phone Number"
          inputType="tel"
          placeholder="Enter your phone number"
          subLabel="Optional, but helps us to contact you."
        />
        <InputComponent
          label="Website"
          inputType="url"
          placeholder="Enter your website URL"
        />
      </div>
    </div>
  );
};

// Export HomePage Component
export default HomePage;

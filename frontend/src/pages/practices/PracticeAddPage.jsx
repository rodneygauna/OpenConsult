/* Practices - Add a new practice page
 * Allows the Super User to add a new practice to this instance of OpenConsult
 */

// Import Components
import NavbarComponent from "../../components/Navbar.jsx";

// PracticeAddPage Component
const PracticeAddPage = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <h1>Add a New Practice</h1>
        <p>This page allows you to add a new practice to OpenConsult.</p>
        {/* Form for adding a new practice will go here */}
      </div>
    </div>
  );
};

// Export PracticeAddPage Component
export default PracticeAddPage;

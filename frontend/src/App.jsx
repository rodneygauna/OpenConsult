import { Route, Routes } from "react-router";

/* Import Pages */
// Home page
import HomePage from "./pages/HomePage";
// Login and registration pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// Practice pages
import PracticeAddPage from "./pages/practices/PracticeAddPage.jsx";
import PracticesListAllPage from "./pages/practices/PracticesListAllPage.jsx";
import PracticeEditPage from "./pages/practices/PracticeEditPage.jsx";
// User pages
import ProfileViewPage from "./pages/profile/ProfileViewPage";

// App
const App = () => {
  return (
    <Routes>
      {/* HomePage Route */}
      <Route path="/" element={<HomePage />} />
      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />
      {/* Register Route */}
      <Route path="/register" element={<RegisterPage />} />
      {/* Practice Add Page Route */}
      <Route path="/practices/add" element={<PracticeAddPage />} />
      {/* Practices List All Page Route */}
      <Route path="/practices" element={<PracticesListAllPage />} />
      {/* Practice Edit Page Route */}
      <Route path="/practices/edit/:id" element={<PracticeEditPage />} />
      {/* User Profile Page Route */}
      <Route path="/profile" element={<ProfileViewPage />} />
    </Routes>
  );
};

export default App;

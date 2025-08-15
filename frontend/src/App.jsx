import { Route, Routes } from "react-router";

/* Import Pages */
// MainLayout
import MainLayout from "./layouts/MainLayout";
// Home page
import HomePage from "./pages/HomePage";
// Login and registration pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// Practice pages
import PracticeAddPage from "./pages/practices/PracticeAddPage.jsx";
import PracticesListAllPage from "./pages/practices/PracticesListAllPage.jsx";
import PracticeEditPage from "./pages/practices/PracticeEditPage.jsx";
import PracticeViewPage from "./pages/practices/PracticeViewPage.jsx";
// User pages
import ProfileViewPage from "./pages/profile/ProfileViewPage";

// App
const App = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route path="/" element={<MainLayout />}>
        {/* HomePage Route */}
        <Route index element={<HomePage />} />
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
        {/* Practice View Page Route */}
        <Route path="/practices/view/:id" element={<PracticeViewPage />} />
        {/* User Profile Page Route */}
        <Route path="/profile" element={<ProfileViewPage />} />
      </Route>
    </Routes>
  );
};

export default App;

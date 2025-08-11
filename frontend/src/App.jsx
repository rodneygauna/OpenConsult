import { Route, Routes } from "react-router";

// Import Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PracticeAddPage from "./pages/practices/PracticeAddPage.jsx";
import PracticesListAllPage from "./pages/practices/PracticesListAllPage.jsx";
import PracticeEditPage from "./pages/practices/PracticeEditPage.jsx";

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
    </Routes>
  );
};

export default App;

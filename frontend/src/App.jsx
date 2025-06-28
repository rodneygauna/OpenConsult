import { Route, Routes } from "react-router";

// Import Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
    </Routes>
  );
};

export default App;

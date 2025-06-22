import { Route, Routes } from "react-router";

// Import Pages
import HomePage from "./pages/HomePage";

// App
const App = () => {
  return (
    <Routes>
      {/* HomePage Route */}
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;

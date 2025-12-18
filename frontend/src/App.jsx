import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import PinDetail from "./pages/PinDetails";

const App = () => {
  return (
    <>
      {/* Global fallback SEO */}
      <Helmet>
        <title>PinSphere | Discover & Share Ideas</title>
        <meta
          name="description"
          content="PinSphere is a Pinterest-inspired platform to discover, save, and share creative ideas."
        />
      </Helmet>

      {/* Global Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pin/:slug" element={<PinDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;

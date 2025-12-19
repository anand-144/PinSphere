import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import PinDetail from "./pages/PinDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <HelmetProvider>
      {/* Sonner Toast */}
      <Toaster richColors position="top-right" />

      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pin/:slug" element={<PinDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;

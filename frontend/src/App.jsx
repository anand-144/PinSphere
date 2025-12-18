import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import PinDetail from "./pages/PinDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/pin/:slug" element={<PinDetail />} />
    </Routes>
  );
};

export default App;

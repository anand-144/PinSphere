import { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <input className="input" placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="input" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="input" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;

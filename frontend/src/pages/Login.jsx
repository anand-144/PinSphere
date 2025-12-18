import { useState } from "react";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input className="input" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;

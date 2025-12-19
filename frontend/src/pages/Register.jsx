import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <>
      <Helmet><title>Sign up | PinSphere</title></Helmet>

      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-card p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Create account</h1>

          <input
            placeholder="Username"
            className="input-field mb-4"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            placeholder="Email"
            className="input-field mb-4"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field mb-6"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn-primary w-full">Sign up</button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">Log in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

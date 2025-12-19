import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "sonner";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Account created!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Create account</h1>

        <input
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-2xl border bg-neutral-50"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-2xl border bg-neutral-50"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-2xl border bg-neutral-50"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-500">
          Sign up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

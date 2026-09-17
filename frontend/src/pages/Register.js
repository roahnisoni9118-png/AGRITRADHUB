import { useState } from "react";
import api from "../api";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");

  const register = async () => {
    try {

      // Register
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      // Auto Login
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ FIXED
      const userName = res.data.user?.name || res.data.name;
      const userId = res.data.user?._id || res.data._id;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", userName);
      localStorage.setItem("userId", userId);

      window.location.href = "/";

    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">

      <div className="card p-4 shadow glass-card custom-auth-card" style={{ width: "400px" }}>

        <h3 className="auth-heading">Register</h3>

        <form onSubmit={(e) => {
          e.preventDefault();
          register();
        }}>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select
              className="form-select"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="farmer">Farmer</option>
              <option value="merchant">Merchant</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>

        </form>

      </div>
    </div>
  );
}
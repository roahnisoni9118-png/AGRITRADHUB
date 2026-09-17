import { useState } from "react";
import api from "../api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {

      const res = await api.post("/auth/login", {
        email,
        password
      });

      // ✅ SAVE DATA (IMPORTANT)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);

      // ✅ DEBUG (optional but useful)
      console.log("Saved USER ID:", res.data.user._id);

      // redirect
      window.location.href = "/";

    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">

      <div className="card p-4 shadow glass-card custom-auth-card" style={{ width: "400px" }}>

        <h3 className="auth-heading">Login</h3>

        <form onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

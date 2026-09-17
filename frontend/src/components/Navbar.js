import logo from  "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";   // ✅ NavLink added
import { useState } from "react";

export default function Navbar() {

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/crops/${search.toLowerCase()}`);
      setSearch("");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (

    <nav className="navbar">

      {/* LEFT (logo + links) */}
      <div className="nav-margin">
        <div className="nav-left">
          <img src={logo} alt="logo" className="logo"/>
          <span className="logo-text">AgriTradeHub</span>

        <div className="nav-center">

          {/* ✅ Home */}
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Home
          </NavLink>

          {/* ✅ Products */}
          <NavLink 
            to="/posts" 
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Products
          </NavLink>

          {role === "farmer" && (
            <>
              <NavLink 
                to="/create" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Create Post
              </NavLink>

              <NavLink 
                to="/farmer-orders" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Orders
              </NavLink>
            </>
          )}

          {role === "merchant" && (
            <NavLink 
              to="/orders" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              My Orders
            </NavLink>
          )}

        </div>

      </div>
      </div>

      {/* SEARCH BOX */}
      <form onSubmit={handleSearch} className="search-box">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search crop..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {!role && (
          <>
            <NavLink to="/login" className="nav-btn">Login</NavLink>
            <NavLink to="/register" className="nav-btn register">Register</NavLink>
          </>
        )}

        {role && (
          <>
            <span className="user">
              👤 {name} ({role})
            </span>

            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}
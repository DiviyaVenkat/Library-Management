import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import logo from "../assets/library-logo.png"
import profile from "../assets/profile.png"
export default function Navbar(){

    const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };


    return(
    <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container">
      
      <Link className="navbar-brand fw-bold" to="/">
        <img src={logo} alt="Library Logo" className="img-fluid" style={{ maxHeight: "31px" }} />
      </Link>

      
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

 
      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">Books</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category">Category</Link>
          </li>
        </ul>

    
        <ul className="navbar-nav">
          {token ? (
            <li className="nav-item dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                 <img src={profile} alt="Profile" className="img-fluid" style={{ maxHeight: "20px" }} />Profile
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/user">My Profile</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-light me-2 login-btn common-btn" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-light signup-btn common-btn" to="/register">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
    )
}
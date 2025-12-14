import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      
      <div style={styles.logo} onClick={() => navigate("/feed")}>
        Instagram
      </div>

      
      <div style={styles.linksDesktop}>
        <Link style={styles.link} to="/feed">Feed</Link>
        <Link style={styles.link} to="/create">Create</Link>
        <Link style={styles.link} to="/search">Search</Link>
        <Link style={styles.link} to={`/profile/${userId}`}>Profile</Link>
      </div>

      
      <button style={styles.logoutBtnDesktop} onClick={logout}>
        Logout
      </button>

      
      <div style={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      
      {open && (
        <div style={styles.mobileMenu}>
          <Link style={styles.mobileLink} to="/feed" onClick={() => setOpen(false)}>Feed</Link>
          <Link style={styles.mobileLink} to="/create" onClick={() => setOpen(false)}>Create</Link>
          <Link style={styles.mobileLink} to="/search" onClick={() => setOpen(false)}>Search</Link>
          <Link
            style={styles.mobileLink}
            to={`/profile/${userId}`}
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button style={styles.logoutBtnMobile} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "linear-gradient(90deg, #ff9a9e, #fad0c4)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer"
  },

 
  linksDesktop: {
    display: "flex",
    gap: "20px"
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px"
  },

  logoutBtnDesktop: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#fff",
    color: "#ff5a5f",
    fontWeight: "bold",
    cursor: "pointer"
  },


  hamburger: {
    display: "none",
    fontSize: "22px",
    color: "#fff",
    cursor: "pointer"
  },

  mobileMenu: {
    position: "absolute",
    top: "60px",
    right: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: "160px"
  },

  mobileLink: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500"
  },

  logoutBtnMobile: {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    background: "#ff5a5f",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};


const mediaQuery = window.matchMedia("(max-width: 768px)");

if (mediaQuery.matches) {
  styles.linksDesktop.display = "none";
  styles.logoutBtnDesktop.display = "none";
  styles.hamburger.display = "block";
}

export default Navbar;

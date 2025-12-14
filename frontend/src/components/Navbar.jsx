import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

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
      <div style={styles.links}>
        <Link style={styles.link} to="/feed">Feed</Link>
        <Link style={styles.link} to="/create">Create</Link>
        <Link style={styles.link} to="/search">Search</Link>
        <Link style={styles.link} to={`/profile/${userId}`}>Profile</Link>
      </div>
      <button style={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
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
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px"
  },
  logoutBtn: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#fff",
    color: "#ff5a5f",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Navbar;

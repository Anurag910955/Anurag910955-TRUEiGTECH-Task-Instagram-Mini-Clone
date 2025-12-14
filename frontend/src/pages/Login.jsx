import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Instagram</h2>
        <p style={styles.subtitle}>Login to your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={login} style={styles.button}>
          Login
        </button>
        <p style={styles.footerText}>
          New user?{" "}
          <Link to="/signup" style={styles.link}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    textAlign: "center"
  },
  title: {
    marginBottom: "5px",
    color: "#333"
  },
  subtitle: {
    marginBottom: "20px",
    color: "#777",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1877f2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  footerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555"
  },
  link: {
    color: "#1877f2",
    textDecoration: "none",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px"
  }
};

export default Login;

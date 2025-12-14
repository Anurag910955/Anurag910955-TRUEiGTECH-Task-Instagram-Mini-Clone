import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (!imageUrl || !caption) {
        setError("All fields are required");
        return;
      }

      await API.post("/post", { imageUrl, caption });
      navigate("/feed");
    } catch (err) {
      setError("Failed to create post");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Post</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Caption"
          value={caption}
          onChange={e => setCaption(e.target.value)}
        />
        <button style={styles.button} onClick={submit}>
          Share
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f2f4f7",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "8px",
    background: "#1877f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px"
  }
};

export default CreatePost;

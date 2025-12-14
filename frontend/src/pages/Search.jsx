import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load suggested users (first time)
  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      // reuse search API with empty or common query
      const res = await API.get("/user/search/a");
      setSuggestions(res.data.slice(0, 5));
    } catch (err) {
      console.error("Failed to load suggestions");
    }
  };

  const searchUsers = async () => {
    if (!query) return;
    const res = await API.get(`/user/search/${query}`);
    setUsers(res.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Search</h2>

        {/* Search box */}
        <div style={styles.searchBox}>
          <input
            placeholder="Search by username"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={styles.input}
          />
          <button onClick={searchUsers} style={styles.button}>
            Search
          </button>
        </div>

        {/* 🔹 Suggestions */}
        {!query && (
          <>
            <p style={styles.suggestedTitle}>Suggested for you</p>
            <ul style={styles.list}>
              {suggestions.map(user => (
                <li
                  key={user._id}
                  style={styles.user}
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  👤 {user.username}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* 🔹 Search results */}
        {query && (
          <ul style={styles.list}>
            {users.length === 0 && (
              <p style={styles.noResult}>No users found</p>
            )}
            {users.map(user => (
              <li
                key={user._id}
                style={styles.user}
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                👤 {user.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#fafafa",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px"
  },
  card: {
    background: "#fff",
    padding: "20px",
    width: "340px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px"
  },
  searchBox: {
    display: "flex",
    gap: "6px",
    marginBottom: "10px"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    background: "#0095f6",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  suggestedTitle: {
    marginTop: "15px",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "8px"
  },
  user: {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    color: "#0095f6",
    fontSize: "14px"
  },
  noResult: {
    fontSize: "14px",
    color: "#999",
    textAlign: "center",
    marginTop: "10px"
  }
};

export default Search;

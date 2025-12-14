import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const searchUsers = async () => {
    if (!query) return;
    const res = await API.get(`/user/search/${query}`);
    setUsers(res.data);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Search Users</h2>

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

        <ul style={styles.list}>
          {users.map(user => (
            <li
              key={user._id}
              style={styles.user}
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              {user.username}
            </li>
          ))}
        </ul>
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
    width: "320px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  searchBox: {
    display: "flex",
    gap: "5px",
    marginBottom: "10px"
  },
  input: {
    flex: 1,
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    background: "#0095f6",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px"
  },
  user: {
    padding: "6px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    color: "#0095f6"
  }
};

export default Search;

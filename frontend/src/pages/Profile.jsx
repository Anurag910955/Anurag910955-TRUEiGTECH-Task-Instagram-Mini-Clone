import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedUserId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const loadProfile = async () => {
    try {
      const userRes = await API.get(`/user/${id}`);
      const postsRes = await API.get(`/post/user/${id}`);

      setUser(userRes.data);
      setPosts(postsRes.data);

      const followed = userRes.data.followers.some(
        f => f._id === loggedUserId
      );

      setIsFollowing(followed);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  const followUser = async () => {
    await API.post(`/user/follow/${id}`);
    loadProfile();
  };

  const unfollowUser = async () => {
    await API.post(`/user/unfollow/${id}`);
    loadProfile();
  };

  if (loading) return <p style={styles.centerText}>Loading profile...</p>;
  if (!user) return <p style={styles.centerText}>User not found</p>;

  return (
    <div style={styles.page}>      
      <div style={styles.header}>
        <div style={styles.avatar}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>{user.username}</h2>
          <div style={styles.stats}>
            <span onClick={() => setShowFollowers(true)}>
              <b>{user.followers.length}</b> followers
            </span>
            <span onClick={() => setShowFollowing(true)}>
              <b>{user.following.length}</b> following
            </span>
          </div>

          {loggedUserId !== id && (
            <button
              style={isFollowing ? styles.unfollowBtn : styles.followBtn}
              onClick={isFollowing ? unfollowUser : followUser}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      <hr style={{ margin: "25px 0" }} />
      <h3 style={{ marginBottom: "15px" }}>Posts</h3>
      {posts.length === 0 && (
        <p style={styles.centerText}>No posts yet</p>
      )}
      <div style={styles.grid}>
        {posts.map(post => (
          <div
            key={post._id}
            style={styles.postCard}
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <img
              src={post.imageUrl}
              alt="post"
              style={styles.postImage}
            />
            <div style={styles.postStats}>
              ❤️ {post.likes.length} &nbsp; 💬 {post.comments.length}
            </div>
          </div>
        ))}
      </div>      
      {showFollowers && (
        <Modal
          title="Followers"
          users={user.followers}
          onClose={() => setShowFollowers(false)}
          navigate={navigate}
        />
      )}
      {showFollowing && (
        <Modal
          title="Following"
          users={user.following}
          onClose={() => setShowFollowing(false)}
          navigate={navigate}
        />
      )}
    </div>
  );
};


const Modal = ({ title, users, onClose, navigate }) => (
  <>
    <div style={styles.overlay} onClick={onClose} />
    <div style={styles.modal}>
      <h4>{title}</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(u => (
          <li
            key={u._id}
            style={styles.modalItem}
            onClick={() => {
              onClose();
              navigate(`/profile/${u._id}`);
            }}
          >
            {u.username}
          </li>
        ))}
      </ul>
      <button style={styles.closeBtn} onClick={onClose}>
        Close
      </button>
    </div>
  </>
);


const styles = {
  page: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px"
  },

  centerText: {
    textAlign: "center",
    color: "#777"
  },

  header: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#fff"
  },

  stats: {
    display: "flex",
    gap: "20px",
    margin: "10px 0",
    cursor: "pointer",
    color: "#555"
  },

  followBtn: {
    background: "#0095f6",
    color: "#fff",
    border: "none",
    padding: "6px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  unfollowBtn: {
    background: "#efefef",
    color: "#000",
    border: "1px solid #ccc",
    padding: "6px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "15px"
  },

  postCard: {
    cursor: "pointer",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #ddd",
    background: "#fff"
  },

  postImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  },

  postStats: {
    padding: "6px",
    fontSize: "14px",
    textAlign: "center",
    background: "#fafafa"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999
  },

  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "20px",
    width: "300px",
    borderRadius: "8px",
    zIndex: 1000
  },

  modalItem: {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #eee"
  },

  closeBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "6px",
    background: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Profile;

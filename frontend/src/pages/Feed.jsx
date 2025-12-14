import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const navigate = useNavigate();

  const loadFeed = async () => {
    try {
      const res = await API.get("/post/feed");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load feed");
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const likePost = async (id) => {
    await API.post(`/post/like/${id}`);
    loadFeed();
  };

  const addComment = async (postId) => {
    if (!commentText[postId]) return;

    await API.post(`/post/comment/${postId}`, {
      text: commentText[postId]
    });

    setCommentText({ ...commentText, [postId]: "" });
    loadFeed();
  };

  return (
    <div style={styles.page}>
      
      {posts.length === 0 && (
        <p style={styles.emptyText}>
          No posts yet. Follow users to see their posts.
        </p>
      )}
      {posts.map(post => (
        <div key={post._id} style={styles.card}>
          {/* Header */}
          <div style={styles.cardHeader}>
            <span
              style={styles.username}
              onClick={() => navigate(`/profile/${post.user._id}`)}
            >
              {post.user.username}
            </span>
          </div>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="post"
              style={styles.image}
              onClick={() => navigate(`/post/${post._id}`)}
            />
          )}

          
          <p style={styles.caption}>{post.caption}</p>

          
          <div style={styles.actions}>
            <button
              style={styles.likeBtn}
              onClick={() => likePost(post._id)}
            >
              ❤️ {post.likes.length}
            </button>
          </div>
          <div style={styles.commentBox}>
            <input
              style={styles.input}
              placeholder="Write a comment..."
              value={commentText[post._id] || ""}
              onChange={e =>
                setCommentText({
                  ...commentText,
                  [post._id]: e.target.value
                })
              }
            />
            <button
              style={styles.commentBtn}
              onClick={() => addComment(post._id)}
            >
              Post
            </button>
          </div>
          <p
            style={styles.viewComments}
            onClick={() => navigate(`/post/${post._id}`)}
          >
            View all comments
          </p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  page: {
    background: "#fafafa",
    minHeight: "100vh",
    padding: "20px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },
  emptyText: {
    textAlign: "center",
    color: "#777"
  },
  card: {
    background: "#fff",
    maxWidth: "420px",
    margin: "20px auto",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },
  cardHeader: {
    padding: "10px",
    borderBottom: "1px solid #eee"
  },
  username: {
    fontWeight: "bold",
    cursor: "pointer",
    color: "#262626"
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    cursor: "pointer"
  },
  caption: {
    padding: "10px",
    fontSize: "14px",
    color: "#333"
  },
  actions: {
    padding: "0 10px 10px"
  },
  likeBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px"
  },
  commentBox: {
    display: "flex",
    borderTop: "1px solid #eee"
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    fontSize: "14px"
  },
  commentBtn: {
    border: "none",
    background: "#0095f6",
    color: "#fff",
    padding: "0 15px",
    cursor: "pointer"
  },
  viewComments: {
    padding: "8px 10px",
    fontSize: "13px",
    color: "#0095f6",
    cursor: "pointer"
  }
};

export default Feed;

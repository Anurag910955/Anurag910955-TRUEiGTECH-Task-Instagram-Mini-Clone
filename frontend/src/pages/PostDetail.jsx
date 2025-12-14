import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showLikes, setShowLikes] = useState(false);

  const loadPost = async () => {
    try {
      const res = await API.get(`/post/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Failed to load post");
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const likePost = async () => {
    await API.post(`/post/like/${id}`);
    loadPost();
  };

  const addComment = async () => {
    if (!commentText.trim()) return;
    await API.post(`/post/comment/${id}`, { text: commentText });
    setCommentText("");
    loadPost();
  };

  if (!post) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        
        <div style={styles.header}>
          <div style={styles.avatar}>
            {post.user.username[0].toUpperCase()}
          </div>
          <h3 style={styles.username}>{post.user.username}</h3>
        </div>
        <img
          src={post.imageUrl}
          alt="post"
          style={styles.image}
        />
        <p style={styles.caption}>{post.caption}</p>

        <div style={styles.actions}>
          <button style={styles.likeBtn} onClick={likePost}>
            ❤️ {post.likes.length}
          </button>
          <span
            style={styles.viewLikes}
            onClick={() => setShowLikes(!showLikes)}
          >
            View likes
          </span>
        </div>        
        {showLikes && (
          <div style={styles.likeBox}>
            <b>Liked by</b>
            <ul style={styles.list}>
              {post.likes.map(user => (
                <li key={user._id}>{user.username}</li>
              ))}
            </ul>
          </div>
        )}

        <hr />      
        <h4 style={{ marginBottom: "10px" }}>Comments</h4>

        {post.comments.length === 0 && (
          <p style={{ color: "#777" }}>No comments yet</p>
        )}

        <div style={styles.commentList}>
          {post.comments.map((c, index) => (
            <p key={index} style={styles.comment}>
              <b>{c.user.username}</b> {c.text}
            </p>
          ))}
        </div>       
        <div style={styles.commentBox}>
          <input
            placeholder="Add a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            style={styles.input}
          />
          <button style={styles.postBtn} onClick={addComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};


const styles = {
  page: {
    background: "#fafafa",
    minHeight: "100vh",
    padding: "30px",
    display: "flex",
    justifyContent: "center"
  },
  card: {
    background: "#fff",
    width: "420px",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px"
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#ff9a9e",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginRight: "10px"
  },
  username: {
    margin: 0
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  caption: {
    marginBottom: "10px",
    fontSize: "14px"
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  likeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "16px",
    cursor: "pointer"
  },
  viewLikes: {
    color: "#0095f6",
    cursor: "pointer",
    fontSize: "14px"
  },
  likeBox: {
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "10px"
  },
  list: {
    paddingLeft: "20px",
    marginTop: "5px"
  },
  commentList: {
    maxHeight: "150px",
    overflowY: "auto"
  },
  comment: {
    fontSize: "14px",
    marginBottom: "6px"
  },
  commentBox: {
    display: "flex",
    gap: "8px",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  postBtn: {
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    background: "#0095f6",
    color: "#fff",
    cursor: "pointer"
  }
};

export default PostDetail;

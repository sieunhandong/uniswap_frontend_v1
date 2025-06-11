// components/DetailPostModal.js
import React, { useEffect, useState } from "react";
import * as PostService from '../../services/PostService';
import "./DetailPostPage.css";

const DetailPostPage = ({ postId, accessToken, onClose }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) return;
      try {
        const data = await PostService.getDetailsPost(postId, accessToken);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      }
    };

    fetchPostDetail();
  }, [postId, accessToken]);

  if (!post) return <div className="modal">Loading...</div>;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="title-with-status">
            <h2>{post.title}</h2>
            <span className={`status ${post.status}`}>{post.status.toUpperCase()}</span>
        </div>
        <p><strong>Description:</strong> {post.description}</p>
        <p><strong>Price:</strong> {post.price.toLocaleString()} VND</p>
        <p><strong>Brand:</strong> {post.attributes.brand}</p>
        <p><strong>Condition:</strong> {post.attributes.condition}</p>
        <p><strong>Location:</strong> {post.location.city}, {post.location.district}</p>
        <p>
          <strong>Moderation Status:</strong>{" "}
          <span className={`moderation ${post.moderation.status}`}>
            {post.moderation.status}
          </span>
        </p>
       {post.images && post.images.length > 0 && (
        <div className="post-images">
            {post.images.map((imgUrl, idx) => (
            <img key={idx} src={imgUrl} alt={`Post image ${idx + 1}`} />
            ))}
        </div>
        )}

      </div>
    </div>
  );
};

export default DetailPostPage;

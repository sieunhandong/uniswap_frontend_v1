import React, { useEffect, useState } from "react";
import * as PostService from "../../services/PostService";
import "./ModerationPage.css";
import { useSelector } from "react-redux";

const ModerationPage = () => {
  const user = useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [rejectingPostId, setRejectingPostId] = useState(null);
  const [rejectedReason, setRejectedReason] = useState("");

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await PostService.getAllPosts();
        setAllPosts(res);

        setFilteredPosts(
          res.filter((post) => post.moderation.status === "pending")
        );
      } catch (error) {
        console.error("Failed to fetch posts for moderation:", error);
      }
    };
    fetchAllPosts();
  }, [user?.access_token]);

  const changeTab = (status) => {
    setActiveTab(status);
    setFilteredPosts(
      allPosts.filter((post) => post.moderation.status === status)
    );
  };

  const handleApprove = async (postId) => {
    try {
      await PostService.approvedPost(postId, user.access_token);
      const updated = allPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              moderation: {
                ...post.moderation,
                status: "approved",
                approvedAt: new Date(),
                adminId: user.id,
              },
            }
          : post
      );
      setAllPosts(updated);
      setFilteredPosts(
        updated.filter((post) => post.moderation.status === activeTab)
      );
    } catch (error) {
      alert("Failed to approve post.");
    }
  };

  const handleReject = async () => {
    try {
      await PostService.rejectPost(
        rejectingPostId,
        user.access_token,
        rejectedReason
      );
      const updated = allPosts.map((post) =>
        post._id === rejectingPostId
          ? {
              ...post,
              moderation: {
                ...post.moderation,
                status: "rejected",
                rejectedReason,
                rejectedAt: new Date(),
                adminId: user.id,
              },
            }
          : post
      );
      setAllPosts(updated);
      setFilteredPosts(
        updated.filter((post) => post.moderation.status === activeTab)
      );
      setRejectingPostId(null);
      setRejectedReason("");
    } catch (error) {
      alert("Failed to reject post.");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="myposts-container">
      <h2>Moderation Dashboard</h2>

      <div className="moderation-tabs">
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => changeTab("pending")}
        >
          Pending
        </button>
        <button
          className={activeTab === "approved" ? "active" : ""}
          onClick={() => changeTab("approved")}
        >
          Approved
        </button>
        <button
          className={activeTab === "rejected" ? "active" : ""}
          onClick={() => changeTab("rejected")}
        >
          Rejected
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <p>No posts in this category.</p>
      ) : (
        <table className="post-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Condition</th>
              <th>Location</th>
              <th>Description</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.price.toLocaleString()} VND</td>
                <td>{post.attributes.brand}</td>
                <td>{post.attributes.condition}</td>
                <td>
                  {post.location.city}, {post.location.district}
                </td>
                <td style={{ maxWidth: "200px" }}>{post.description}</td>
                <td>
                  {post.userId?.name || "Unknown"} <br />
                  {post.userId?.email || ""} <br />
                  {post.userId?.phone || ""}
                </td>
                <td>
                  <span className={`moderation ${post.moderation.status}`}>
                    {post.moderation.status.toUpperCase()}
                  </span>
                  {post.moderation.status === "rejected" && (
                    <div>
                      <strong>Reason:</strong> {post.moderation.rejectedReason}
                    </div>
                  )}
                </td>
                <td>
                  {post.moderation.status === "pending" && (
                    <>
                      <button onClick={() => handleApprove(post._id)}>
                        Approve
                      </button>
                      <button
                        onClick={() => setRejectingPostId(post._id)}
                        className="delete-btn"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {rejectingPostId && (
        <div className="reject-modal">
          <div className="reject-box">
            <h4>Reject Reason</h4>
            <textarea
              value={rejectedReason}
              onChange={(e) => setRejectedReason(e.target.value)}
              placeholder="Enter reason..."
            />
            <div className="modal-actions">
              <button onClick={handleReject} className="confirm-reject">
                Confirm Reject
              </button>
              <button onClick={() => setRejectingPostId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerationPage;

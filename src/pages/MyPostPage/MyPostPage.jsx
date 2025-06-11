import * as PostService from '../../services/PostService'
import React, { useEffect, useState } from "react";
import "./MyPostPage.css";
import { useSelector } from 'react-redux';
import DetailPostPage from '../DetailPostPage/DetailPostPage';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    if (!user?.id || !user?.access_token) return;

    const fetchPosts = async () => {
      try {
        const res = await PostService.getPostByUserId(user.id, user.access_token);
        setPosts(res);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [user?.id, user?.access_token]);

  const openUpdateModal = (postId) => {
    setSelectedPostId(postId);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedPostId(null);
    setIsUpdateModalOpen(false);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await PostService.deletePost(postId, user.access_token);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const filterPosts = () => {
    switch (filter) {
      case 'pending':
        return posts.filter(p => p.moderation?.status === 'pending');
      case 'approved':
        return posts.filter(p => p.moderation?.status === 'approved');
      case 'rejected':
        return posts.filter(p => p.moderation?.status === 'rejected');
      case 'hidden':
        return posts.filter(p => p.status === 'hidden');
      default:
        return posts;
    }
  };

  const filteredPosts = filterPosts();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

   return (
    <div className="myposts-container">
      <h2 className='title'>My Listings</h2>
      <hr />

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Tất cả</button>
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Chờ duyệt</button>
        <button onClick={() => setFilter('approved')} className={filter === 'approved' ? 'active' : ''}>Đã duyệt</button>
        <button onClick={() => setFilter('rejected')} className={filter === 'rejected' ? 'active' : ''}>Bị từ chối</button>
        <button onClick={() => setFilter('hidden')} className={filter === 'hidden' ? 'active' : ''}>Đã ẩn</button>
      </div>

      {filteredPosts.length === 0 ? (
        <p>Không có bài viết phù hợp.</p>
      ) : (
        <>
          <table className="post-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Kiểm duyệt</th>
                <th>Lý do bị từ chối</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.price?.toLocaleString()} VND</td>
                  <td><span className={`status ${post.status}`}>{post.status?.toUpperCase()}</span></td>
                  <td><span className={`moderation ${post.moderation?.status}`}>{post.moderation?.status}</span></td>
                  <td style={{ color: 'red' }}>
                    {post.moderation?.status === 'rejected' ? post.moderation.reason : ''}
                  </td>
                  <td>
                    <button onClick={() => openUpdateModal(post._id)}>Chi tiết</button>
                    <button onClick={() => navigate(`/post-edit/${post._id}`)} className="edit-btn">Sửa</button>
                    <button onClick={() => handleDelete(post._id)} className="delete-btn">Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {isUpdateModalOpen && selectedPostId && (
        <DetailPostPage
          postId={selectedPostId}
          accessToken={user.access_token}
          onClose={closeUpdateModal}
        />
      )}
    </div>
  );
};


export default MyPosts;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Notification.css';
import { useNavigate } from 'react-router-dom';
import PaymentDetailPage from '../PaymentDetailPage/PaymentDetailPage';
import { useToast } from '../../context/ToastContext';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [rejectedReasonVisible, setRejectedReasonVisible] = useState(null);
  const [openId, setOpenId] = useState(null);
  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    if (userId) {
      axios.get(`/api/notification/${userId}`).then((res) => {
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sorted);
      });
    }
  }, [userId]);

  const handlePaymentSuccess = (paidId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        getRequestIdString(n.extraData?.requestId) === paidId
          ? {
              ...n,
              extraData: {
                ...n.extraData,
                requestId: {
                  ...n.extraData.requestId,
                  isPaid: true
                }
              }
            }
          : n
      )
    );
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleOpenModal = (id) => {
    setOpenId(id);
  };

  const toggleRejectedReason = (id) => {
    setRejectedReasonVisible((prev) => (prev === id ? null : id));
  };

  const getRequestIdString = (requestId) => {
    if (!requestId) return null;
    if (typeof requestId === 'string') return requestId;
    if (typeof requestId === 'object' && requestId._id) return requestId._id;
    if (typeof requestId === 'object' && typeof requestId.toString === 'function')
      return requestId.toString();
    return null;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h2 className="notification-title">Thông báo</h2>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <h3>Chưa có thông báo</h3>
          <p>Bạn sẽ nhận được thông báo khi có hoạt động mới</p>
        </div>
      ) : (
        <>
          <div className="notification-list">
            {notifications.slice(0, visibleCount).map((n) => (
              <div key={n._id} className="notification-item">
                <div className="notification-content">
                  <div className="notification-main">
                    <h3 className="notification-heading">{n.title}</h3>
                    <p className="notification-text">{n.message}</p>

                    {n.type === 'review_received' && (
                      <div className="notification-extra">
                        <span className="rating-display">
                          {'★'.repeat(n.extraData?.rating || 0)}
                          {'☆'.repeat(5 - (n.extraData?.rating || 0))}
                          <span className="rating-number"> ({n.extraData?.rating}/5)</span>
                        </span>
                      </div>
                    )}

                    {n.type === 'post_rejected' && rejectedReasonVisible === n._id && (
                      <div className="rejection-reason">
                        <strong>Lý do từ chối:</strong>
                        <p>{n.extraData?.reason}</p>
                      </div>
                    )}
                  </div>

                  <div className="notification-actions">
                    {n.type === 'payment_required' &&
                      (n.extraData?.requestId.isPaid ? (
                        <span className="status-badge paid">✓ Đã thanh toán</span>
                      ) : (
                        <button
                          className="action-button primary"
                          onClick={() => handleOpenModal(getRequestIdString(n.extraData?.requestId))}
                        >
                          Thanh toán ngay
                        </button>
                      ))}

                    {n.type === 'post_rejected' && (
                      <button
                        className="action-button secondary"
                        onClick={() => toggleRejectedReason(n._id)}
                      >
                        {rejectedReasonVisible === n._id ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="notification-time">{formatDate(n.createdAt)}</div>
              </div>
            ))}
          </div>

          {notifications.length > visibleCount && (
            <div className="load-more-section">
              <button className="load-more-button" onClick={handleLoadMore}>
                Xem thêm thông báo
              </button>
            </div>
          )}
        </>
      )}

      {openId && (
        <PaymentDetailPage
          id={openId}
          onClose={() => setOpenId(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default NotificationPage;

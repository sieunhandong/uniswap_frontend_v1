import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PaymentDetailPage.css';
import { useSelector } from 'react-redux';
import { useToast } from '../../context/ToastContext';
function PaymentDetailPage({ id, onClose,onPaymentSuccess }) {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.user);
  const { addToast } = useToast();

  useEffect(() => {
    axios.get(`/api/payment/detailRequest/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleConfirmPayment = async () => {
    try {
      const res = await axios.post('/api/payment/pay', { paymentRequestId: id, userId: user.id });
      if (res.data.success) {
        addToast('Thanh toán thành công', 'success', 5000);
        window.dispatchEvent(new Event("walletBalanceChanged"));
        if (onPaymentSuccess) {
          onPaymentSuccess(id);
        }
        onClose();
      } else if (res.data.error === 'INSUFFICIENT_FUNDS') {
        addToast('Ví không đủ tiền', 'error', 5000);
        window.location.href = '/walletdashboard';
      }
    } catch (error) {
       addToast('Thanh toán thất bại', 'error', 5000);
    }
  };

  if (!data) return <div className="modal-content">Đang tải thông tin...</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content invoice-style">
        <div className="invoice-header">
          <h2>Hóa đơn thanh toán</h2>
          <p>Mã yêu cầu: <strong>{data._id}</strong></p>
        </div>

        <hr />

        <div className="section">
          <h3>📰 Thông tin bài viết</h3>
          <p><strong>Mã bài đăng:</strong> {data.postId._id}</p>
          <p><strong>Tiêu đề:</strong> {data.postId.title}</p>
          <p><strong>Mô tả:</strong> {data.postId.description}</p>
          <p><strong>Giá:</strong> {data.postId.price}</p>
        </div>

        <div className="section">
          <h3>👤 Thông tin khách hàng</h3>
          <p><strong>Họ tên:</strong> {data.userId.name}</p>
          <p><strong>Email:</strong> {data.userId.email}</p>
          <p><strong>Địa chỉ:</strong> {data.userId.address}, {data.userId.city}</p>
          <p><strong>SĐT:</strong> {data.userId.phone}</p>
        </div>

        <div className="section">
          <h3>💰 Chi tiết thanh toán</h3>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Hạng mục</th>
                <th>Loại</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Phí đăng bài</td>
                <td>{data.type === 'posting_fee' ? 'Đăng bài' : data.type}</td>
                <td>{data.amount.toLocaleString()} VND</td>
              </tr>
            </tbody>
          </table>

          <div className="invoice-total">
            <span>Tổng cộng:</span>
            <strong>{data.amount.toLocaleString()} VND</strong>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-confirm" onClick={handleConfirmPayment}>
            Xác nhận thanh toán
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetailPage;

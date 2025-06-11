import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="uniswap-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Giới thiệu */}
          <div className="footer-section">
            <h3 className="footer-heading">UniSwap</h3>
            <p className="footer-text">
              Nền tảng mua bán đồ cũ dành cho sinh viên. Giúp bạn tiết kiệm chi phí và bán lại những món đồ không cần dùng nữa.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div className="footer-section">
            <h4 className="footer-subheading">Liên kết nhanh</h4>
            <ul className="footer-links">
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#">Sản phẩm</a></li>
              <li><a href="#">Đăng bán</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="footer-section">
            <h4 className="footer-subheading">Hỗ trợ</h4>
            <ul className="footer-links">
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="footer-section">
            <h4 className="footer-subheading">Liên hệ</h4>
            <ul className="footer-contact">
              <li>Email: uniSwap@gmail.com</li>
              <li>Hotline: 0123 456 789</li>
              <li>Địa chỉ: Đại học FPT,Khu công nghệ cao Hòa lạc, Hà Nội</li>
            </ul>
            <div className="payment-methods">
              <FaCcVisa className="payment-icon" />
              <FaCcMastercard className="payment-icon" />
              <FaCcPaypal className="payment-icon" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} UniSwap - Nền tảng mua bán đồ cũ cho sinh viên. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useEffect, useState, useRef } from "react";
import "./PostCreate.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import * as PostService from "../../services/PostService";
import * as CategoryService from "../../services/CategoryService";
import { useSelector } from "react-redux";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { getBase64 } from '../../utils'

const PostCreate = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { postId } = useParams();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
    userId: user.id,
    category: "",
    location: { city: "", district: "" },
    status: "active",
    attributes: { brand: "", condition: "" },
    moderation: { status: "pending" },
  });

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoryLoading(true);
      try {
        const res = await CategoryService.getAllCategories("", 0);
        setCategories(res);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
        message.error("Lỗi khi tải danh mục!");
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Lấy bài đăng khi chỉnh sửa
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const res = await PostService.getDetailsPost(postId, user.access_token);
          setForm({
            ...res,
            userId: user.id,
          });
        } catch (error) {
          console.error("Lỗi khi tải bài viết:", error);
          message.error("Lỗi khi tải bài viết!");
        }
      };
      fetchPost();
    }
  }, [postId, user.access_token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(file => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // Thay bằng upload preset của bạn
        return axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Thay bằng cloud name của bạn
          formData
        );
      });

      const results = await Promise.all(uploadPromises);
      const newImages = results.map(result => result.data.secure_url);
      
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
      
      message.success(`Đã tải lên ${newImages.length} ảnh thành công!`);
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
      message.error("Lỗi khi tải ảnh lên!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!form.category) {
      message.warning("Vui lòng chọn danh mục!");
      return;
    }
    if (form.images.length === 0) {
      message.warning("Vui lòng tải lên ít nhất một ảnh!");
      return;
    }

    try {
      if (postId) {
        await PostService.updatePost(postId, user.access_token, form);
        message.success("Cập nhật bài viết thành công!");
      } else {
        await PostService.createPost(user.access_token, form);
        message.success("Đăng bài thành công!");
      }
      navigate("/system/admin");
    } catch (error) {
      console.error("Lỗi khi gửi bài đăng:", error);
      message.error("Có lỗi xảy ra khi gửi bài đăng!");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageUpload22 = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Kiểm tra số lượng ảnh không vượt quá 10
    if (form.images.length + files.length > 10) {
      alert('Bạn chỉ có thể tải lên tối đa 10 ảnh');
      return;
    }

    setUploading(true);

    try {
      // Tạo mảng promises để chuyển đổi tất cả ảnh sang base64
      const base64Promises = Array.from(files).map(file => getBase64(file));
      
      // Chờ tất cả ảnh được chuyển đổi
      const base64Images = await Promise.all(base64Promises);

      // Cập nhật state với các ảnh mới
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }));

    } catch (error) {
      console.error('Lỗi khi chuyển đổi ảnh:', error);
      alert('Có lỗi xảy ra khi tải ảnh lên');
    } finally {
      setUploading(false);
      // Reset input file để có thể chọn lại cùng file nếu cần
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2>{postId ? "CẬP NHẬT BÀI VIẾT" : "ĐĂNG BÁN SẢN PHẨM"}</h2>
        
        <div className="form-grid">
          {/* Tiêu đề */}
          <div className="form-group">
            <label>
              <strong>Tiêu đề</strong>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Nhập tiêu đề sản phẩm, ví dụ: Macbook Pro M2 2023"
            />
            <small className="helper-text">
              Hãy chọn tiêu đề rõ ràng và hấp dẫn.
            </small>
          </div>

          {/* Giá */}
          <div className="form-group">
            <label>
              <strong>Giá (VND)</strong>
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="Ví dụ: 15000000"
            />
            <small className="helper-text">
              Nhập giá mong muốn theo đơn vị VNĐ.
            </small>
          </div>

          {/* Danh mục */}
          <div className="form-group">
            <label>
              <strong>Danh mục</strong>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {categoryLoading ? (
                <option disabled>Đang tải...</option>
              ) : (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <small className="helper-text">
              Chọn danh mục phù hợp với sản phẩm.
            </small>
          </div>
            <div className="form-group">
            <label>
              <strong>Tình trạng</strong>
            </label>
            <select
              name="attributes.condition"
              value={form.attributes.condition}
              onChange={handleChange}
            >
              <option value="">Chọn tình trạng</option>
              <option value="new">Mới</option>
              <option value="used">Đã sử dụng</option>
              <option value="like_new">Như mới</option>
            </select>
            <small className="helper-text">
              Mô tả chính xác tình trạng sản phẩm.
            </small>
          </div>

          {/* Mô tả */}
          <div className="form-group full-width">
            <label>
              <strong>Mô tả</strong>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Mô tả chi tiết về sản phẩm, tình trạng, phụ kiện đi kèm..."
            />
            <small className="helper-text">
              Thông tin càng rõ ràng sẽ giúp bán nhanh hơn.
            </small>
          </div>

          {/* Hình ảnh */}
          <div className="form-group full-width">
            <label>
              <strong>Hình ảnh</strong>
            </label>
            <div className="image-upload-container">
              <div className="image-preview-grid">
                {form.images.map((img, idx) => (
                  <div key={idx} className="image-preview-item">
                    <img src={img} alt={`preview-${idx}`} />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="delete-image-btn"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="upload-actions">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload22}
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => fileInputRef.current.click()}
                  loading={uploading}
                >
                  Tải ảnh lên
                </Button>
                <small className="helper-text">
                  Tải lên tối đa 10 ảnh (JPG, PNG)
                </small>
              </div>
            </div>
          </div>

          {/* Địa điểm */}
          <div className="form-group">
            <label>
              <strong>Tỉnh/Thành hoặc Trường Đại Học</strong>
            </label>
            <select
              name="location.city"
              value={form.location.city}
              onChange={handleChange} 
            >
              <option value="">-- Chọn địa điểm --</option>
              <option value="ĐH FPT">Đại học FPT</option>
              <option value="ĐH Quốc gia Hà Nội">ĐH Quốc gia Hà Nội</option>
              <option value="ĐH Bách Khoa Hà Nội">ĐH Bách Khoa Hà Nội</option>
              <option value="ĐH Kinh tế Quốc dân">ĐH Kinh tế Quốc dân</option>
              <option value="Học viện Tài chính">Học viện Tài chính</option>
              <option value="Học viện Ngân hàng">Học viện Ngân hàng</option>
              <option value="ĐH Ngoại thương">ĐH Ngoại thương</option>
              <option value="Học viện Công nghệ Bưu chính Viễn thông">Học viện CN BCVT</option>
              <option value="ĐH Thương mại">ĐH Thương mại</option>
              <option value="ĐH Sư phạm Hà Nội">ĐH Sư phạm Hà Nội</option>
              <option value="Học viện Kỹ thuật Mật mã">Học viện KT Mật mã</option>
            </select>
            <small className="helper-text">
              Chọn nơi bạn đang học tập và muốn giao dịch.
            </small>
          </div>

          <div className="form-group">
            <label>
              <strong>Quận, Huyện</strong>
            </label>
            <input
              name="location.district"
              value={form.location.district}
              onChange={handleChange}
              placeholder="Ví dụ: Quận 1, Quận Hai Bà Trưng"
            />
            <small className="helper-text">
              Nhập chính xác để tăng độ tin cậy khi giao dịch.
            </small>
          </div>

          {/* Thông tin sản phẩm */}
          {/* <div className="form-group">
            <label>
              <strong>Thương hiệu</strong>
            </label>
            <input
              name="attributes.brand"
              value={form.attributes.brand}
              onChange={handleChange}
              placeholder="Ví dụ: Apple, Samsung, Dell"
            />
            <small className="helper-text">
              Giúp người mua dễ dàng tìm kiếm sản phẩm theo thương hiệu.
            </small>
          </div> */}

        
        </div>

        {/* Nút submit */}
        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>
            Quay lại
          </button>
          <button type="submit" className="submit-button" disabled={uploading}>
            {postId ? "Cập nhật bài viết" : "Đăng bài"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
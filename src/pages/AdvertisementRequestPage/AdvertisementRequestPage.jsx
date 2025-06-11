import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAdvertisement, checkHasActiveAd } from '../../services/AdvertisementService';
import { getWalletBalance } from '../../services/WalletService';
import { getDetailsUser } from '../../services/UserService';
import {
  PageWrapper, FormWrapper, Title, Form, Input, Select, Button,
  Label, FileInput, ImagePreview, Message
} from './style';

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

const imageSizeRequirements = {
  top_banner: { width: 1200, height: 300 },
  left: { width: 300, height: 600 },
  right: { width: 300, height: 600 },
  bottom: { width: 1200, height: 200 } // Added support for bottom
};

const pricePerDayBlock = {
  top_banner: 35000,
  left: 25000,
  right: 25000,
  bottom: 30000 // Price for bottom
};

const blockToDays = {
  1: 3,
  2: 7,
  3: 14,
  4: 21,
  5: 30,
  6: 60
};

const AdvertisementRequestPage = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const access_token = user?.access_token;

  const [formData, setFormData] = useState({
    imageUrl: '',
    link: '',
    position: 'left',
    price: 0,
    startDate: today,
    durationDays: blockToDays[1],
    durationBlock: 1
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(null);
  const [hasActiveAd, setHasActiveAd] = useState(false);

  useEffect(() => {
    const basePrice = pricePerDayBlock[formData.position] || 0;
    const newPrice = basePrice * formData.durationBlock;
    setFormData(prev => ({ ...prev, price: newPrice }));
  }, [formData.position, formData.durationBlock]);

  useEffect(() => {
    if (!userId || !access_token) return;

    const fetchWalletAndAd = async () => {
      try {
        const userDetails = await getDetailsUser(userId, access_token);
        const walletId = userDetails?.data?.wallet;

        if (!walletId) {
          setMessage('⚠️ Không tìm thấy ví của bạn.');
          return;
        }

        const wallet = await getWalletBalance(walletId);
        setWalletBalance(wallet?.balance);

        const adStatus = await checkHasActiveAd(userId);
        setHasActiveAd(adStatus?.hasActiveAd);
      } catch (err) {
        console.error('❌ Lỗi khi lấy thông tin ví/quảng cáo:', err);
        setMessage('⚠️ Không thể tải dữ liệu người dùng.');
      }
    };

    fetchWalletAndAd();
  }, [userId, access_token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'durationBlock') {
      const block = parseInt(value);
      setFormData(prev => ({
        ...prev,
        durationBlock: block,
        durationDays: blockToDays[block]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'durationDays' ? parseInt(value) : value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      setImagePreview('');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setImagePreview(result);

      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const required = imageSizeRequirements[formData.position];
        const tolerance = 0.2;

        const widthValid = Math.abs(width - required.width) / required.width <= tolerance;
        const heightValid = Math.abs(height - required.height) / required.height <= tolerance;

        if (!widthValid || !heightValid) {
          setMessage(`⚠️ Ảnh không đúng kích thước! Yêu cầu: ${required.width}x${required.height}px (±20%)`);
          setImage(null);
        } else {
          setMessage('');
          setImage(file);
        }
      };
      img.src = result;
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !access_token) {
      return setMessage('⚠️ Bạn cần đăng nhập để gửi quảng cáo.');
    }

    if (!image) {
      return setMessage('⚠️ Vui lòng chọn ảnh quảng cáo hợp lệ.');
    }

    if (hasActiveAd) {
      return setMessage('⚠️ Bạn đã có quảng cáo đang hoạt động hoặc đã được duyệt.');
    }

    if (walletBalance !== null && walletBalance < formData.price) {
      return setMessage('⚠️ Số dư ví của bạn không đủ để gửi quảng cáo này.');
    }

    try {
      const imageBase64 = await convertToBase64(image);

      const dataToSubmit = {
        userId,
        imageUrl: imageBase64,
        link: formData.link,
        position: formData.position,
        price: formData.price,
        startDate: formData.startDate,
        durationDays: formData.durationDays
      };

      await createAdvertisement(dataToSubmit, access_token);
      setMessage('✅ Gửi yêu cầu quảng cáo thành công!');

      setImage(null);
      setImagePreview('');
      setFormData(prev => ({
        ...prev,
        link: '',
        durationBlock: 1,
        durationDays: blockToDays[1],
        price: pricePerDayBlock[prev.position] * 1
      }));

      setTimeout(() => {
        navigate('/my-advertisement');
      }, 2000);
    } catch (err) {
      console.error('❌ Lỗi gửi quảng cáo:', err);
      setMessage('❌ Đã xảy ra lỗi khi gửi yêu cầu.');
    }
  };

  const requiredSize = imageSizeRequirements[formData.position];

  return (
    <PageWrapper>
      <FormWrapper>
        <Title>Gửi yêu cầu quảng cáo</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Ảnh quảng cáo</Label>
          <FileInput type="file" accept="image/*" onChange={handleFileChange} required />
          {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}

          <Message>
            📏 Kích thước đề xuất cho <strong>{formData.position}</strong>: {requiredSize.width} x {requiredSize.height}px (±20%)
          </Message>

          <Label>Đường dẫn</Label>
          <Input type="text" name="link" value={formData.link} onChange={handleChange} required />

          <Label>Vị trí</Label>
          <Select name="position" value={formData.position} onChange={handleChange}>
            <option value="left">Trái</option>
            <option value="right">Phải</option>
            <option value="top_banner">Trên cùng</option>
            <option value="bottom">Dưới cùng</option> {/* New option */}
          </Select>

          <Label>Số ngày</Label>
          <Select name="durationBlock" value={formData.durationBlock} onChange={handleChange}>
            <option value={1}>3 ngày</option>
            <option value={2}>1 tuần</option>
            <option value={3}>2 tuần</option>
            <option value={4}>3 tuần</option>
            <option value={5}>1 tháng</option>
            <option value={6}>2 tháng</option>
          </Select>

          <Label>Ngày bắt đầu</Label>
          <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

          <Label>Chi phí</Label>
          <Input type="text" value={`${formData.price.toLocaleString()} VND`} disabled />

          {walletBalance !== null && (
            <Message>💰 Số dư ví hiện tại: <strong>{walletBalance.toLocaleString()} VND</strong></Message>
          )}

          <Button type="submit">Gửi yêu cầu</Button>
          {message && <Message>{message}</Message>}
        </Form>
      </FormWrapper>
    </PageWrapper>
  );
};

export default AdvertisementRequestPage;

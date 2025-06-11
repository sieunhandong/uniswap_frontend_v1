import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import * as WalletService from '../../services/WalletService';
import {
  Container, LeftColumn, RightColumn, Title, Label, Value,
  CopyButton, Input, Button, QRImage, Note, Message, ImagePreview
} from './style';

import logoBidv from '../../assets/images/logobidv.png';
import QR from '../../assets/images/QRThanhToan.jpg';

// 👉 Hàm chuyển file ảnh sang base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

const WalletPage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const userId = user?.id;
  const access_token = user?.access_token;

  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const res = await UserService.getDetailsUser(userId, access_token);
        const walletId = res?.data?.wallet;

        if (walletId) {
          const walletRes = await WalletService.getWalletBalance(walletId);
          setWallet(walletRes);
        }
      } catch (error) {
        console.error('❌ Lỗi khi lấy ví:', error);
      }
    };

    if (userId && access_token) fetchUserWallet();
  }, [userId, access_token]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép!');
  };

  const handleDepositRequest = async () => {
    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || parsedAmount < 10000) {
      return setMessage('⚠️ Số tiền nạp tối thiểu là 10,000 VNĐ.');
    }

    if (!image) {
      return setMessage('⚠️ Vui lòng tải ảnh chuyển khoản.');
    }

    try {
      const imageBase64 = await convertToBase64(image);

      const res = await WalletService.createDepositRequest({
        userId,
        amount: parsedAmount,
        imageBase64,
      });

      setMessage(res.message || '✅ Yêu cầu nạp tiền đã được gửi');
      setAmount('');
      setImage(null);
      setImagePreview('');

      setTimeout(() => navigate('/desposit'), 1500);
    } catch (err) {
      console.error('❌ Lỗi gửi yêu cầu:', err);
      setMessage('Đã xảy ra lỗi khi gửi yêu cầu.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  return (
    <Container>
      <LeftColumn>
        <Title>Nạp tiền qua chuyển khoản</Title>

        <Label>Ngân hàng</Label>
        <Value><img src={logoBidv} alt="BIDV" height="24" /> BIDV Bank</Value>

        <Label>Tài khoản nạp tiền</Label>
        <Value>{user?.email}</Value>

        <Label>Số tài khoản</Label>
        <Value>
          0869276126{' '}
          <CopyButton onClick={() => copyToClipboard('0869276126')}>Sao chép</CopyButton>
        </Value>

        <Note>
          👉 <strong>Vui lòng ghi rõ SĐT - Tên tài khoản - Số tiền nạp</strong><br />
          Ví dụ: <em>0987654321 - Nguyen Van A - 100.000</em>
        </Note>

        <Label>Số tiền (≥ 10.000 VNĐ)</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nhập số tiền"
        />

        <Label>Ảnh chuyển khoản</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <ImagePreview src={imagePreview} alt="Preview" />
        )}

        <Button onClick={handleDepositRequest}>Tôi đã chuyển tiền</Button>
        {message && <Message>{message}</Message>}
      </LeftColumn>

      <RightColumn>
        <Title>Quét mã để nạp Tiền</Title>
        <QRImage src={QR} alt="QR Code" />
        <p>Sử dụng ứng dụng ngân hàng có chức năng <strong>QR Code</strong> để quét mã</p>
      </RightColumn>
    </Container>
  );
};

export default WalletPage;

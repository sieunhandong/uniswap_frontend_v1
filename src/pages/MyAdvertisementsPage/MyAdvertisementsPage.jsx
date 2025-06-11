import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyAdvertisements } from '../../services/AdvertisementService';
import { Container, Title, Table, Th, Td, Status } from './style';

const statusColors = {
  pending: 'orange',
  approved: 'green',
  expired: 'gray',
};

const MyAdvertisementsPage = () => {
  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const access_token = user?.access_token;

  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        setLoading(true);
        const data = await getMyAdvertisements(userId, access_token);
        setMyAds(data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Lỗi lấy My Ads:', err);
        setError('Không thể tải quảng cáo của bạn.');
        setLoading(false);
      }
    };

    if (userId && access_token) {
      fetchMyAds();
    }
  }, [userId, access_token]);

  if (!userId || !access_token) {
    return <p>⚠️ Bạn cần đăng nhập để xem quảng cáo của mình.</p>;
  }

  if (loading) {
    return <p>Đang tải quảng cáo...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (myAds.length === 0) {
    return <p>📭 Bạn chưa có quảng cáo nào.</p>;
  }

  return (
    <Container>
      <Title>📢 Quảng cáo của tôi</Title>
      <Table>
        <thead>
          <tr>
            <Th>Ảnh</Th>
            <Th>Link</Th>
            <Th>Vị trí</Th>
            <Th>Trạng thái</Th>
            <Th>Ngày bắt đầu</Th>
            <Th>Ngày kết thúc</Th>
            <Th>Giá tiền</Th>
          </tr>
        </thead>
        <tbody>
          {myAds.map((ad) => (
            <tr key={ad._id}>
              <Td>
                <img src={ad.imageUrl} alt="Ad" style={{ width: '120px', height: 'auto' }} />
              </Td>
              <Td>
                <a href={ad.link} target="_blank" rel="noopener noreferrer">{ad.link}</a>
              </Td>
              <Td>{ad.position}</Td>
              <Td>
                <Status color={statusColors[ad.status] || 'black'}>{ad.status}</Status>
              </Td>
              <Td>{new Date(ad.startDate).toLocaleDateString()}</Td>
              <Td>{new Date(ad.endDate).toLocaleDateString()}</Td>
              <Td>{ad.price.toLocaleString()} VND</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyAdvertisementsPage;

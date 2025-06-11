import React, { useEffect, useState } from 'react';
import {
  getPendingAdvertisements,
  approveAdvertisement,
  rejectAdvertisement,
} from '../../services/AdvertisementService';
import { getDetailsUser } from '../../services/UserService';
import {
  PageContainer,
  Title,
  Table,
  Th,
  Td,
  ActionButton,
  RejectButton,
  ImagePreview,
  LoadingText,
  NoData,
} from './style';

const AdvertisementAdminPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const rawAds = await getPendingAdvertisements();

      const adsWithUsers = await Promise.all(
        rawAds.map(async (ad) => {
          const userId = ad.user;
          if (!userId || typeof userId !== 'string') {
            return { ...ad, userName: 'Không rõ (user thiếu)' };
          }

          try {
            const userRes = await getDetailsUser(userId);
            const userName = userRes?.data?.name || 'Không rõ';
            return { ...ad, userName };
          } catch (err) {
            return { ...ad, userName: 'Không rõ (lỗi khi lấy user)' };
          }
        })
      );

      setAds(adsWithUsers);
    } catch (err) {
      alert('❌ Lỗi lấy danh sách quảng cáo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const confirmed = window.confirm('🟢 Bạn có chắc chắn muốn DUYỆT quảng cáo này không?');
    if (!confirmed) return;

    try {
      await approveAdvertisement(id);
      alert('✅ Quảng cáo đã được duyệt thành công!');
      fetchAds();
    } catch (err) {
      alert('❌ Lỗi khi duyệt: ' + err.message);
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm('🔴 Bạn có chắc chắn muốn TỪ CHỐI quảng cáo này không?');
    if (!confirmed) return;

    try {
      await rejectAdvertisement(id);
      alert('❌ Quảng cáo đã bị từ chối.');
      fetchAds();
    } catch (err) {
      alert('❌ Lỗi khi từ chối: ' + err.message);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <PageContainer>
      <Title>📢 Quản lý quảng cáo chờ duyệt</Title>

      {loading ? (
        <LoadingText>Đang tải dữ liệu...</LoadingText>
      ) : ads.length === 0 ? (
        <NoData>Không có quảng cáo nào đang chờ duyệt.</NoData>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Hình ảnh</Th>
              <Th>Người gửi</Th>
              <Th>Vị trí</Th>
              <Th>Link</Th>
              <Th>Ngày bắt đầu</Th>
              <Th>Số ngày</Th>
              <Th>Chi phí</Th>
              <Th>Hành động</Th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <Td>
                  <ImagePreview src={ad.imageUrl} alt="Ad" />
                </Td>
                <Td>{ad.userName}</Td>
                <Td>{ad.position}</Td>
                <Td>
                  <a href={ad.link} target="_blank" rel="noopener noreferrer">
                    {ad.link}
                  </a>
                </Td>
                <Td>{new Date(ad.startDate).toLocaleDateString()}</Td>
                <Td>{ad.duration} ngày</Td>
                <Td>{ad.price.toLocaleString()} VND</Td>
                <Td>
                  <ActionButton onClick={() => handleApprove(ad._id)}>
                    Duyệt
                  </ActionButton>
                  <RejectButton onClick={() => handleReject(ad._id)}>
                    Từ chối
                  </RejectButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </PageContainer>
  );
};

export default AdvertisementAdminPage;

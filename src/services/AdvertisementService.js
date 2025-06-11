import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL_BACKEND}`;

// ✅ 1. Tạo quảng cáo (người dùng)
export const createAdvertisement = async (data, token) => {
  const res = await axios.post(
    `${BASE_URL}/advertisements/create-ad`,
    {
      userId: data.userId,
      imageUrl: data.imageUrl,
      link: data.link,
      position: data.position,
      price: data.price,
      startDate: data.startDate,
      durationDays: data.durationDays,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// ✅ 2. Duyệt quảng cáo (Admin)
export const approveAdvertisement = async (id) => {
  const res = await axios.post(`${BASE_URL}/advertisements/approve-ad/${id}`);
  return res.data;
};

// ✅ 3. Từ chối quảng cáo (Admin)
export const rejectAdvertisement = async (id) => {
  const res = await axios.post(`${BASE_URL}/advertisements/reject-ad/${id}`);
  return res.data;
};

// ✅ 4. Lấy quảng cáo đã duyệt (hiện tại đang chạy)
export const getApprovedAdvertisements = async () => {
  const res = await axios.get(`${BASE_URL}/advertisements/approved-ads`);
  return res.data;
};

// ✅ 5. Lấy quảng cáo chờ duyệt (pending)
export const getPendingAdvertisements = async () => {
  const res = await axios.get(`${BASE_URL}/advertisements/pending-ads`);
  return res.data;
};

// ✅ 6. Lấy quảng cáo của user (My Ads)
export const getMyAdvertisements = async (userId, token) => {
  const res = await axios.get(`${BASE_URL}/advertisements/my-ads`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const checkHasActiveAd = async (userId) => {
  const res = await axios.get(`${BASE_URL}/advertisements/has-active-ad/${userId}`);
  return res.data; // { hasActiveAd: true/false }
};
export const getActiveAdvertisements = async () => {
  const res = await axios.get(`${BASE_URL}/advertisements/active-ads`);
  return res.data;
};


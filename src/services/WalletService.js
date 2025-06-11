import axios from "axios";

export const axiosJWT = axios.create();

// Lấy số dư ví
export const getWalletBalance = async (walletId) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/${walletId}/balance`);
  return res.data;
};

// Lấy lịch sử giao dịch
export const getWalletTransactions = async (walletId) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/${walletId}/transactions`);
  return res.data;
};

// Gửi yêu cầu nạp tiền kèm ảnh base64
export const createDepositRequest = async ({ userId, amount, imageBase64 }) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/deposit/request`, {
    userId,
    amount,
    imageBase64
  });
  return res.data;
};

// Tạo ví cho user (nếu cần)
export const createWallet = async (userId) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/create/${userId}`);
  return res.data;
};

// Admin duyệt yêu cầu nạp tiền
export const approveDepositRequest = async (requestId) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/deposit/approve/${requestId}`);
  return res.data;
};

// Nạp tiền thủ công (admin)
export const depositToWallet = async (walletId, amount) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/deposit/${walletId}`, {
    amount
  });
  return res.data;
};

export const getUserDepositRequests = async (userId) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/deposit-requests/user/${userId}`);
  return res.data;
};

export const getAllDepositRequests = async (query = {}) => {
  const params = new URLSearchParams(query).toString();
  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/deposit-requests?${params}`);
  return res.data;
};

export const rejectDepositRequest = async (requestId) => {
  const res = await axios.put(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/deposit-requests/reject/${requestId}`);
  return res.data;
};

export const getTransactionByUserId = async (userId) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/transactions/user/${userId}`);
  return res.data;
};

export const filterTransactions = async (walletId, { type, fromDate, toDate }) => {
  const query = new URLSearchParams();
  if (type) query.append('type', type);
  if (fromDate) query.append('fromDate', fromDate);
  if (toDate) query.append('toDate', toDate);

  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/wallet/transactions/${walletId}/filter?${query.toString()}`);
  return res.data;
};

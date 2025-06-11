import React, { useEffect, useState } from 'react';
import {
  WalletContainer,
  WalletBox,
  WalletHeader,
  WalletIcon,
  WalletAmount,
  WalletLabel,
  WalletButtons,
  WalletButton
} from './style';
import { FaWallet, FaPlusCircle, FaMoneyBillWave, FaHistory, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as WalletService from '../../services/WalletService';
import * as UserService from '../../services/UserService';

const WalletDashboard = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const res = await UserService.getDetailsUser(user?.id, user?.access_token);
        const walletId = res?.data?.wallet;
        if (walletId) {
          const walletRes = await WalletService.getWalletBalance(walletId);
          setBalance(walletRes?.balance || 0);
        }
      } catch (err) {
        console.error('Lỗi khi lấy số dư ví:', err);
      }
    };

    if (user?.id && user?.access_token) {
      fetchWalletBalance();
    }
  }, [user]);

  return (
    <WalletContainer>
      <WalletBox>
        <WalletHeader>
          <WalletIcon>
            <FaWallet />
          </WalletIcon>
          <div>
            <WalletLabel>Số dư trong ví</WalletLabel>
            <WalletAmount>{balance.toLocaleString()} ₫</WalletAmount>
          </div>
        </WalletHeader>

        <WalletButtons>
          <WalletButton onClick={() => navigate('/wallet')}>
            <FaPlusCircle /> Nạp tiền
          </WalletButton>
          <WalletButton onClick={() => navigate('/withdraw')}>
            <FaMoneyBillWave /> Rút tiền
          </WalletButton>
          <WalletButton onClick={() => navigate('/transactionHistory')}>
            <FaHistory /> Lịch sử
          </WalletButton>
          <WalletButton onClick={() => navigate('/desposit')}>
            <FaClipboardList /> Yêu cầu
          </WalletButton>
        </WalletButtons>
      </WalletBox>
    </WalletContainer>
  );
};

export default WalletDashboard;

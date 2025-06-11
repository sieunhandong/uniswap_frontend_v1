import styled from 'styled-components';

export const WalletContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #f9f9f9;
`;

export const WalletBox = styled.div`
  background: linear-gradient(135deg, #e9fbe9, #ffffff);
  border: 4px solid #2ecc71;
  border-radius: 36px 80px 36px 36px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  width: 520px;
  padding: 40px 32px;
  text-align: center;
`;

export const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border: 2px dashed #27ae60;
  border-radius: 20px;
  padding: 20px;
  background-color: #e8fff1;
  margin-bottom: 30px;
`;

export const WalletIcon = styled.div`
  background-color: white;
  border: 2px solid #2ecc71;
  color: #27ae60;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WalletLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #34495e;
`;

export const WalletAmount = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 5px;
`;

export const WalletButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const WalletButton = styled.button`
  background: #ecf0f1;
  border: none;
  border-radius: 16px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dfe6e9;
    transform: translateY(-2px);
  }

  svg {
    font-size: 22px;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #2c9876;
`;

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderRow = styled.div`
  display: flex;
  font-weight: bold;
  background: #e6f5f0;
  padding: 12px 0;
  border-radius: 8px;
`;

export const Row = styled.div`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #e8e8e8;
  align-items: center;
`;

export const Cell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 15px;
  word-break: break-word;
`;

export const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 600;
  color: white;
  background: ${({ status }) =>
    status === 'approved'
      ? '#4CAF50'
      : status === 'pending'
        ? '#FFC107'
        : '#F44336'};
`;

export const Empty = styled.div`
  text-align: center;
  padding: 30px 0;
  font-size: 16px;
  color: #888;
`;

export const ImagePreview = styled.img`
  width: 80px;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #ccc;
`;

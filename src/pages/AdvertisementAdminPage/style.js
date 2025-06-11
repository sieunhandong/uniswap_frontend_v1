import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 24px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
`;

export const Th = styled.th`
  background-color: #f7f7f7;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
`;

export const Td = styled.td`
  padding: 12px;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
`;

export const ImagePreview = styled.img`
  width: 100px;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
`;

export const ActionButton = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  margin: 4px 6px 4px 0;
  cursor: pointer;
  transition: 0.2s all ease;
  box-shadow: 0 2px 5px rgba(40, 167, 69, 0.3);

  &:hover {
    background-color: #218838;
    box-shadow: 0 3px 8px rgba(40, 167, 69, 0.4);
  }

  &::before {
    content: '✅ ';
  }
`;

export const RejectButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s all ease;
  box-shadow: 0 2px 5px rgba(220, 53, 69, 0.3);

  &:hover {
    background-color: #c82333;
    box-shadow: 0 3px 8px rgba(220, 53, 69, 0.4);
  }

  &::before {
    content: '❌ ';
  }
`;

export const LoadingText = styled.p`
  font-size: 16px;
  color: #555;
`;

export const NoData = styled.p`
  font-size: 16px;
  color: #888;
  font-style: italic;
`;

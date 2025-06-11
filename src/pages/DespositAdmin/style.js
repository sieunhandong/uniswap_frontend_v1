import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1280px;
  margin: 30px auto;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const Header = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 280px;
  font-size: 15px;
`;

export const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 250px;
  font-size: 15px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

export const Th = styled.th`
  padding: 14px 16px;
  background-color: #f5f5f5;
  font-weight: 600;
  color: #444;
  border-bottom: 2px solid #eee;
  text-align: left;
`;

export const Td = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  color: #555;
  font-size: 15px;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #fafafa;
  }
`;

export const Status = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;
  text-transform: capitalize;
  color: ${props => props.status === 'approved' ? '#2e7d32' : props.status === 'rejected' ? '#d32f2f' : '#f9a825'};
  background-color: ${props => props.status === 'approved' ? '#c8e6c9' : props.status === 'rejected' ? '#ffcdd2' : '#fff8e1'};
`;

export const Message = styled.div`
  margin-top: 15px;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  color: #2e7d32;
  background-color: #e8f5e9;
`;
export const ImagePreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;


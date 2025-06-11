import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px;
  background: #fff;
  color: #000;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const StatusButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: ${({ active }) => (active ? '2px solid #2980b9' : '1px solid #ccc')};
  background-color: ${({ active }) => (active ? '#3498db' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
    color: #fff;
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input[type='date'] {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
  }

  label {
    color: #444;
    font-size: 14px;
  }
`;

export const TransactionTable = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Cell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
`;

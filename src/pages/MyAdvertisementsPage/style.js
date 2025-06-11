import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const Status = styled.span`
  color: ${(props) => props.color};
  font-weight: bold;
`;

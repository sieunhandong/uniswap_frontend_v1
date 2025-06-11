import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 40px auto;
`;

export const LeftColumn = styled.div`
  flex: 1;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;

export const RightColumn = styled.div`
  width: 460px; /* Tăng từ 400px */
  background: #fffbea;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;


export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

export const Label = styled.p`
  margin-top: 16px;
  font-weight: bold;
`;

export const Value = styled.p`
  margin-top: 4px;
  font-size: 16px;
`;

export const CopyButton = styled.button`
  margin-left: 8px;
  padding: 2px 8px;
  background: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  background-color: #f7a400;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #d98c00;
  }
`;

export const QRImage = styled.img`
  width: 320px;
  height: 320px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const Note = styled.div`
  font-size: 13px;
  margin-top: 8px;
  color: #333;
  background: #fffae5;
  padding: 8px 12px;
  border-left: 4px solid #f7a400;
  border-radius: 6px;
`;

export const RateBox = styled.div`
  margin-top: 30px;
  background: #f2f2f2;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  .small {
    font-size: 12px;
    color: gray;
  }
`;

export const Message = styled.p`
  margin-top: 12px;
  color: green;
`;

export const Section = styled.div`
  margin-top: 30px;
`;
export const ImagePreview = styled.img`
  margin-top: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  object-fit: contain;
`;

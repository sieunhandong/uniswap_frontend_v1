import { Button } from 'antd';
import styled from 'styled-components';

export const RatingContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const RatingHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const RatingTitle = styled.h2`
  font-size: 24px;
  color: #333;
`;

export const RatingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RatingItem = styled.div`
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostInfo = styled.div`
  flex: 1;
`;

export const PostTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 5px 0;
`;

export const PostPrice = styled.p`
  font-size: 16px;
  color: #888;
`;

export const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RatingStars = styled.div`
  .ant-rate {
    font-size: 20px;
  }
`;

export const RatingComment = styled.div`
  .ant-input {
    min-height: 80px;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: #2C9876;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;

  &:hover {
    background-color: #1e6b5a;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
  width: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  & img {
    height: 220px;
    width: 100%;
    object-fit: cover;
  }
`;


export const WrapperImageStyle = styled.img`
    top: -1px;
    left: -1px;
    border-top-left-radius: 3px;
    position: absolute;
    height: 100%;
    width: 100%;
`

export const StyleNameProduct = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #333;
  margin: 8px 0;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;


export const WrapperReportText = styled.div`
  font-size: 12px;
  color: rgb(128, 128, 137);
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;


export const WrapperPriceText = styled.div`
  font-size: 16px;
  color: #ff424e;
  font-weight: 600;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;


export const WrapperDiscountText = styled.span`
  font-size: 13px;
  color: #ff424e;
  background-color: #fff0f1;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
`;


export const WrapperStyleTextSell = styled.span`
  font-size: 12px;
  color: rgb(120, 120, 120);
`;

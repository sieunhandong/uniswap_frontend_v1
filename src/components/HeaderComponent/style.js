import styled from "styled-components";
import { Link } from "react-router-dom";

export const WrapperHeader = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #2c9876 0%, #38a169 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  @media (max-width: 1024px) {
    padding: 12px 16px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 8px 12px;
    gap: 8px;
  }
`;

export const WrapperTextHeader = styled(Link)`
  color: #ffffff;
  font-size: 28px;
  font-weight: 800;
  font-family: "Inter", sans-serif;
  margin-left: 12px;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: #e6fffa;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    font-size: 24px;
    margin-left: 8px;
  }
`;

export const WrapperTextHeaderSmall = styled.div`
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  transition: color 0.3s ease;
  &:hover {
    color: #e6fffa;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 24px;
  transition: background 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  @media (max-width: 768px) {
    padding: 6px 12px;
    gap: 8px;
  }
`;

export const WrapperContentPopup = styled.div`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
  cursor: pointer;
  background: #ffffff;
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background: #e6f7ff;
    color: #1890ff;
  }
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const WrapperSearchButton = styled.div`
  .ant-btn {
    background: linear-gradient(135deg, #ffffff, #f7fafc);
    color: #2c9876;
    font-size: 15px;
    font-weight: 600;
    height: 44px;
    border: none;
    border-radius: 8px;
    padding: 0 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: background 0.3s ease, transform 0.3s ease;
    &:hover {
      background: linear-gradient(135deg, #f7fafc, #e2e8f0);
      color: #38a169;
      transform: translateY(-2px);
    }
  }
  @media (max-width: 768px) {
    .ant-btn {
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
    }
  }
`;

export const WrapperCategoryTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    padding: 6px 12px;
  }

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`;
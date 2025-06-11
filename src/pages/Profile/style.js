import { Upload, Button, Divider } from "antd";
import styled, { keyframes } from "styled-components";

// Color Palette
const colors = {
  primary: '#2C9876',      
  primaryDark: '#237A5E',  
  primaryLight: '#3FB085', 
  
  secondary: '#F8FAFC',
  accent: '#E2E8F0',
  
  text: {
    primary: '#1A202C',
    secondary: '#4A5568',
    muted: '#718096'
  },
  
  background: {
    main: '#FFFFFF',
    secondary: '#F7FAFC',
    card: '#FFFFFF'
  },
  
  border: '#E2E8F0',
  shadow: 'rgba(0, 0, 0, 0.1)'
};

// Subtle animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WrapperHeader = styled.h1`
  color: ${colors.text.primary};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.025em;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background: ${colors.primary};
    margin-top: 12px;
    border-radius: 2px;
  }
`

export const WrapperProfileContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: ${colors.background.main};
  border-radius: 16px;
  box-shadow: 0 4px 24px ${colors.shadow};
  overflow: hidden;
  border: 1px solid ${colors.border};
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 768px) {
    margin: 20px;
    border-radius: 12px;
  }
`

export const ProfileSection = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const WrapperAvatarProfile = styled.div`
  width: 320px;
  padding: 40px 30px;
  background: ${colors.background.secondary};
  border-right: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${colors.border};
    padding: 30px;
    justify-content: center;
  }
`

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  
  .avatar-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${colors.background.main};
    box-shadow: 0 8px 24px rgba(44, 152, 118, 0.15);
    margin-bottom: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 32px rgba(44, 152, 118, 0.2);
    }
  }
  
  .avatar-placeholder {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    border: 4px solid ${colors.background.main};
    box-shadow: 0 8px 24px rgba(44, 152, 118, 0.15);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 32px rgba(44, 152, 118, 0.2);
    }
  }
`

export const WrapperContentProfile = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background: ${colors.background.main};
  
  @media (max-width: 768px) {
    padding: 30px;
  }
`

export const WrapprerLabel = styled.label`
  color: ${colors.text.secondary};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .anticon {
    color: ${colors.primary};
    font-size: 16px;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  
  .ant-input {
    border: 1px solid ${colors.border};
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: ${colors.background.main};
    color: ${colors.text.primary};
    
    &::placeholder {
      color: ${colors.text.muted};
    }
    
    &:hover {
      border-color: ${colors.primaryLight};
    }
    
    &:focus {
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px rgba(44, 152, 118, 0.1);
      outline: none;
    }
  }
`

export const WrapperUploadFile = styled(Upload)`
  .ant-upload-list {
    display: none;
  }
`

export const UploadButton = styled(Button)`
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  height: auto;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(44, 152, 118, 0.2);
  
  &:hover {
    background: ${colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 152, 118, 0.25);
    color: white;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .anticon {
    margin-right: 6px;
  }
`

export const SaveButton = styled(Button)`
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 16px;
  height: auto;
  align-self: flex-end;
  margin-top: 24px;
  min-width: 150px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(44, 152, 118, 0.2);
  
  &:hover {
    background: ${colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 152, 118, 0.25);
    color: white;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &[disabled] {
    background: ${colors.text.muted};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &:hover {
      background: ${colors.text.muted};
      transform: none;
      box-shadow: none;
    }
  }
  
  .anticon {
    margin-right: 8px;
  }
`

export const DividerStyled = styled(Divider)`
  margin: 32px 0;
  border-top: 1px solid ${colors.border};
`

export const InfoCard = styled.div`
  background: ${colors.background.card};
  border-radius: 12px;
  padding: 32px;
  margin-top: 35px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px ${colors.shadow};
  border: 1px solid ${colors.border};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px ${colors.shadow};
  }
`

// Add user info section below avatar
export const UserInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 8px;
  padding: 0 10px;
`

export const UserName = styled.h3`
  color: ${colors.text.primary};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
`

export const UserRole = styled.p`
  color: ${colors.text.secondary};
  font-size: 14px;
  margin: 0 0 16px 0;
  font-weight: 500;
`

export const UserStats = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 8px;
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .stat-number {
    color: ${colors.primary};
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  
  .stat-label {
    color: ${colors.text.muted};
    font-size: 12px;
    font-weight: 500;
  }
`
export const SectionTitle = styled.h2`
  color: ${colors.text.primary};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: ${colors.primary};
    border-radius: 2px;
  }
`

export const StatusIndicator = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => 
    props.status === 'success' ? colors.primary :
    props.status === 'error' ? '#E53E3E' :
    'transparent'};
  transition: all 0.2s ease;
`
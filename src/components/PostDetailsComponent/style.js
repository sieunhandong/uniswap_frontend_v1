import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

// Container chính
export const WrapperContainer = styled.div`
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(44, 152, 118, 0.08);
    border: 1px solid rgba(44, 152, 118, 0.1);
    margin: 16px 0;
    
    @media (max-width: 768px) {
        padding: 16px;
        margin: 8px;
        border-radius: 12px;
    }
`;

// Section hình ảnh
export const WrapperImageSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const WrapperMainImage = styled.div`
    width: 100%;
    
    .ant-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(44, 152, 118, 0.15);
        
        img {
            transition: transform 0.3s ease;
        }
        
        &:hover img {
            transform: scale(1.02);
        }
    }
    
    @media (max-width: 768px) {
        .ant-image {
            height: 250px;
        }
    }
`;

export const WrapperThumbnailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
    }
`;

export const WrapperThumbnailImage = styled.div`
    .ant-image {
        width: 100%;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        
        &:hover {
            border-color: #2C9876;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(44, 152, 118, 0.2);
        }
    }
    
    @media (max-width: 768px) {
        .ant-image {
            height: 60px;
        }
    }
`;

// Section thông tin
export const WrapperInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    
    @media (max-width: 768px) {
        gap: 16px;
        margin-top: 20px;
    }
`;

export const WrapperStyleNameProduct = styled.h1`
    color: #1a1a1a;
    font-size: 28px;
    font-weight: bold;
    line-height: 1.3;
    margin: 0;
    word-break: break-word;
    
    @media (max-width: 768px) {
        font-size: 24px;
    }
    
    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

export const WrapperPrice = styled.div`
    color: red;
    font-size: 26px;
    font-weight: bold;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    &:hover::before {
        left: 100%;
    }
    
    @media (max-width: 768px) {
        font-size: 28px;
        padding: 14px 16px;
    }
    
    @media (max-width: 480px) {
        font-size: 24px;
        padding: 12px 14px;
    }
`;

export const WrapperInfoItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #f8fffe;
    border-radius: 10px;
    border-left: 2px solid #2C9876;
    
    @media (max-width: 768px) {
        padding: 10px 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
    
    .label {
        font-weight: 600;
        color: #2C9876;
        min-width: 100px;
        margin-right: 12px;
        
        @media (max-width: 768px) {
            min-width: auto;
            margin-right: 0;
        }
    }
    
    .value {
        color: #0000000;
        font-weight: 500;
        
        &.new {
            color: #2C9876;
            font-weight: 600;
        }
        
        &.used {
            color: #ff6b35;
            font-weight: 600;
        }
        
        &.location {
            color: #000000;
            text-decoration: underline;
        }
    }
`;

export const WrapperButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin: 20px 0;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        margin: 16px 0;
    }
`;

export const WrapperButton = styled.button`
    flex: 1;
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 15px;
    }
    
    ${props => props.type === 'primary' ? `
        background: linear-gradient(135deg, #2C9876 0%, #1e6b5a 100%);
        color: white;
        box-shadow: 0 4px 16px rgba(44, 152, 118, 0.3);
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(44, 152, 118, 0.4);
        }
        
        &:active {
            transform: translateY(0);
        }
    ` : `
        background: white;
        color: #2C9876;
        border: 2px solid #2C9876;
        
        &:hover {
            background: #2C9876;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(44, 152, 118, 0.3);
        }
        
        &:active {
            transform: translateY(0);
        }
    `}
`;

export const WrapperDivider = styled.div`
    height: 1px;
    background: linear-gradient(90deg, transparent, #2C9876, transparent);
    margin: 20px 0;
`;

export const WrapperSellerSection = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: linear-gradient(135deg, #f8fffe 0%, #e8f5f0 100%);
    border-radius: 12px;
    border: 1px solid rgba(44, 152, 118, 0.2);
    
    @media (max-width: 768px) {
        padding: 16px;
        gap: 12px;
    }
`;

export const WrapperSellerAvatar = styled.div`
    .ant-image {
        border: 2px solid #2C9876;
        border-radius: 50%;
        overflow: hidden;
        
        img {
            transition: transform 0.3s ease;
        }
        
        &:hover img {
            transform: scale(1.1);
        }
    }
    
    .avatar-placeholder {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #2C9876;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 600;
        color: #2C9876;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        
        &:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(44, 152, 118, 0.3);
        }
        
        @media (max-width: 768px) {
            width: 45px;
            height: 45px;
            font-size: 18px;
        }
    }
`;

export const WrapperSellerInfo = styled.div`
    flex: 1;
    
    .seller-name {
        font-size: 18px;
        font-weight: 700;
        color: #2C9876;
        margin-bottom: 8px;
        
        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`;

export const WrapperSellerStats = styled.div`
    display: flex;
    gap: 16px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 4px;
    }
    
    span {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        
        &.response-rate {
            color: #000000;
        }
        
        &.sold-count {
            color: #ff6b35;
        }
        
        @media (max-width: 768px) {
            font-size: 13px;
        }
    }
`;

export const WrapperDescription = styled.div`
    background: linear-gradient(135deg, #2C9876 0%, #1e6b5a 100%);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 8px 24px rgba(44, 152, 118, 0.2);
    margin-top: 8px;
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
        padding: 20px;
        margin-top: 6px;
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
        pointer-events: none;
    }
    
    h3 {
        color: white;
        font-size: 22px;
        font-weight: 800;
        margin: 0 0 16px 0;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 8px;
        
        @media (max-width: 768px) {
            font-size: 20px;
            margin-bottom: 14px;
        }
        
        &::before {
            content: '📝';
            font-size: 20px;
        }
    }
    
    .description-content {
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
        border-radius: 12px;
        color: #333;
        line-height: 1.8;
        font-size: 15px;
        white-space: pre-wrap;
        word-wrap: break-word;
        box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
        border: 1px solid rgba(255,255,255,0.3);
        backdrop-filter: blur(10px);
        
        @media (max-width: 768px) {
            padding: 16px;
            font-size: 14px;
            line-height: 1.6;
        }
    }
`;

// Legacy styles (giữ lại để tương thích)
export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`;

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120);
`;

export const WrapperPriceProduct = styled.div`
    background: rgb(250,250,250);
    border-radius: 4px;
`;

export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
`;

export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    span.change-address {
        color: rgb(11,116,229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`;

export const WrapperQuanlityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    width: 100px;
    border: 1px solid #ccc;
`;

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    }
`;
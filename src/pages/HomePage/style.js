import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-bottom: 1px solid #e8ecef;
  background: linear-gradient(90deg, #f8fafc, #ffffff);
  & > div {
    padding: 10px 20px;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    color: #4a5568;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: #1890ff;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(24, 144, 255, 0.3);
    }
    &.active {
      background: #1890ff;
      color: #ffffff;
    }
  }
  @media (max-width: 768px) {
    gap: 8px;
    & > div {
      padding: 8px 16px;
      font-size: 13px;
    }
  }
`;


// Header section
export const WrapperHeader = styled.div`
  border-bottom: 4px solid #2C9876;
  display: flex;
  margin-top: 20px;
  
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const BrandName = styled.span`
  color: #2C9876;
  background: linear-gradient(135deg, #2C9876, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeaderDescription = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 32px auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Search section
export const WrapperSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  &:focus {
    outline: none;
    border-color: #2C9876;
    box-shadow: 0 4px 12px rgba(44, 152, 118, 0.15);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
`;

export const FilterButton = styled.button`
  background: #2C9876;
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(44, 152, 118, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  
  &:hover {
    background: #237a63;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(44, 152, 118, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const WrapperFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
 
  @media (max-width: 768px) {
    width: 100%;
    .ant-select {
      width: 100%;
    }
  }
`;

// Stats section
export const WrapperStats = styled.div`
  max-width: 1200px;
  margin: 0 auto 32px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #2C9876;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

export const StatIcon = styled.div`
  background: rgba(44, 152, 118, 0.1);
  padding: 12px;
  border-radius: 50%;
  color: #2C9876;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatContent = styled.div`
  h3 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 4px 0;
  }
  
  p {
    color: #6b7280;
    margin: 0;
    font-size: 0.875rem;
  }
`;

// Products section
export const WrapperProducts = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 48px 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 32px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }

`;

export const ProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  
  h2 {
    font-size: 1.875rem;  
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const ViewAllButton = styled.button`
  color: #2C9876;
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  gap: 8px;
  padding-top: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #237a63;
    transform: translateX(4px);
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const ProductCard = styled.div`
  max-width: 360px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

export const ProductBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  background: #2C9876;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(44, 152, 118, 0.3);
`;

export const ProductActions = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

export const ProductContent = styled.div`
  padding: 24px;
`;

export const ProductTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  
  ${ProductCard}:hover & {
    color: #2C9876;
  }
`;

export const ProductDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 16px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SellerAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: #2C9876;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const SellerDetails = styled.div`
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 2px 0;
  }
`;

export const SellerRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  span {
    font-size: 0.75rem;
    color: #6b7280;
  }
`;

export const ProductTime = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

export const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2C9876;
`;

export const ProductButton = styled.button`
  background: #2C9876;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #237a63;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(44, 152, 118, 0.3);
  }
`;

// Empty state
export const EmptyState = styled.div`
  text-align: center;
  padding: 48px 20px;
  
  .icon {
    color: #d1d5db;
    margin-bottom: 16px;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #6b7280;
    margin: 0 0 8px 0;
  }
  
  p {
    color: #9ca3af;
    margin: 0;
  }
`;

// Load more button
export const WrapperButtonMore = styled(ButtonComponent)`
  background: white;
  border: 2px solid #2C9876;
  color: #2C9876;
  margin: 48px auto 0 auto;
  display: block;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  &:hover {
    background: #2C9876;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(44, 152, 118, 0.25);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      background: white;
      color: #2C9876;
    }
  }
`;

// const WrapperStats = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin: 40px 0;
//   gap: 20px;
  
//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const StatCard = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px;
//   background: white;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(44, 152, 118, 0.1);
//   flex: 1;
//   max-width: 300px;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//   }
// `;

// const StatIcon = styled.div`
//   padding: 16px;
//   border-radius: 50%;
//   margin-right: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StatContent = styled.div`
//   h3 {
//     color: #2C9876;
//     margin: 0 0 8px 0;
//     font-size: 1.25rem;
//   }
  
//   p {
//     color: #666;
//     margin: 0;
//     font-size: 0.9rem;
//   }
// `;
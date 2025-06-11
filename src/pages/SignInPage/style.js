import styled from "styled-components";
import { keyframes } from "styled-components";

// Color palette hiện đại
const colors = {
  primary: "#26a69a",
  primaryDark: "#00897b",
  primaryLight: "#80cbc4",
  secondary: "#ff5e62",
  white: "#ffffff",
  lightGray: "#f8f9fa",
  gray: "#e0e0e0",
  darkGray: "#6c757d",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  error: "#f44336",
  success: "#4caf50",
  warning: "#ff9800",
  info: "#2196f3",
  shadow: "rgba(0, 0, 0, 0.1)",
};

// Animation cho các hiệu ứng
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

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(38, 166, 154, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0);
  }
`;

// Container chính với background hình ảnh mua bán
export const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-shopping-cart-credit-card_23-2148567846.jpg")
      center/cover no-repeat fixed;
  font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(38, 166, 154, 0.6) 0%,
      rgba(0, 137, 123, 0.6) 100%
    );
    z-index: 0;
  }
`;

// Container chính với background hình ảnh trao đổi hàng hóa
export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1.5rem;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("https://img.freepik.com/free-photo/young-woman-shopping-bags-cart_23-2148573985.jpg")
      center/cover no-repeat fixed;
  font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(38, 166, 154, 0.6) 0%,
      rgba(0, 137, 123, 0.6) 100%
    );
    z-index: 0;
  }
`;

// Card đăng nhập với hiệu ứng glassmorphism
export const LoginCard = styled.div`
  width: 100%;
  max-width: 1000px;
  height: auto;
  min-height: 500px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  background: ${colors.white};
  animation: ${fadeIn} 0.6s ease;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    max-width: 450px;
  }
`;

// Form bên trái
export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  background: ${colors.white};

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
    color: ${colors.textPrimary};
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1rem;
    color: ${colors.textSecondary};
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;

    h1 {
      font-size: 1.75rem;
    }
  }
`;

// Container bên phải - bổ sung background hình ảnh giỏ hàng
export const WrapperContainerRight = styled.div`
  width: 40%;
  background: linear-gradient(
      135deg,
      rgba(38, 166, 154, 0.95) 0%,
      rgba(0, 137, 123, 0.95) 100%
    ),
    url("https://img.freepik.com/free-photo/shopping-cart-filled-with-coins-copy-space_23-2148305919.jpg")
      center/cover no-repeat;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E"),
      linear-gradient(
        135deg,
        rgba(38, 166, 154, 0.9) 0%,
        rgba(0, 137, 123, 0.9) 100%
      );
    z-index: 0;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.white};
    margin: 1rem 0 0.25rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 1.5rem;

    h4 {
      font-size: 1.25rem;
    }
  }
`;

// Input field hiện đại với animation
export const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 1rem;
  background: ${colors.lightGray};
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  margin-bottom: 1.25rem;
  font-weight: 500;

  &:focus {
    border-color: ${colors.primary};
    background: ${colors.white};
    box-shadow: 0 0 0 4px rgba(38, 166, 154, 0.1);
    outline: none;
  }

  &::placeholder {
    color: ${colors.darkGray};
    font-weight: 400;
  }

  @media (max-width: 576px) {
    height: 45px;
    font-size: 0.9rem;
  }
`;

// Text links với hiệu ứng hover
export const WrapperTextLight = styled.span`
  color: ${colors.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${colors.primaryDark};

    &::after {
      width: 100%;
    }
  }
`;

// Container mật khẩu
export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.25rem;

  .eye-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.darkGray};
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    font-size: 1.1rem;

    &:hover {
      color: ${colors.primary};
    }
  }
`;

// Nút đăng nhập
export const LoginButton = styled.button`
  width: 100%;
  height: 52px;
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.primaryDark} 100%
  );
  color: ${colors.white};
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 1.5rem 0 1.25rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    transition: all 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(38, 166, 154, 0.2), 0 3px 6px rgba(0, 0, 0, 0.1);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #b2dfdb 0%, #80cbc4 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 576px) {
    height: 48px;
    font-size: 0.95rem;
    margin: 1.25rem 0 1rem;
  }
`;

// Nút đăng ký
export const SignUpButton = styled(LoginButton)`
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.primaryDark} 100%
  );
`;

// Social login buttons
export const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
`;

// Social button
export const SocialButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background-color: ${colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px ${colors.shadow};

  svg {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
    background-color: ${colors.white};

    svg {
      transform: scale(1.15);
    }
  }

  @media (max-width: 576px) {
    width: 42px;
    height: 42px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

// Divider cải tiến
export const DividerWithText = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &:before,
  &:after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${colors.gray};
  }

  span {
    margin: 0 1rem;
    color: ${colors.darkGray};
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

// Container links
export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: ${colors.textSecondary};
  }
`;

// Phần hiển thị lỗi
export const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;

  &:before {
    content: "⚠️";
    margin-right: 0.5rem;
  }

  animation: ${fadeIn} 0.3s ease;
`;

// Loading wrapper
export const LoadingWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Logo wrapper
export const LogoWrapper = styled.div`
  background: ${colors.white};
  border-radius: 50%;
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  animation: ${pulse} 2s infinite;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

// Slogan text
export const SloganText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  text-align: center;
  font-style: italic;
  margin: 0 0 1.5rem;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

// Promo banner
export const PromoBanner = styled.div`
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  text-align: center;
  margin-top: 1.5rem;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.3);

  p {
    color: ${colors.white};
    font-size: 0.9rem;
    margin: 0.3rem 0;
    line-height: 1.5;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  strong {
    font-size: 1.1rem;
    color: ${colors.white};
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem;

    p {
      font-size: 0.8rem;
    }

    strong {
      font-size: 1rem;
    }
  }
`;

// Form footer
export const FormFooter = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: ${colors.textSecondary};
  line-height: 1.5;
`;

// Floating label input (alternative to regular input)
export const FloatingLabelInput = styled.div`
  position: relative;
  margin-bottom: 1.25rem;

  input {
    width: 100%;
    height: 55px;
    padding: 0.75rem 1rem 0;
    background: ${colors.lightGray};
    border: 2px solid transparent;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: ${colors.primary};
      background: ${colors.white};
      box-shadow: 0 0 0 4px rgba(38, 166, 154, 0.1);
      outline: none;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      transform: translateY(-0.5rem) scale(0.8);
      color: ${colors.primary};
    }
  }

  label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: ${colors.darkGray};
    pointer-events: none;
    transform-origin: left top;
    transition: all 0.3s ease;
  }
`;

// Remember me checkbox
export const RememberMeCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${colors.gray};
    border-radius: 4px;
    margin-right: 0.75rem;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;

    &:checked {
      background-color: ${colors.primary};
      border-color: ${colors.primary};

      &:after {
        content: "";
        position: absolute;
        left: 5px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      box-shadow: 0 0 0 4px rgba(38, 166, 154, 0.1);
      outline: none;
    }
  }

  label {
    font-size: 0.9rem;
    color: ${colors.textSecondary};
    cursor: pointer;
  }
`;

// Button loading state
export const LoadingSpinner = styled.div`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: ${colors.light};
  animation: rotate 1s linear infinite;
  margin: 0 auto;
`;

// App download section
export const AppDownload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  position: relative;
  z-index: 1;

  .app-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    color: ${colors.light};
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;

    .app-btn {
      width: 100%;
      justify-content: center;
      padding: 0.4rem 1rem;
      font-size: 0.8rem;
    }
  }
`;

// Shopping cart icon overlay
export const ShoppingCartOverlay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.25);
  }
`;

// Tooltip
export const Tooltip = styled.div`
  position: absolute;
  top: -45px;
  right: 0;
  background: ${colors.textPrimary};
  color: ${colors.white};
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 100;

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    right: 15px;
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: ${colors.textPrimary} transparent transparent transparent;
  }

  ${PasswordContainer}:hover & {
    opacity: 1;
    visibility: visible;
    top: -55px;
  }
`;

// Password strength
export const PasswordStrength = styled.div`
  width: 100%;
  height: 4px;
  background: ${colors.gray};
  border-radius: 2px;
  margin-top: -10px;
  margin-bottom: 15px;
  overflow: hidden;

  .strength-bar {
    height: 100%;
    width: ${(props) => props.strength || "0%"};
    background: ${(props) => {
      if (props.strength < 25) return colors.error;
      if (props.strength < 50) return colors.warning;
      if (props.strength < 75) return colors.info;
      return colors.success;
    }};
    transition: all 0.3s ease;
  }
`;

// Terms checkbox
export const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${colors.gray};
    border-radius: 4px;
    margin-right: 0.75rem;
    margin-top: 2px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;

    &:checked {
      background-color: ${colors.primary};
      border-color: ${colors.primary};

      &:after {
        content: "";
        position: absolute;
        left: 5px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      box-shadow: 0 0 0 4px rgba(38, 166, 154, 0.1);
      outline: none;
    }
  }

  label {
    font-size: 0.85rem;
    color: ${colors.textSecondary};
    cursor: pointer;
    line-height: 1.4;
  }
`;

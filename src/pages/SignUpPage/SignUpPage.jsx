import React, { useEffect, useState } from "react";
import {
  SignUpContainer,
  SignUpCard,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
  InputField,
  PasswordContainer,
  SignUpButton,
  ErrorMessage,
  LoadingWrapper,
  LogoWrapper,
  SloganText,
  PromoBanner,
  FloatingLabelInput,
  Tooltip,
  PasswordStrength,
  TermsCheckbox,
  FormFooter,
} from "./style";
import { Image } from "antd";
import logoImage from "../../assets/images/UniSwap.png"; // Giả định bạn đã lưu logo
import {
  EyeFilled,
  EyeInvisibleFilled,
  CheckCircleFilled,
  ArrowRightOutlined,
  LockOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutatioHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutatioHooks((data) => UserService.signUpUser(data));

  const { data, isLoading, isError, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  // Calculate password strength
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check
    if (password.length > 8) strength += 25;

    // Character variety check
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    setPasswordStrength(strength);
  }, [password]);

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnchangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = () => {
    setIsSigningIn(true);
    mutation.mutate(
      { email, password, confirmPassword },
      {
        onSettled: () => {
          setIsSigningIn(false);
        },
      }
    );
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleToggleTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  return (
    <SignUpContainer>
      <SignUpCard>
        <WrapperContainerLeft>
          <h1>Tạo tài khoản</h1>
          <p>Đăng ký để bắt đầu giao dịch trên nền tảng UNISWAP</p>

          {/* Email input */}
          <FloatingLabelInput>
            <InputField
              id="email"
              value={email}
              onChange={handleOnchangeEmail}
              placeholder=" "
            />
            <label htmlFor="email">Email của bạn</label>
          </FloatingLabelInput>

          {/* Password input */}
          <PasswordContainer>
            <InputField
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
            <span
              className="eye-icon"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <Tooltip>
              Mật khẩu cần ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
            </Tooltip>
          </PasswordContainer>

          {/* Password strength indicator */}
          <PasswordStrength strength={passwordStrength}>
            <div className="strength-bar"></div>
          </PasswordStrength>

          {/* Confirm Password input */}
          <PasswordContainer>
            <InputField
              placeholder="Xác nhận mật khẩu"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
            <span
              className="eye-icon"
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </PasswordContainer>

          {/* Error message */}
          {data?.status === "ERR" && (
            <ErrorMessage>{data?.message}</ErrorMessage>
          )}

          {/* Terms and conditions */}
          <TermsCheckbox>
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={handleToggleTerms}
            />
            <label htmlFor="terms">
              Tôi đồng ý với{" "}
              <WrapperTextLight>Điều khoản sử dụng</WrapperTextLight> và{" "}
              <WrapperTextLight>Chính sách bảo mật</WrapperTextLight> của
              UNISWAP
            </label>
          </TermsCheckbox>

          {/* Signup button */}
          <LoadingWrapper>
            <Loading isLoading={isSigningIn}>
              <SignUpButton
                disabled={
                  !email.length ||
                  !password.length ||
                  !confirmPassword.length ||
                  !agreeTerms
                }
                onClick={handleSignUp}
              >
                {isSigningIn ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    Đăng ký ngay
                    <ArrowRightOutlined style={{ marginLeft: "8px" }} />
                  </>
                )}
              </SignUpButton>
            </Loading>
          </LoadingWrapper>

          {/* Already have account link */}
          <FormFooter>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
            </WrapperTextLight>
          </FormFooter>
        </WrapperContainerLeft>

        {/* Right side banner */}
        <WrapperContainerRight>
          {/* Logo */}
          <LogoWrapper>
            <Image
              src={logoImage}
              preview={false}
              alt="UNISWAP logo"
              width="90px"
            />
          </LogoWrapper>

          <h4>UNISWAP</h4>
          <SloganText>Giao dịch nhanh - Hoàn đổi dễ</SloganText>

          {/* Benefits list */}
          <PromoBanner>
            <strong>Lợi ích khi đăng ký</strong>
            <p>✓ Giao dịch không giới hạn với phí thấp</p>
            <p>✓ Tự do chuyển đổi giữa các loại tiền tệ</p>
            <p>✓ Bảo mật cao với xác thực nhiều lớp</p>
            <p>✓ Nhận ưu đãi đặc biệt cho thành viên mới</p>
          </PromoBanner>
        </WrapperContainerRight>
      </SignUpCard>
    </SignUpContainer>
  );
};

export default SignUpPage;

import React, { useEffect, useState } from "react";
import {
  LoginPageContainer,
  LoginCard,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
  StyledInput,
  PasswordContainer,
  LoginButton,
  LinksContainer,
  ErrorMessage,
  LoadingWrapper,
  LogoWrapper,
  SloganText,
  PromoBanner,
  DividerWithText,
  SocialButtons,
  SocialButton,
  FormFooter,
  FloatingLabelInput,
  RememberMeCheckbox,
  LoadingSpinner,
  AppDownload,
} from "./style";
import { Image } from "antd";
import logoImage from "../../assets/images/UniSwap.png"; // Giả định bạn đã lưu logo
import {
  EyeFilled,
  EyeInvisibleFilled,
  FacebookFilled,
  GoogleOutlined,
  AppleFilled,
  MobileOutlined,
  AndroidOutlined,
  WarningFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutatioHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutatioHooks((data) => UserService.loginUser(data));
  const { data, isPending, isError, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        const userId = decoded?.id;
        const isAdmin = decoded?.isAdmin;

        if (userId) {
          handleGetDetailsUser(userId, data?.access_token);
        }

        if (location?.state) {
          navigate(location?.state);
        } else {
          if (isAdmin) {
            navigate("/system/admin");
          } else {
            navigate("/");
          }
        }
      }
    }
  }, [isSuccess]);


  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleSignin = () => {
    setIsSigningIn(true);
    mutation.mutate(
      { email, password },
      {
        onSettled: () => {
          setIsSigningIn(false);
        },
      }
    );
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <LoginPageContainer>
      <LoginCard>
        <WrapperContainerLeft>
          <h1>Chào mừng trở lại!</h1>
          <p>Đăng nhập vào tài khoản để tiếp tục giao dịch nhanh chóng</p>

          {/* Email input - sử dụng floating label */}
          <FloatingLabelInput>
            <StyledInput
              id="email"
              value={email}
              onChange={handleOnchangeEmail}
              placeholder=" "
            />
            <label htmlFor="email">Email hoặc số điện thoại</label>
          </FloatingLabelInput>

          {/* Password input with toggle visibility */}
          <PasswordContainer>
            <StyledInput
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
          </PasswordContainer>

          {/* Error message */}
          {data?.status === "ERR" && (
            <ErrorMessage>{data?.message}</ErrorMessage>
          )}

          {/* Remember me checkbox */}
          <RememberMeCheckbox>
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={toggleRememberMe}
            />
            <label htmlFor="remember-me">Ghi nhớ đăng nhập</label>
          </RememberMeCheckbox>

          {/* Login button */}
          <LoadingWrapper>
            <Loading isLoading={isPending}>
              <LoginButton
                disabled={!email.length || !password.length}
                onClick={handleSignin}
              >
                {isPending ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    Đăng nhập
                    <ArrowRightOutlined style={{ marginLeft: "8px" }} />
                  </>
                )}
              </LoginButton>
            </Loading>
          </LoadingWrapper>

          {/* Links for forgot password and signup */}
          <LinksContainer>
            <p>
              <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
            </p>
            <p>
              Chưa có tài khoản?{" "}
              <WrapperTextLight onClick={handleNavigateSignUp}>
                Tạo tài khoản mới
              </WrapperTextLight>
            </p>
          </LinksContainer>

          {/* Divider */}
          <DividerWithText>
            <span>hoặc đăng nhập với</span>
          </DividerWithText>

          {/* Social login buttons */}
          <SocialButtons>
            <SocialButton>
              <FacebookFilled style={{ color: "#1877F2" }} />
            </SocialButton>
            <SocialButton>
              <GoogleOutlined style={{ color: "#DB4437" }} />
            </SocialButton>
            <SocialButton>
              <AppleFilled style={{ color: "#000000" }} />
            </SocialButton>
          </SocialButtons>

          {/* Footer text */}
          <FormFooter>
            Bằng việc đăng nhập, bạn đồng ý với{" "}
            <WrapperTextLight>Điều khoản sử dụng</WrapperTextLight> và{" "}
            <WrapperTextLight>Chính sách bảo mật</WrapperTextLight> của chúng
            tôi
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

          {/* Promo banner */}
          <PromoBanner>
            <strong>Ưu đãi đặc biệt!</strong>
            <p>Miễn phí giao dịch cho người dùng mới</p>
            <p>Hoàn tiền 5% cho giao dịch đầu tiên</p>
          </PromoBanner>

          {/* Mobile app download */}
          <AppDownload>
            <button className="app-btn">
              <AppleFilled />
              App Store
            </button>
            <button className="app-btn">
              <AndroidOutlined />
              Google Play
            </button>
          </AppDownload>
        </WrapperContainerRight>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default SignInPage;

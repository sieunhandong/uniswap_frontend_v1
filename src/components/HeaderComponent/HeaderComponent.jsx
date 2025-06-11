import React, { useEffect, useState } from "react";
import { Badge, Button, Popover, Tooltip } from "antd";
import Modal from "antd/es/modal/Modal";
import WalletDashboard from "../../pages/WalletDashboard/WalletDashboard";
import {
  WrapperContentPopup,
} from "./style";
import "./HeaderComponent.css"
import {
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import vietnamFlag from "../../assets/images/vietnam.png";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import * as CategoryService from "../../services/CategoryService";
import * as WalletService from "../../services/WalletService";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlide";
import Loading from "../LoadingComponent/Loading";
import logo from "../../assets/images/UniSwap.png";
import io from "socket.io-client";
import { MessageCircle } from "lucide-react";
import styled from "styled-components";

const socket = io("https://uniswap-backend-5zjz.onrender.com");

// Modern styled components
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #2C9876;
  box-shadow: 0 2px 12px rgba(44, 152, 118, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderContent = styled.div`
  margin: 0 auto;
  padding: 0 50px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 1200px) {
    padding: 0 20px;
    gap: 24px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 16px;
    height: 64px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
`;

const LogoText = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.5px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SearchSection = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    max-width: none;
    gap: 12px;
  }
`;

const CategoryDropdown = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const CategoryButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const PostButton = styled(Button)`
  height: 40px !important;
  padding: 0 20px !important;
  background: #ffffff !important;
  color: #2C9876 !important;
  border: none !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  font-size: 14px !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: #f8f9fa !important;
    color: #238863 !important;
    transform: translateY(-1px) !important;
  }

  @media (max-width: 768px) {
    padding: 0 16px !important;
    font-size: 13px !important;
  }
`;

const WalletDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

const FlagIcon = styled.img`
  width: 16px;
  height: 12px;
  object-fit: cover;
`;

const AddMoneyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MessageButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LoginText = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const CategoryItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: #333;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 6px;
  margin: 2px 0;

  &:hover {
    background: #f8fffe;
    color: #2C9876;
  }
`;

function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
  const user = useSelector((state) => state.user);
  const userId = user?.id;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await UserService.getDetailsUser(
          user?.id,
          user?.access_token
        );
        const walletId = res?.data?.wallet;
        if (walletId) {
          const walletRes = await WalletService.getWalletBalance(walletId);
          setWalletBalance(walletRes?.balance || 0);
        }
      } catch (error) {
        console.error("Lỗi lấy ví:", error);
      }
    };

    if (user?.id && user?.access_token) {
      fetchWallet();
    }
  }, [user?.id, user?.access_token]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoryLoading(true);
      try {
        const res = await CategoryService.getAllCategories("", 0);
        setCategories(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const categoryContent = (
    <div style={{
      maxHeight: "400px",
      overflowY: "auto",
      width: "280px",
      padding: "8px"
    }}>
      {categoryLoading ? (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Loading isLoading={true} />
        </div>
      ) : categories.length === 0 ? (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          Không có danh mục
        </div>
      ) : (
        <>
          <CategoryItem
            onClick={() => {
              dispatch(searchProduct(""));
            }}
          >
            Tất cả sản phẩm
          </CategoryItem>
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              onClick={() => {
                dispatch(searchProduct(category._id));
              }}
            >
              {category.name}
            </CategoryItem>
          ))}
        </>
      )}
    </div>
  );

  useEffect(() => {
    if (userId) {
      socket.emit("joinNotificationRoom", userId);
      socket.emit("getUnreadCount", userId);
      socket.on("unreadCount", (count) => {
        setUnreadCount(count);
      });
      socket.on("newMessage", () => {
        setUnreadCount((prev) => prev + 1);
      });
    }
    return () => {
      socket.off("unreadCount");
      socket.off("newMessage");
    };
  }, [userId]);

  useEffect(() => {
    setloading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setloading(false);
  }, [user?.name, user?.avatar]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setloading(true);
    await UserService.logoutUser();
    const isAdmin = user?.isAdmin || user?.role === "admin";
    dispatch(resetUser());
    setloading(false);
    if (isAdmin) {
      navigate("/sign-in");
    } else {
      navigate("/");
    }
  };

  const content = (
    <div style={{ minWidth: "200px" }}>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
        Quản lý chung
      </WrapperContentPopup>
      {!user?.isAdmin && (
        <WrapperContentPopup
          onClick={() => handleClickNavigate("walletdashboard")}
        >
          Ví của tôi
        </WrapperContentPopup>
      )}
      {!user?.isAdmin && (
        <WrapperContentPopup
          onClick={() => handleClickNavigate("rating")}
        >
          Đánh giá của tôi
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate("notification")}>
        Thông báo
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else if (type === "walletdashboard") {
      setIsWalletModalOpen(true);
    } else if (type === "rating") {
      navigate("/rating");
    } else if (type === "desposit-admin") {
      navigate("/despositAdmin");
    } else if (type === "notification") {
      navigate("/notification");
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <LogoSection style={{ flex: 1 }}>
            <LogoImage src={logo} alt="UniSwap Logo" />
            <LogoText onClick={() => navigate("/")}>
              UniSwap
            </LogoText>
          </LogoSection>

          {!isHiddenSearch && (
            <SearchSection>
              <CategoryDropdown>
                <Popover
                  content={categoryContent}
                  trigger="hover"
                  placement="bottomLeft"
                  overlayStyle={{ marginTop: "8px" }}
                >
                  <CategoryButton>
                    <MenuOutlined style={{ fontSize: "16px" }} />
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>Danh mục</span>
                  </CategoryButton>
                </Popover>
              </CategoryDropdown>

              <SearchInputWrapper>
                <ButtonInputSearch
                  size="large"
                  textbutton="Tìm kiếm"
                  placeholder="Tìm kiếm sách yêu thích của bạn..."
                  onChange={onSearch}
                />
              </SearchInputWrapper>
            </SearchSection>
          )}

          <ActionsSection style={{ flex: 1, justifyContent: "flex-end" }}>
            {!isHiddenSearch && (
              <PostButton onClick={() => navigate("/post-create")}>
                Đăng bán
              </PostButton>
            )}

            {user?.access_token && (
              <WalletDisplay>
                <FlagIcon src={vietnamFlag} alt="VND" />
                <span>{walletBalance.toLocaleString("vi-VN")}</span>
                <Tooltip title="Nạp tiền">
                  <AddMoneyButton onClick={() => navigate("/wallet")}>
                    <PlusOutlined style={{ fontSize: "12px", color: "#fff" }} />
                  </AddMoneyButton>
                </Tooltip>
              </WalletDisplay>
            )}

            {user?.access_token && (
              <MessageButton
                onClick={() => {
                  navigate("/conversations");
                  setUnreadCount(0);
                }}
              >
                <Badge count={unreadCount} size="small">
                  <MessageCircle style={{ fontSize: "20px", color: "#fff" }} />
                </Badge>
              </MessageButton>
            )}

            <Loading isLoading={loading}>
              <UserSection>
                <UserAvatar>
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="User Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <UserOutlined style={{ fontSize: "18px", color: "#fff" }} />
                  )}
                </UserAvatar>

                {user?.access_token ? (
                  <Popover
                    content={content}
                    trigger="click"
                    open={isOpenPopup}
                    placement="bottomRight"
                    overlayStyle={{ marginTop: "8px" }}
                  >
                    <UserInfo onClick={() => setIsOpenPopup((prev) => !prev)}>
                      <UserName>
                        {userName?.length ? userName : user?.email}
                      </UserName>
                    </UserInfo>
                  </Popover>
                ) : (
                  <LoginText onClick={handleNavigateLogin}>
                    Đăng nhập
                  </LoginText>
                )}
              </UserSection>
            </Loading>
          </ActionsSection>
        </HeaderContent>
      </HeaderContainer>

      <Modal
        open={isWalletModalOpen}
        onCancel={() => setIsWalletModalOpen(false)}
        footer={null}
        width={600}
        centered
        styles={{
          mask: { backdropFilter: "blur(4px)" }
        }}
      >
        <WalletDashboard balance={user?.walletBalance} />
      </Modal>
    </>
  );
}

export default HeaderComponent;
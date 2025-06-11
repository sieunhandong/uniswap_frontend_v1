import React, { useEffect, useState, useRef } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperTypeProduct,
  WrapperHeader,
  WrapperFilter,
  HeaderContent,
  MainTitle,
  BrandName,
  HeaderDescription,
  WrapperSearch,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  FilterButton,
  WrapperStats,
  StatCard,
  StatIcon,
  StatContent,
  WrapperProducts,
  ProductsHeader,
  ViewAllButton,
  ProductsGrid,
  ProductCard,
  ProductImageWrapper,
  ProductBadge,
  ProductActions,
  ActionButton,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductLocation,
  ProductMeta,
  SellerInfo,
  SellerAvatar,
  SellerDetails,
  SellerRating,
  ProductTime,
  ProductFooter,
  ProductPrice,
  ProductButton,
  EmptyState,
  WrapperButtonMore,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/emyeu.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import * as PostService from "../../services/PostService";
import * as CategoryService from "../../services/CategoryService"; // Thêm CategoryService
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { Skeleton, Select } from "antd";
import { searchProduct } from "../../redux/slides/productSlide";
import { getActiveAdvertisements } from '../../services/AdvertisementService';
import VerticalAdSlider from '../../components/VerticalAdSlider/VerticalAdSlider';
import { Search, Filter, MapPin, Star, Clock, Users, ArrowRight, Heart, Share2, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function HomePage() {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProduct, setTypeProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const productsRef = useRef(null);
  const [ads, setAds] = useState([]);
  const [localSearch, setLocalSearch] = useState("");

  // Phân biệt search text và categoryId
  const isCategoryId =
    searchDebounce?.length === 24 && /^[0-9a-fA-F]{24}$/.test(searchDebounce);
  const searchText = isCategoryId ? "" : searchDebounce || "";
  const categoryId = isCategoryId ? searchDebounce : "";

  // Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAllCategories("", 0);
        setCategories(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };

  const fecthPostAll = async (context) => {
    const limit = context?.queryKey[1];
    const search = context?.queryKey[2];
    const categoryId = context?.queryKey[3];
    const sort = context?.queryKey[4];
    const res = await PostService.getApprovedAndPaidPosts(
      search,
      limit,
      categoryId,
      sort
    );
    return res;
  };

  const {
    isLoading,
    data: posts,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["posts", limit, searchText, categoryId, sortBy],
    queryFn: fecthPostAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  const fetchAds = async () => {
    try {
      const data = await getActiveAdvertisements();
      setAds(data);
    } catch (err) {
      console.error('Lỗi tải quảng cáo:', err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);


  const leftAds = ads.filter((ad) => ad.position === 'left');
  const rightAds = ads.filter((ad) => ad.position === 'right');
  const topBannerAds = ads.filter((ad) => ad.position === 'top_banner');

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 6);
    if (productsRef.current) {
      window.scrollTo({
        top: productsRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryId) => {
    dispatch(searchProduct(categoryId));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  }

  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/post-details/${id}`);
  };

  return (
    <Loading isLoading={isLoading || loading}>
      <div className="body"
        style={{
          width: '100%',
          boxSizing: 'border-box',
        }}>

        <WrapperHeader>
          <HeaderContent>
            <MainTitle>
              Chào mừng đến với <BrandName>UniSwap</BrandName>
            </MainTitle>
            <HeaderDescription>
              Nền tảng trao đổi và mua bán đồ cũ dành riêng cho sinh viên.
              Tìm kiếm những món đồ chất lượng với giá cả phải chăng!
            </HeaderDescription>

            {/* Search Bar */}
            {/* <WrapperSearch>
                <SearchInputWrapper>
                  <SearchIcon>
                    <Search size={20} />
                  </SearchIcon>
                  <SearchInput
                    type="text"
                    placeholder="Tìm kiếm sản phẩm, danh mục..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                  />
                </SearchInputWrapper>
                <FilterButton>
                  <Filter size={20} />
                  Bộ lọc
                </FilterButton>
              </WrapperSearch> */}

            {/* Stats Section */}
            <WrapperStats>
              <StatCard>
                <StatIcon style={{ background: '#E8F5F0' }}>
                  <Users size={24} color="#2C9876" />
                </StatIcon>
                <StatContent>
                  <h3 style={{ color: '#2C9876' }}>Sinh viên</h3>
                  <p>Dành riêng cho sinh viên các trường đại học</p>
                </StatContent>
              </StatCard>

              <StatCard>
                <StatIcon style={{ background: '#E8F5F0' }}>
                  <Sparkles size={24} color="#2C9876" /> {/* Icon khởi đầu */}
                </StatIcon>
                <StatContent>
                  <h3 style={{ color: '#2C9876' }}>Khởi đầu</h3>
                  <p>Nền tảng trao đổi, mua bán đồ cũ thân thiện, tiện lợi mới ra mắt</p>
                </StatContent>
              </StatCard>

              <StatCard>
                <StatIcon style={{ background: '#E8F5F0' }}>
                  <ShieldCheck size={24} color="#2C9876" /> {/* Icon bảo mật */}
                </StatIcon>
                <StatContent>
                  <h3 style={{ color: '#2C9876' }}>Tái sử dụng</h3>
                  <p>Tiết kiệm chi phí - Bảo vệ môi trường</p>
                </StatContent>
              </StatCard>


            </WrapperStats>
          </HeaderContent>
        </WrapperHeader>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            height: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'rgba(0, 128, 96, 0.05)' /* Xanh + 5% mờ */

          }}
        >
          {/* Left Ads */}
          <div style={{ width: '300px', height: '100%', flexShrink: 0 }}>
            <VerticalAdSlider ads={leftAds} />
          </div>

          {/* Main Content */}
          <div
            id="container"
            style={{
              flex: 1,
              minWidth: '900px',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              boxSizing: 'border-box'
            }}
          >

            {/* Slider */}
            {/* <SliderComponent arrImages={[slide1, slide2, slide3, slide4]} /> */}


            {/* Top Banner Ads */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '20px',
              }}
            >
              {topBannerAds.map((ad) => (
                <a
                  key={ad._id}
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ad.imageUrl}
                    alt="Top Ad"
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      borderRadius: '6px',
                    }}
                  />
                </a>
              ))}
            </div>

            <div style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '20px', borderRadius: '8px', backgroundColor: 'white' }}>
              <WrapperHeader>
                {/* <h2>Sản phẩm nổi bật</h2> */}
                <WrapperFilter>
                  <div>
                    <ProductsHeader>
                      <h2>Sản phẩm nổi bật ({posts?.length || 0})</h2>

                    </ProductsHeader>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                    <Select
                      value={sortBy}
                      onChange={handleSortChange}
                      style={{ width: 200 }}
                      placeholder="Sắp xếp theo"
                    >
                      <Option value="default">Mặc định</Option>
                      <Option value="priceAsc">Giá: Thấp đến cao</Option>
                      <Option value="priceDesc">Giá: Cao đến thấp</Option>
                      <Option value="newest">Mới nhất</Option>
                    </Select>

                    <ViewAllButton>
                      Xem tất cả
                      <ArrowRight size={16} />
                    </ViewAllButton>
                  </div>

                </WrapperFilter>
              </WrapperHeader>

              {/* Posts List */}
              <div ref={productsRef} >
                {isLoading ? (
                  <WrapperProducts>
                    {[...Array(6)].map((_, idx) => (
                      <Skeleton key={idx} active avatar paragraph={{ rows: 4 }} />
                    ))}
                  </WrapperProducts>
                ) : posts?.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <p>Không tìm thấy bài đăng nào.</p>
                  </div>
                ) : (
                  <WrapperProducts>
                    {posts?.map((product) => (
                      <ProductCard key={product._id}>
                        <ProductImageWrapper>
                          <img
                            src={product.images?.[0] || "default-image.png"}
                            alt={product.title}
                            onError={(e) => {
                              e.target.src = "default-image.png";
                            }}
                          />
                          <ProductBadge>
                            {typeof product?.category === 'object'
                              ? product?.category?.name
                              : product?.category || "Khác"
                            }
                          </ProductBadge>
                          <ProductActions>
                            <ActionButton>
                              <Heart size={16} />
                            </ActionButton>
                            <ActionButton>
                              <Share2 size={16} />
                            </ActionButton>
                          </ProductActions>
                        </ProductImageWrapper>

                        <ProductContent>
                          <ProductTitle>{product.title}</ProductTitle>
                          <ProductDescription>
                            {typeof product.description === 'string'
                              ? product.description
                              : product.description?.text || "Không có mô tả"
                            }
                          </ProductDescription>

                          <ProductLocation>
                            <MapPin size={16} />
                            <span>
                              {typeof product.location === 'object'
                                ? `${product.location?.city || ''} ${product.location?.district || ''}`.trim() || "Hà Nội"
                                : product.location || "Hà Nội"
                              }
                            </span>
                          </ProductLocation>

                          <ProductMeta>
                            <SellerInfo>
                              <SellerAvatar>
                                {(
                                  typeof product.seller === 'string'
                                    ? product.seller
                                    : product.seller?.name || product.author?.name || "U"
                                )?.charAt(0) || "U"}
                              </SellerAvatar>
                              <SellerDetails>
                                <h4>
                                  {typeof product.seller === 'string'
                                    ? product.seller
                                    : product.seller?.name || product.author?.name || "UniSwap User"
                                  }
                                </h4>
                                <SellerRating>
                                  <Star size={12} fill="#fbbf24" color="#fbbf24" />
                                  <span>
                                    {typeof product.rating === 'object'
                                      ? product.rating?.stars
                                      : product.rating || "4.5"
                                    }
                                  </span>
                                </SellerRating>
                              </SellerDetails>
                            </SellerInfo>
                            <ProductTime>
                              {formatDate(product.createdAt) || "Vừa đăng"}
                            </ProductTime>
                          </ProductMeta>

                          <ProductFooter>
                            <ProductPrice>
                              {formatPrice(product.price)}
                            </ProductPrice>
                            <ProductButton onClick={() => goToDetail(product._id)}>
                              Xem chi tiết
                            </ProductButton>
                          </ProductFooter>
                        </ProductContent>
                      </ProductCard>
                    ))}
                  </WrapperProducts>
                )}
              </div>

            </div>

            {/* Load More Button */}
            {posts?.length > 0 && posts?.total > posts?.length && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <WrapperButtonMore
                  textbutton={isPlaceholderData ? "Đang tải..." : "Xem thêm"}
                  type="outline"
                  styleButton={{
                    border: "2px solid #1890ff",
                    color: posts?.total === posts?.length ? "#ccc" : "#1890ff",
                    width: "240px",
                    height: "48px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  disabled={
                    posts?.total === posts?.length || posts?.totalPage === 1
                  }
                  styleTextButton={{
                    color: posts?.total === posts?.length ? "#ccc" : "#1890ff",
                  }}
                  onClick={handleLoadMore}
                />
              </div>
            )}
          </div>

          {/* Right Ads */}
          <div style={{ width: '300px', height: '100%', flexShrink: 0 }}>
            <VerticalAdSlider ads={rightAds} />
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default HomePage;

import { Col, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import { convertPrice, initFacebookSDK } from '../../utils';
import * as PostService from '../../services/PostService';
import {
    WrapperStyleNameProduct,
    WrapperContainer,
    WrapperImageSection,
    WrapperMainImage,
    WrapperThumbnailGrid,
    WrapperThumbnailImage,
    WrapperInfoSection,
    WrapperPrice,
    WrapperInfoItem,
    WrapperButtonGroup,
    WrapperButton,
    WrapperSellerSection,
    WrapperSellerAvatar,
    WrapperSellerInfo,
    WrapperSellerStats,
    WrapperDescription,
    WrapperDivider,
} from './style';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { StarFilled } from '@ant-design/icons';
import { useToast } from '../../context/ToastContext';
const PostDetailsComponent = ({ idProduct }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isPhoneVisible, setIsPhoneVisible] = useState(false);
    const { addToast } = useToast();
    // Fetch product details
    const fetchGetProductDetails = async ({ queryKey }) => {
        const id = queryKey[1];
        if (id) {
            const res = await PostService.getDetailsPost(id);
            return res;
        }
    };

    // Fetch average rating for the seller
    const fetchGetAverageRating = async (sellerId) => {
        if (!sellerId) return { averageRating: 0, totalRatings: 0 };
        try {
            const response = await PostService.getAverageRating(sellerId);
            return response;
        } catch (error) {
            console.error('Error fetching average rating:', error);
            return { averageRating: 0, totalRatings: 0 };
        }
    };

    const { isLoading: isLoadingProduct, data: productDetails, error: productError } = useQuery({
        queryKey: ['post-details', idProduct],
        queryFn: fetchGetProductDetails,
        enabled: !!idProduct,
    });

    const { isLoading: isLoadingRating, data: ratingData, error: ratingError } = useQuery({
        queryKey: ['average-rating', productDetails?.userId?._id],
        queryFn: () => fetchGetAverageRating(productDetails?.userId?._id),
        enabled: !!productDetails?.userId?._id && !isLoadingProduct, // Chỉ chạy khi productDetails sẵn sàng
    });

    useEffect(() => {
        initFacebookSDK();
    }, []); const handleChat = () => {
        if (!user?.access_token) {
            addToast('Bạn cần đăng nhập để nhắn tin', 'warning'); // ✅ THAY message.warning
            return;
        }
        if (productDetails && productDetails.userId && productDetails._id) {
            navigate(`/chat/${productDetails.userId._id}`, {
                state: { post: productDetails },
            });
        }
    };

    const handleShowPhone = () => {
        setIsPhoneVisible(true);
    };

    const mainImage = productDetails?.images?.[0] || '';
    const otherImages = productDetails?.images || [];
    const phoneStr = String(productDetails?.userId?.phone || '');
    const shortPhone = phoneStr.slice(0, 5) + '*****';

    const isOwner = user?.id === productDetails?.userId?._id;

    return (
        <Loading isLoading={isLoadingProduct || isLoadingRating}>
            <WrapperContainer>
                <Row gutter={[24, 16]}>
                    {/* Image Section */}
                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <WrapperImageSection>
                            <WrapperMainImage>
                                <Image
                                    src={mainImage}
                                    alt='image product'
                                    preview
                                    style={{ borderRadius: '12px' }}
                                />
                            </WrapperMainImage>

                            {otherImages.length > 1 && (
                                <WrapperThumbnailGrid>
                                    {otherImages.slice(1).map((img, index) => (
                                        <WrapperThumbnailImage key={index}>
                                            <Image
                                                src={img}
                                                alt={`thumbnail ${index}`}
                                                preview={{ src: img }}
                                                style={{ borderRadius: '8px' }}
                                            />
                                        </WrapperThumbnailImage>
                                    ))}
                                </WrapperThumbnailGrid>
                            )}
                        </WrapperImageSection>
                    </Col>

                    {/* Info Section */}
                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                        <WrapperInfoSection>
                            <WrapperStyleNameProduct>{productDetails?.title}</WrapperStyleNameProduct>

                            <WrapperPrice>{convertPrice(productDetails?.price)} đ</WrapperPrice>

                            <WrapperInfoItem>
                                <span className="label">Tình trạng:</span>
                                <span className={`value ${productDetails?.attributes?.condition === 'new' ? 'new' : 'used'}`}>
                                    {productDetails?.attributes?.condition === 'used' ? 'Đã sử dụng' : 'Mới'}
                                </span>
                            </WrapperInfoItem>

                            <WrapperInfoItem>
                                <span className="label">Địa chỉ:</span>
                                <span className="value location">
                                    {productDetails?.location?.district}, {productDetails?.location?.city}
                                </span>
                            </WrapperInfoItem>

                            <WrapperInfoItem>
                                <span className="label">Cập nhật:</span>
                                <span className="value">
                                    {productDetails?.updatedAt
                                        ? new Date(productDetails.updatedAt).toLocaleString('vi-VN')
                                        : 'Gần đây'}
                                </span>
                            </WrapperInfoItem>

                            {!isOwner && (
                                <WrapperButtonGroup>
                                    <WrapperButton type="outline" onClick={handleShowPhone}>
                                        📞 {isPhoneVisible ? phoneStr : `Hiện số ${shortPhone}`}
                                    </WrapperButton>
                                    <WrapperButton type="primary" onClick={handleChat}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <MessageCircle /> Chat ngay
                                        </div>
                                    </WrapperButton>
                                </WrapperButtonGroup>
                            )}

                            <WrapperDivider />

                            <WrapperSellerSection>
                                <WrapperSellerAvatar>
                                    {productDetails?.userId?.avatar ? (
                                        <Image
                                            src={productDetails.userId.avatar}
                                            width={50}
                                            height={50}
                                            style={{ borderRadius: '50%' }}
                                            preview={false}
                                        />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            {productDetails?.userId?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </WrapperSellerAvatar>
                                <WrapperSellerInfo>
                                    <div className="seller-name">{productDetails?.userId?.name}</div>
                                    <WrapperSellerStats>
                                        <span className="response-rate">
                                            <StarFilled style={{ fontSize: '16px', color: 'gold' }} /> {ratingData?.averageRating?.toFixed(1) || 0}
                                            <span className="rating-count"> ({ratingData?.totalRatings || 0})</span>
                                        </span>
                                        <span className="sold-count">
                                            📦 {productDetails?.userId?.sold || 24} đã bán
                                        </span>
                                    </WrapperSellerStats>
                                </WrapperSellerInfo>
                            </WrapperSellerSection>

                            <WrapperDescription>
                                <h3>Mô tả sản phẩm</h3>
                                <div className="description-content">
                                    {productDetails?.description?.replace(/\\n/g, '\n') || 'Chưa có mô tả chi tiết.'}
                                </div>
                            </WrapperDescription>
                        </WrapperInfoSection>
                    </Col>
                </Row>
            </WrapperContainer>
        </Loading>
    );
};

export default PostDetailsComponent;
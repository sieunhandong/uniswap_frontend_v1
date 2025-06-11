import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Rate, Input, Button, message, Tabs } from 'antd';
import {
    RatingContainer,
    RatingHeader,
    RatingTitle,
    RatingList,
    RatingItem,
    PostInfo,
    PostTitle,
    PostPrice,
    RatingSection,
    RatingStars,
    RatingComment,
    SubmitButton,
} from './style';
import ratingImg from '../../assets/images/rating-img.webp';

const { TabPane } = Tabs;

const RatingPage = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [purchasedPosts, setPurchasedPosts] = useState([]);
    const [ratedPosts, setRatedPosts] = useState([]);
    const [ratings, setRatings] = useState({});
    const [loading, setLoading] = useState(false);
    const [averageRating, setAverageRating] = useState(0); // Trung bình số sao
    const [totalRatings, setTotalRatings] = useState(0); // Tổng số đánh giá

    // Fetch purchased posts (dành cho người mua)
    useEffect(() => {
        const fetchPurchasedPosts = async () => {
            if (!user?.id) {
                message.warning('Vui lòng đăng nhập để xem danh sách.');
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`https://uniswap-backend-5zjz.onrender.com/api/post/purchased?buyerId=${user.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.access_token || localStorage.getItem('access_token') || ''}`,
                    },
                });
                if (Array.isArray(response.data)) {
                    setPurchasedPosts(response.data);
                } else {
                    setPurchasedPosts([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài đăng đã mua:', error.response?.data || error.message);
                message.error('Không thể tải danh sách bài đăng. Vui lòng thử lại.');
            } finally {
                setLoading(false);
            }
        };

        // Fetch rated posts (dành cho người bán)
        const fetchRatedPosts = async () => {
            if (!user?.id) {
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`https://uniswap-backend-5zjz.onrender.com/api/post/rating`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.access_token || localStorage.getItem('access_token') || ''}`,
                    },
                });
                if (Array.isArray(response.data)) {
                    setRatedPosts(response.data);
                    // Tính trung bình số sao
                    const ratings = response.data
                        .map(post => post.rating?.stars || 0)
                        .filter(stars => stars > 0);
                    const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
                    setAverageRating(avg);
                    setTotalRatings(ratings.length);
                } else {
                    setRatedPosts([]);
                    setAverageRating(0);
                    setTotalRatings(0);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách đánh giá:', error.response?.data || error.message);
                message.error('Không thể tải danh sách đánh giá.');
            } finally {
                setLoading(false);
            }
        };

        fetchPurchasedPosts();
        fetchRatedPosts();
    }, [user?.id]);

    const handleRatingChange = (postId, value) => {
        setRatings((prev) => ({
            ...prev,
            [postId]: { ...prev[postId], stars: value },
        }));
    };

    const handleCommentChange = (postId, e) => {
        const comment = e.target.value;
        setRatings((prev) => ({
            ...prev,
            [postId]: { ...prev[postId], comment },
        }));
    };

    const handleSubmitRating = async (postId) => {
        const ratingData = ratings[postId];
        if (!ratingData?.stars) {
            message.warning('Vui lòng chọn số sao trước khi gửi.');
            return;
        }

        try {
            const response = await axios.post(
                `https://uniswap-backend-5zjz.onrender.com/api/post/${postId}/rating`,
                {
                    stars: ratingData.stars,
                    comment: ratingData.comment || '',
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.access_token || localStorage.getItem('access_token') || ''}`,
                    },
                }
            );

            if (response.status === 200) {
                message.success('Đánh giá đã được gửi thành công!');
                setPurchasedPosts((prev) =>
                    prev.map((post) =>
                        post._id === postId ? { ...post, rating: { ...post.rating, stars: ratingData.stars, comment: ratingData.comment, ratedAt: new Date() } } : post
                    )
                );
                setRatings((prev) => {
                    const newRatings = { ...prev };
                    delete newRatings[postId];
                    return newRatings;
                });
            }
        } catch (error) {
            console.error('Lỗi khi gửi đánh giá:', error.response?.data || error.message);
            message.error('Không thể gửi đánh giá.');
        }
    };

    return (
        <RatingContainer>
            {/* Phần thông tin cá nhân */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px', background: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
                <div style={{ width: '40px', height: '40px', background: '#a52a2a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginRight: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{user?.name?.charAt(0) || 'V'}</span>
                </div>
                <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{user?.name || 'Văn Đồng Nguyễn'}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Rate value={averageRating} disabled style={{ fontSize: '14px' }} />
                        <span style={{ marginLeft: '5px' }}>{averageRating.toFixed(1)} ({totalRatings} đánh giá)</span>
                    </div>
                </div>
            </div>

            {/* Phần tiêu đề và thống kê */}
            <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <div style={{ fontSize: '14px', color: '#555' }}>Cả nhận được ({totalRatings})</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                    <div style={{ color: '#0073aa' }}>Người bán ({ratedPosts.length})</div>
                    <div style={{ color: '#0073aa' }}>Người mua ({purchasedPosts.length})</div>
                    <div style={{ color: '#0073aa' }}>Đã đánh giá ({totalRatings})</div>
                </div>
                <div style={{ width: '100%', height: '2px', background: '#f0ad4e', marginTop: '5px' }} />
            </div>

            {/* Nội dung chính */}
            <Tabs defaultActiveKey="1">
                <TabPane tab="Đánh giá người bán" key="1">
                    <RatingList>
                        {loading ? (
                            <p>Đang tải danh sách...</p>
                        ) : purchasedPosts.length > 0 ? (
                            purchasedPosts.map((post) => (
                                <RatingItem key={post._id}>
                                    <PostInfo>
                                        {post.images && post.images.length > 0 && (
                                            <img src={post.images[0]} alt={post.title} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} />
                                        )}
                                        <div>
                                            <PostTitle>{post.title}</PostTitle>
                                            <PostPrice>{post.price?.toLocaleString()} đ</PostPrice>
                                            {post.userId && post.userId.name && (
                                                <div style={{ fontSize: '14px', color: '#555' }}>Bán bởi: {post.userId.name}</div>
                                            )}
                                        </div>
                                    </PostInfo>
                                    <RatingSection>
                                        <RatingStars>
                                            <Rate
                                                value={ratings[post._id]?.stars || 0}
                                                onChange={(value) => handleRatingChange(post._id, value)}
                                                disabled={post.rating?.ratedAt}
                                            />
                                        </RatingStars>
                                        <RatingComment>
                                            <Input.TextArea
                                                value={ratings[post._id]?.comment || ''}
                                                onChange={(e) => handleCommentChange(post._id, e)}
                                                placeholder="Nhập nhận xét của bạn..."
                                                disabled={post.rating?.ratedAt}
                                            />
                                        </RatingComment>
                                        {!post.rating?.ratedAt && (
                                            <SubmitButton onClick={() => handleSubmitRating(post._id)}>Gửi đánh giá</SubmitButton>
                                        )}
                                    </RatingSection>
                                </RatingItem>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <img src={ratingImg} alt="No ratings" style={{ marginBottom: '10px', width: '300px', height: '150px' }} />
                                <p>Bạn chưa có đánh giá nào</p>
                                <p>Hãy mua bán trên Chợ Tốt và đánh giá để xây dựng lòng tin với người bán!</p>
                            </div>
                        )}
                    </RatingList>
                </TabPane>
                <TabPane tab="Đánh giá nhận được" key="2">
                    <RatingList>
                        {loading ? (
                            <p>Đang tải danh sách...</p>
                        ) : ratedPosts.length > 0 ? (
                            ratedPosts.map((post) => (
                                <RatingItem key={post._id}>
                                    <PostInfo>
                                        {post.images && post.images.length > 0 && (
                                            <img src={post.images[0]} alt={post.title} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} />
                                        )}
                                        <div>
                                            <PostTitle>{post.title}</PostTitle>
                                            <PostPrice>{post.price?.toLocaleString()} đ</PostPrice>
                                            {post.userId && post.userId.name && (
                                                <div style={{ fontSize: '14px', color: '#555' }}>Bán bởi: {post.userId.name}</div>
                                            )}
                                        </div>
                                    </PostInfo>
                                    <RatingSection>
                                        <RatingStars>
                                            <Rate value={post.rating?.stars || 0} disabled />
                                        </RatingStars>
                                        <RatingComment>
                                            <Input.TextArea
                                                value={post.rating?.comment || ''}
                                                placeholder="Nhận xét"
                                                disabled
                                            />
                                        </RatingComment>
                                    </RatingSection>
                                </RatingItem>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <img src={ratingImg} alt="No ratings" style={{ marginBottom: '10px', width: '300px', height: '150px' }} />
                                <p>Bạn chưa có đánh giá nào</p>
                                <p>Hãy mua bán trên Chợ Tốt và đánh giá để xây dựng lòng tin với người bán!</p>
                            </div>
                        )}
                    </RatingList>
                </TabPane>
            </Tabs>
        </RatingContainer>
    );
};

export default RatingPage;
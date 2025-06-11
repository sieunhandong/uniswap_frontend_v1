import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { MessageCircle, User } from 'lucide-react';
import { AvatarFallback, AvatarImage, ChatAreaContent, ChatAreaPlaceholder, Container, ConversationContent, ConversationItem, ConversationName, ConversationPreview, ConversationsList, EmptyState, LoginPromptBox, LoginPromptIcon, LoginPromptText, LoginPromptWrapper, PlaceholderIconWrapper, PlaceholderText, PlaceholderTitle, Sidebar, SidebarHeader, Title, UnreadBadge } from './style';

const ConversationsPage = () => {
    const user = useSelector((state) => state.user);
    const [conversations, setConversations] = useState([]);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    const userId = user?.id;

    useEffect(() => {
        const newSocket = io("https://uniswap-backend-5zjz.onrender.com");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket || !userId) return;
        socket.emit('getConversations', { userId });

        const handleConversationsList = (data) => {
            setConversations(data);
        };

        socket.on('conversationsList', handleConversationsList);

        return () => {
            socket.off('conversationsList', handleConversationsList);
        };
    }, [socket, userId]);

    const handleConversationClick = (conversation) => {
        navigate(`/chat/${conversation.userId}`, {
            state: { post: conversation.lastMessage?.post || null }
        });
    };

    if (!userId) {
        return (
            <LoginPromptWrapper>
                <LoginPromptBox>
                    <LoginPromptIcon size={48} />
                    <LoginPromptText>Vui lòng đăng nhập để xem tin nhắn.</LoginPromptText>
                </LoginPromptBox>
            </LoginPromptWrapper>
        );
    }

    return (
        <Container>
            <Sidebar>
                <SidebarHeader>
                    <Title>
                        <MessageCircle size={20} />
                        Tin nhắn
                    </Title>
                </SidebarHeader>

                <ConversationsList>
                    {conversations.length === 0 ? (
                        <EmptyState>
                            <MessageCircle size={48} style={{ margin: '0 auto 12px', color: '#cbd5e1' }} />
                            <p>Chưa có hội thoại nào</p>
                        </EmptyState>
                    ) : (
                        conversations.map(c => {
                            const lastMsg = c.lastMessage;
                            let previewText = '';
                            if (lastMsg?.type === 'post') {
                                previewText = `Đã gửi bài: ${lastMsg.post?.title || 'Bài viết'}`;
                            } else if (lastMsg?.type === 'text') {
                                previewText = lastMsg.message;
                            } else {
                                previewText = 'Chưa có tin nhắn';
                            }

                            return (
                                <ConversationItem
                                    key={c._id || c.userId}
                                    onClick={() => handleConversationClick(c)}
                                >
                                    {c.avatar ? (
                                        <AvatarImage src={c.avatar} alt="" />
                                    ) : (
                                        <AvatarFallback>
                                            {(c.name || c.email || 'U').charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    )}

                                    <ConversationContent>
                                        <ConversationName>{c.name || c.email || 'Người dùng'}</ConversationName>
                                        <ConversationPreview>{previewText}</ConversationPreview>
                                    </ConversationContent>

                                    {c.unreadCount > 0 && (
                                        <UnreadBadge>{c.unreadCount}</UnreadBadge>
                                    )}
                                </ConversationItem>
                            );
                        })
                    )}
                </ConversationsList>
            </Sidebar>

            <ChatAreaPlaceholder>
                <ChatAreaContent>
                    <div>
                        <PlaceholderIconWrapper>
                            <MessageCircle size={40} />
                        </PlaceholderIconWrapper>
                        <PlaceholderTitle>Chọn một cuộc trò chuyện</PlaceholderTitle>
                        <PlaceholderText>Chọn một tin nhắn từ danh sách bên trái để bắt đầu trò chuyện</PlaceholderText>
                    </div>
                </ChatAreaContent>
            </ChatAreaPlaceholder>
        </Container>
    );
};

export default ConversationsPage;

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { UserOutlined, SendOutlined, PictureOutlined } from '@ant-design/icons';
import {
  ChatContainer,
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  ConversationsList,
  ConversationItem,
  Avatar,
  AvatarPlaceholder,
  ConversationInfo,
  ConversationName,
  LastMessage,
  ChatArea,
  ChatHeader,
  ChatTitle,
  MessagesContainer,
  MessageWrapper,
  MessageBubble,
  PostMessage,
  PostTitle,
  PostContent,
  PostImage,
  PostPrice,
  PostDescription,
  InputContainer,
  MessageInput,
  SendButton,
  SellButton, // Nút "Đã bán"
  PurchaseButton, // Nút "Đã mua" (thêm style mới)
} from './style';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';
import * as MessageService from "../../services/MessageServcie";
import * as PostService from "../../services/PostService";
const ChatPage = () => {
  const user = useSelector((state) => state.user);
  const { receiverId } = useParams();
  const location = useLocation();
  const post = location.state?.post;
  const navigate = useNavigate();

  const senderId = user?.id;

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(receiverId || null);

  useEffect(() => {
    setSelectedConversationId(receiverId);
  }, [receiverId]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await MessageService.getUserConversations(senderId);
        setConversations(res);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách hội thoại:", err);
      }
    };

    if (senderId) {
      fetchConversations();
    }
  }, [senderId]);

  useEffect(() => {
    const newSocket = io("https://uniswap-backend-5zjz.onrender.com");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!senderId || !receiverId) return;

      const query = new URLSearchParams({
        senderId,
        receiverId,
        ...(post && post._id ? { postId: post._id } : {})
      }).toString();

      try {
        const res = await MessageService.getOrCreateConversation(query);
        setConversationId(res._id);
      } catch (err) {
        console.error("❌ Lỗi khi lấy conversation:", err);
      }
    };

    fetchConversation();
  }, [senderId, receiverId, post]);

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit('joinRoom', { conversationId });

    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('receiveMessage', handleReceiveMessage);
    return () => socket.off('receiveMessage', handleReceiveMessage);
  }, [socket, conversationId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      try {
        const res = await MessageService.getMessages(conversationId);
        if (Array.isArray(res)) {
          setMessages(res);
        } else if (Array.isArray(res.messages)) {
          setMessages(res.messages);
        } else {
          console.error("❌ Dữ liệu không hợp lệ:", res);
          setMessages([]);
        }
      } catch (err) {
        console.error("❌ Lỗi khi lấy tin nhắn:", err);
      }
    };

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    if (socket && post && conversationId && senderId && receiverId) {
      const key = `sentPost-${conversationId}-${post._id}`;
      const alreadySent = localStorage.getItem(key);

      if (!alreadySent) {
        socket.emit('sendMessage', {
          senderId,
          receiverId,
          postId: post._id,
          type: 'post',
          conversationId,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem(key, 'true');
      }
    }
  }, [socket, post, conversationId, senderId, receiverId]);

  const handleSend = () => {
    if (message.trim() === '' || !socket || !conversationId) return;

    const msgData = {
      senderId,
      receiverId,
      conversationId,
      type: 'text',
      message,
      createdAt: new Date().toISOString()
    };

    socket.emit('sendMessage', msgData);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentParticipant = conversations.find(c => c.participant.id === receiverId)?.participant;

  // Hàm xử lý xác nhận "đã bán"
  const handleMarkAsSold = async (postId) => {
    if (!postId || !user?.id) return;

    try {
      const response = await PostService.markAsSold(postId, user?.access_token, receiverId);

      if (response.status === 200) {
        setMessages(prev => prev.map(msg =>
          msg.type === 'post' && msg.post._id === postId
            ? { ...msg, post: { ...msg.post, transaction: { ...msg.post.transaction, status: 'sold' } } }
            : msg
        ));
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận đã bán:", error);
    }
  };

  // Hàm xử lý xác nhận "đã mua"
  const handleMarkAsPurchased = async (postId) => {
    if (!postId || !user?.id) return;

    try {
      const response = await PostService.markAsPurchased(postId, user?.access_token);

      if (response.status === 200) {
        setMessages(prev => prev.map(msg =>
          msg.type === 'post' && msg.post._id === postId
            ? { ...msg, post: { ...msg.post, transaction: { ...msg.post.transaction, status: 'completed' } } }
            : msg
        ));
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận đã mua:", error);
    }
  };

  return (
    <ChatContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>
            <MessageCircle size={20} />
            Tin nhắn
          </SidebarTitle>
        </SidebarHeader>

        <ConversationsList>
          {conversations.map((conv) => (
            <ConversationItem
              key={conv._id}
              onClick={() => {
                setSelectedConversationId(conv.participant.id);
                navigate(`/chat/${conv.participant.id}`, {
                  state: { fromConversationList: true }
                });
              }}
              selected={conv.participant.id === selectedConversationId}
            >
              {conv.participant.avatar ? (
                <Avatar
                  src={conv.participant.avatar}
                  alt="avatar"
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <AvatarPlaceholder style={{ width: 40, height: 40 }}>
                  {(conv.participant.name || conv.participant.email || 'U').charAt(0).toUpperCase()}
                </AvatarPlaceholder>
              )}

              <ConversationInfo>
                <ConversationName>
                  {conv.participant.name || conv.participant.email || 'Người dùng'}
                </ConversationName>
                <LastMessage>
                  {conv.lastMessage
                    ? conv.lastMessage.type === 'post'
                      ? '📋 Tin đăng được chia sẻ'
                      : conv.lastMessage.message
                    : 'Chưa có tin nhắn'}
                </LastMessage>
              </ConversationInfo>
            </ConversationItem>
          ))}
        </ConversationsList>
      </Sidebar>

      {/* Chat Area */}
      <ChatArea>
        <ChatHeader>
          {currentParticipant ? (
            <ChatTitle style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {currentParticipant.avatar ? (
                <Avatar
                  src={currentParticipant.avatar}
                  alt="avatar"
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <AvatarPlaceholder style={{ width: 40, height: 40 }}>
                  {(currentParticipant.name || currentParticipant.email || 'U').charAt(0).toUpperCase()}
                </AvatarPlaceholder>
              )}
              <div>
                {currentParticipant.name || currentParticipant.email || 'Người dùng'}
              </div>
            </ChatTitle>
          ) : (
            <ChatTitle>Cuộc trò chuyện</ChatTitle>
          )}
        </ChatHeader>

        <MessagesContainer>
          {messages.map((msg, i) => (
            <MessageWrapper key={i} isSent={msg.senderId === senderId}>
              {msg.type === 'post' && msg.post ? (
                <PostMessage
                  onClick={() => navigate(`/post-details/${msg.post._id}`)}
                >
                  <PostTitle>
                    <PictureOutlined style={{ marginRight: '6px' }} />
                    {msg.post.title}
                  </PostTitle>
                  <PostContent>
                    <PostImage
                      src={msg.post.images?.[0]}
                      alt="post"
                    />
                    <div>
                      <PostPrice>
                        {msg.post.price?.toLocaleString()} đ
                      </PostPrice>
                      <PostDescription>
                        {msg.post.description?.slice(0, 80)}...
                      </PostDescription>
                    </div>
                  </PostContent>
                  {/* Nút "Đã bán" cho người bán */}
                  {user?.id === msg.post.userId && msg.post.transaction?.status !== 'completed' && msg.post.transaction?.status !== 'sold' && (
                    <SellButton onClick={() => handleMarkAsSold(msg.post._id)}>
                      Đã bán
                    </SellButton>
                  )}
                  {/* Nút "Đã mua" cho người mua khi trạng thái là "sold" */}
                  {user?.id !== msg.post.userId && msg.post.transaction?.status === 'sold' && (
                    <PurchaseButton onClick={() => handleMarkAsPurchased(msg.post._id)}>
                      Đã mua
                    </PurchaseButton>
                  )}
                </PostMessage>
              ) : (
                <MessageBubble isSent={msg.senderId === senderId}>
                  {msg.message}
                </MessageBubble>
              )}
            </MessageWrapper>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            onKeyPress={handleKeyPress}
          />
          <SendButton
            onClick={handleSend}
            disabled={!message.trim() || !socket || !conversationId}
          >
            <SendOutlined />
            Gửi
          </SendButton>
        </InputContainer>
      </ChatArea>
    </ChatContainer>
  );
};

export default ChatPage;
import styled from 'styled-components';
import { MessageCircle, User } from 'lucide-react';

const Container = styled.div`
  display: flex;
  height: 80vh;
  max-width: 1200px;
  margin: 20px auto;
  background-color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 350px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #ffffff;
`;

const Title = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2c9876;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ConversationsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: #64748b;
`;

const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  margin: 4px 0;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(44, 152, 118, 0.05);
    border-color: rgba(44, 152, 118, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 152, 118, 0.15);
  }
`;

const AvatarImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid rgba(44, 152, 118, 0.2);
`;

const AvatarFallback = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(44, 152, 118, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
  color: #2c9876;
  border: 2px solid rgba(44, 152, 118, 0.2);
`;

const ConversationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ConversationName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConversationPreview = styled.div`
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.div`
  background-color: #2c9876;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`;

const ChatAreaPlaceholder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const ChatAreaContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  text-align: center;
`;

const PlaceholderIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #2c9876;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 24px;
`;

const PlaceholderTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const PlaceholderText = styled.p`
  color: #64748b;
  font-size: 16px;
`;

const LoginPromptWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
`;

const LoginPromptBox = styled.div`
  text-align: center;
  padding: 32px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const LoginPromptText = styled.p`
  color: #64748b;
  font-size: 18px;
`;

const LoginPromptIcon = styled(User)`
  margin: 0 auto 16px;
  color: #94a3b8;
`;

export {
    Container,
    Title,
    Sidebar,
    SidebarHeader,
    ConversationsList,
    EmptyState,
    ConversationItem,
    AvatarImage,
    AvatarFallback,
    ConversationContent,
    ConversationName,
    ConversationPreview,
    UnreadBadge,
    ChatAreaPlaceholder,
    ChatAreaContent,
    PlaceholderIconWrapper,
    PlaceholderTitle,
    PlaceholderText,
    LoginPromptWrapper,
    LoginPromptBox,
    LoginPromptText,
    LoginPromptIcon,
};

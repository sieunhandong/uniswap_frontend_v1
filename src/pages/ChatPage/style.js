import styled from "styled-components";

export const ChatContainer = styled.div`
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

export const Sidebar = styled.div`
  width: 350px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #ffffff;
`;

export const SidebarTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2C9876;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ConversationsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

export const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  border-radius: 12px;
  margin: 4px 0;
  background-color: ${({ selected }) =>
    selected ? 'rgba(44, 152, 118, 0.1)' : '#ffffff'};
  border: ${({ selected }) =>
    selected ? '2px solid #2C9876' : '1px solid #f1f5f9'};
  transition: all 0.2s ease;
  box-shadow: ${({ selected }) =>
    selected ? '0 2px 6px rgba(44, 152, 118, 0.25)' : '0 1px 3px rgba(0, 0, 0, 0.05)'};
  transform: ${({ selected }) => (selected ? 'translateY(-1px)' : 'none')};

  &:hover {
    background-color: rgba(44, 152, 118, 0.05);
    border-color: rgba(44, 152, 118, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 152, 118, 0.15);
  }
`;


export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 2px solid rgba(44, 152, 118, 0.2);
`;

export const AvatarPlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(44, 152, 118, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
  color: #2C9876;
  border: 2px solid rgba(44, 152, 118, 0.2);
`;

export const ConversationInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ConversationName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LastMessage = styled.div`
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

export const ChatHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const ChatTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2C9876;
  margin: 0;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f8fafc;
`;

export const MessageWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: flex-end;
  justify-content: ${props => props.isSent ? 'flex-end' : 'flex-start'};
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.isSent ? '#2C9876' : '#ffffff'};
  color: ${props => props.isSent ? '#ffffff' : '#1e293b'};
  border: ${props => props.isSent ? 'none' : '1px solid #e2e8f0'};
  border-bottom-right-radius: ${props => props.isSent ? '6px' : '18px'};
  border-bottom-left-radius: ${props => props.isSent ? '18px' : '6px'};
`;

export const PostMessage = styled.div`
  cursor: pointer;
  border: 1px solid #e2e8f0;
  padding: 16px;
  border-radius: 12px;
  background-color: #fffbeb;
  max-width: 70%;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const PostTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 8px;
`;

export const PostContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const PostImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const PostPrice = styled.div`
  color: red;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const PostDescription = styled.p`
  font-size: 12px;
  color: #64748b;
  line-height: 1.3;
  margin: 0;
`;

export const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  background-color: #f8fafc;
  transition: all 0.2s ease;

  &:focus {
    border-color: #2C9876;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(44, 152, 118, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SendButton = styled.button`
  padding: 12px 16px;
  background-color: #2C9876;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(44, 152, 118, 0.2);

  &:hover {
    background-color: #238a67;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(44, 152, 118, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`
export const SellButton = styled.button`
  background-color: #2C9876;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  font-size: 14px;

  &:hover {
    background-color: #1e6b5a;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`
export const PurchaseButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
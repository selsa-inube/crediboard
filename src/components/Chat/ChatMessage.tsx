// src/components/Chat/ChatMessage.tsx
import React from 'react';
import styled from 'styled-components';

interface ChatMessageProps {
  message: string;
}

const MessageContainer = styled.div`
  background-color: #f1f1f1;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 4px 0;
`;

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return <MessageContainer>{message}</MessageContainer>;
};

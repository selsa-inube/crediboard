import React from 'react';
import { MessageWrapper, MessageContent, Timestamp } from './styles';

interface MessageProps {
  type: 'sent' | 'received';
  timestamp: number;
  children: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ type, timestamp, children }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div>
      <MessageWrapper type={type}>
        <MessageContent type={type}>
          {children}
        </MessageContent>
        <Timestamp type={type}>{formatDate(timestamp)}</Timestamp>
      </MessageWrapper>
    </div>
  );
};
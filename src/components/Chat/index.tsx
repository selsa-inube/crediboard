import React from 'react';
import { MessageWrapper, Timestamp } from './styles';

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
    <MessageWrapper type={type}>
      {children}
      <Timestamp>{formatDate(timestamp)}</Timestamp>
    </MessageWrapper>
  );
};

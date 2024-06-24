import React from 'react';
import { MessageWrapper } from './styles';

interface MessageProps {
  type: 'sent' | 'received';
  children: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ type, children }) => {
  return (
    <MessageWrapper type={type}>
      {children}
    </MessageWrapper>
  );
};

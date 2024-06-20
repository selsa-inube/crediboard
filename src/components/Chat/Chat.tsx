// src/components/Chat/Chat.tsx
import React from 'react';
import { ChatMessage } from './ChatMessage';
import ChatInput from './ChatInput';
import { ManagementContainer } from '@pages/board/outlets/financialReporting/management/styles';
import styled from 'styled-components';

const messages = [
    "Hola, ¿cómo estás?",
    "Estoy bien, gracias. ¿Y tú?",
    "Muy bien, gracias por preguntar.",
    "¿En qué puedo ayudarte hoy?",
    "Necesito información sobre el producto.",
    "Claro, ¿qué te gustaría saber?"
  ];
  
  const MessagesContainer = styled.div`
    overflow-y: auto;
    height: 240px;
    padding: 10px;
    border: 1px solid #e40000;
    border-radius: 8px;
    background-color: #dd0b0b;
    margin-bottom: 10px;
  `;
  
  const Chat: React.FC = () => {
    return (
      <ManagementContainer>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </MessagesContainer>
        <div style={{ marginTop: 'auto' }}>
          <ChatInput />
        </div>
      </ManagementContainer>
    );
  };
  
  export default Chat;
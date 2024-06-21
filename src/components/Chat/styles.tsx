// src/styles/ManagementContainer.tsx
import styled from "styled-components";


interface MessageProps {
  type: 'sent' | 'received';
}


const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div<MessageProps>`
  max-width: 60%;
  margin: 5px 10px;
  padding: 7px;
  border-radius: 4px;
  background-color: ${props => props.type === 'sent' ? '#DEEBFF' : '#F4F5F7 '};
  align-self: ${props => props.type === 'sent' ? 'flex-end' : 'flex-start'};
  position: relative;
  font-family: Roboto;
  border: 1px solid ${props => props.type === 'sent' ? '#B3D4FF' : '#DFE1E6'}; 
  border-style: solid;
`;


export {ChatContent,Message}

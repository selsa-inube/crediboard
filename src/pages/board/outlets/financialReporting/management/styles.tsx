// src/styles/ManagementContainer.tsx
import styled from "styled-components";


interface MessageProps {
  type: 'sent' | 'received';
}

const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div<MessageProps>`
  max-width: 35%;
  margin: 5px 10px;
  padding: 7px;
  border-radius: 0px 4px 4px 4px;   
  background-color: ${props => props.type === 'sent' ? '#DEEBFF' : '#F4F5F7 '};
  align-self: ${props => props.type === 'sent' ? 'flex-end' : 'flex-start'};
  position: relative;
  font-family: Roboto;
  border: 1px solid ${props => props.type === 'sent' ? '#B3D4FF' : '#DFE1E6'}; 
  border-style: solid;
  &::after {
    content: '';
    position: absolute;
    border-width: 10px;
    border-style: solid;
    border-color: transparent;
    top: 0px;
    
    ${props => props.type === 'sent' ? `
      right: -10px;
      border-left-color: #DEEBFF;
      border-right: none;
      border-top: none;
    ` : `
      left: -10px;
      border-right-color: #F4F5F7;
      border-left: none;
      border-top: none;
    `}
    
  }
`;




export { ManagementContainer,ChatContent,Message  }

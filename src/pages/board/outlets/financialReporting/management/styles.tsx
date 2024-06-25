import styled from "styled-components";

const ManagementContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    button{
        border: none;
        padding: 0;
        background: none;
        margin-top: 1%;
    }

`;

export const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  font-size: 14px;
  color: #000000;
  font-family: Roboto;
  flex-direction: column;
`;

export {ManagementContainer}
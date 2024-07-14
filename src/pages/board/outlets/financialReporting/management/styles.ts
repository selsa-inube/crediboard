import styled from "styled-components";
import { inube } from "@inube/design-system";

export const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    height: 328px;
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

  &::-webkit-scrollbar {
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
    border-radius: 8px;
  }
`;

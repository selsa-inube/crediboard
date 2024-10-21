import styled from "styled-components";
import { inube } from "@inube/design-system";
import { SkeletonLine as OriginalSkeletonLine } from "@inubekit/skeleton";

export const ChatContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  font-size: 14px;
  color: #000000;
  font-family: Roboto;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
    border-radius: 8px;
  }
`;

export const SkeletonContainer = styled.div<{ type: 'sent' | 'received' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ type }) => (type === 'sent' ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;


export const SkeletonLine = styled(OriginalSkeletonLine)`
  width: 20%;  
  max-width: 100px;
  margin-bottom: 8px;  
`;
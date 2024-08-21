import styled from "styled-components";
import { inube } from "@inube/design-system";
import { SkeletonLine as OriginalSkeletonLine } from "@inubekit/skeleton";

// Componente para el contenedor del chat
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

// Estilo específico para los skeletons dentro del ChatContent
export const SkeletonContainer = styled.div<{ type: 'sent' | 'received' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ type }) => (type === 'sent' ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;

// Usamos el componente original de SkeletonLine
export const SkeletonLine = styled(OriginalSkeletonLine)`
  width: 20%;  
  max-width: 100px;
  margin-bottom: 8px;  
`;
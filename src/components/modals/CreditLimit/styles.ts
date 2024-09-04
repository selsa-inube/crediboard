import styled from "styled-components";

export const StyledModal = styled.div<{ $smallScreen: boolean }>`
  background-color: ${({ theme }) => theme?.colors?.background ?? "#ffffff"};
  border-radius: 8px;
  padding: 16px;
  max-width: ${({ $smallScreen }) => ($smallScreen ? "90%" : "500px")};
  margin: ${({ $smallScreen }) => ($smallScreen ? "16px auto" : "32px auto")};
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const StyledContainerContent = styled.div<{ $smallScreen: boolean }>`
  margin: 16px 0;
`;

export const StyledContainerSection = styled.div`
  margin-bottom: 16px;
`;

export const StyledSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const StyledContainerValue = styled.span<{ $highlight?: boolean }>`
  font-weight: bold;
  color: ${({ $highlight, theme }) =>
    $highlight ? theme?.colors?.primary[500] : theme?.colors?.text};
`;

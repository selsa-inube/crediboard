import styled from "styled-components";

interface IStyledModal {
  $isMobile: boolean;
}

export const StyledContainerContent = styled.div<IStyledModal>`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: ${({ $isMobile }) => ($isMobile ? "335px" : "850px")};
    height:  "565px";
    border-radius: 8px;
    padding: ${({ $isMobile }) => ($isMobile ? "20px" : "24px")} ;
    gap: 24px;
    background-color: #FFFFFF;
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;


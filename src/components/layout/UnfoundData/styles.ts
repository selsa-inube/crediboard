import styled from "styled-components";

export const ResponsiveImage = styled.img<{ $smallScreen: boolean }>`
  display: ${({ $smallScreen }) => ($smallScreen ? "block" : "none")};
  max-width: 100%;
  height: auto;
  margin-top: 8px;
`;
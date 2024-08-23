import styled from "styled-components";

interface ImageProps {
  $smallScreen: boolean;
}

const StyledImage = styled.img<ImageProps>`
  max-width: ${({ $smallScreen }) => ($smallScreen ? "100%" : "200px")};
  height: auto;
  flex-shrink: 0;
  display: block;
`;

export { StyledImage };

import styled from "styled-components";

interface ImageProps {
  smallScreen: boolean;
}

export const StyledImage = styled.img<ImageProps>`
  max-width: ${(props) => (props.smallScreen ? "100%" : "200px")};
  height: auto;
  flex-shrink: 0;
`;


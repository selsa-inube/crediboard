import styled from "styled-components";

interface ImageProps {
  smallScreen: boolean;
}

const shouldForwardProp = (prop: string) => !['smallScreen'].includes(prop);

export const StyledImage = styled.img.withConfig({ shouldForwardProp })<ImageProps>`
  max-width: ${(props) => (props.smallScreen ? "100%" : "200px")};
  height: auto;
  flex-shrink: 0;
  display: block; 
`;

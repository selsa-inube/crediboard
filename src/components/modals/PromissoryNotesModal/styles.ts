import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "443px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s400};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  border-radius: ${inube.spacing.s100};
`;

export { StyledModal };

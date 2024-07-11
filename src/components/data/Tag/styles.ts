import styled from "styled-components";
import { inube } from "@inube/design-system";

import { Appearance } from "./types";

interface IStyledTag {
  $appearance: Appearance | "error";
}

const StyledTag = styled.div<IStyledTag>`
  display: inline-block;
  padding: 0 ${inube.spacing.s050};
  background-color: ${({ theme, $appearance }) =>
    theme?.color?.surface?.[$appearance]?.regular ||
    inube.color.surface[$appearance].regular};

  border-radius: 4px;
`;

export { StyledTag };
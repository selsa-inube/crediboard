import styled from "styled-components";

import { inube } from "@inube/design-system";

export const StyledOptionItem = styled.li`
  display: flex;
  align-items: center;
  align-self: stretch;
  min-height: ${inube.spacing.s500};
  border-left: ${inube.spacing.s050} solid transparent;
  padding: ${() =>
    `${inube.spacing.s050} ${inube.spacing.s200} ${inube.spacing.s050} ${inube.spacing.s150}`};
  cursor: pointer;

  border-left-width: ${inube.spacing.s050};
  border-left-style: solid;
  border-left-color: ${({ theme }) =>
    theme?.color?.stroke?.light?.regular || inube.color.stroke.light.regular};

  p {
    color: ${({ theme }) =>
      theme?.color?.text?.dark?.regular || inube.color.text.dark.regular};
  }

  &:hover {
    border-left-color: ${({ theme }) =>
      theme?.color?.stroke?.primary?.regular ||
      inube.color.stroke.primary.regular};

    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.hover || inube.color.surface.gray.hover};

    p {
      color: ${({ theme }) =>
        theme?.color?.text?.primary?.regular ||
        inube.color.text.primary.regular};
    }
  }
`;

export const StyledInput = styled.input``;

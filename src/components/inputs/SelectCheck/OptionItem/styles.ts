import styled from "styled-components";
import { inube } from "@inube/design-system";

export const StyledOptionItem = styled.li`
  display: flex;
  align-items: center;
  align-self: stretch;
  cursor: pointer;
  min-height: 40px;
  border-left-style: solid;
  border-left-width: 2px;
  border-left-color: ${({ theme }) =>
    theme?.color?.stroke?.light?.regular || inube.color.stroke.light.regular};
  padding-top: ${({ theme }) => theme?.spacing?.s050 || inube.spacing.s050};
  padding-right: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-bottom: ${({ theme }) => theme?.spacing?.s050 || inube.spacing.s050};
  padding-left: ${({ theme }) => theme?.spacing?.s150 || inube.spacing.s150};

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

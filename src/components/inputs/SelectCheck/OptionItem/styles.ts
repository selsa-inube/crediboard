import styled from "styled-components";
import { inube } from "@inubekit/foundations";

export const StyledOptionItemChecked = styled.li`
  display: flex;
  align-items: center;
  align-self: stretch;
  min-height: 40px;
  border-left: 4px solid transparent;
  padding: 4px 16px 4px 12px;
  cursor: pointer;
  border-left-width: 4px;
  border-left-style: solid;

  p {
    color: ${({ theme }) =>
      theme?.input?.content?.color?.regular ||
      inube.input.content.color.regular};
  }

  label {
    margin-left: 5px;
    cursor: pointer;
  }

  &:hover {
    border-left-color: ${({ theme }) =>
      theme?.input?.border?.color?.focus || inube.input.border.color.focus};

    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};

    p {
      color: ${({ theme }) =>
        theme?.input?.content?.color?.regular ||
        inube.input.content.color.regular};
    }
  }
`;

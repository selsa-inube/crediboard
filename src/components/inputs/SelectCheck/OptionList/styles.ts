import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledOptionList {
  onClick?: React.ChangeEventHandler<HTMLInputElement>;
}

export const StyledOptionList = styled.ul<IStyledOptionList>`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  padding: 4px 0px;
  position: absolute;
  z-index: 1;
  border-radius: 4px;
  background: ${({ theme }) => {
    return (
      theme?.color?.surface?.light?.clear || inube.color.surface.light.clear
    );
  }};
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
`;

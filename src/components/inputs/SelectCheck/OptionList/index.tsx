import { StyledOptionList } from "./styles";
import { MouseEventHandler } from "react";

export interface OptionListProps {
  children: JSX.Element | JSX.Element[];
  onClick: MouseEventHandler<HTMLUListElement>;
}

const OptionList = (props: OptionListProps) => {
  const { children, onClick } = props;

  return <StyledOptionList onClick={onClick}>{children}</StyledOptionList>;
};

export { OptionList };

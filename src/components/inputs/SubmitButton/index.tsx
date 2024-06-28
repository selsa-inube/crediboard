import {ReactNode} from "react";
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { StyledButton } from "./styles"

interface SubmitButtonProps {
  onClick?: () => void;
  icon?: ReactNode; 
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, icon }) => (
  <StyledButton type="submit" onClick={onClick}>
    <Icon
      appearance="primary"
      cursorHover
      size="36px"
      icon={icon || <MdOutlineSend />} 
    />
  </StyledButton>
);


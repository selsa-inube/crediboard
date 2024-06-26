import React from "react";
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { StyledButton } from "./styles"

interface SubmitButtonProps {
  onClick?: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => (
  <StyledButton type="submit" onClick={onClick}>
    <Icon
      appearance="primary"
      cursorHover
      size="36px"
      icon={<MdOutlineSend />}
    />
  </StyledButton>
);


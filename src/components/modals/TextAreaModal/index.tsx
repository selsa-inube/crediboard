import {
  Stack,
  useMediaQuery,
  Blanket,
  Text,
  Button,
  inube,
  Textarea,
} from "@inube/design-system";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { useState } from "react";

import { StyledModal } from "./styles";

export interface TextAreaModalProps {
  title: string;
  buttonText: string;
  inputLabel: string;
  inputPlaceholder: string;
  maxLength?: number;
  portalId?: string;
  onSubmit?: () => void;
  onCloseModal?: () => void;
}

export function TextAreaModal(props: TextAreaModalProps) {
  const {
    title,
    buttonText,
    inputLabel,
    inputPlaceholder,
    maxLength = 200,
    portalId = "portal",
    onSubmit,
    onCloseModal,
  } = props;
  const [input, setInput] = useState({ value: "", status: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ value: e.target.value, status: "pending" });
    return;
  };

  const onFocus = () => {
    if (input.status === "invalid") {
      return setInput({ ...input, status: "invalid" });
    }
    setInput({ ...input, status: "pending" });
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) {
      setInput({ ...input, status: "invalid" });
    } else setInput({ ...input, status: "valid" });
  };
  const message =
    input.status === "valid"
      ? "El campo ha sido validado exitosamente"
      : "El número de caracteres es demasiado largo";

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <Stack gap={inube.spacing.s100}>
            <Text>Cerrar</Text>
            <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
          </Stack>
        </Stack>
        <Textarea
          label={inputLabel}
          placeholder={inputPlaceholder}
          value={input.value}
          status={input.status}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          message={message}
          fullwidth
        />
        <Stack justifyContent="flex-end">
          <Button
            onClick={onSubmit}
            disabled={
              input.value.length > maxLength || input.value.length === 0
            }
          >
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}

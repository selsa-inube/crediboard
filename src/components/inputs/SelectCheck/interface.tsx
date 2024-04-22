import {
  MdOutlineError,
  MdCheckCircle,
  MdOutlineArrowDropDown,
} from "react-icons/md";

import { Text, Icon, Label, Stack } from "@inube/design-system";

import { OptionItem } from "./OptionItem";
import { OptionList } from "./OptionList";

import { Size } from "./types";
import { StyledContainer, StyledInputContainer, StyledInput } from "./styles";
import { ISelectProps } from ".";

export interface ISelectInterfaceProps extends ISelectProps {
  focused?: boolean;
  displayList: boolean;
}

const getTypo = (size: Size) => {
  if (size === "compact") {
    return "medium";
  }
  return "large";
};

const Message = (
  props: Pick<ISelectProps, "disabled" | "status"> & { message?: string }
) => {
  const { disabled, status, message } = props;

  return status !== "pending" ? (
    <Stack alignItems="center" gap="4px" margin="s050 s0 s0 s200">
      <Icon
        appearance={status === "invalid" ? "error" : "success"}
        disabled={disabled}
        icon={status === "invalid" ? <MdOutlineError /> : <MdCheckCircle />}
        size="14px"
      />
      <Text
        type="body"
        size="small"
        appearance={status === "invalid" ? "error" : "success"}
        disabled={disabled}
      >
        {message && `${message}`}
      </Text>
    </Stack>
  ) : (
    <></>
  );
};

export const SelectUI = (props: ISelectInterfaceProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    disabled,
    readonly,
    required,
    status,
    message,
    size,
    value,
    fullwidth,
    options,
    focused,
    onFocus,
    onBlur,
    onClick,
    onChange,

    displayList,
    onChangeCheck,
  } = props;

  return (
    <StyledContainer $fullwidth={fullwidth} disabled={disabled}>
      <Stack
        alignItems="center"
        margin="s0 s0 s050 s0"
        padding="s0 s0 s0 s200"
        gap="2px"
      >
        {label && (
          <Label
            htmlFor={id}
            disabled={disabled}
            focused={!readonly && focused}
            invalid={status === "invalid" && !readonly}
            size={getTypo(size!)}
            margin="0px 0px 0px 2px"
          >
            {label}
          </Label>
        )}

        {required && !disabled && (
          <Text type="body" size="small" appearance="dark">
            (Requerido)
          </Text>
        )}
      </Stack>

      <StyledInputContainer
        disabled={disabled}
        $focused={focused!}
        $status={status}
        onClick={onClick}
        $readonly={readonly}
      >
        <StyledInput
          autoComplete="off"
          readOnly
          value={value}
          name={name}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          $required={required}
          $size={size}
          $status={status}
          $fullwidth={fullwidth}
          $focused={focused!}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onClick}
        />

        {!readonly && (
          <Icon
            appearance="dark"
            icon={<MdOutlineArrowDropDown />}
            size="24px"
            spacing="none"
            disabled={disabled}
          />
        )}
      </StyledInputContainer>

      {status && !readonly && (
        <Message disabled={disabled} status={status} message={message} />
      )}
      {displayList && !disabled && (
        <OptionList>
          {options.map((optionItem) => (
            <OptionItem
              key={optionItem.id}
              id={optionItem.id}
              label={optionItem.label}
              checked={optionItem.checked}
              onchange={onChangeCheck}
            />
          ))}
        </OptionList>
      )}
    </StyledContainer>
  );
};

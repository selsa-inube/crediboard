import { useState } from "react";

import { IOptionItemProps } from "./OptionItem";
import { Size, Status } from "./types";
import { SelectcheckUI } from "./interface";

export interface ISelectcheckProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  value: string | number;
  required?: boolean;
  status?: Status;
  message?: string;
  size?: Size;
  fullwidth?: boolean;
  options: IOptionItemProps[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCheck?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Selectcheck = (props: ISelectcheckProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    disabled = false,
    readonly = false,
    value,
    required = false,
    status = "pending",
    message,
    size = "wide",
    fullwidth = false,
    options,
    onBlur,
    onFocus,
    onChange,
    onClick,
    onChangeCheck,
  } = props;

  const [focused, setFocused] = useState(false);
  const [displayList, setDisplayList] = useState(false);

  const handleFocus = (e: FocusEvent) => {
    setFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: FocusEvent) => {
    setFocused(false);
    onBlur && onBlur(e);
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readonly) return;
    onClick && onClick(e);
    setDisplayList(!displayList);
  };

  return (
    <SelectcheckUI
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      readonly={readonly}
      value={value}
      required={required}
      size={size}
      status={status}
      message={message}
      fullwidth={fullwidth}
      focused={focused}
      options={options}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={onChange}
      onClick={handleClick}
      displayList={displayList}
      onChangeCheck={onChangeCheck}
    />
  );
};

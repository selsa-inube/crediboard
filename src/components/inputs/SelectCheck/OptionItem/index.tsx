import { Label, Stack } from "@inube/design-system";

import { StyledOptionItem, StyledInput } from "./styles";

export interface IOptionItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OptionItem = (props: IOptionItemProps) => {
  const { id, label, checked, onchange } = props;

  return (
    <StyledOptionItem>
      <Stack>
        <StyledInput
          readOnly
          type="checkbox"
          id={id}
          name={id}
          onChange={onchange}
          checked={checked}
        />
        <Label htmlFor={id}>{label}</Label>
      </Stack>
    </StyledOptionItem>
  );
};

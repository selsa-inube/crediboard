import { Label, Stack } from "@inube/design-system";
import { StyledOptionItem, StyledInput } from "./styles";

export interface IOptionItemProps {
  id: string;
  label: string;
}

export const OptionItem = (props: IOptionItemProps) => {
  const { id, label } = props;

  return (
    <StyledOptionItem id={id}>
      <Stack>
        <StyledInput type="checkbox" name={id} />
        <Label htmlFor={id}>{label}</Label>
      </Stack>
    </StyledOptionItem>
  );
};

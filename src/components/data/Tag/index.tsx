import { StyledTag } from "./styles";
import { Text } from "@inube/design-system";
import { Appearance } from "./types";

const darkTextAppearances = ["warning", "gray", "light"];

export interface ITagProps {
  appearance: Appearance;
  label: string;
}

const Tag = (props: ITagProps) => {
  const { appearance, label } = props;

  return (
    <StyledTag $appearance={appearance === "danger" ? "error" : appearance}>
      <Text
        type="label"
        appearance={darkTextAppearances.includes(appearance) ? "dark" : "light"}
        size="small"
      >
        {label}
      </Text>
    </StyledTag>
  );
};

export { Tag };

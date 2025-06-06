import { Icon, Stack, Text } from "@inubekit/inubekit";
import { MdClear } from "react-icons/md";
import { StyledTag } from "./styles";

export type ITagAppearance =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "help"
  | "dark"
  | "gray"
  | "light";

interface ITagsFilter {
  appearance?: ITagAppearance;
  weight?: any;
  label: string;
  removable?: boolean;
  onClose?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  onClick?: () => void;
  background?: string;
  icon?: React.ReactNode;
}

const TagsFilter = (props: ITagsFilter) => {
  const {
    appearance = "primary",
    label,
    removable = false,
    onClose,
    onClick,
    background,
    icon,
  } = props;

  const interceptonClose = (e: React.MouseEvent<Element, MouseEvent>) => {
    try {
      onClose && onClose(e);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <StyledTag
      $removable={removable}
      onClick={onClick}
      $background={background ?? ""}
    >
      <Stack alignItems="center" gap="2px" padding="2px">
        {icon && <Icon icon={icon} size="12px" appearance={appearance} />}

        <Text
          type="label"
          appearance={appearance}
          size="small"
          textAlign="start"
          weight="bold"
        >
          {label}
        </Text>

        {removable && (
          <Icon
            onClick={interceptonClose}
            appearance={appearance}
            icon={<MdClear />}
            size="11px"
          />
        )}
      </Stack>
    </StyledTag>
  );
};

export { TagsFilter };

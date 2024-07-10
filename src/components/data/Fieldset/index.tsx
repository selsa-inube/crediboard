import { MdAdd } from "react-icons/md";
import {
  Button,
  Stack,
  Text,
  inube,
  useMediaQuery,
} from "@inube/design-system";

import { StyledContainerFieldset } from "./styles";

interface IPtionsButton {
  title: string;
  onClick?: () => void;
}

interface IFieldsetProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  aspectRatio?: string;
  heigthFieldset?: string;
  descriptionTitle?: string;
  activeButton?: IPtionsButton;
  hasTable?: boolean;
}

export const Fieldset = (props: IFieldsetProps) => {
  const {
    children,
    title,
    heigthFieldset,
    aspectRatio,
    descriptionTitle,
    activeButton,
    hasTable = false,
  } = props;

  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <Stack
      direction="column"
      gap={inube.spacing.s100}
      width="-webkit-fill-available"
      height={!isMobile ? heigthFieldset : "auto"}
    >
      <Stack justifyContent={activeButton && "space-between"}>
        <Stack gap={isMobile ? inube.spacing.s150 : inube.spacing.s100}>
          <Text
            type="title"
            appearance="gray"
            size={isMobile ? "medium" : "large"}
          >
            {`${title} `}
          </Text>
          <Text type="title" ellipsis size={isMobile ? "medium" : "large"}>
            {descriptionTitle}
          </Text>
        </Stack>
        {activeButton && (
          <Stack>
            <Button
              iconBefore={<MdAdd />}
              spacing="compact"
              onClick={activeButton.onClick}
            >
              {activeButton.title}
            </Button>
          </Stack>
        )}
      </Stack>
      <StyledContainerFieldset
        $aspectRatio={aspectRatio}
        $isMobile={isMobile}
        $hasTable={hasTable}
      >
        {children}
      </StyledContainerFieldset>
    </Stack>
  );
};

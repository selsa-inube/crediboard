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
}

export const Fieldset = (props: IFieldsetProps) => {
  const {
    children,
    title,
    heigthFieldset = "auto",
    aspectRatio,
    descriptionTitle,
    activeButton,
  } = props;

  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <Stack
      direction="column"
      gap={inube.spacing.s100}
      width="-webkit-fill-available"
      height={heigthFieldset}
    >
      <Stack justifyContent={activeButton && "space-between"}>
        <Stack gap={inube.spacing.s100}>
          <Text type="title" appearance="gray">
            {`${title} `}
          </Text>
          <Text type="title" ellipsis>
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
      <StyledContainerFieldset $aspectRatio={aspectRatio} $isMobile={isMobile}>
        {children}
      </StyledContainerFieldset>
    </Stack>
  );
};

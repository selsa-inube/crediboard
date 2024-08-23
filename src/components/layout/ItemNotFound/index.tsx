import { Button, Stack, Text, useMediaQuery } from "@inube/design-system";
import { StyledImage } from "./styles";

interface ItemNotFoundProps {
  image: string;
  title: string;
  description: string;
  buttonDescription: string;
  route: string;
}

function ItemNotFound(props: ItemNotFoundProps) {
  const { image, title, description, buttonDescription, route } = props;
  const smallScreen = useMediaQuery("(max-width: 720px)");

  return (
    <Stack
      direction={smallScreen ? "column-reverse" : "row"}
      gap={smallScreen ? "24px" : "16px"}
      alignItems="center"
      margin="s400"
      justifyContent="center"
    >
      <Stack
        direction="column"
        gap={smallScreen ? "8px" : "24px"}
        alignItems="center"
      >
        <Text type="title" size={smallScreen ? "small" : "large"}>
          {title}
        </Text>

        <Text
          type={smallScreen ? "body" : "title"}
          size={smallScreen ? "small" : "medium"}
          appearance="gray"
          textAlign="Center"
        >
          {description}
        </Text>

        <Button type="link" variant="none" spacing="compact" path={route}>
          {buttonDescription}
        </Button>
      </Stack>

      <StyledImage
        src={image}
        alt="ItemNotFoundAlt"
        $smallScreen={smallScreen}
      />
    </Stack>
  );
}

export { ItemNotFound };
export type { ItemNotFoundProps };

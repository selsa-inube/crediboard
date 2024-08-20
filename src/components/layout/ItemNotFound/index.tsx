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
      direction={smallScreen ? "column" : "row"}
      gap={smallScreen ? "24px" : "32px"}
      alignItems={smallScreen ? "center" : "flex-start"}
      margin="s400"
      justifyContent={smallScreen ? "center" : "flex-start"}
    >
      <Stack
        direction="column"
        gap={smallScreen ? "8px" : "24px"}
        alignItems={smallScreen ? "center" : "flex-start"}
        textAlign={smallScreen ? "center" : "left"}
        flex={smallScreen ? undefined : "1"}
      >
        <Text
          type="title"
          size={smallScreen ? "small" : "large"}
        >
          {title}
        </Text>
        <Text
          type={smallScreen ? "body" : "title"}
          size={smallScreen ? "small" : "medium"}
          appearance="gray"
        >
          {description}
        </Text>
        
        <Button
          type="link"
          variant="none"
          spacing="compact"
          path={route}
          style={{
            alignSelf: smallScreen ? "center" : "flex-start"
          }}
        >
          {buttonDescription}
        </Button>
      </Stack>

      <StyledImage
        src={image}
        alt="ItemNotFoundAlt"
        smallScreen={smallScreen}
      />
    </Stack>
  );
}

export { ItemNotFound };
export type { ItemNotFoundProps };

import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { StyledImage } from "./styles";

interface ItemNotFoundProps {
  image: string;
  title: string;
  description: string;
  buttonDescription: string;
  route: string;
  onRetry?: () => void;
}

function ItemNotFound(props: ItemNotFoundProps) {
  const { image, title, description, buttonDescription, route, onRetry } =
    props;
  const smallScreen = useMediaQuery("(max-width: 720px)");

  return (
    <Stack
      direction={smallScreen ? "column" : "row"}
      gap="24px"
      alignItems="center"
      padding="50px 0px 0px 0px"
      justifyContent="center"
    >
      <StyledImage
        src={image}
        alt="ItemNotFoundAlt"
        $smallScreen={smallScreen}
      />

      <Stack direction="column" gap="24px" alignItems="normal">
        <Text type="title" size="large" appearance="primary">
          {title}
        </Text>

        <Text type="body" size="large" appearance="gray" textAlign="start">
          {description}
        </Text>

        <Stack
          justifyContent={smallScreen ? "center" : "flex-end"}
          width="100%"
        >
          <Button
            type="button"
            spacing="compact"
            variant="outlined"
            onClick={onRetry}
            path={route}
            fullwidth={smallScreen}
          >
            {buttonDescription}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { ItemNotFound };
export type { ItemNotFoundProps };

import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { ResponsiveImage } from "./styles";

interface UnfoundDataProps {
  title: string;
  description: string;
  buttonDescription: string;
  image?: string;
  onRetry?: () => void;
  route: string;
}

function UnfoundData(props: UnfoundDataProps) {
  const { image, title, description, buttonDescription, route, onRetry } =
    props;
  const smallScreen = useMediaQuery("(max-width: 720px)");

  return (
    <Stack
      direction={smallScreen ? "column-reverse" : "row"}
      gap="8px"
      margin="12px"
      justifyContent="center"
    >
      {image && (
        <ResponsiveImage
          src={image}
          alt="UnfoundDataImage"
          $smallScreen={smallScreen}
        />
      )}
      <Stack direction="column" alignItems="normal" gap="8px">
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

export { UnfoundData };
export type { UnfoundDataProps };

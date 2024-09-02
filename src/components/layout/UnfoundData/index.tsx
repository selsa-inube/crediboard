import { Button, Stack, Text, useMediaQuery } from "@inube/design-system";
import { ResponsiveImage } from "./styles";

interface UnfoundDataProps {
  image?: string;
  title: string;
  description: string;
  buttonDescription: string;
  route: string;
  onRetry?: () => void;
}

function UnfoundData(props: UnfoundDataProps) {
  const { image, title, description, buttonDescription, route, onRetry } =
    props;
  const smallScreen = useMediaQuery("(max-width: 720px)");

  return (
    <Stack
      direction={smallScreen ? "column-reverse" : "row"}
      gap={smallScreen ? "16px" : "8px"}
      alignItems="center"
      margin="s300"
      justifyContent="center"
    >
      <Stack direction="column" alignItems="center">
        <Text type="title" size="small">
          {title}
        </Text>

        <Text type="body" size="medium" appearance="gray" textAlign="center">
          {description}
        </Text>

        {onRetry ? (
          <Button
            type="button"
            variant="primary"
            spacing="compact"
            onClick={onRetry}
          >
            {buttonDescription}
          </Button>
        ) : (
          <Button type="link" variant="none" spacing="compact" path={route}>
            {buttonDescription}
          </Button>
        )}
      </Stack>

      {image && (
        <ResponsiveImage
          src={image}
          alt="UnfoundDataImage"
          $smallScreen={smallScreen}
        />
      )}
    </Stack>
  );
}

export { UnfoundData };
export type { UnfoundDataProps };
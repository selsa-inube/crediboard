import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";

import { StyledContainer, StyledTextField } from "./styles";

interface SourcesModalProps {
  title: string;
  labels: string[];
  placeholders: string[];
}

export function Sources(props: SourcesModalProps) {
  const { title, labels, placeholders } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <StyledContainer>
      <Stack
        direction="column"
        padding="16px"
        height="354px"
        width={!isMobile ? "457px" : "260px"}
      >
        <Text size="medium" type="title" margin="5px 0px" weight="bold">
          {title}
        </Text>
        <Divider />
        <Stack direction="column" padding="20px 0px 8px 0px" gap="12px">
          {labels.map((label, index) => (
            <StyledTextField key={index}>
              <Textfield
                id={`field${index}`}
                label={label}
                placeholder={placeholders[index]}
                size="compact"
                fullwidth
              />
            </StyledTextField>
          ))}
        </Stack>
        <Stack justifyContent="end" margin="auto 0px 0px 0px">
          <Button
            children="Ver soporte"
            spacing="compact"
            iconAfter={
              <Icon
                icon={<MdOutlineRemoveRedEye />}
                size="14px"
                appearance="primary"
                variant="filled"
                shape="circle"
              />
            }
            variant="none"
            onClick={() => console.log("Ver soporte")}
            cursorHover
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

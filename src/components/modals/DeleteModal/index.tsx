import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Button } from "@inubekit/button";

import { StyledContainerClose, StyledContainer } from "./styles";
import { DeleteData } from "./config";

export interface IDeleteModalProps {
  portalId?: string;
  handleClose: () => void;
  handleDelete?: () => void;
}

export function DeleteModal(props: IDeleteModalProps) {
  const { portalId, handleClose, handleDelete } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width={isMobile ? "287px" : "402px"}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size="small" type="headline">
              {DeleteData.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text type="body" size="large">
                  {DeleteData.close}
                </Text>
                <Icon
                  icon={<MdClear />}
                  size="24px"
                  cursorHover
                  appearance="dark"
                />
              </Stack>
            </StyledContainerClose>
          </Stack>
          <Text>{DeleteData.data}</Text>
          <Stack justifyContent="end" gap="20px">
            <Button variant="outlined" appearance="gray" onClick={handleClose}>
              {DeleteData.cancel}
            </Button>
            <Button onClick={handleDelete}>{DeleteData.delate}</Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}

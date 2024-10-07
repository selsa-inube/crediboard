import { Icon } from "@inubekit/icon";
import { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { ActionModal } from "../Actions";
import { Stack } from "@inubekit/stack";

export function Details() {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <Stack justifyContent="center">
      <Stack padding="0px 16px">
        <Icon
          icon={<MdOutlineEdit />}
          size="16px"
          cursorHover
          appearance="primary"
          onClick={() => setModalOpen(true)}
          variant="none"
        />
      </Stack>
      <Stack padding="0px 16px">
        <Icon
          icon={<MdDeleteOutline />}
          size="16px"
          cursorHover
          appearance="danger"
          onClick={() => setModalOpen(false)}
          variant="none"
        />
      </Stack>
      {ModalOpen && <ActionModal onClose={() => setModalOpen(false)} />}
    </Stack>
  );
}

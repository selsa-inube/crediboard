import { useState } from "react";
import { MdOutlineEdit , MdDeleteOutline} from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";

import { ActionModal } from "../Actions";

interface DetailProps {
  onClickDetails?: () => void;
  onClickEdit?: () => void;
  onClickEliminate?: () => void;
}

export function Detail(props: DetailProps) {
  const { onClickDetails, onClickEdit, onClickEliminate } = props;
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <Stack justifyContent="center">
      <Stack padding="0px 16px">
        <Icon
          icon={<MdOutlineEdit />}
          size="16px"
          cursorHover
          appearance="dark"
          onClick={() => setModalOpen(false)}
          variant="empty"
        />
      </Stack>
      <Stack padding="0px 16px">
        <Icon
          icon={<MdDeleteOutline />}
          size="16px"
          cursorHover
          appearance="danger"
          onClick={() => setModalOpen(false)}
          variant="empty"
        />
      </Stack>
      {ModalOpen && (
        <ActionModal
          onClose={() => setModalOpen(false)}
          onClickDetails={onClickDetails}
          onClickEdit={onClickEdit}
          onClickEliminate={onClickEliminate}
        />
      )}
    </Stack>
  );
}

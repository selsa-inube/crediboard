import { Icon } from "@inubekit/icon";
import { useState } from "react";
import { MdLinearScale } from "react-icons/md";
import { ActionModal } from "../Actions";

export function Details() {
    const [ModalOpen, setModalOpen] = useState(false);
    return (
      <>
        <Icon
          icon={<MdLinearScale />}
          size="12px"
          cursorHover
          appearance="primary"
          onClick={() => setModalOpen(true)}
          shape="circle"
          variant="filled"
        />
        {ModalOpen && <ActionModal onClose={() => setModalOpen(false)} />}
      </>
    );
  }
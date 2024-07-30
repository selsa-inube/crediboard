import { useEffect, useState } from "react";
import { useMediaQuery } from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";

import {
  actionMobileApprovals,
  actionsApprovals,
  handleData,
  titlesApprovals,
} from "./config";
import { MdCheck, MdClose, MdNotificationsNone, MdRemove, MdWarningAmber } from "react-icons/md";

export const Approvals = () => {
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleData().then((data) => {
      setEntriesApprovals(data as IEntries[]);
      setLoading(false);
    });
  }, []);

  const isMobile = useMediaQuery("(max-width: 720px)");

  const infoItems = [
    { icon: <MdCheck />, text: "Cumple", appearance: "success", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdClose />, text: "No Cumple", appearance: "danger", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdRemove />, text: "Sin Evaluar", appearance: "warning", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdWarningAmber />, text: "Error", appearance: "danger", size: "28px"},
    { icon: <MdNotificationsNone />, text: "Notificaciones", appearance: "help", size: "28px"},
  ];
  
  return (
    <Fieldset
      title="Aprobaciones"
      heightFieldset="282px"
      aspectRatio="3/1"
      hasTable
    >
      <TableBoard
        id="usuarios"
        titles={titlesApprovals}
        entries={entriesApprovals}
        actions={actionsApprovals}
        loading={loading}
        actionMobile={actionMobileApprovals}
        nameTitleTag="decision"
        appearanceTable={{
          widthTd: !isMobile ? "100" : "60%",
          efectzebra: true,
          title: "primary",
          isStyleMobile: true,
        }}
        isFirstTable={true}
        infoItems={infoItems}
      />
    </Fieldset>
  );
};

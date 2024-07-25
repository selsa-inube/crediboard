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
          widthTd: !isMobile ? "100" : "61%",
          efectzebra: true,
          title: "primary",
          isStyleMobile: false,
        }}
      />
    </Fieldset>
  );
};

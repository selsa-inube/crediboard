import { useEffect, useState } from "react";

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

  return (
    <Fieldset
      title="Aprobaciones"
      heigthFieldset="282px"
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
      />
    </Fieldset>
  );
};

import { useEffect, useState } from "react";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { Tag } from "@components/data/Tag";

import {
  actionMobileApprovals,
  actionsApprovals,
  titlesApprovals,
} from "./config";
import { get } from "@mocks/utils/dataMock.service";
import { approval_by_credit_request_Mock } from "@mocks/financialReporting/Approvals";

const appearanceTag = (label: string) => {
  if (label === "Pendiente") {
    return "warning";
  }
  if (label === "Aprobado") {
    return "success";
  }
  return "danger";
};

export const Approvals = () => {
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get<typeof approval_by_credit_request_Mock>("approval").then((data) => {
      setLoading(true);
      const entries = data.map((entry) => ({
        id: entry.approval_id.toString(),
        usuarios: entry.approver_name,
        error: entry.error,
        tag: (
          <Tag
            label={entry.concept}
            appearance={appearanceTag(entry.concept)}
          />
        ),
      }));
      setEntriesApprovals(entries);
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

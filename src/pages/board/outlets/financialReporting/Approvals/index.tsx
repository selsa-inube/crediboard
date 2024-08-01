import { useEffect, useState } from "react";
import { useMediaQuery } from "@inube/design-system";

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
import { approval_by_credit_request_Mock } from "@services/types";

const appearanceTag = (label: string) => {
  if (label === "Pendiente") {
    return "warning";
  }
  if (label === "Aprobado") {
    return "success";
  }
  return "danger";
};

interface IApprovalsProps {
  user: string;
}

export const Approvals = (props: IApprovalsProps) => {
  const { user } = props;
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);

  console.log("user", user);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get<approval_by_credit_request_Mock[]>("approval").then((data) => {
      setLoading(true);
      const entries = data
        .filter((client) => client.credit_request_id === user)
        .map((entry) => ({
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
  }, [user]);

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
          widthTd: !isMobile ? "100" : "60%",
          efectzebra: true,
          title: "primary",
          isStyleMobile: false,
        }}
      />
    </Fieldset>
  );
};

import { useEffect, useState } from "react";
import { Stack, useMediaQuery } from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import {
  actionMobile,
  actionsFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";
import { payroll_discount_authorization, promissory_note } from "./types";
import { getDataById } from "@mocks/utils/dataMock.service";
import { useParams } from "react-router-dom";
import { Tag } from "@components/data/Tag";
import { IEntries } from "@components/data/TableBoard/types";

export const PromissoryNotes = () => {
  const { id } = useParams();

  const [dataPromissoryNotes, setDataPromissoryNotes] = useState<IEntries[]>(
    []
  );

  useEffect(() => {
    Promise.allSettled([
      getDataById<payroll_discount_authorization[]>(
        "payroll_discount_authorization",
        "credit_request_id",
        id!
      ),
      getDataById<promissory_note[]>(
        "promissory_note",
        "credit_request_id",
        id!
      ),
    ]).then((results) => {
      const data = results
        .flatMap((client): payroll_discount_authorization[] => {
          if (client.status === "fulfilled") {
            return client.value as payroll_discount_authorization[];
          }
          return [];
        })
        .map((p) => ({
          id: p.credit_product_id,
          "No. de Obligación": p.obligation_unique_code,
          "No. de Documento": p.document_unique_code,
          Tipo: p.state,
          tag: <Tag label={p.state} appearance="success" />,
        }));
      setDataPromissoryNotes(data);
    });
  }, [id]);

  const isMobile = useMediaQuery("(max-width: 720px)");

  console.log("dataPromissoryNotes", dataPromissoryNotes);

  return (
    <Stack direction="column">
      <Fieldset title="Pagarés y Libranzas" heightFieldset="163px" hasTable>
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={dataPromissoryNotes}
          actions={actionsFinanacialReporting}
          actionMobile={actionMobile}
          appearanceTable={{
            widthTd: !isMobile ? "100" : "20%",
            efectzebra: true,
            title: "primary",
            isStyleMobile: true,
          }}
        />
      </Fieldset>
    </Stack>
  );
};

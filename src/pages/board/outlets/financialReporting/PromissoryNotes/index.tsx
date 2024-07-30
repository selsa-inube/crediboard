import { useEffect, useState } from "react";
import { Stack, useMediaQuery } from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import {
  actionMobile,
  actionsFinanacialReporting,
  appearanceTag,
  firstWord,
  titlesFinanacialReporting,
} from "./config";

import { getDataById } from "@mocks/utils/dataMock.service";
import { useParams } from "react-router-dom";
import { Tag } from "@components/data/Tag";
import { IEntries } from "@components/data/TableBoard/types";
import {
  payroll_discount_authorization,
  promissory_note,
} from "@services/types";

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
      const dataPrommisseNotes = results
        .flatMap((prommiseNote): payroll_discount_authorization[] => {
          if (prommiseNote.status === "fulfilled") {
            return prommiseNote.value as payroll_discount_authorization[];
          }
          return [];
        })
        .map((entry) => ({
          id: entry.credit_product_id,
          "No. de Obligación": entry.obligation_unique_code,
          "No. de Documento": entry.document_unique_code,
          Tipo: firstWord(entry.abbreviated_name),
          tag: (
            <Tag label={entry.state} appearance={appearanceTag(entry.state)} />
          ),
        }));
      setDataPromissoryNotes(dataPrommisseNotes);
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

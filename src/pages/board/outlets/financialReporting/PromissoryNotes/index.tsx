import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";

import { getDataById } from "@mocks/utils/dataMock.service";
import {
  payroll_discount_authorization,
  promissory_note,
} from "@services/types";
import {
  appearanceTag,
  firstWord,
  getTableBoardActionMobile,
  getTableBoardActions,
  titlesFinanacialReporting,
} from "./config";
import { Tag } from "@inubekit/tag";
import { PromissoryNotesModal } from "@components/modals/PromissoryNotesModal";

interface IPromissoryNotesProps {
  user: string;
}

export const PromissoryNotes = (props: IPromissoryNotesProps) => {
  const { user } = props;

  const [showModal, setShowModal] = useState(false);
  const [dataPromissoryNotes, setDataPromissoryNotes] = useState<IEntries[]>(
    []
  );

  useEffect(() => {
    Promise.allSettled([
      getDataById<payroll_discount_authorization[]>(
        "payroll_discount_authorization",
        "credit_request_id",
        user!
      ),
      getDataById<promissory_note[]>(
        "promissory_note",
        "credit_request_id",
        user!
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
  }, [user]);

  const tableBoardActions = getTableBoardActions(() => setShowModal(true));
  const tableBoardActionMobile = getTableBoardActionMobile(() =>
    setShowModal(true)
  );

  const formValues = {
    field1: "usuario@inube.com",
    field2: "3122638128",
    field3: "3122638128",
  };

  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <Fieldset
      title="Pagarés y Libranzas"
      heightFieldset="163px"
      aspectRatio="1"
      hasTable
    >
      <Stack direction="column" height={!isMobile ? "100%" : "138px"}>
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={dataPromissoryNotes}
          actions={tableBoardActions}
          actionMobile={tableBoardActionMobile}
          appearanceTable={{
            efectzebra: true,
            title: "primary",
            isStyleMobile: true,
          }}
        />

        {showModal && (
          <PromissoryNotesModal
            title="Confirma los datos del usuario"
            buttonText="Enviar"
            formValues={formValues}
            onCloseModal={() => setShowModal(false)}
            handleClose={() => setShowModal(false)}
          />
        )}
      </Stack>
    </Fieldset>
  );
};

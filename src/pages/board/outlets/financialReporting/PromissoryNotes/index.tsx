import { useEffect, useState } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Flag } from "@inubekit/flag";
import { Tag } from "@inubekit/tag";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { PromissoryNotesModal } from "@components/modals/PromissoryNotesModal";

import { getById } from "@mocks/utils/dataMock.service";
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
  infoItems,
} from "./config";
import { StyledMessageContainer } from "../styles";
import { StyledContainer } from "./styles";

interface IPromissoryNotesProps {
  user: string;
  isMobile: boolean;
}

export const PromissoryNotes = (props: IPromissoryNotesProps) => {
  const { user, isMobile } = props;

  const [showModal, setShowModal] = useState(false);
  const [dataPromissoryNotes, setDataPromissoryNotes] = useState<IEntries[]>(
    []
  );
  const [showFlag, setShowFlag] = useState(false);

  useEffect(() => {
    Promise.allSettled([
      getById<payroll_discount_authorization[]>(
        "payroll_discount_authorization",
        "credit_request_id",
        user!,
        true
      ),
      getById<promissory_note[]>(
        "promissory_note",
        "credit_request_id",
        user!,
        true
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
            <Tag
              label={entry.state}
              appearance={appearanceTag(entry.state)}
              weight="strong"
            />
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

  const handleSubmit = () => {
    setShowFlag(true);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <StyledContainer>
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
              widthTd: !isMobile ? "100" : "23%",
              efectzebra: true,
              title: "primary",
              isStyleMobile: true,
            }}
            isFirstTable={true}
            infoItems={infoItems}
          />

          {showModal && (
            <PromissoryNotesModal
              title="Confirma los datos del usuario"
              buttonText="Enviar"
              formValues={formValues}
              handleClose={handleCloseModal}
              onSubmit={handleSubmit}
            />
          )}
          {showFlag && (
            <StyledMessageContainer>
              <Flag
                title="Datos enviados"
                description="Los datos del usuario han sido enviados exitosamente."
                appearance="success"
                duration={5000}
                icon={<MdOutlineThumbUp />}
                isMessageResponsive
                closeFlag={() => setShowFlag(false)}
              />
            </StyledMessageContainer>
          )}
        </Stack>
      </Fieldset>
    </StyledContainer>
  );
};

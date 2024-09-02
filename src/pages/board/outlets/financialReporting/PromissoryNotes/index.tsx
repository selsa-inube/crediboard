import { useCallback, useEffect, useState } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Flag } from "@inubekit/flag";
import { Tag } from "@inubekit/tag";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { PromissoryNotesModal } from "@components/modals/PromissoryNotesModal";
import { UnfoundData } from "@components/layout/UnfoundData";

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
  infoItems,
} from "./config";
import { StyledMessageContainer } from "../styles";
import { errorObserver } from "../config"; 

interface IPromissoryNotesProps {
  user: string;
  isMobile: boolean;
}

export const PromissoryNotes = (props: IPromissoryNotesProps) => {
  const { user, isMobile } = props;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataPromissoryNotes, setDataPromissoryNotes] = useState<IEntries[]>([]);
  const [showFlag, setShowFlag] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setShowRetry(false);
  
    try {
      const results = await Promise.allSettled([
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
      ]);
  
      const dataPrommisseNotes = results
        .flatMap((result) => {
          if (result.status === "fulfilled") {
            return result.value as payroll_discount_authorization[];
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
  
      if (dataPrommisseNotes.length > 0) {
        setDataPromissoryNotes(dataPrommisseNotes);
        setLoading(false);
      } else {
        throw new Error("No se encontraron datos.");
      }
    } catch (err) {
      errorObserver.notify({
        id: "PromissoryNotes",
        message: "Error al obtener los datos de Pagarés y Libranzas",
      });
      
      setTimeout(() => {
        setShowRetry(true);
        setLoading(false);
      }, 5000); 
  
    } 
  }, [user]);
  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleRetry = () => {
    setLoading(true);
    setShowRetry(false);
    fetchData(); 
  };

  return (
    <>
      <Fieldset
        title="Pagarés y Libranzas"
        heightFieldset="163px"
        aspectRatio="1"
        hasOverflow
        hasTable
      >
        <Stack direction="column" height={!isMobile ? "100%" : "138px"}>
          {showRetry ? (
            <UnfoundData
              title="Error al cargar datos"
              description="Hubo un error al intentar cargar los datos. Por favor, intente nuevamente."
              buttonDescription="Volver a intentar"
              route="/retry-path"
              onRetry={handleRetry}
            />
          ) : (
            <TableBoard
              id="promissoryNotes"
              titles={titlesFinanacialReporting}
              entries={dataPromissoryNotes}
              actions={tableBoardActions}
              actionMobile={tableBoardActionMobile}
              loading={loading}
              appearanceTable={{
                widthTd: !isMobile ? "100" : "23%",
                efectzebra: true,
                title: "primary",
                isStyleMobile: true,
              }}
              isFirstTable={true}
              infoItems={infoItems}
            />
          )}

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
    </>
  );
};

import { useEffect, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setShowRetry(false);

      try {
        const [payrollResult, promissoryResult] = await Promise.all([
          getDataById<payroll_discount_authorization[]>(
            "payroll_discount_authorization",
            "credit_request_id",
            user
          ),
          getDataById<promissory_note[]>(
            "promissory_note",
            "credit_request_id",
            user
          ),
        ]);

        const payrollData = Array.isArray(payrollResult) ? payrollResult : [];
        const promissoryData = Array.isArray(promissoryResult) ? promissoryResult : [];

        const data = [
          ...payrollData,
          ...promissoryData,
        ].map((entry) => ({
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

        if (data.length > 0) {
          setDataPromissoryNotes(data);
        } else {
          await delayPromise(5000);
          setError("No se encontraron datos.");
          setShowRetry(true);
        }
      } catch (error) {
        await delayPromise(5000); 
        setError("Error al intentar conectar con el servicio.");
        setShowRetry(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setShowRetry(false);
  };

  return (
    <Fieldset
      title="Pagarés y Libranzas"
      heightFieldset="163px"
      aspectRatio="1"
      hasTable
      hasOverflow
    >
      <Stack direction="column" height={!isMobile ? "100%" : "auto"}>
        {showRetry ? (
          <UnfoundData
            title="Error al cargar datos"
            description={error || "No se encontraron datos."}
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
            loading={loading}
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
  );
};

const delayPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

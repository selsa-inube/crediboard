import { useCallback, useEffect, useState } from "react";
import { Stack } from "@inubekit/stack";
import { useFlag } from "@inubekit/flag";
import { Tag } from "@inubekit/tag";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { PromissoryNotesModal } from "@components/modals/PromissoryNotesModal";
import { UnfoundData } from "@components/layout/UnfoundData";
import { getCreditRequestByCode } from "@services/creditRequets/getCreditRequestByCode";
import userNotFound from "@assets/images/ItemNotFound.png";
import { getPayrollDiscountAuthorizationById } from "@services/payroll_discount_authorizations";
import { getPromissoryNotesById } from "@services/promissory_notes";
import {
  IPayrollDiscountAuthorization,
  IPromissoryNotes,
  Requests,
} from "@services/types";

import { errorObserver } from "../config";
import {
  appearanceTag,
  getTableBoardActionMobile,
  getTableBoardActions,
  titlesFinanacialReporting,
  infoItems,
} from "./config";

interface IPromissoryNotesProps {
  id: string;
  isMobile: boolean;
}

export const PromissoryNotes = (props: IPromissoryNotesProps) => {
  const { id, isMobile } = props;
  const { addFlag } = useFlag();

  const [creditRequets, setCreditRequests] = useState<Requests | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataPromissoryNotes, setDataPromissoryNotes] = useState<IEntries[]>(
    []
  );
  const [showRetry, setShowRetry] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchCreditRequest = async () => {
      try {
        const data = await getCreditRequestByCode(id);
        setCreditRequests(data[0] as Requests);
      } catch (error) {
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message,
        });
      }
    };
    if (id) fetchCreditRequest();
  }, [id]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setShowRetry(false);

    if (!creditRequets?.creditRequestId) return;

    try {
      const [payrollDiscountResult, promissoryNotesResult] =
        await Promise.allSettled([
          getPayrollDiscountAuthorizationById(creditRequets.creditRequestId),
          getPromissoryNotesById(creditRequets.creditRequestId),
        ]);

      const processResult = (
        result: PromiseSettledResult<
          IPayrollDiscountAuthorization[] | IPromissoryNotes[]
        >,
        observerId: string,
        sourceType: "payroll" | "promissory_note"
      ) =>
        result.status === "fulfilled"
          ? result.value.map((entry) => ({
              id: entry.payrollDiscountAuthorizationId,
              "No. de Obligación": entry.obligationCode,
              "No. de Documento": entry.documentCode,
              Tipo: sourceType === "payroll" ? "Libranza" : "Pagaré",
              tag: (
                <Tag
                  label={entry.documentState}
                  appearance={appearanceTag(entry.documentState)}
                  weight="strong"
                />
              ),
            }))
          : (errorObserver.notify({
              id: observerId,
              message: result.reason.message,
            }),
            []);

      const combinedData = [
        ...processResult(payrollDiscountResult, "PayrollDiscount", "payroll"),
        ...processResult(
          promissoryNotesResult,
          "PromissoryNotes",
          "promissory_note"
        ),
      ];

      if (!combinedData.length)
        throw new Error("No se encontraron datos en la base de datos");

      setDataPromissoryNotes(combinedData);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setShowRetry(true);
    } finally {
      setLoading(false);
    }
  }, [creditRequets]);

  useEffect(() => {
    if (creditRequets?.creditRequestId) fetchData();
  }, [fetchData, creditRequets]);

  const handleRetry = () => {
    setLoading(true);
    setShowRetry(false);
    fetchData();
  };

  return (
    <Fieldset
      title="Pagarés y Libranzas"
      heightFieldset="163px"
      aspectRatio={isMobile ? "auto" : "1"}
      hasTable
    >
      {showRetry ? (
        <UnfoundData
          image={userNotFound}
          title="Error al cargar datos"
          description={
            errorMessage ||
            "Hubo un error al intentar cargar los datos. Por favor, intente nuevamente."
          }
          buttonDescription="Volver a intentar"
          route="/retry-path"
          onRetry={handleRetry}
        />
      ) : (
        <Stack direction="column" height={!isMobile ? "100%" : "auto"}>
          <TableBoard
            id="promissoryNotes"
            titles={titlesFinanacialReporting}
            entries={dataPromissoryNotes}
            actions={getTableBoardActions(() => setShowModal(true))}
            actionMobile={getTableBoardActionMobile(() => setShowModal(true))}
            loading={loading}
            appearanceTable={{
              widthTd: isMobile ? "23%" : undefined,
              efectzebra: true,
              title: "primary",
              isStyleMobile: true,
            }}
            isFirstTable
            infoItems={infoItems}
          />

          {showModal && (
            <PromissoryNotesModal
              title="Confirma los datos del usuario"
              buttonText="Enviar"
              formValues={{
                field1: "usuario@inube.com",
                field2: "3122638128",
                field3: "3122638128",
              }}
              handleClose={() => setShowModal(false)}
              onSubmit={() => {
                addFlag({
                  title: "Datos enviados",
                  description:
                    "Los datos del usuario han sido enviados exitosamente.",
                  appearance: "success",
                  duration: 5000,
                });
                setShowModal(false);
              }}
            />
          )}
        </Stack>
      )}
    </Fieldset>
  );
};

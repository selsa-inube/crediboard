import { useState, isValidElement, useEffect } from "react";
import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Stack, Icon, useFlag } from "@inubekit/inubekit";

import userNotFound from "@assets/images/ItemNotFound.png";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { TraceDetailsModal } from "@components/modals/TraceDetailsModal";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";
import { CreditRequest } from "@services/types";
import { addItem } from "@mocks/utils/dataMock.service";
import { traceDetailsMock } from "@mocks/financialReporting/trace-details/tracedetails.mock";
import { getAllPackagesOfRequirementsById } from "@services/packagesOfRequirements";

import {
  dataButton,
  infoItems,
  maperDataRequirements,
  maperEntries,
  getAcctionMobile,
  dataFlags,
} from "./config";
import { AprovalsModal } from "./AprovalsModal";
import { traceObserver, errorMessages } from "../config";

interface IRequirementsData {
  id: string;
  titlesRequirements: ITitle[];
  entriesRequirements: IEntries[];
  actionsMovile: IAction[];
}

export interface IRequirementsProps {
  isMobile?: boolean;
  id: string;
  user: string;
  businessUnitPublicCode: string;
  creditRequestId: string;
}

export const Requirements = (props: IRequirementsProps) => {
  const { isMobile, id, user, businessUnitPublicCode, creditRequestId } = props;
  const [showSeeDetailsModal, setShowSeeDetailsModal] = useState(false);
  const [showAprovalsModal, setShowAprovalsModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [dataRequirements, setDataRequirements] = useState<IRequirementsData[]>(
    []
  );
  const [error, setError] = useState(false);

  const { addFlag } = useFlag();

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const data = await getAllPackagesOfRequirementsById(
          businessUnitPublicCode,
          creditRequestId
        );

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No hay requisitos disponibles.");
        }

        const mapped: CreditRequest = {
          credit_request_id: data[0].uniqueReferenceNumber,
          system_validations: {},
          documentary_requirements: {},
          human_validations: {},
        };

        data.forEach((item) => {
          item.listsOfRequirementsByPackage.forEach((req) => {
            const type = req.typeOfRequirementToEvaluated;
            const key = req.descriptionUse;
            const value = req.requirementStatus;

            if (
              type &&
              key &&
              value &&
              Object.prototype.hasOwnProperty.call(mapped, type)
            ) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (mapped as any)[type][key] = value;
            }
          });
        });

        const processedEntries = maperEntries(mapped);
        const processedRequirements = maperDataRequirements(processedEntries);
        setDataRequirements(processedRequirements);
      } catch (error) {
        addFlag({
          title: dataFlags.requirements.title,
          description: `${dataFlags.requirements.description}${error}`,
          appearance: "danger",
          duration: 5000,
        });
        setError(true);
      }
    };

    fetchRequirements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAccion = getAcctionMobile(
    setShowSeeDetailsModal,
    setShowAprovalsModal
  );

  const toggleAprovalsModal = () => setShowAprovalsModal(!showAprovalsModal);
  const changeApprove = () => setIsApproved(!isApproved);

  const handleToggleSeeDetailsModal = () => {
    setShowSeeDetailsModal((prevState) => !prevState);
  };

  const handleSubmitAprovals = async (
    id: string,
    user: string,
    formData: { textarea: string }
  ) => {
    const justificationText = formData.textarea;

    if (justificationText && id) {
      const trace = {
        trace_value: "Document approved",
        credit_request_id: id,
        use_case: "document_upload",
        user_id: user,
        execution_date: new Date().toISOString(),
        justification: justificationText,
        decision_taken_by_user: "approved",
        trace_type: "executed_task",
        read_novelty: "",
      };

      try {
        await addItem("trace", trace);
        traceObserver.notify(trace);
        addFlag({
          title: dataFlags.documentApproved.title,
          description: dataFlags.documentApproved.description,
          appearance: "success",
          duration: 5000,
        });
      } catch (error) {
        addFlag({
          title: dataFlags.documentRejected.title,
          description: dataFlags.documentRejected.description,
          appearance: "danger",
          duration: 5000,
        });
      }
    }
  };

  const renderAddIcon = () => {
    return (
      <Stack justifyContent="center">
        <Icon
          icon={<MdAddCircleOutline />}
          appearance="primary"
          onClick={() => handleToggleSeeDetailsModal()}
          spacing="compact"
          variant="empty"
          size="32px"
          cursorHover
        />
      </Stack>
    );
  };

  const renderCheckIcon = (entry: IEntries) => (
    <Stack justifyContent="center">
      <Icon
        icon={<MdOutlineCheckCircle />}
        appearance="primary"
        spacing="compact"
        cursorHover
        size="32px"
        onClick={() => {
          setIsApproved(false);
          toggleAprovalsModal();
        }}
        disabled={
          isValidElement(entry?.tag) && entry?.tag?.props?.label === "No Cumple"
        }
      />
    </Stack>
  );

  const actionsRequirements: IAction[] = [
    { id: "agregar", content: renderAddIcon },
    { id: "aprobar", content: renderCheckIcon },
  ];

  return (
    <>
      <Fieldset
        title={errorMessages.Requirements.titleCard}
        activeButton={dataButton}
        heightFieldset="100%"
        hasTable={!error}
      >
        {error ? (
          <ItemNotFound
            image={userNotFound}
            title={errorMessages.Requirements.title}
            description={errorMessages.Requirements.description}
            buttonDescription={errorMessages.Requirements.button}
            onRetry={() => setError(false)}
          />
        ) : (
          dataRequirements.map((item, index) => (
            <TableBoard
              key={item.id}
              id={item.id}
              titles={item.titlesRequirements}
              entries={item.entriesRequirements}
              actions={actionsRequirements}
              actionMobile={renderAccion}
              appearanceTable={{
                widthTd: !isMobile ? "75%" : "70%",
                efectzebra: true,
                title: "primary",
                isStyleMobile: true,
              }}
              isFirstTable={index === 0}
              infoItems={infoItems}
            />
          ))
        )}
      </Fieldset>

      {showSeeDetailsModal && (
        <TraceDetailsModal
          isMobile={isMobile}
          handleClose={() => setShowSeeDetailsModal(false)}
          data={traceDetailsMock[0]}
        />
      )}
      {showAprovalsModal && (
        <AprovalsModal
          isApproved={isApproved}
          onCloseModal={toggleAprovalsModal}
          onChangeApprove={changeApprove}
          onSubmit={(values) => handleSubmitAprovals(id!, user, values)}
        />
      )}
    </>
  );
};

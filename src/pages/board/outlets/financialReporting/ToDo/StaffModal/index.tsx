import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Stack,
  Icon,
  Text,
  Spinner,
  useMediaQuery,
  Select,
  Blanket,
  Button,
  useFlag,
} from "@inubekit/inubekit";

import { getCommercialManagerAndAnalyst } from "@services/commercialManagerAndAnalyst";
import {
  ICommercialManagerAndAnalyst,
  ICreditRequests,
} from "@pages/SubmitCreditApplication/types";

import { StyledModal, StyledContainerClose } from "./styles";
import { saveCredit } from "./utils";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "@context/AppContext";
import { IToDo } from "@services/types";
import { textFlags } from "@config/pages/staffModal/addFlag";

export interface StaffModalProps {
  commercialManager: string;
  analyst: string;
  portalId?: string;
  onChange: (key: string) => void;
  onSubmit?: (values: { commercialManager: string; analyst: string }) => void;
  onCloseModal?: () => void;
  taskData?: IToDo | null;
}

export function StaffModal(props: StaffModalProps) {
  const { portalId = "portal", onSubmit, onCloseModal, taskData } = props;
  const [analystList, setAnalystList] = useState<
    ICommercialManagerAndAnalyst[]
  >([]);
  const [accountManagerList, setAccountManagerList] = useState<
    ICommercialManagerAndAnalyst[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommercialManager, setSelectedCommercialManager] =
    useState<ICommercialManagerAndAnalyst | null>(null);
  const isMobile = useMediaQuery("(max-width: 700px)");
  const [showModal, setShowModal] = useState(false);
  const node = document.getElementById(portalId);
  const validationSchema = Yup.object().shape({
    commercialManager: Yup.string(),
    analyst: Yup.string(),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }
  const { businessUnitSigla, eventData } = useContext(AppContext);
  const { userAccount } =
    typeof eventData === "string" ? JSON.parse(eventData).user : eventData.user;
  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;
  const handleCommercialManagerChange = (
    name: string,
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue(name, value);

    const selectedManager = accountManagerList.find(
      (manager) => manager.staffName === value
    );

    if (selectedManager) {
      setSelectedCommercialManager({
        staffId: selectedManager.staffId,
        identificationDocumentNumber:
          selectedManager.identificationDocumentNumber,
        staffName: selectedManager.staffName,
        userAccount: selectedManager.userAccount,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [accountManagers, analysts] = await Promise.all([
          getCommercialManagerAndAnalyst("CredicarAccountManager", "Selsa"),
          getCommercialManagerAndAnalyst("CredicarAnalyst", "Selsa"),
        ]);

        setAccountManagerList(accountManagers);
        setAnalystList(analysts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const { addFlag } = useFlag();
  const handleCreditRequests = async (creditRequests: ICreditRequests) => {
    await saveCredit(businessUnitPublicCode, creditRequests, userAccount)
      .then(() => {
        addFlag({
          title: textFlags.titleSuccess,
          description: textFlags.descriptionSuccess,
          appearance: "success",
          duration: 5000,
        });
      })
      .catch(() => {
        addFlag({
          title: textFlags.titleError,
          description: textFlags.descriptionError,
          appearance: "danger",
          duration: 5000,
        });
      })
      .finally(() => {
        handleToggleModal();
      });

    setTimeout(() => {
      navigate(`/extended-card/${id}`);
    }, 6000);
  };
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const options = {
    commercialManager: accountManagerList.map((official) => ({
      id: official.staffId,
      label: official.staffName,
      value: official.staffName,
      document: official.identificationDocumentNumber,
    })),
    analyst: analystList.map((official) => ({
      id: official.staffId,
      label: official.staffName,
      value: official.staffName,
    })),
  };
  const initialValues: ICreditRequests = {
    creditRequestId: taskData?.creditRequestId || "",
    executed_task: taskData?.taskToBeDone || "",
    execution_date: "2025-04-28",
    identificationNumber:
      selectedCommercialManager?.identificationDocumentNumber || "",
    identificationType: "C",
    position: taskData?.stage || "",
    transactionOperation: "Insert",
    userId: selectedCommercialManager?.staffId || "",
    userName: selectedCommercialManager?.staffName || "",
    justification: "Justificacion",
    creditRequestCode: "",
  };

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            Gestor Comercial y Analista
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>

        {loading ? (
          <Stack justifyContent="center">
            <Spinner size="large" appearance="primary" transparent={false} />
          </Stack>
        ) : (
          <Formik
            initialValues={{ commercialManager: "", analyst: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit?.(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Stack direction="column" gap="24px">
                  <Select
                    name="commercialManager"
                    id="commercialManager"
                    label="Gestor Comercial"
                    placeholder={
                      options.commercialManager.length > 0
                        ? "Seleccione una opción"
                        : "No hay gestores disponibles"
                    }
                    options={options.commercialManager}
                    onChange={(name, value) =>
                      handleCommercialManagerChange(name, value, setFieldValue)
                    }
                    value={values.commercialManager}
                    fullwidth
                    disabled={options.commercialManager.length === 0}
                  />
                  <Select
                    name="analyst"
                    id="analyst"
                    label="Analista"
                    placeholder={
                      options.analyst.length > 0
                        ? "Seleccione una opción"
                        : "No hay analistas disponibles"
                    }
                    options={options.analyst}
                    value={values.analyst}
                    onChange={(name, value) =>
                      handleCommercialManagerChange(name, value, setFieldValue)
                    }
                    fullwidth
                    disabled={options.analyst.length === 0}
                  />
                </Stack>
                <Stack justifyContent="flex-end" margin="16px 0">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => handleCreditRequests(initialValues)}
                  >
                    Aceptar
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
      </StyledModal>
    </Blanket>,
    node
  );
}
